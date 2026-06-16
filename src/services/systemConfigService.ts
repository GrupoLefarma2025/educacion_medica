import { API } from './api';


export interface BackendConfigResponse {
  jwt: {
    expirationMinutes: number;
    issuer: string;
    audience: string;
  };
}

export const systemConfigService = {
  getBackendConfig: async (): Promise<BackendConfigResponse> => {
    const response = await API.get<BackendConfigResponse>('/sistema/config/backend');
    return response.data;
  }
};
