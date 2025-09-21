// AppLayout.jsx
import React from 'react';
import TopBar from './TopBar';
import MapView from './MapView';
import PredictionForm from './PredictionForm'; // example right-side content
import ZoneCards from './ZoneCards';
import AlertForm from './AlertForm';

export default function AppLayout() {
  return (
    <div>
      <TopBar />
      <div className="cards-box">
        <ZoneCards />
      </div>
      <div className="main-layout">
        <div className="left-box">
          <MapView />
        </div>
        <div className="right-box">
          <PredictionForm />
        </div>
      </div>
      <div className="bottom-layout">
        <div className="alert-box">
          <AlertForm />
        </div>
      </div>
    </div>
  );
}
