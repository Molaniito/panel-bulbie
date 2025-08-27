import React, { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2, X } from 'lucide-react';
import Modal from "./Modal/Modal";
import ModalAgregarTag from "./Modal/ModalAgregarTag"

const VistaTag = () => {
  const [busqueda, setBusqueda] = useState("");
  const [ModalAgregarAbierto, setModalAgregarAbierto] = useState(false);
  const [ModalViewAbierto, setModalViewAbierto] = useState(false);
  const [ModalEliminarAbierto, setModalEliminarAbierto] = useState(false);
  const [ModalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  

  const abrirModalAgregar = () => {
    setModalAgregarAbierto(true);
  };

  const cerrarModalAgregar = () => {
    setModalAgregarAbierto(false);
  };

  const abrirModalView = (registro) => {
        setRegistroSeleccionado(registro);

    setModalViewAbierto(true);
  };

  const cerrarModalView = () => {
        setRegistroSeleccionado(null);

    setModalViewAbierto(false);
  };
  const abrirModalEliminar = (registro) => {
    setRegistroSeleccionado(registro);
    setModalEliminarAbierto(true);
  };  
  const cerrarModalEliminar = () => {
    setRegistroSeleccionado(null);
    setModalEliminarAbierto(false);
  };

  const abrirModalEditar = (registro) => {
            setRegistroSeleccionado(registro);

    setModalEditarAbierto(true);
  };
  const cerrarModalEditar = () => {
            setRegistroSeleccionado(null);

    setModalEditarAbierto(false);
  };

  

  // Datos de prueba estáticos
  const [datosEjemplo, setDatosEjemplo] = useState([
    {
      id: 1,
      image: "📷",
      writingFields: [
        "The cat is sleeping.",
        "I like apples.",
        "Where is my book?",
        "She is running fast.",
        "We are at school.",
      ],
      audio: "audio_cat_01.mp3",
    },
    {
      id: 2,
      image: "🎨",
      writingFields: [
        "He is drawing a tree.",
        "Open the window.",
        "This is my pencil.",
        "They are happy.",
        "Look at the stars.",
      ],
      audio: "audio_art_02.mp3",
    },
  ]);

  

  return (
    <div className="vista-cliente">
      {/* Controles superiores */}
      <div className="controles-superiores">
        <div className="acciones">
          <button
            type="button"
            className="btn agregar"
            onClick={abrirModalAgregar}
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
                    <button title="Ver" onClick={() => abrirModalView (item)}>
                    <Eye size={16} />
                  </button>
                  <button title="Editar" onClick={() => abrirModalEditar (item)}>
                    <Edit size={16} />
                  </button>
                  <button title="Eliminar" onClick={abrirModalEliminar}>
                    <Trash2 size={16} />
                  </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal Agregar Match */}
      {ModalAgregarAbierto && (
        <Modal onClose={cerrarModalAgregar} contenido={<ModalAgregarTag />} />
      )}

      {/* Modal Ver */}
      {ModalViewAbierto && registroSeleccionado && (
        <Modal
          onClose={cerrarModalView}
          contenido={
            <div>
              <h3>Vista Detallada Registro</h3>
              <p><b>Imagen:</b> {registroSeleccionado.image}</p>
              <p><b>WritingField 1:</b> {registroSeleccionado.writingFields[0]}</p>
              <p><b>WritingField 2:</b> {registroSeleccionado.writingFields[1]}</p>
              <p><b>WritingField 3:</b> {registroSeleccionado.writingFields[2]}</p>
              <p><b>WritingField 4:</b> {registroSeleccionado.writingFields[3]}</p>
              <p><b>WritingField 5:</b> {registroSeleccionado.writingFields[4]}</p>
              <p><b>Audio:</b></p>
              <audio controls src={registroSeleccionado.audio}></audio>      </div>
          }
        />
      )}
      {/* Modal Editar Match */}
      {ModalEditarAbierto && registroSeleccionado && (
  <Modal
    onClose={cerrarModalEditar}
    contenido={
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Registro actualizado ✅");

            cerrarModalEditar();
          const updated = {
            ...registroSeleccionado,
            image: e.target.image.value,
            writingFields: [
              e.target.w1.value,
              e.target.w2.value,
              e.target.w3.value,
              e.target.w4.value,
              e.target.w5.value,
            ],
            audio: e.target.audio.value,
          };

          setDatosEjemplo((prev) =>
            prev.map((item) =>
              item.id === registroSeleccionado.id ? updated : item
            )
          );

          cerrarModalEditar();
        }}
      >
        <h3>Editar Registro</h3>

        <label>
          Imagen:
          <input type="text" name="image" defaultValue={registroSeleccionado.image} />
        </label>

        <label>
          WritingField 1:
          <input type="text" name="w1" defaultValue={registroSeleccionado.writingFields[0]} />
        </label>

        <label>
          WritingField 2:
          <input type="text" name="w2" defaultValue={registroSeleccionado.writingFields[1]} />
        </label>

        <label>
          WritingField 3:
          <input type="text" name="w3" defaultValue={registroSeleccionado.writingFields[2]} />
        </label>

        <label>
          WritingField 4:
          <input type="text" name="w4" defaultValue={registroSeleccionado.writingFields[3]} />
        </label>

        <label>
          WritingField 5:
          <input type="text" name="w5" defaultValue={registroSeleccionado.writingFields[4]} />
        </label>

        <label>
                  {/* Audio */}
          <label className="block mb-2 font-semibold">Audio</label>
          <input
            type="file"
            name="audio"
            accept="audio/*"
            className="border p-2 w-full mb-4"
          />
              </label>

        <button type="submit">Guardar Cambios</button>
      </form>
    }
  />
)}

      {/* Modal Eliminar Match */}
       {ModalEliminarAbierto && registroSeleccionado && (
        <Modal
          onClose={cerrarModalEliminar}
          contenido={
            <div>
              <h3>¿Eliminar este registro?</h3>
              <p><b>{registroSeleccionado.id}</b></p>
              <button onClick={cerrarModalEliminar}>Cancelar</button>
              <button
                onClick={() => {
                  alert("Registro eliminado ✅");
                  cerrarModalEliminar();
                }}
              >
                Eliminar
              </button>
            </div>
          }
        />
      )}
    </div>
  );
};

export default VistaTag;
