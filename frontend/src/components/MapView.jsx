import React, { useState, useRef, useEffect } from "react";
import L from "leaflet";
import { bounds_nlc, bounds_agucha } from "../services/mapConfig"; 

export default function MapView() {
  const mapRef = useRef(null);
  const [area, setArea] = useState("agucha"); // Default Agucha

  useEffect(() => {
    const map = L.map("map").fitBounds(bounds_agucha);
    mapRef.current = map; // Store the current map instance

    const osm = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution: "© OpenStreetMap contributors",
      }
    );

    const sat = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: "© Esri",
      }
    );

    const contourLayer = L.layerGroup();

    sat.addTo(map);

    fetch("/assets/NLC.geojson") 
      .then((response) => response.json())
      .then((data) => {
        L.geoJSON(data, {
          style: (feature) => ({
            color: "#88ffff", // contour color
            weight: 2,
          }),
        }).addTo(contourLayer);
      })
      .catch((err) => console.error("Error loading GeoJSON:", err));

    fetch("/assets/Agucha.geojson") 
      .then((response) => response.json())
      .then((data) => {
        L.geoJSON(data, {
          style: (feature) => ({
            color: "#88ffff", // contour color
            weight: 2,
          }),
        }).addTo(contourLayer);
      })
      .catch((err) => console.error("Error loading GeoJSON:", err));

    contourLayer.addTo(map)

    L.control.layers({ Map: osm, Satellite: sat }, { Contour: contourLayer }).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  // Change Map site dynamically when the area variable changes
  useEffect(() => {
      if (mapRef.current) {
          if (area === "nlc") mapRef.current.fitBounds(bounds_nlc);
          if (area === "agucha") mapRef.current.fitBounds(bounds_agucha);
      }
  }, [area]);

  return (
      <>
      <select className="form-select border-2 shadow-none mb-3 w-25" onChange={e => setArea(e.target.value)}>
        <option value="agucha">Agucha</option>
        <option value="nlc">Neyveli</option>
      </select>
      <div id="map" />
      </>
  );
}
