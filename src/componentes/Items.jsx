import React, { useState, useEffect } from "react";
import { Edit, Trash2, Plus, Eye } from "lucide-react";
import Modal from "./Modal/Modal";
import ModalAgregarItem from "./Modal/ModalAgregarItems";
import axios from "axios";

const API_URL = "https://boostrap-0eub.onrender.com/items";

const VistaItems = () => {
  const [ModalAgregarAbierto, setModalAgregarAbierto] = useState(false);
  const [ModalViewAbierto, setModalViewAbierto] = useState(false);
  const [ModalEliminarAbierto, setModalEliminarAbierto] = useState(false);
  const [ModalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/all`);
      setItems(response.data);
    } catch (error) {
      console.error("❌ Error al cargar items:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==== Crear Item ====
  const agregarItem = async (nuevo) => {
    try {
      const res = await axios.post(`${API_URL}`, nuevo); // POST /items
      setItems((prev) => [...prev, res.data.respuesta]); // backend devuelve {ok, respuesta}
      setModalAgregarAbierto(false);
    } catch (err) {
      console.error("❌ Error al agregar item:", err);
    }
  };

  // ==== Editar Item ====
  const editarItem = async (id, actualizado) => {
    try {
      const res = await axios.patch(`${API_URL}/${id}`, actualizado); // PATCH /items/:id
      setItems((prev) =>
        prev.map((item) =>
          item._id === id ? res.data.itemsActualizado : item
        )
      );
      setModalEditarAbierto(false);
    } catch (err) {
      console.error("❌ Error al editar item:", err);
    }
  };

  // ==== Eliminar Item ====
  const eliminarItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`); // DELETE /items/:id
      setItems((prev) => prev.filter((item) => item._id !== id));
      setModalEliminarAbierto(false);
    } catch (err) {
      console.error("❌ Error al eliminar item:", err);
    }
  };

  // ==== Abrir/Cerrar modales ====
  const abrirModalAgregar = () => setModalAgregarAbierto(true);
  const cerrarModalAgregar = () => setModalAgregarAbierto(false);
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

  return (
    <div className="vista-items p-4">
      <button
        type="button"
        className="btn agregar flex items-center gap-1 mb-4"
        onClick={abrirModalAgregar}
      >
        <Plus size={16} /> AGREGAR NUEVO
      </button>

      <h3 className="subtitulo-formulario">Listado de Preguntas</h3>

      {loading ? (
        <p>Cargando...</p>
      ) : items.length === 0 ? (
        <p>No hay items disponibles.</p>
      ) : (
        <div className="tabla-container">
          <table className="tabla-preguntas">
            <thead>
              <tr>
                <th>#</th>
                <th>Pregunta</th>
                <th>Opción 1</th>
                <th>Opción 2</th>
                <th>Opción 3</th>
                <th>Respuesta Correcta</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{index + 1}</td>
                  <td>{item.Question}</td>
                  <td>{item.Option1}</td>
                  <td>{item.Option2}</td>
                  <td>{item.Option3}</td>
                  <td>{item.CorrectAnswer}</td>
                  <td className="acciones">
                    <button title="Ver" onClick={() => abrirModalView(item)}>
                      <Eye size={16} />
                    </button>
                    <button title="Editar" onClick={() => abrirModalEditar(item)}>
                      <Edit size={16} />
                    </button>
                    <button
                      title="Eliminar"
                      onClick={() => abrirModalEliminar(item)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Agregar */}
      {ModalAgregarAbierto && (
        <Modal
          onClose={cerrarModalAgregar}
          contenido={
            <ModalAgregarItem
              onSubmit={agregarItem}
              onClose={cerrarModalAgregar}
            />
          }
        />
      )}

      {/* Modal Ver */}
      {ModalViewAbierto && registroSeleccionado && (
        <Modal
          onClose={cerrarModalView}
          contenido={
            <div>
              <h3>Vista Detallada de la Pregunta</h3>
              <p><b>Pregunta:</b> {registroSeleccionado.Question}</p>
              <p><b>Opción 1:</b> {registroSeleccionado.Option1}</p>
              <p><b>Opción 2:</b> {registroSeleccionado.Option2}</p>
              <p><b>Opción 3:</b> {registroSeleccionado.Option3}</p>
              <p><b>Respuesta Correcta:</b> {registroSeleccionado.CorrectAnswer}</p>
              {registroSeleccionado.Audio && (
                <audio controls src={registroSeleccionado.Audio}></audio>
              )}
            </div>
          }
        />
      )}

      {/* Modal Editar */}
      {ModalEditarAbierto && registroSeleccionado && (
        <Modal
          onClose={cerrarModalEditar}
          contenido={
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const actualizado = {
                  Question: e.target.Question.value,
                  Option1: e.target.Option1.value,
                  Option2: e.target.Option2.value,
                  Option3: e.target.Option3.value,
                  CorrectAnswer: e.target.CorrectAnswer.value,
                };
                editarItem(registroSeleccionado._id, actualizado);
              }}
            >
              <h3>Editar Pregunta</h3>
              <input name="Question" defaultValue={registroSeleccionado.Question} />
              <input name="Option1" defaultValue={registroSeleccionado.Option1} />
              <input name="Option2" defaultValue={registroSeleccionado.Option2} />
              <input name="Option3" defaultValue={registroSeleccionado.Option3} />
              <input name="CorrectAnswer" defaultValue={registroSeleccionado.CorrectAnswer} />
              <button type="submit">Guardar Cambios</button>
            </form>
          }
        />
      )}

      {/* Modal Eliminar */}
      {ModalEliminarAbierto && registroSeleccionado && (
        <Modal
          onClose={cerrarModalEliminar}
          contenido={
            <div>
              <h3>¿Eliminar este registro?</h3>
              <p><b>{registroSeleccionado.Question}</b></p>
              <button onClick={cerrarModalEliminar}>Cancelar</button>
              <button onClick={() => eliminarItem(registroSeleccionado._id)}>Eliminar</button>
            </div>
          }
        />
      )}
    </div>
  );
};

export default VistaItems;
