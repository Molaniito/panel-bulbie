import React, { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2, X } from 'lucide-react';

const VistaClassify = ({
  clientesFiltrados,
  busqueda,
  setBusqueda,
  resultadosPorPagina,
  setResultadosPorPagina,
  alternarActivo
}) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevaCategoria, setNuevaCategoria] = useState({
    word1: '',
    word2: '',
    word3: '',
    elemento: ''
  });

  // Datos iniciales
  const [datos, setDatos] = useState([
    { id: 1, word1: 'manzana', word2: 'piña', word3: 'pera', element: 'frutas' },
    { id: 2, word1: 'calzones', word2: 'pantalón', word3: 'medias', element: 'ropa' },
    { id: 3, word1: 'iphone 11', word2: 'motorola', word3: 'xiaomi', element: 'celulares' }
  ]);

  // Manejo de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaCategoria({ ...nuevaCategoria, [name]: value });
  };

  // Guardar nueva categoría
  const handleGuardar = () => {
    const nueva = { ...nuevaCategoria, id: Date.now() };
    setDatos([...datos, nueva]);
    setNuevaCategoria({ word1: '', word2: '', word3: '', element: '' });
    setMostrarModal(false);
  };

  return (
    <div className="vista-cliente">
      {/* Controles superiores */}
      <div className="controles-superiores">
        <div className="acciones">
          <button
            type="button"
            className="btn agregar"
            onClick={() => setMostrarModal(true)}
          >
            <Plus size={16} /> AGREGAR NUEVO
          </button>
        </div>

        <div className="filtros">
          <div className="busqueda flex items-center gap-2">
            <Search size={16} />
            <input
              type="text"
              placeholder="Buscar categoría"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="tabla-container">
        <table className="tabla-clientes">
          <thead>
            <tr>
              <th>Word 1</th>
              <th>Word 2</th>
              <th>Word 3</th>
              <th>Element</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((item) => (
              <tr key={item.id}>
                <td>{item.word1}</td>
                <td>{item.word2}</td>
                <td>{item.word3}</td>
                <td>{item.element}</td>
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

      {/* Modal */}
      {mostrarModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={() => setMostrarModal(false)}
            >
              <X size={20} />
            </button>

            <h3 className="text-lg font-semibold mb-4">Agregar Categoría</h3>

            <input
              type="text"
              name="word1"
              placeholder="Word 1"
              value={nuevaCategoria.word1}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              name="word2"
              placeholder="Word 2"
              value={nuevaCategoria.word2}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              name="word3"
              placeholder="Word 3"
              value={nuevaCategoria.word3}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              name="elemento"
              placeholder="Element"
              value={nuevaCategoria.elemento}
              onChange={handleChange}
              className="border p-2 w-full mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setMostrarModal(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleGuardar}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VistaClassify;
