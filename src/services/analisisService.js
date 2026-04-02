import api from './api';

export const analyzeDocument = async (file, params = {}, onUploadProgress) => {
  const formData = new FormData();
  formData.append('file', file);

  const queryParams = new URLSearchParams({
    k: params.k ?? 10,
    window_size: params.window_size ?? 2,
    model_name: params.model_name ?? 'gemini-2.5-flash',
    type_model: params.type_model ?? 'gemini',
    save_result: params.save_result ?? true,
    save_path: params.save_path ?? './ai_result',
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

export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};