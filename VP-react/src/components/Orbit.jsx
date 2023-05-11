import React from 'react';
import './Orbit.css';

export const Orbit = () => {
  return (
    <div className='orbit-component'>
      <div className="container">
        <div className="sun"></div>
        <div className="earth">
          <div className="moon"></div>
        </div>
      </div>
    </div>
  );
}

