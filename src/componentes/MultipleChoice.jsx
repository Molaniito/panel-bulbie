import React, { useState, useEffect } from "react";
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react";
import Modal from "./Modal/Modal";
import ModalAgregarMultipleChoice from "./Modal/ModalAgregarMultipleChoice";
import axios from "axios";

const VistaMultiplChoice = () => {
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
          "https://boostrap-0eub.onrender.com/multiplechoice/all" // Cambia la URL por la correcta de tu API
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

  // Función para obtener URL de audio si viene como buffer (adaptar según backend)
  const obtenerUrlAudio = (audioObj) => {
    // Si backend envía la URL directamente en audioObj.url, devolver eso
    // Si no, habría que procesar el buffer (no incluido aquí)
    return audioObj?.url || "";
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
            <input type="text" placeholder="Buscar pregunta" />
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="tabla-container">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <table className="tabla-clientes">
            <thead>
              <tr>
                <th>Text</th>
                <th>Items</th>
                <th>Level</th>
                <th>Skill</th>
                <th>Audio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {datos.length === 0 ? (
                <tr>
                  <td colSpan="6">No hay datos</td>
                </tr>
              ) : (
                datos.map((pregunta) => (
                  <tr key={pregunta._id}>
                    <td>{pregunta.Text || "—"}</td>
                    <td>
                      {pregunta.Items && pregunta.Items.length > 0 ? (
                        <ul>
                          {pregunta.Items.filter(
                            (item) => item.trim() !== ""
                          ).map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td>
                      {pregunta.Level && pregunta.Level.length > 0
                        ? pregunta.Level.join(", ")
                        : "—"}
                    </td>
                    <td>
                      {pregunta.Skill && pregunta.Skill.length > 0
                        ? pregunta.Skill.join(", ")
                        : "—"}
                    </td>
                    <td>
                      {obtenerUrlAudio(pregunta.Audio) ? (
                        <audio controls src={obtenerUrlAudio(pregunta.Audio)} />
                      ) : (
                        "—"
                      )}
                    </td>
                    <td>
                      <button
                        title="Ver"
                        onClick={() => abrirModalView(pregunta)}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        title="Editar"
                        onClick={() => abrirModalEditar(pregunta)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        title="Eliminar"
                        onClick={() => abrirModalEliminar(pregunta)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Agregar MultipleChoice */}
      {ModalAgregarAbierto && (
        <Modal
          onClose={cerrarModalAgregar}
          contenido={<ModalAgregarMultipleChoice />}
        />
      )}

      {/* Modal View MultipleChoice */}
      {ModalViewAbierto && registroSeleccionado && (
        <Modal
          onClose={cerrarModalView}
          contenido={
            <div>
              <h3>Vista Detallada Registro</h3>
              <p>
                <b>Text:</b> {registroSeleccionado.Text || "—"}
              </p>
              <p>
                <b>Items:</b>{" "}
                {registroSeleccionado.Items &&
                registroSeleccionado.Items.length > 0 ? (
                  <ul>
                    {registroSeleccionado.Items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  "—"
                )}
              </p>
              <p>
                <b>Level:</b>{" "}
                {registroSeleccionado.Level &&
                registroSeleccionado.Level.length > 0
                  ? registroSeleccionado.Level.join(", ")
                  : "—"}
              </p>
              <p>
                <b>Skill:</b>{" "}
                {registroSeleccionado.Skill &&
                registroSeleccionado.Skill.length > 0
                  ? registroSeleccionado.Skill.join(", ")
                  : "—"}
              </p>
              <p>
                <b>Audio:</b>
              </p>
              {obtenerUrlAudio(registroSeleccionado.Audio) ? (
                <audio
                  controls
                  src={obtenerUrlAudio(registroSeleccionado.Audio)}
                />
              ) : (
                <p>—</p>
              )}
            </div>
          }
        />
      )}

      {/* Modal Editar MultipleChoice */}
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
                Text:
                <input
                  type="text"
                  name="text"
                  defaultValue={registroSeleccionado.Text || ""}
                />
              </label>

            

              <label>
                Audio (URL):
                <input
                  type="text"
                  name="audio"
                  defaultValue={
                    obtenerUrlAudio(registroSeleccionado.Audio) || ""
                  }
                />
              </label>

              <button type="submit">Guardar Cambios</button>
            </form>
          }
        />
      )}

      {/* Modal Eliminar MultipleChoice */}
      {ModalEliminarAbierto && registroSeleccionado && (
        <Modal
          onClose={cerrarModalEliminar}
          contenido={
            <div>
              <h3>¿Eliminar este registro?</h3>
              <p>
                <b>Text: </b>
                {registroSeleccionado.Text || "—"}
              </p>
              <button onClick={cerrarModalEliminar}>Cancelar</button>
              <button
                onClick={() => {
                  alert("Registro eliminado ✅");
                  // Aquí debería ir la petición DELETE al backend para eliminar
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
