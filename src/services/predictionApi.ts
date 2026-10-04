import {
  PredictionInputs,
  PredictionResponse,
  ApiHealthResponse,
  ModelInfoResponse,
  DatasetInfoResponse
} from '../types/prediction';

// Dedicated API service as specified in requirements
const BASE_URL = (import.meta as any).env.VITE_API_BASE_URL || 'http://127.0.0.1:8001';

class PredictionApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = BASE_URL.replace(/\/$/, '');
  }

  /**
   * Performs real health check ping to backend ML API
   */
  async checkHealth(): Promise<ApiHealthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(4000)
      });
      if (!response.ok) {
        return { status: 'offline', model_loaded: false, timestamp: new Date().toISOString() };
      }
      const data = await response.json();
      return {
        status: data.status === 'online' ? 'online' : 'offline',
        model_loaded: Boolean(data.model_loaded),
        timestamp: data.timestamp || new Date().toISOString(),
        version: data.version
      };
    } catch {
      return { status: 'offline', model_loaded: false, timestamp: new Date().toISOString() };
    }
  }

  /**
   * Sends user inputs to real ML backend /predict REST endpoint
   */
  async predict(inputs: PredictionInputs): Promise<PredictionResponse> {
    const response = await fetch(`${this.baseUrl}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(inputs)
    });

    if (!response.ok) {
      if (response.status === 503) {
        throw new Error('ML prediction service is currently unavailable.');
      }
      const errData = await response.json().catch(() => null);
      throw new Error(errData?.detail || `Prediction request failed with status ${response.status}`);
    }

    const data = await response.json();
    if (typeof data.prediction !== 'number' || isNaN(data.prediction)) {
      throw new Error('Invalid prediction response received from ML API.');
    }

    return data as PredictionResponse;
  }

  /**
   * Fetches real trained model metrics from backend GET /model-info
   */
  async getModelInfo(): Promise<ModelInfoResponse | null> {
    try {
      const response = await fetch(`${this.baseUrl}/model-info`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) return null;
      return (await response.json()) as ModelInfoResponse;
    } catch {
      return null;
    }
  }

  /**
   * Fetches real dataset statistics from backend GET /dataset-info
   */
  async getDatasetInfo(): Promise<DatasetInfoResponse | null> {
    try {
      const response = await fetch(`${this.baseUrl}/dataset-info`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) return null;
      return (await response.json()) as DatasetInfoResponse;
    } catch {
      return null;
    }
  }
}

export const predictionApi = new PredictionApiService();
