import React, { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2, X } from 'lucide-react';

const VistaMultiplChoice = ({
  clientesFiltrados = [],
  busqueda,
  setBusqueda,
  resultadosPorPagina,
  setResultadosPorPagina,
  alternarActivo
}) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevaPregunta, setNuevaPregunta] = useState({
    instruction: '',
    text: '',
    items: ['',],
    level: '',
    skill: '',
    audio: ''
  });

  // Datos de ejemplo si clientesFiltrados está vacío
  const [datos, setDatos] = useState(
    clientesFiltrados.length > 0
      ? clientesFiltrados
      : [
          {
            id: 1,
            instruction: 'Selecciona la opción correcta',
            text: 'What is the capital of France?',
            items: ['Paris', 'London', 'Madrid', 'Berlin'],
            level: 'A2',
            skill: 'Reading',
            audio: 'audio1.mp3'
          },
          {
            id: 2,
            instruction: 'Escoge la respuesta adecuada',
            text: 'She _____ to the gym every day.',
            items: ['go', 'goes', 'going', 'gone'],
            level: 'B1',
            skill: 'Grammar',
            audio: 'audio2.mp3'
          }
        ]
  );

  // Manejar cambios en inputs
  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    if (name === 'items' && index !== null) {
      const nuevosItems = [...nuevaPregunta.items];
      nuevosItems[index] = value;
      setNuevaPregunta({ ...nuevaPregunta, items: nuevosItems });
    } else {
      setNuevaPregunta({ ...nuevaPregunta, [name]: value });
    }
  };

  // Guardar nueva pregunta
  const handleGuardar = () => {
    const nueva = { ...nuevaPregunta, id: Date.now() };
    setDatos([...datos, nueva]);
    setNuevaPregunta({
      instruction: '',
      text: '',
      items: ['', '', '', ''],
      level: '',
      skill: '',
      audio: ''
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
              placeholder="Buscar pregunta"
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
              <th>Instruction</th>
              <th>Text</th>
              <th>Items</th>
              <th>Level</th>
              <th>Skill</th>
              <th>Audio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((pregunta) => (
              <tr key={pregunta.id}>
                <td>{pregunta.instruction}</td>
                <td>{pregunta.text}</td>
                <td>
                  <ul>
                    {pregunta.items
                      .filter((item) => item.trim() !== '') // 🔥 evita que salgan vacíos
                      .map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                  </ul>
                </td>
                <td>{pregunta.level}</td>
                <td>{pregunta.skill}</td>
                <td>
                  <a
                    href={`/${pregunta.audio}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {pregunta.audio}
                  </a>
                </td>
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
              name="instruction"
              placeholder="Instruction"
              value={nuevaPregunta.instruction}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            <input
              type="text"
              name="text"
              placeholder="Text"
              value={nuevaPregunta.text}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            {nuevaPregunta.items.map((item, index) => (
              <input
                key={index}
                type="text"
                name="items"
                placeholder={`Opción ${index + 1}`} // ✅ solo se muestra en el input
                value={item}
                onChange={(e) => handleChange(e, index)}
                className="border p-2 w-full mb-2"
              />
            ))}

            <input
              type="text"
              name="level"
              placeholder="Level"
              value={nuevaPregunta.level}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            <input
              type="text"
              name="skill"
              placeholder="Skill"
              value={nuevaPregunta.skill}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            <input
              type="text"
              name="audio"
              placeholder="URL del audio"
              value={nuevaPregunta.audio}
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

export default VistaMultiplChoice;
