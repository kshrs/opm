import React, { useState } from 'react';
import api from '../services/api';

export default function AlertForm() {
  const [message, setMessage] = useState('');
  const [methods, setMethods] = useState({ sms: true, email: true });

  function toggleMethod(name) {
    setMethods({ ...methods, [name]: !methods[name] });
  }

  function send() {
    const selected = Object.keys(methods).filter(m => methods[m]);
    const payload = {
      message : message,
      method : selected
    }

    api.sendAlert(payload);
    alert('Sent via ' + selected.join(', '));
  }

  return (
    <div className="card mb-3">
      <div className="card-header">🚨 Send Alert</div>
      <div className="card-body">
        <textarea
          className="form-control mb-2"
          placeholder="Alert message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="sms" checked={methods.sms} onChange={() => toggleMethod('sms')} />
          <label className="form-check-label" htmlFor="sms">SMS</label>
        </div>
        <div className="form-check mb-2">
          <input className="form-check-input" type="checkbox" id="email" checked={methods.email} onChange={() => toggleMethod('email')} />
          <label className="form-check-label" htmlFor="email">Email</label>
        </div>
        <button className="btn btn-danger w-100" onClick={send}>Send Alert</button>
      </div>
    </div>
  );
}
