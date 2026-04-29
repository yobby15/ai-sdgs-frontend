import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  analyzeDocument,
  checkAnalysisStatus,
  fetchHistory,
} from '../services/analisisService';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const loadHistoryData = createAsyncThunk(
  'analisis/loadHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchHistory();
      if (response.status === 'success') {
        return response.data;
      }
      return rejectWithValue('Gagal memuat history');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const submitAnalisis = createAsyncThunk(
  'analisis/submit',
  async ({ file, type, params }, { rejectWithValue }) => {
    try {
      const initResult = await analyzeDocument(file, params);

      if (!initResult.job_id)
        return rejectWithValue('Gagal mendapatkan Job ID.');

      const jobId = initResult.job_id;
      let attempts = 0;

      while (attempts < 120) {
        const statusResult = await checkAnalysisStatus(jobId);

        if (statusResult.status === 'completed') {
          return {
            ...statusResult.result,
            documentType: type,
            analyzedAt: new Date().toISOString(),
            fileName: file.name || file,
          };
        } else if (statusResult.status === 'failed') {
          return rejectWithValue(
            statusResult.error || 'Analisis gagal di server.',
          );
        }

        await delay(5000);
        attempts++;
      }
      return rejectWithValue('Timeout menunggu hasil analisis.');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const analisisSlice = createSlice({
  name: 'analisis',
  initialState: {
    file: null,
    uploadProgress: 0,
    status: 'idle',
    error: null,
    result: null,
    history: [],
    historyStatus: 'idle',
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
    },
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
        if (action.payload?.result !== null && action.payload?.result !== undefined) {
          state.history.unshift(action.payload);
        }
      })
      .addCase(submitAnalisis.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      .addCase(loadHistoryData.pending, (state) => {
        state.historyStatus = 'loading';
      })
      .addCase(loadHistoryData.fulfilled, (state, action) => {
        state.historyStatus = 'succeeded';
        state.history = action.payload;
      })
      .addCase(loadHistoryData.rejected, (state, action) => {
        state.historyStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setFile, resetAnalisis, clearHistory } = analisisSlice.actions;

export const selectAnalisisStatus = (state) => state.analisis.status;
export const selectAnalisisResult = (state) => state.analisis.result;
export const selectAnalisisError = (state) => state.analisis.error;
export const selectAnalisisHistory = (state) => state.analisis.history;
export const selectAnalisisHistoryStatus = (state) => state.analisis.historyStatus; 
export const selectUploadProgress = (state) => state.analisis.uploadProgress;
export const selectAnalisisFile = (state) => state.analisis.file;

export default analisisSlice.reducer;
