import api from './api';

export const analyzeDocument = async (file, params = {}, onUploadProgress) => {
  const formData = new FormData();
  formData.append('file', file);

  const queryParams = new URLSearchParams({
    k: params.k ?? 10,
    model_name: params.model_name ?? import.meta.env.VITE_API_MODEL_NAME,
    type_api: params.type_api ?? import.meta.env.VITE_API_TYPE,
    save_result: params.save_result ?? true,
    ...(params.source ? { source: params.source } : {}),
  });

  const response = await api.post(`/analyze?${queryParams}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: onUploadProgress
      ? (e) => onUploadProgress(Math.round((e.loaded * 100) / e.total))
      : undefined,
  });

  return response.data;
};

export const checkAnalysisStatus = async (jobId) => {
  const response = await api.get(`/analyze/${jobId}`);
  return response.data;
};

export const fetchHistory = async () => {
  const response = await api.get('/history');
  return response.data;
};

export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};
