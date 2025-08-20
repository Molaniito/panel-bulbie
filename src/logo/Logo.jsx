import React from 'react';
import voltageLogo from '../assets/Voltage.png'; // Ajusta la ruta según donde tengas la imagen

function Logo() {
  return (
    <div className="logo-container">
      <div className="logo-space has-logo">
        <img
          src={voltageLogo}
          alt=""
        />
      </div>
     
    </div>
  );
}

export default Logo;
