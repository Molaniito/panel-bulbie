// src/componentes/Sidebar.jsx
import React from 'react';
import Logo from '../logo/Logo';
import {
  BookText, Tags, Shuffle, ListChecks, FileText, LayoutList, FolderKanban,
  X, Menu, Filter, RotateCcw
} from 'lucide-react';

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  filtros,
  setFiltros,
  mostrarFiltros,
  setMostrarFiltros,
  limpiarFiltros,
  vistaActiva,
  setVistaActiva
}) => {
  const menuItems = [
    { icon: BookText, label: 'Vocabulary' },
    { icon: Tags, label: 'Tag' },
    { icon: Shuffle, label: 'Match' },
    { icon: ListChecks, label: 'MultipleChoice' },
    { icon: FileText, label: 'Items' },
    { icon: LayoutList, label: 'Gap' },
    { icon: FolderKanban, label: 'Classify' }
  ];

  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
      <div className="sidebar-header">
        <div className="sidebar-header-inner">
          {sidebarOpen && (
            <>
              <Logo />
              <div className="brand">
                <p className="subtitle">Admin</p>
              </div>
            </>
          )}
          
        </div>
      </div>

     
      {sidebarOpen && (
        <div className="sidebar-menu">
          <h3>Panel Administrativo</h3>
          <nav>
            {menuItems.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setVistaActiva(item.label)}
                className={`menu-item ${vistaActiva === item.label ? 'active' : ''}`}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
