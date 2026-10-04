export interface PredictionInputs {
  temperature: number;
  humidity: number;
  wind_speed: number;
  irradiation: number;
}

export interface PredictionResponse {
  prediction: number;
  unit: string;
  model: string;
  timestamp: string;
  input_summary: PredictionInputs;
}

export interface ApiHealthResponse {
  status: 'online' | 'offline';
  model_loaded: boolean;
  timestamp: string;
  version?: string;
}

export interface ModelInfoResponse {
  model: string;
  mae: number;
  r2_score: number;
  rmse: number;
  training_samples: number;
  total_records: number;
  feature_importances: Record<string, number>;
  features: string[];
  target_variable: string;
  dataset_name: string;
  collection_period: string;
}

export interface DatasetInfoResponse {
  dataset_name: string;
  total_records: number;
  plants: string[];
  target_variable: string;
  features_count: number;
  features: string[];
  collection_period: string;
}

export interface SavedPrediction {
  id: string;
  timestamp: string;
  inputs: PredictionInputs;
  prediction: number;
  unit: string;
  model: string;
}

export interface WhatIfScenario {
  name: string;
  inputs: PredictionInputs;
  result?: PredictionResponse;
  isLoading?: boolean;
  error?: string | null;
}
