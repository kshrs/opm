import React, { useState, useEffect } from 'react';


export default function TopBar() {
    const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
      const timer = setInterval(() =>  {
          setDateTime(new Date());
       }, 1000);

      return () => clearInterval(timer);
  }, []);


  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
        🏔️ Slope Stability Monitoring Dashboard
      </a>
      <span className="navbar-text">
      <b>Date:</b> {dateTime.toLocaleDateString()} <b>Time:</b> {dateTime.toLocaleTimeString()}
      {} <b><em>@ProjectBase</em></b>
      </span>
    </nav>
  );
}
