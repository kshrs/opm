import React, { useEffect } from 'react';
import L from 'leaflet';
import { bounds } from '../services/mapConfig';

export default function MapView() {
  useEffect(() => {
    const map = L.map('map').fitBounds(bounds);
    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    });
    const sat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '© Esri'
    });

    sat.addTo(map);
    L.control.layers({ 'Map': osm, 'Satellite': sat }).addTo(map);
  }, []);

  return <div id="map" />;
}
