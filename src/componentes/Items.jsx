import React, { useState } from 'react';
import { Settings, Edit, Trash2, Plus, X, Eye} from 'lucide-react';

const VistaItems = () => {
  const [preguntas, setPreguntas] = useState([
    {
      pregunta: '¿Cuál es la capital de Colombia?',
      opcion1: 'Medellín',
      opcion2: 'Bogotá',
      opcion3: 'Cali',
      correcta: 'Bogotá',
      audio: 'audio1.mp3'
    },
    {
      pregunta: '¿Qué idioma se habla en Brasil?',
      opcion1: 'Portugués',
      opcion2: 'Español',
      opcion3: 'Inglés',
      correcta: 'Portugués',
      audio: 'audio2.mp3'
    }
  ]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevaPregunta, setNuevaPregunta] = useState({
    pregunta: '',
    opcion1: '',
    opcion2: '',
    opcion3: '',
    correcta: '',
    audio: ''
  });

  // Manejar inputs
  const handleChange = (e) => {
    setNuevaPregunta({ ...nuevaPregunta, [e.target.name]: e.target.value });
  };

  // Guardar nueva pregunta
  const handleGuardar = () => {
    setPreguntas([...preguntas, nuevaPregunta]);
    setNuevaPregunta({ pregunta: '', opcion1: '', opcion2: '', opcion3: '', correcta: '', audio: '' });
    setMostrarModal(false);
  };

  return (
    <div className="vista-items">
      {/* Encabezado */}
      <div className="vista-items-encabezado flex items-center gap-3">
        <Settings size={24} className="icono-configuracion" />
        <h2 className="titulo-items">Configuración de Ejercicio</h2>

        {/* Botón agregar nuevo */}
        <button
          type="button"
          className="btn agregar flex items-center gap-1 ml-4"
          onClick={() => setMostrarModal(true)}
        >
          <Plus size={16} /> AGREGAR NUEVO
        </button>
      </div>

      {/* Tabla de preguntas */}
      <div className="tabla-container">
        <h3 className="subtitulo-formulario">Listado de Preguntas</h3>
        <table className="tabla-preguntas">
          <thead>
            <tr>
              <th>Pregunta</th>
              <th>Opción 1</th>
              <th>Opción 2</th>
              <th>Opción 3</th>
              <th>Respuesta Correcta</th>
              <th>Audio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {preguntas.map((item, index) => (
              <tr key={index}>
                <td>{item.pregunta}</td>
                <td>{item.opcion1}</td>
                <td>{item.opcion2}</td>
                <td>{item.opcion3}</td>
                <td>{item.correcta}</td>
                <td>
                  {item.audio ? (
                    <audio controls src={item.audio}>
                      Tu navegador no soporta audio.
                    </audio>
                  ) : (
                    'Sin audio'
                  )}
                </td>
                <td className="acciones">
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
              placeholder="Pregunta"
              value={nuevaPregunta.pregunta}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              name="opcion1"
              placeholder="Opción 1"
              value={nuevaPregunta.opcion1}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              name="opcion2"
              placeholder="Opción 2"
              value={nuevaPregunta.opcion2}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              name="opcion3"
              placeholder="Opción 3"
              value={nuevaPregunta.opcion3}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              name="correcta"
              placeholder="Respuesta Correcta"
              value={nuevaPregunta.correcta}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              name="audio"
              placeholder="URL del audio (opcional)"
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

export default VistaItems;
