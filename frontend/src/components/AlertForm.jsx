import React, { useState } from 'react';
import api from '../services/api';

export default function AlertForm() {
  const [message, setMessage] = useState('');
  const [methods, setMethods] = useState({ sms: true, email: true });


  // Keywords (with initial values)
  const [keywords, setKeywords] = useState({
    location: "Open Pit North",
    safetyFactor: "0.95",
    musterPoint: "Muster Point B (South Ridge)",
    contact: "Rajesh Kumar",
    contactNumber: "+91 9876543210",
  });


  function toggleMethod(name) {
    setMethods({ ...methods, [name]: !methods[name] });
  }

  const { location, safetyFactor, musterPoint, contact, contactNumber } = keywords;

  async function send() {
    const selected = Object.keys(methods).filter(m => methods[m]);
    const payload = {
        message: message,
        method: selected,
    }
    await api.sendAlert(payload);
    setMessage("");
  }

  async function placeAlertText() {
    const now = new Date().toLocaleString("en-IN", {
        dateStyle: "full",
        timeStyle: "long",
    });
    const urgentMessage = `URGENT SAFETY ALERT
    
     Location: ${location} is now unstable (Safety Factor: ${safetyFactor}).
    
     All personnel must evacuate IMMEDIATELY.
     Proceed to the next stage position: Muster Point B (South Ridge).
     Await further instructions there.
    
     Time: ${now}.
     Contact Mine Planner ${contact} at ${contactNumber} for queries.`;
      setMessage(urgentMessage);
  }

  async function clearAlertText() {
      setMessage("");
  }
   
  // Update keyword values dynamically
  function handleKeywordChange(e) {
    setKeywords({ ...keywords, [e.target.name]: e.target.value });
  }

return (
    <div className="card mb-3">
      <div className="card-header">🚨 Send Alert</div>
      <div className="card-body">
        {/* Keyword form */}
    <label>Location: </label>
        <div className="mb-3">
          <input
            className="form-control mb-2"
            type="text"
            name="location"
            value={keywords.location}
            onChange={handleKeywordChange}
            placeholder="Location"
          />
    <label>Safety Factor: </label>
          <input
            className="form-control mb-2"
            type="text"
            name="safetyFactor"
            value={keywords.safetyFactor}
            onChange={handleKeywordChange}
            placeholder="Safety Factor"
          />
    <label>Muster Point: </label>
          <input
            className="form-control mb-2"
            type="text"
            name="musterPoint"
            value={keywords.musterPoint}
            onChange={handleKeywordChange}
            placeholder="Muster Point"
          />
    <label>Contact Person: </label>
          <input
            className="form-control mb-2"
            type="text"
            name="contact"
            value={keywords.contact}
            onChange={handleKeywordChange}
            placeholder="Contact Person"
          />
    <label>Contact Number: </label>
          <input
            className="form-control mb-2"
            type="text"
            name="contactNumber"
            value={keywords.contactNumber}
            onChange={handleKeywordChange}
            placeholder="Contact Number"
          />
        </div>

        <a onClick={placeAlertText} className="btn btn-danger ml-1 mb-1">
          Generate Urgent Message
        </a>
        <a onClick={clearAlertText} className="btn btn-secondary ml-1 mb-1 float-end">
          Clear Alert Message
        </a>

        <textarea
          className="form-control mb-2"
          placeholder="Alert message"
          style= {{height: "200px"}}
          value={message}
          onChange={e => setMessage(e.target.value)}
        />

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="sms"
            checked={methods.sms}
            onChange={() => toggleMethod('sms')}
          />
          <label className="form-check-label" htmlFor="sms">SMS</label>
        </div>
        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="email"
            checked={methods.email}
            onChange={() => toggleMethod('email')}
          />
          <label className="form-check-label" htmlFor="email">Email</label>
        </div>

        <button className="btn btn-danger w-100" onClick={send}>
          Send Alert
        </button>

      </div>
   
    </div>
  );
}
