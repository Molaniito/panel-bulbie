import React from 'react';
import { User } from 'lucide-react'; 


const Header = () => {
  return (
    <header className="custom-header bg-gray-800 text-white p-4">
      <div className="header-container flex justify-between items-center">
        <div className="header-left">
          <h1 className="header-title text-xl font-bold">Administración</h1>
          <span className="header-subtitle text-sm">Panel de administrativa</span>
        </div>
        <div className="header-right flex items-center">
          <User size={24} className="mr-2" />
          <span className="header-role">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
