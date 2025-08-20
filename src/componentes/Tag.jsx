import React, { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2, X } from 'lucide-react';

const VistaTag = () => {
  const [busqueda, setBusqueda] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoTag, setNuevoTag] = useState({
    image: '',
    writingFields: ['', '', '', '', ''],
    audio: ''
  });

  // Datos de prueba estáticos
  const [datosEjemplo, setDatosEjemplo] = useState([
    {
      id: 1,
      image: '📷',
      writingFields: [
        'The cat is sleeping.',
        'I like apples.',
        'Where is my book?',
        'She is running fast.',
        'We are at school.'
      ],
      audio: 'audio_cat_01.mp3'
    },
    {
      id: 2,
      image: '🎨',
      writingFields: [
        'He is drawing a tree.',
        'Open the window.',
        'This is my pencil.',
        'They are happy.',
        'Look at the stars.'
      ],
      audio: 'audio_art_02.mp3'
    }
  ]);

  // Manejar cambios en el modal
  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    if (name === 'writingFields' && index !== null) {
      const nuevasFields = [...nuevoTag.writingFields];
      nuevasFields[index] = value;
      setNuevoTag({ ...nuevoTag, writingFields: nuevasFields });
    } else {
      setNuevoTag({ ...nuevoTag, [name]: value });
    }
  };

  // Guardar nuevo registro
  const handleGuardar = () => {
    const nuevo = { ...nuevoTag, id: Date.now() };
    setDatosEjemplo([...datosEjemplo, nuevo]);
    setNuevoTag({ image: '', writingFields: ['', '', '', '', ''], audio: '' });
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
              placeholder="Buscar..."
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
              <th>Image</th>
              <th>WritingField 1</th>
              <th>WritingField 2</th>
              <th>WritingField 3</th>
              <th>WritingField 4</th>
              <th>WritingField 5</th>
              <th>Audio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datosEjemplo
              .filter((item) =>
                item.writingFields.some((w) =>
                  w.toLowerCase().includes(busqueda.toLowerCase())
                )
              )
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.image}</td>
                  {item.writingFields.map((text, index) => (
                    <td key={`field-${item.id}-${index}`}>{text}</td>
                  ))}
                  <td>{item.audio}</td>
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

            <h3 className="text-lg font-semibold mb-4">Agregar Tag</h3>

            <input
              type="text"
              name="image"
              placeholder="Image"
              value={nuevoTag.image}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            {nuevoTag.writingFields.map((field, index) => (
              <input
                key={index}
                type="text"
                name="writingFields"
                placeholder={`WritingField ${index + 1}`}
                value={field}
                onChange={(e) => handleChange(e, index)}
                className="border p-2 w-full mb-2"
              />
            ))}

            <input
              type="text"
              name="audio"
              placeholder="URL del audio"
              value={nuevoTag.audio}
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

export default VistaTag;
