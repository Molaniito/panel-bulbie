import React, { useState } from 'react';
import { Settings, Edit, Trash2, Plus, X, Eye} from 'lucide-react';
import Modal from "./Modal/Modal";
import ModalAgregarItem from "./Modal/ModalAgregarItems"

const VistaItems = () => {
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

  const [preguntas, setPreguntas] = useState([
    {
      pregunta: "¿Does she go to Gym?",
      opcion1: "Yes",
      opcion2: "No",
      opcion3: "False",
      correcta: "Yes",
      audio: "audio1.mp3",
    },
    {
      pregunta: "¿What Language is spoken in Brazil?",
      opcion1: "Portuguese",
      opcion2: "Spanish",
      opcion3: "English",
      correcta: "Portuguese",
      audio: "audio2.mp3",
    },
  ]);


  return (
    <div className="vista-items">
      {/* Encabezado */}
      {/* Botón agregar nuevo */}
      <button
        type="button"
        className="btn agregar flex items-center gap-1 ml-4"
        onClick={abrirModalAgregar}
      >
        <Plus size={16} /> AGREGAR NUEVO
      </button>
      <div className="vista-items-encabezado flex items-center gap-3"></div>

      {/* Tabla de preguntas */}
      <div className="tabla-container">
        <h3 className="subtitulo-formulario">Listado de Preguntas</h3>
        <table className="tabla-preguntas">
          <thead>
            <tr>
              <th>Pregunta</th>
              <th>option 1</th>
              <th>option 2</th>
              <th>option 3</th>
              <th>correct answer</th>
              <th>Audio</th>
              <th>Actions</th>
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
                    "Sin audio"
                  )}
                </td>
                <td className="acciones">
                  <button title="Ver" onClick={() => abrirModalView (item)}>
                    <Eye size={16} />
                  </button>
                  <button title="Editar" onClick={() => abrirModalEditar (item)}>
                    <Edit size={16} />
                  </button>
                  <button title="Eliminar" onClick={() => abrirModalEliminar (item)}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Agregar Item */}
      {ModalAgregarAbierto && (
        <Modal onClose={cerrarModalAgregar} contenido={<ModalAgregarItem />} />
      )}

      {/* Modal View Item */}
      {ModalViewAbierto && registroSeleccionado && (
        <Modal
          onClose={cerrarModalView}
          contenido={
            <div>
              <h3>Vista Detallada Registro</h3>
              <p><b>Pregunta:</b> {registroSeleccionado.pregunta}</p>
              <p><b>WritingField 1:</b> {registroSeleccionado.opcion1}</p>
              <p><b>WritingField 2:</b> {registroSeleccionado.opcion2}</p>
              <p><b>WritingField 3:</b> {registroSeleccionado.opcion3}</p>
              <p><b>Respuesta Correcta :</b> {registroSeleccionado.correcta}</p>
              
              <p><b>Audio:</b></p>
              <audio controls src={registroSeleccionado.audio}></audio>      </div>
          }
        />
      )}
      {/* Modal Editar Item */}
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
            pregunta: e.target.pregunta.value,
            opcion1: e.target.w1.value,
            opcion2: e.target.w2.value,
            opcion3: e.target.w3.value,
            correcta: e.target.correcta.value,
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
          Pregunta:
          <input type="text" name="image" defaultValue={registroSeleccionado.pregunta} />
        </label>

        <label>
          Opcion 1:
          <input type="text" name="w1" defaultValue={registroSeleccionado.opcion1} />
        </label>

        <label>
          Opcion 2:
          <input type="text" name="w2" defaultValue={registroSeleccionado.opcion2} />
        </label>

        <label>
          Opcion 3:
          <input type="text" name="w3" defaultValue={registroSeleccionado.opcion3} />
        </label>

        <label>
          Respuesta Correcta :
          <input type="text" name="w3" defaultValue={registroSeleccionado.correcta} />
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
      {/* Modal Eliminar Item */}
      {ModalEliminarAbierto && registroSeleccionado && (
        <Modal
          onClose={cerrarModalEliminar}
          contenido={
            <div>
              <h3>¿Eliminar este registro?</h3>
              <p><b>{registroSeleccionado.pregunta}</b></p>
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

export default VistaItems;
