import React, { useState, useEffect } from "react";
import { Globe, Plus, Search, Eye, Edit, Trash2 } from "lucide-react";
import Modal from "./Modal/Modal";
import ModalAgregarVocabulary from "./Modal/ModalAgregarVocabulary";
import axios from "axios";

const VistaVocabulary = () => {
  const [busqueda, setBusqueda] = useState("");
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
        const response = await axios.get("https://boostrap-0eub.onrender.com/vocabulary/all"); // Cambia esta URL por tu endpoint real
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

  // Filtrar por nombre según búsqueda
  const datosFiltrados = datos.filter((item) =>
    item.objectName?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="vista-ciudad">
      {/* Encabezado */}
      <div className="encabezado">
        <Globe size={24} className="icono-globo" />
        <h2 className="titulo">Vocabulary</h2>
      </div>

      {/* Controles superiores */}
      <div className="controles-superiores">
        <div className="acciones">
          <button type="button" className="btn agregar" onClick={abrirModalAgregar}>
            <Plus size={16} /> AGREGAR NUEVO
          </button>
        </div>
        <div className="filtros">
          <div className="busqueda">
            <Search size={16} />
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
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
                <th>ObjectName</th>
                <th>IPA</th>
                <th>Description</th>
                <th>Image</th>
                <th>Audio</th>
                <th>Level</th>
                <th>SubLevel</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {datosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="8">No hay datos que coincidan</td>
                </tr>
              ) : (
                datosFiltrados.map((item) => (
                  <tr key={item._id || item.id}>
                    <td>{item.objectName}</td>
                    <td>{item.ipa}</td>
                    <td>{item.description}</td>
                    <td>{item.image}</td>
                    <td>
                      <audio controls src={item.audio}>
                        Tu navegador no soporta audio.
                      </audio>
                    </td>
                    <td>{item.level}</td>
                    <td>{item.subLevel}</td>
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
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Agregar */}
      {ModalAgregarAbierto && (
        <Modal onClose={cerrarModalAgregar} contenido={<ModalAgregarVocabulary />} />
      )}

      {/* Modal Ver */}
      {ModalViewAbierto && registroSeleccionado && (
        <Modal
          onClose={cerrarModalView}
          contenido={
            <div>
              <h3>Vista Detallada Registro</h3>
              <p>
                <b>Nombre:</b> {registroSeleccionado.objectName}
              </p>
              <p>
                <b>IPA:</b> {registroSeleccionado.ipa}
              </p>
              <p>
                <b>Descripción:</b> {registroSeleccionado.description}
              </p>
              <p>
                <b>Imagen:</b> {registroSeleccionado.image}
              </p>
              <p>
                <b>Audio:</b>
              </p>
              <audio controls src={registroSeleccionado.audio} />
              <p>
                <b>Nivel:</b> {registroSeleccionado.level}
              </p>
              <p>
                <b>Subnivel:</b> {registroSeleccionado.subLevel}
              </p>
            </div>
          }
        />
      )}

      {/* Modal Editar */}
      {ModalEditarAbierto && registroSeleccionado && (
        <Modal
          onClose={cerrarModalEditar}
          contenido={
            <div className="p-4 w-96">
              <h3 className="text-lg font-semibold mb-4">Editar Vocabulary</h3>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target;
                  const actualizado = {
                    ...registroSeleccionado,
                    objectName: form.objectName.value,
                    ipa: form.ipa.value,
                    description: form.description.value,
                    image: form.image.value || registroSeleccionado.image,
                    audio: form.audio.value || registroSeleccionado.audio,
                    level: form.level.value,
                    subLevel: form.subLevel.value,
                  };
                  console.log("Registro actualizado:", actualizado);
                  alert("Registro actualizado ✅");
                  cerrarModalEditar();
                  // Aquí puedes implementar el PUT/PATCH al backend
                }}
              >
                <input
                  type="text"
                  name="objectName"
                  defaultValue={registroSeleccionado.objectName}
                  placeholder="ObjectName"
                  className="border p-2 w-full mb-2"
                />

                <input
                  type="text"
                  name="ipa"
                  defaultValue={registroSeleccionado.ipa}
                  placeholder="IPA"
                  className="border p-2 w-full mb-2"
                />

                <textarea
                  name="description"
                  defaultValue={registroSeleccionado.description}
                  placeholder="Description"
                  className="border p-2 w-full mb-2 h-24 resize-none"
                />

                <label className="block mb-2 font-semibold">Imagen</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="border p-2 w-full mb-2"
                />

                <label className="block mb-2 font-semibold">Audio</label>
                <input
                  type="file"
                  name="audio"
                  accept="audio/*"
                  className="border p-2 w-full mb-4"
                />

                <div className="flex gap-4 mb-2">
                  <div className="flex-1">
                    <label className="block mb-2 font-semibold">Level</label>
                    <select
                      name="level"
                      defaultValue={registroSeleccionado.level}
                      className="border p-2 w-full"
                    >
                      <option value="">Selecciona un nivel</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  <div className="flex-1">
                    <label className="block mb-2 font-semibold">SubLevel</label>
                    <select
                      name="subLevel"
                      defaultValue={registroSeleccionado.subLevel}
                      className="border p-2 w-full"
                    >
                      <option value="">Selecciona un subnivel</option>
                      <option value="1A">1A</option>
                      <option value="1B">1B</option>
                      <option value="2A">2A</option>
                      <option value="2B">2B</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={cerrarModalEditar}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
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
              <p>
                <b>{registroSeleccionado.objectName}</b>
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

export default VistaVocabulary;
