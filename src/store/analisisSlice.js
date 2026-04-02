import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { analyzeDocument } from '../services/analisisService';

export const submitAnalisis = createAsyncThunk(
  'analisis/submit',
  async ({ file, params }, { rejectWithValue }) => {
    try {
      const result = await analyzeDocument(file, params);
      return result;
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

    history: [],
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
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitAnalisis.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.result = null;
        state.uploadProgress = 0;
      })
      .addCase(submitAnalisis.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.result = action.payload;
        state.uploadProgress = 100;
        // Tambahkan ke riwayat
        state.history.unshift({
          ...action.payload,
          fileName: state.file,
        });
      })
      .addCase(submitAnalisis.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.uploadProgress = 0;
      });
  },
});

export const { setFile, setUploadProgress, resetAnalisis, clearError } = analisisSlice.actions;

export const selectAnalisisStatus  = (state) => state.analisis.status;
export const selectAnalisisResult  = (state) => state.analisis.result;
export const selectAnalisisError   = (state) => state.analisis.error;
export const selectAnalisisFile    = (state) => state.analisis.file;
export const selectUploadProgress  = (state) => state.analisis.uploadProgress;
export const selectAnalisisHistory = (state) => state.analisis.history;

export default analisisSlice.reducer;