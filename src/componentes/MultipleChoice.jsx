import React, { useState } from "react";
import { Search, Plus, Eye, Edit, Trash2, X } from "lucide-react";
import Modal from "./Modal/Modal";
import ModalAgregarMultipleChoice from "./Modal/ModalAgregarMultipleChoice"

const VistaMultiplChoice = () => {
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

  // Datos de ejemplo si clientesFiltrados está vacío
  const datos = [
          {
            id: 1,
            instruction: "Selecciona la opción correcta",
            text: "What is the capital of France?",
            items: ["Paris", "London", "Madrid", "Berlin"],
            level: "A2",
            skill: "Reading",
            audio: "audio1.mp3",
          },
          {
            id: 2,
            instruction: "Escoge la respuesta adecuada",
            text: "She _____ to the gym every day.",
            items: ["go", "goes", "going", "gone"],
            level: "B1",
            skill: "Grammar",
            audio: "audio2.mp3",
          },
        ]

  

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
              placeholder="Buscar pregunta"
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
                      .filter((item) => item.trim() !== "") // 🔥 evita que salgan vacíos
                      .map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                  </ul>
                </td>
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
                  <button title="Ver" onClick={() => abrirModalView (pregunta)}>
                    <Eye size={16} />
                  </button>
                  <button title="Editar" onClick={() => abrirModalEditar (pregunta)}>
                    <Edit size={16} />
                  </button>
                  <button title="Eliminar" onClick={() => abrirModalEliminar (pregunta)}>
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
        <Modal onClose={cerrarModalAgregar} contenido={<ModalAgregarMultipleChoice />} />
      )}

      {/* Modal View Match */}
      {ModalViewAbierto && registroSeleccionado && (
        <Modal
          onClose={cerrarModalView}
          contenido={
            <div>
              <h3>Vista Detallada Registro</h3>
              <p><b>instruction:</b> {registroSeleccionado.instruction}</p>
              <p><b>Text:</b> {registroSeleccionado.text}</p>
              <p><b>Item 1:</b> {registroSeleccionado.items[0]}</p>
              <p><b>Item 2:</b> {registroSeleccionado.items[1]}</p>
              <p><b>Item 3:</b> {registroSeleccionado.items[2]}</p>
              <p><b>Item 4:</b> {registroSeleccionado.items[3]}</p>
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
                  instruction: e.target.instruction.value,
                  text: e.target.text.value,
                  writingFields: [
                    e.target.i1.value,
                    e.target.i2.value,
                    e.target.i3.value,
                    
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
                instruction:
                <input type="text" name="instruction" defaultValue={registroSeleccionado.instruction} />
              </label>
      
              <label>
                Text:
                <input type="text" name="text" defaultValue={registroSeleccionado.text} />
              </label>
      
              
      
              <label>
                Item 1:
                <input type="text" name="w1" defaultValue={registroSeleccionado.items[0]} />
              </label>
      
              <label>
                Item 2:
                <input type="text" name="w2" defaultValue={registroSeleccionado.items[1]} />
              </label>
      
              <label>
                Item 3:
                <input type="text" name="w3" defaultValue={registroSeleccionado.items[2]} />
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
      {/* Modal Eliminar Match */}
       {ModalEliminarAbierto && registroSeleccionado && (
        <Modal
          onClose={cerrarModalEliminar}
          contenido={
            <div>
              <h3>¿Eliminar este registro?</h3>
              <p><b>Text: </b>{registroSeleccionado.text}</p>
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

export default VistaMultiplChoice;
