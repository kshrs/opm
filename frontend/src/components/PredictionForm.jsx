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
  const modelScriptHTML = '/assets/SlopeStabilityMLSpecification.html'
  const modelScriptPDF = '/assets/SlopeStabilityScript.ipynb'


 // reusable props for numeric inputs
  return (
    <div className="card mb-3">
      <div className="card-header">Live Stability Prediction</div>
      <div className="card-body">
        <form onSubmit={predict}>
            <a href={modelScriptHTML} className="btn btn-primary m-1">Model Training Report</a>
            <a href={modelScriptPDF} className="btn btn-primary m-1">Download Current Model Script</a>
            
            
      <div className="row m-2">
          <label className="col-4 col-form-label">Unit Weight (kN/m³)</label>
          <div className="col-3 w-auto">
            <input className="form-control shadow-none" type="number" name="unitWeight" value={values.unitWeight} onChange={handleChange} />
          </div>
     </div>

      <div className="row m-2">
          <label className="col-4 col-form-label">Cohesion (kPa)</label>
          <div className="col-3 w-auto">
            <input className="form-control shadow-none" type="number" name="cohesion" value={values.cohesion} onChange={handleChange} />
          </div>
      </div>

      <div className="row m-2">
          <label className="col-4 col-form-label">Internal Friction Angle (°)</label>
          <div className="col-3 w-auto">
            <input className="form-control shadow-none" type="number" name="frictionAngle" value={values.frictionAngle} onChange={handleChange} />
          </div>
      </div>

      <div className="row m-2">
          <label className="col-4 col-form-label">Slope Angle (°)</label>
          <div className="col-3 w-auto">
            <input className="form-control shadow-none" type="number" name="slopeAngle" value={values.slopeAngle} onChange={handleChange} />
          </div>
      </div>

      <div className="row m-2">
          <label className="col-4 col-form-label">Slope Height (m)</label>
          <div className="col-3 w-auto">
            <input className="form-control shadow-none" type="number" name="slopeHeight" value={values.slopeHeight} onChange={handleChange} />
          </div>
      </div>

      <div className="row m-2">
          <label className="col-4 col-form-label">Pore Water Pressure Ratio</label>
          <div className="col-3 w-auto">
            <input className="form-control shadow-none" type="number" name="porePressure" value={values.porePressure} onChange={handleChange} />
          </div>
      </div>

      <div className="row m-2">
          <label className="col-4 col-form-layout">Reinforcement Type</label>
          <div className="col-3 w-auto">
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
