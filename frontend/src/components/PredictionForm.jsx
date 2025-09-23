import React, { useState } from 'react';

import api from '../services/api';

export default function PredictionForm() {
  const [values, setValues] = useState({ 
      unitWeight: 18.74, 
      cohesion: 21.81, 
      frictionAngle: 38.24,
      slopeAngle: 41.90, 
      slopeHeight: 18.45, 
      porePressure: 0.84,
      reinforcementType: "Drainage",
  });
  const [result, setResult] = useState(null);

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  async function predict(e) {
    e.preventDefault()
    const formData = new FormData(e.target);

    const payload = {
        unitWeight: Number(formData.get("unitWeight")), 
        cohesion: Number(formData.get("cohesion")), 
        frictionAngle: Number(formData.get("frictionAngle")),
        slopeAngle: Number(formData.get("slopeAngle")), 
        slopeHeight: Number(formData.get("slopeHeight")), 
        porePressure: Number(formData.get("porePressure")),
        reinforcementType: Number(formData.get("reinforcementType")),
    }
    const res = await api.predict(payload);
    setResult(res.data);
  }

 // reusable props for numeric inputs
  return (
    <div className="card mb-3">
      <div className="card-header">Live Stability Prediction</div>
      <div className="card-body">
        <form onSubmit={predict}>
          <div className="mb-2">
            <label>Unit Weight (kN/m³)</label>
            <input type="number" name="unitWeight" value={values.unitWeight} onChange={handleChange} />
          </div>

          <div className="mb-2">
            <label>Cohesion (kPa)</label>
            <input type="number" name="cohesion" value={values.cohesion} onChange={handleChange} />
          </div>

          <div className="mb-2">
            <label>Internal Friction Angle (°)</label>
            <input type="number" name="frictionAngle" value={values.frictionAngle} onChange={handleChange} />
          </div>

          <div className="mb-2">
            <label>Slope Angle (°)</label>
            <input type="number" name="slopeAngle" value={values.slopeAngle} onChange={handleChange} />
          </div>

          <div className="mb-2">
            <label>Slope Height (m)</label>
            <input type="number" name="slopeHeight" value={values.slopeHeight} onChange={handleChange} />
          </div>

          <div className="mb-2">
            <label>Pore Water Pressure Ratio</label>
            <input type="number" name="porePressureRatio" value={values.porePressure} onChange={handleChange} />
          </div>

          <div className="mb-2">
            <label>Reinforcement Type</label>
            <select
              className="form-control"
              name="reinforcementType"
              value={values.reinforcementType}
              onChange={handleChange}
            >
              <option value="Drainage">Drainage</option>
              <option value="Geosynthetics">Geosynthetics</option>
              <option value="Retaining Wall">Retaining Wall</option>
              <option value="Soil Nailing">Soil Nailing</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Predict
          </button>
        </form>

        {result && (
          <div className={`alert mt-3 alert-${result.status.toLowerCase()}`}>
            <p>
              <strong>Status:</strong> <h4>{result.status}</h4>
            </p>
            <p>
              <strong>Safety Factor:</strong> {result.safety_factor}
            </p>
            <p>
              <strong>Risk:</strong> {result.risk_percentage}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
