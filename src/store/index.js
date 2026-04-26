import { configureStore } from '@reduxjs/toolkit';
import analisisReducer from './analisisSlice';

const store = configureStore({
  reducer: {
    analisis: analisisReducer,
  },
});

export default store;
