import React, { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2, MapPin } from 'lucide-react';
import Modal from "./Modal/Modal";

const VistaMatch = () => {
  const [busqueda, setBusqueda] = useState('');
   const [modalAbierto, setModalAbierto] = useState(false);

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);
  
const datosEjemplo = [
  {
    id: 1,
    imgs: ['🌳', '🚗', '🐶', '🍎', '📚'],
    words: ['Tree', 'Car', 'Dog', 'Apple', 'Book'],
    defs: [
      'A plant with leaves and branches',
      'A vehicle for transportation',
      'A domestic animal that barks',
      'A red or green fruit',
      'Something you read'
    ]
  },
  {
    id: 2,
    imgs: ['🏠', '✈️', '🐱', '🍕', '🎵'],
    words: ['House', 'Airplane', 'Cat', 'Pizza', 'Music'],
    defs: [
      'A place where people live',
      'A flying vehicle for travel',
      'A domestic animal that meows',
      'An Italian dish with cheese and toppings',
      'Art made of sound and rhythm'
    ]
  }
];


  // Filtrar datos según la búsqueda (por palabra)
  const datosFiltrados = datosEjemplo.map(fila => ({
    ...fila,
    words: fila.words.filter(word =>
      word.toLowerCase().includes(busqueda.toLowerCase())
    )
  }));

  return (
    <div className="vista-direccion">
      {/* Encabezado */}
      <div className="encabezado-direccion">
        <MapPin size={24} className="icono-direccion" />
        <h2 className="titulo-direccion">Gestión de Matching</h2>
      </div>

      {/* Controles superiores */}
      <div className="controles-superiores">
        <div className="acciones">
          <button type="button" className="btn agregar">
            <Plus size={16} /> AGREGAR NUEVO
          </button>
        </div>

        {/* Búsqueda */}
        <div className="filtros">
          <div className="busqueda">
            <Search size={16} />
            <input
              type="text"
              placeholder="Buscar palabra (word)"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="contenedor-tabla">
        <table className="tabla-clientes">
          <thead>
            <tr>
              <th>img 1</th>
              <th>img 2</th>
              <th>img 3</th>
              <th>img 4</th>
              <th>img 5</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datosFiltrados.map((fila) => (
              <tr key={fila.id}>
                {fila.imgs.map((img, index) => (
                  <td key={`img-${index}`}>
                    <button onClick={() => abrirModal()}>{img}</button>
                  </td>
                ))}
            
                <td>
                  <button title="Ver"><Eye size={16} /></button>
                  <button title="Editar"><Edit size={16} /></button>
                  <button title="Eliminar"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      
      {modalAbierto && <Modal onClose={cerrarModal} />}
    </div>
    
  );
};


export default VistaMatch;
