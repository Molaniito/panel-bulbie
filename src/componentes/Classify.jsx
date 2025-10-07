import React, { useState, useEffect } from "react";
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react";
import Modal from "./Modal/Modal";
import ModalAgregarClassify from "./Modal/ModalAgregarClassify";
import axios from "axios";

const VistaClassify = () => {
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
          "https://boostrap-0eub.onrender.com/classify/all"
        );
        setDatos(response.data);
      } catch (error) {
        console.error("❌ Error al cargar los datos:", error);
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
          <div className="busqueda flex items-center gap-2">
            <Search size={16} />
            <input type="text" placeholder="Buscar categoría" />
          </div>
        </div>
      </div>
      {/* Tabla */}
      <div className="tabla-container">
        <table className="tabla-clientes">
          <thead>
            <tr>
              <th>Word 1-4 (Elemento 1)</th>
              <th>Word 1-4 (Elemento 2)</th>
              <th>Word 1-4 (Elemento 3)</th>
              <th>Categoría (Elemento 1)</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5">Cargando...</td>
              </tr>
            ) : (
              datos.map((item) => (
                <tr key={item._id}>
                  <td>
                    {item.elemento1
                      ? [
                          item.elemento1.word1,
                          item.elemento1.word2,
                          item.elemento1.word3,
                          item.elemento1.word4,
                        ]
                          .filter(Boolean)
                          .join(", ")
                      : "—"}
                  </td>
                  <td>
                    {item.elemento2
                      ? [
                          item.elemento2.word1,
                          item.elemento2.word2,
                          item.elemento2.word3,
                          item.elemento2.word4,
                        ]
                          .filter(Boolean)
                          .join(", ")
                      : "—"}
                  </td>
                  <td>
                    {item.elemento3
                      ? [
                          item.elemento3.word1,
                          item.elemento3.word2,
                          item.elemento3.word3,
                          item.elemento3.word4,
                        ]
                          .filter(Boolean)
                          .join(", ")
                      : "—"}
                  </td>
                  <td>{item.elemento1?.category1 || "—"}</td>
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
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Modal Agregar Classify */}
      {ModalAgregarAbierto && (
        <Modal
          onClose={cerrarModalAgregar}
          contenido={<ModalAgregarClassify />}
        />
      )}
      {/* Modal View Classify */}
      {ModalViewAbierto && registroSeleccionado && (
        <Modal
          onClose={cerrarModalView}
          contenido={
            <div>
              <h3>Vista Detallada Registro</h3>
              <p>
                <b>Elemento 1:</b>{" "}
                {registroSeleccionado.elemento1
                  ? [
                      registroSeleccionado.elemento1.word1,
                      registroSeleccionado.elemento1.word2,
                      registroSeleccionado.elemento1.word3,
                      registroSeleccionado.elemento1.word4,
                    ]
                      .filter(Boolean)
                      .join(", ")
                  : "—"}
              </p>
              <p>
                <b>Elemento 2:</b>{" "}
                {registroSeleccionado.elemento2
                  ? [
                      registroSeleccionado.elemento2.word1,
                      registroSeleccionado.elemento2.word2,
                      registroSeleccionado.elemento2.word3,
                      registroSeleccionado.elemento2.word4,
                    ]
                      .filter(Boolean)
                      .join(", ")
                  : "—"}
              </p>
              <p>
                <b>Elemento 3:</b>{" "}
                {registroSeleccionado.elemento3
                  ? [
                      registroSeleccionado.elemento3.word1,
                      registroSeleccionado.elemento3.word2,
                      registroSeleccionado.elemento3.word3,
                      registroSeleccionado.elemento3.word4,
                    ]
                      .filter(Boolean)
                      .join(", ")
                  : "—"}
              </p>
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
              }}
            >
              <h3>Editar Registro</h3>
              <label>
                Elemento 1 - Word 1:
                <input
                  type="text"
                  name="w1"
                  defaultValue={registroSeleccionado.elemento1?.word1 || ""}
                />
              </label>
              <label>
                Elemento 1 - Word 2:
                <input
                  type="text"
                  name="w2"
                  defaultValue={registroSeleccionado.elemento1?.word2 || ""}
                />
              </label>
              <label>
                Elemento 1 - Word 3:
                <input
                  type="text"
                  name="w3"
                  defaultValue={registroSeleccionado.elemento1?.word3 || ""}
                />
              </label>
              <label>
                Elemento 1 - Word 4:
                <input
                  type="text"
                  name="w4"
                  defaultValue={registroSeleccionado.elemento1?.word4 || ""}
                />
              </label>
              <label>
                Categoría 1:
                <input
                  type="text"
                  name="category1"
                  defaultValue={registroSeleccionado.elemento1?.category1 || ""}
                />
              </label>
              {/* Aquí puedes agregar más campos para elemento2 y elemento3 si es necesario */}
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
              <p>
                <b>
                  {registroSeleccionado.elemento1?.category1 ||
                    "Registro sin categoría"}
                </b>
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

export default VistaClassify;
