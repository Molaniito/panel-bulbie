import React, { useState } from 'react';
import { Edit, Trash2, Plus, Eye, Search, X } from 'lucide-react';

const VistaGap = ({
  clientesFiltrados = [],
  busqueda,
  setBusqueda,
  resultadosPorPagina,
  setResultadosPorPagina,
  alternarActivo
}) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevaFrase, setNuevaFrase] = useState({
    text1: '',
    word1: '',
    word2: '',
    word3: '',
    word4: ''
  });

  // Si no hay datos, usa los ejemplos
  const [datos, setDatos] = useState(
    clientesFiltrados.length > 0
      ? clientesFiltrados
      : [
          {
            id: 1,
            text1: 'La casa',
            word1: 'es',
            word2: 'muy',
            word3: 'grande',
            word4: 'y bonita'
          },
          {
            id: 2,
            text1: 'El perro',
            word1: 'corre',
            word2: 'rápido',
            word3: 'por',
            word4: 'el parque'
          },
          {
            id: 3,
            text1: 'Los niños',
            word1: 'juegan',
            word2: 'con',
            word3: 'sus',
            word4: 'amigos'
          }
        ]
  );

  // Manejar cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaFrase({ ...nuevaFrase, [name]: value });
  };

  // Guardar nueva frase
  const handleGuardar = () => {
    const nueva = { ...nuevaFrase, id: Date.now() };
    setDatos([...datos, nueva]);
    setNuevaFrase({
      text1: '',
      word1: '',
      word2: '',
      word3: '',
      word4: ''
    });
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
          <div className="busqueda">
            <Search size={16} />
            <input
              type="text"
              placeholder="Buscar frase"
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
              <th>Text 1</th>
              <th>Word 1</th>
              <th>Word 2</th>
              <th>Word 3</th>
              <th>Word 4</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((item) => (
              <tr key={item.id}>
                <td>{item.text1}</td>
                <td>{item.word1}</td>
                <td>{item.word2}</td>
                <td>{item.word3}</td>
                <td>{item.word4}</td>
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

            <h3 className="text-lg font-semibold mb-4">Agregar Frase</h3>

            <input
              type="text"
              name="text1"
              placeholder="Text 1"
              value={nuevaFrase.text1}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            <input
              type="text"
              name="word1"
              placeholder="Word 1"
              value={nuevaFrase.word1}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            <input
              type="text"
              name="word2"
              placeholder="Word 2"
              value={nuevaFrase.word2}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            <input
              type="text"
              name="word3"
              placeholder="Word 3"
              value={nuevaFrase.word3}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            <input
              type="text"
              name="word4"
              placeholder="Word 4"
              value={nuevaFrase.word4}
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

export default VistaGap;
