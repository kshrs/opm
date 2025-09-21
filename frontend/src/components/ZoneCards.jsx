import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function ZoneCards() {
  const [zones, setZones] = useState([]);


  useEffect(() => {
    api.getLocations()
      .then(res => setZones(res.data.locations))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="row zone-cards">
      {zones.map(z => (
        <div className="col-md-4" key={z.name}>
          <div className="card sensor-card">
            <div className={`card-header alert-${z.alert_priority === 3 ? 'critical' : z.alert_priority === 2 ? 'warning' : z.alert_priority === 1 ? 'caution' : 'stable'}`}>
              {z.name}
            </div>
            <div className="card-body">
              <span className={`status-badge alert-${z.alert_priority === 3 ? 'critical' : z.alert_priority === 2 ? 'warning' : z.alert_priority === 1 ? 'caution' : 'stable'}`}>
                {z.stability_status}
              </span>
              <p><strong>Safety Factor:</strong> {z.safety_factor}</p>
              <p><strong>Elevation:</strong> {z.elevation}m</p>
              <p><strong>Sensors:</strong> {z.sensors_online}/{z.sensors_count}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
