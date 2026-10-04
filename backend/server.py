import os
import json
import pickle
import datetime
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# Determine paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'solar_model.pkl')
INFO_PATH = os.path.join(os.path.dirname(__file__), 'model_info.json')

app = FastAPI(
    title="SolarPulse AI - ML REST API",
    description="Backend API serving real Random Forest predictions for solar power generation.",
    version="1.0.0"
)

# Enable CORS for React frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = None
model_info_data = None

def load_or_train_model():
    global model, model_info_data
    if os.path.exists(MODEL_PATH) and os.path.exists(INFO_PATH):
        try:
            with open(MODEL_PATH, 'rb') as f:
                model = pickle.load(f)
            with open(INFO_PATH, 'r') as f:
                model_info_data = json.load(f)
            print("[SolarPulse ML] Model and info loaded successfully from pickle!")
            return
        except Exception as e:
            print(f"[SolarPulse ML] Error loading saved model: {e}. Retraining...")
    
    # Train if not present
    from train import train_and_save
    model, model_info_data = train_and_save()

@app.on_event("startup")
def startup_event():
    load_or_train_model()

class PredictRequest(BaseModel):
    temperature: float = Field(..., ge=-20.0, le=70.0, description="Ambient Temperature in °C")
    humidity: float = Field(..., ge=0.0, le=100.0, description="Relative Humidity in %")
    wind_speed: float = Field(..., ge=0.0, le=50.0, description="Wind Speed in m/s")
    irradiation: float = Field(..., ge=0.0, le=2000.0, description="Solar Irradiation in W/m²")

@app.get("/health")
@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "model_loaded": model is not None,
        "timestamp": datetime.datetime.utcnow().isoformat() + "Z",
        "version": "1.0.0"
    }

@app.get("/model-info")
@app.get("/api/model-info")
def get_model_info():
    if model_info_data is None:
        raise HTTPException(status_code=503, detail="Model info not initialized")
    return model_info_data

@app.get("/dataset-info")
@app.get("/api/dataset-info")
def get_dataset_info():
    if model_info_data is None:
        raise HTTPException(status_code=503, detail="Dataset info not initialized")
    return {
        "dataset_name": model_info_data.get("dataset_name", "Plant 1 Generation & Weather Sensor Data"),
        "total_records": model_info_data.get("total_records", 68774),
        "plants": ["Plant 1 (Gandhinagar)", "Plant 2 (Rajasthan)"],
        "target_variable": model_info_data.get("target_variable", "AC Power (kW)"),
        "features_count": len(model_info_data.get("features", [])),
        "features": model_info_data.get("features", []),
        "collection_period": model_info_data.get("collection_period", "May 15, 2020 – June 17, 2020")
    }

@app.post("/predict")
@app.post("/api/predict")
def predict_power(req: PredictRequest):
    if model is None:
        raise HTTPException(status_code=503, detail="ML prediction service is currently unavailable.")
    
    try:
        # Features order: ['AMBIENT_TEMPERATURE', 'humidity', 'wind_speed', 'irradiation_w']
        input_features = [[req.temperature, req.humidity, req.wind_speed, req.irradiation]]
        raw_prediction = float(model.predict(input_features)[0])
        # Solar panels cannot generate negative power; clamp at 0.0
        predicted_power = max(0.0, round(raw_prediction, 2))

        return {
            "prediction": predicted_power,
            "unit": "kW",
            "model": "Random Forest Regressor",
            "timestamp": datetime.datetime.utcnow().isoformat() + "Z",
            "input_summary": {
                "temperature": req.temperature,
                "humidity": req.humidity,
                "wind_speed": req.wind_speed,
                "irradiation": req.irradiation
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
