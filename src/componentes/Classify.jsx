import React, { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2, X } from 'lucide-react';
import Modal from "./Modal/Modal";
import ModalAgregarClassify from "./Modal/ModalAgregarClassify"

const VistaClassify = () => {

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

  // Datos iniciales
  const [datos, setDatos] = useState([
    { id: 1, word1: 'manzana', word2: 'piña', word3: 'pera', element: 'frutas' },
    { id: 2, word1: 'calzones', word2: 'pantalón', word3: 'medias', element: 'ropa' },
    { id: 3, word1: 'iphone 11', word2: 'motorola', word3: 'xiaomi', element: 'celulares' }
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
          <div className="busqueda flex items-center gap-2">
            <Search size={16} />
            <input
              type="text"
              placeholder="Buscar categoría"
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
                  <button title="Ver" onClick={() => abrirModalView(item)}>
                    <Eye size={16} />
                  </button>
                <button title="Editar" onClick={() => abrirModalEditar(item)}>
                    <Edit size={16} />
                  </button>
                  <button title="Eliminar" onClick={() => abrirModalEliminar(item)}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Agregar Classify */}
      {ModalAgregarAbierto && (
        <Modal onClose={cerrarModalAgregar} contenido={<ModalAgregarClassify />} />
      )}

      {/* Modal View Classify */}
      {ModalViewAbierto && registroSeleccionado && (
        <Modal
          onClose={cerrarModalView}
          contenido={
            <div>
              <h3>Vista Detallada Registro</h3>
              <p><b>Element:</b> {registroSeleccionado.element}</p>
              <p><b>Word 1:</b> {registroSeleccionado.word1}</p>
              <p><b>Word 2:</b> {registroSeleccionado.word2}</p>
              <p><b>Word 3:</b> {registroSeleccionado.word3}</p>

            </div>
          }
        />
      )}
      {/* Modal Editar Classify */}
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
          Element:
          <input type="text" name="image" defaultValue={registroSeleccionado.element} />
        </label>

        <label>
          Word 1:
          <input type="text" name="w1" defaultValue={registroSeleccionado.word1} />
        </label>

        <label>
          Word 2:
          <input type="text" name="w2" defaultValue={registroSeleccionado.word2} />
        </label>

        <label>
          Word 3:
          <input type="text" name="w3" defaultValue={registroSeleccionado.word3} />
        </label>

        
        <button type="submit">Guardar Cambios</button>
      </form>
    }
  />
)}
      {/* Modal Eliminar Classify */}
      {ModalEliminarAbierto && registroSeleccionado && (
        <Modal
          onClose={cerrarModalEliminar}
          contenido={
            <div>
              <h3>¿Eliminar este registro?</h3>
              <p><b>{registroSeleccionado.element}</b></p>
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

export default VistaClassify;
