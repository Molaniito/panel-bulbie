import React from 'react';
import { Home } from 'lucide-react';

const Breadcrumb = ({ vistaActiva }) => {
  return (
    <nav aria-label="breadcrumb" className="breadcrumb-nav">
      <div className="breadcrumb-container">
        <Home size={16} aria-hidden="true" />
        <span>/</span>
        <span>{vistaActiva}</span>
      </div>
    </nav>
  );
};

export default Breadcrumb;
