import React from 'react';
import TopBar from './components/TopBar';
import MapView from './components/MapView';
import PredictionForm from './components/PredictionForm';
import AlertForm from './components/AlertForm';
import ZoneCards from './components/ZoneCards';

export default function App() {
  return (
    <>
      <TopBar />
      <div className="container">
        <MapView />
        <PredictionForm />
        <AlertForm />
        <ZoneCards />
      </div>
    </>
  );
}
