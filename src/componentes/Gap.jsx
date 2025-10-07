import React, { useState, useEffect } from "react";
import { Edit, Trash2, Plus, Eye, Search } from "lucide-react";
import Modal from "./Modal/Modal";
import ModalAgregarGap from "./Modal/ModalAgregarGap";
import axios from "axios";

const VistaGap = () => {
  const [ModalAgregarAbierto, setModalAgregarAbierto] = useState(false);
  const [ModalViewAbierto, setModalViewAbierto] = useState(false);
  const [ModalEliminarAbierto, setModalEliminarAbierto] = useState(false);
  const [ModalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);

  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await axios.get(
          "https://boostrap-0eub.onrender.com/gap/all" 
        );
        setDatos(response.data);
      } catch (error) {
        console.error("❌ Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDatos();
  }, []);

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
            <input type="text" placeholder="Buscar..." />
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="tabla-container">
        {loading ? (
          <p>Cargando...</p>
        ) : datos.length === 0 ? (
          <p>No hay datos para mostrar</p>
        ) : (
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
                <tr key={item._id || item.id}>
                  <td>{item.text1 || ""}</td>
                  <td>{item.word1 || ""}</td>
                  <td>{item.word2 || ""}</td>
                  <td>{item.word3 || ""}</td>
                  <td>{item.word4 || ""}</td>
                  <td>
                    <button title="Ver" onClick={() => abrirModalView(item)}>
                      <Eye size={16} />
                    </button>
                    <button
                      title="Editar"
                      onClick={() => abrirModalEditar(item)}
                    >
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
        )}
      </div>

      {/* Modales */}
      {ModalAgregarAbierto && (
        <Modal onClose={cerrarModalAgregar} contenido={<ModalAgregarGap />} />
      )}

      {ModalViewAbierto && registroSeleccionado && (
        <Modal
          onClose={cerrarModalView}
          contenido={
            <div>
              <h3>Vista Detallada Registro</h3>
              <p>
                <b>Text1:</b> {registroSeleccionado.text1}
              </p>
              <p>
                <b>Word 1:</b> {registroSeleccionado.word1}
              </p>
              <p>
                <b>Word 2:</b> {registroSeleccionado.word2}
              </p>
              <p>
                <b>Word 3:</b> {registroSeleccionado.word3}
              </p>
              <p>
                <b>Word 4:</b> {registroSeleccionado.word4}
              </p>
            </div>
          }
        />
      )}

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
                  text1: e.target.text1.value,
                  word1: e.target.word1.value,
                  word2: e.target.word2.value,
                  word3: e.target.word3.value,
                  word4: e.target.word4.value,
                };
                setDatos((prev) =>
                  prev.map((item) =>
                    (item._id || item.id) ===
                    (registroSeleccionado._id || registroSeleccionado.id)
                      ? updated
                      : item
                  )
                );
                cerrarModalEditar();
              }}
            >
              <h3>Editar Registro</h3>

              <label>
                Text 1:
                <input
                  type="text"
                  name="text1"
                  defaultValue={registroSeleccionado.text1}
                />
              </label>

              <label>
                Word 1:
                <input
                  type="text"
                  name="word1"
                  defaultValue={registroSeleccionado.word1}
                />
              </label>

              <label>
                Word 2:
                <input
                  type="text"
                  name="word2"
                  defaultValue={registroSeleccionado.word2}
                />
              </label>

              <label>
                Word 3:
                <input
                  type="text"
                  name="word3"
                  defaultValue={registroSeleccionado.word3}
                />
              </label>

              <label>
                Word 4:
                <input
                  type="text"
                  name="word4"
                  defaultValue={registroSeleccionado.word4}
                />
              </label>

              <button type="submit">Guardar Cambios</button>
            </form>
          }
        />
      )}

      {ModalEliminarAbierto && registroSeleccionado && (
        <Modal
          onClose={cerrarModalEliminar}
          contenido={
            <div>
              <h3>¿Eliminar este registro?</h3>
              <p>
                <b>{registroSeleccionado.text1}</b>
              </p>
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

export default VistaGap;
