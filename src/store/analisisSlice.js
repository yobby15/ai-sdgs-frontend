import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { analyzeDocument, checkAnalysisStatus } from '../services/analisisService';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const loadHistoryFromCache = () => {
  try {
    const saved = localStorage.getItem('sdg_ai_history');
    if (!saved) return [];
    
    const parsed = JSON.parse(saved);
    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
    const now = new Date().getTime();

    const filtered = parsed.filter(item => {
      if (!item.analyzedAt) return true; 
      const itemTime = new Date(item.analyzedAt).getTime();
      return (now - itemTime) < thirtyDaysInMs;
    });

    if (filtered.length !== parsed.length) {
      localStorage.setItem('sdg_ai_history', JSON.stringify(filtered));
    }

    return filtered;
  } catch {
    return [];
  }
};

export const submitAnalisis = createAsyncThunk(
  'analisis/submit',
  async ({ file, type, params }, { rejectWithValue }) => {
    try {
      const initResult = await analyzeDocument(file, params);
      
      if (!initResult.job_id) return rejectWithValue('Gagal mendapatkan Job ID.');
      
      const jobId = initResult.job_id;
      let attempts = 0;
      
      while (attempts < 120) {
        const statusResult = await checkAnalysisStatus(jobId);
        
        if (statusResult.status === 'completed') {
           return {
             ...statusResult.result,
             documentType: type,
             analyzedAt: new Date().toISOString(),
             fileName: file.name || file
           };
        } else if (statusResult.status === 'failed') {
           return rejectWithValue(statusResult.error || 'Analisis gagal di server.');
        }
        
        await delay(5000);
        attempts++;
      }
      return rejectWithValue('Timeout menunggu hasil analisis.');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const analisisSlice = createSlice({
  name: 'analisis',
  initialState: {
    file: null,
    uploadProgress: 0,
    status: 'idle',
    error: null,
    result: null,
    history: loadHistoryFromCache(),
  },
  reducers: {
    setFile(state, action) {
      state.file = action.payload;
    },
    setUploadProgress(state, action) {
      state.uploadProgress = action.payload;
    },
    resetAnalisis(state) {
      state.file = null;
      state.uploadProgress = 0;
      state.status = 'idle';
      state.error = null;
      state.result = null;
    },
    clearHistory(state) {
      state.history = [];
      localStorage.removeItem('sdg_ai_history');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitAnalisis.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(submitAnalisis.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.result = action.payload;
        
        state.history.unshift(action.payload);
        
        localStorage.setItem('sdg_ai_history', JSON.stringify(state.history));
      })
      .addCase(submitAnalisis.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setFile, resetAnalisis, clearHistory } = analisisSlice.actions;

export const selectAnalisisStatus  = (state) => state.analisis.status;
export const selectAnalisisResult  = (state) => state.analisis.result;
export const selectAnalisisError   = (state) => state.analisis.error;
export const selectAnalisisHistory = (state) => state.analisis.history;
export const selectUploadProgress  = (state) => state.analisis.uploadProgress;
export const selectAnalisisFile    = (state) => state.analisis.file;

export default analisisSlice.reducer;