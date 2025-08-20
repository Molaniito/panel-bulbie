import React, { useState } from 'react';
import { Globe, Plus, Search, Eye, Edit, Trash2, X } from 'lucide-react';

const VistaVocabulary = () => {
  const [busqueda, setBusqueda] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevaPregunta, setNuevaPregunta] = useState({
    pregunta: '',
    opcion1: '',
    opcion2: '',
    opcion3: '',
    correcta: '',
    audio: ''
  });

  const datosEjemplo = [
    {
      id: 1,
      objectName: 'Apple',
      ipa: '/ˈæp.əl/',
      description: 'A round fruit with red or green skin.',
      image: '🍎',
      audio: 'apple_audio.mp3',
      level: 'Beginner',
      subLevel: '1A'
    },
    {
      id: 2,
      objectName: 'Dog',
      ipa: '/dɔːɡ/',
      description: 'A domesticated animal that barks.',
      image: '🐶',
      audio: 'dog_audio.mp3',
      level: 'Beginner',
      subLevel: '1B'
    },
    {
      id: 3,
      objectName: 'Book',
      ipa: '/bʊk/',
      description: 'A set of pages with written content.',
      image: '📚',
      audio: 'book_audio.mp3',
      level: 'Intermediate',
      subLevel: '2A'
    }
  ];

  // Filtrar por nombre
  const datosFiltrados = datosEjemplo.filter((item) =>
    item.objectName.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Manejar cambios en inputs del modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaPregunta((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardar = () => {
    console.log('Nueva pregunta guardada:', nuevaPregunta);
    setMostrarModal(false);
  };

  return (
    <div className="vista-ciudad">
      {/* Encabezado */}
      <div className="encabezado">
        <Globe size={24} className="icono-globo" />
        <h2 className="titulo">Vocabulary</h2>
      </div>

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
              placeholder="Buscar por nombre..."
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
              <th>ObjectName</th>
              <th>IPA</th>
              <th>Description</th>
              <th>Image</th>
              <th>Audio</th>
              <th>Level</th>
              <th>SubLevel</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datosFiltrados.map((item) => (
              <tr key={item.id}>
                <td>{item.objectName}</td>
                <td>{item.ipa}</td>
                <td>{item.description}</td>
                <td>{item.image}</td>
                <td>
                  <audio controls src={item.audio}>
                    Tu navegador no soporta audio.
                  </audio>
                </td>
                <td>{item.level}</td>
                <td>{item.subLevel}</td>
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

            <h3 className="text-lg font-semibold mb-4">Agregar Pregunta</h3>

            <input
              type="text"
              name="pregunta"
              placeholder="ObjectName"
              value={nuevaPregunta.pregunta}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              name="opcion1"
              placeholder="IPA"
              value={nuevaPregunta.opcion1}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              name="opcion2"
              placeholder="Description"
              value={nuevaPregunta.opcion2}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              name="opcion3"
              placeholder="Image"
              value={nuevaPregunta.opcion3}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />
             <input
              type="text"
              name="audio"
              placeholder="URL del audio Audio"
              value={nuevaPregunta.audio}
              onChange={handleChange}
              className="border p-2 w-full mb-4"
            />

             <input
              type="text"
              name="correcta"
              placeholder="Level  "
              value={nuevaPregunta.correcta}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />
              <input
              type="text"
              name="correcta"
              placeholder="SubLevel"  
              value={nuevaPregunta.correcta}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
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

export default VistaVocabulary;
