import React, { useState, useRef, useEffect } from "react";
import L from "leaflet";
import { bounds_nlc, bounds_agucha } from "../services/mapConfig"; 

export default function MapView() {
  const mapRef = useRef(null);
  const [area, setArea] = useState("agucha"); // Default Agucha

  // Custom Markers
  const redMarkerIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],     // size of the icon
    iconAnchor: [12, 41],   // point of the icon which will correspond to marker's location
    popupAnchor: [1, -34],  // point from which the popup should open relative to the iconAnchor
    shadowSize: [41, 41]    // size of the shadow
  });

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

    const pit_north = L.marker([25.83844516568047, 74.7434835332167], { icon: redMarkerIcon }).bindPopup("Open Pit North"),
          pit_south = L.marker([25.82623905266493, 74.73764704656307], { icon: redMarkerIcon }).bindPopup("Open Pit South"),
          pit_deep  = L.marker([25.834273597713928, 74.74421309402399], { icon: redMarkerIcon }).bindPopup("Open Pit Underground Access");

      const markers = L.layerGroup([pit_north, pit_south, pit_deep]);



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

    markers.addTo(map)

    L.control.layers({ Map: osm, Satellite: sat }, { Contour: contourLayer, Markers: markers}).addTo(map);

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
