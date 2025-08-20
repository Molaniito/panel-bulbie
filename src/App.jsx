import React, { useState } from 'react';
import Sidebar from './componentes/Sidebar';
import Header from './componentes/Header';
import Breadcrumb from './componentes/Breadcrumb';

// Importa todas las vistas
import VistaClassify from './componentes/Classify';
import VistaItems from './componentes/Items';
import VistaMatch from './componentes/Match';
import VistaMultipleChoice from './componentes/MultipleChoice';
import VistaVocabulary from './componentes/Vocabulary';
import VistaTag from './componentes/Tag';
import VistaGap from './componentes/Gap';
import Modal from './componentes/Modal';  

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const [vistaActiva, setVistaActiva] = useState('Vocabulary');

 

  const renderizarContenido = () => {
    switch (vistaActiva) {
      case 'Vocabulary':
        return <VistaVocabulary />;
      case 'Tag':
        return <VistaTag />;
      case 'Match':
        return <VistaMatch />;
      case 'MultipleChoice':
        return <VistaMultipleChoice />;
      case 'Items':
        return <VistaItems />;
      case 'Gap':
        return <VistaGap />;
      case 'Classify':
        return <VistaClassify />;
      default:
        return <div>Selecciona una opción del menú</div>;
    }
  };

  return (
    <div className="admin-panel">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        
        vistaActiva={vistaActiva}
        setVistaActiva={setVistaActiva}
      />

      <div className="main-content-wrapper">
        <Header />
        <Breadcrumb vistaActiva={vistaActiva} />
        <div className="content-scrollable">
          {renderizarContenido()}
        </div>
      </div>
    </div>
  );
}

export default App;
