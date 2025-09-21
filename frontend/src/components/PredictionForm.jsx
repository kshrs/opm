import React, { useState } from 'react';

import api from '../services/api';

export default function PredictionForm() {
  const [values, setValues] = useState({ strain: 150, porePressure: 100, inclination: 2, vibration: 0.05 });
  const [result, setResult] = useState(null);

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: Number(e.target.value) });
  }

  async function predict(e) {
    e.preventDefault()
    const formData = new FormData(e.target);

    const payload = {
        strain: Number(formData.get("strain")),
        porePressure: Number(formData.get("porePressure")),
        inclination: Number(formData.get("inclination")),
        vibration: Number(formData.get("vibration")),
    }
    const res = await api.predict(payload);
    setResult(res.data);
  }

 return (
    <div className="card mb-3">
      <div className="card-header">🔮 Live Stability Prediction</div>
      <div className="card-body">
        <form onSubmit={predict}>
          <div className="mb-2">
            <label>Strain (μɛ)</label>
            <input type="number" className="form-control" name="strain" value={values.strain} onChange={handleChange} />
          </div>
          <div className="mb-2">
            <label>Pore Pressure (kPa)</label>
            <input type="number" className="form-control" name="porePressure" value={values.porePressure} onChange={handleChange} />
          </div>
          <div className="mb-2">
            <label>Inclination (°)</label>
            <input type="number" className="form-control" name="inclination" value={values.inclination} onChange={handleChange} />
          </div>
          <div className="mb-2">
            <label>Vibration (g)</label>
            <input type="number" className="form-control" name="vibration" value={values.vibration} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary w-100">Predict</button>
        </form>

        {result && (
          <div className={`alert mt-3 alert-${result.status.toLowerCase()}`}>
            <p><strong>Status:</strong> {result.status}</p>
            <p><strong>Safety Factor:</strong> {result.safety_factor}</p>
            <p><strong>Risk:</strong> {result.risk_percentage}%</p>
          </div>
        )}
      </div>
    </div>
  );
}
