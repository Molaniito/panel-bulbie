import React, { useState, useEffect } from "react";
import { Search, Plus, Eye, Edit, Trash2, MapPin } from "lucide-react";
import Modal from "./Modal/Modal";
import ModalMatchImage from "./Modal/ModalMatchImage";
import ModalAgregarMatch from "./Modal/ModalAgregarMatch";
import axios from "axios";

const VistaMatch = () => {
  const [busqueda, setBusqueda] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [itemSeleccionado, setItemSeleccionado] = useState(null);
  const [ModalAgregarAbierto, setModalAgregarAbierto] = useState(false);
  const [ModalViewAbierto, setModalViewAbierto] = useState(false);
  const [ModalEliminarAbierto, setModalEliminarAbierto] = useState(false);
  const [ModalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "https://boostrap-0eub.onrender.com/match/all"
        );

        // transformar backend -> formato frontend
        const datosTransformados = response.data.map((doc) => {
          const imgs = [];
          const words = [];
          const defs = [];
          for (let i = 1; i <= 10; i++) {
            if (doc[`img${i}`]) imgs.push(bufferToUrl(doc[`img${i}`]));
            if (doc[`word${i}`]) words.push(doc[`word${i}`]);
            if (doc[`def${i}`]) defs.push(doc[`def${i}`]);
          }
          return {
            id: doc._id,
            imgs,
            words,
            defs,
          };
        });

        setItems(datosTransformados);
      } catch (error) {
        console.error("❌ Error al cargar los items:", error);
      } finally {
        setLoading(false);  
      }
    };

    // helper para convertir Buffer a string/URL
    const bufferToUrl = (bufferObj) => {
      try {
        const uint8Array = new Uint8Array(bufferObj.data);
        return new TextDecoder().decode(uint8Array);
      } catch {
        return "";
      }
    };

    fetchItems();
  }, []);

  const abrirModal = (emoji, word, def) => {
    setItemSeleccionado({ emoji, word, def });
    setModalAbierto(true);
  };
  const cerrarModal = () => {
    setModalAbierto(false);
    setItemSeleccionado(null);
  };

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

  // Filtrar datos según la búsqueda
  const datosFiltrados = items
    .map((fila) => ({
      ...fila,
      imgs: fila.imgs,
      words: fila.words,
      defs: fila.defs,
    }))
    .filter((fila) =>
      fila.words.some((word) =>
        word.toLowerCase().includes(busqueda.toLowerCase())
      )
    );

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="vista-direccion">
      <div className="encabezado-direccion">
        <MapPin size={24} className="icono-direccion" />
        <h2 className="titulo-direccion">Gestión de Matching</h2>
      </div>

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
              placeholder="Buscar palabra (word)"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="contenedor-tabla">
        <table className="tabla-clientes">
          <thead>
            <tr>
              <th>img 1</th>
              <th>img 2</th>
              <th>img 3</th>
              <th>img 4</th>
              <th>img 5</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datosFiltrados.map((fila) => (
              <tr key={fila.id}>
                {[0, 1, 2, 3, 4].map((index) => (
                  <td key={`img-${index}`}>
                    {fila.imgs[index] ? (
                      <button
                        onClick={() =>
                          abrirModal(
                            fila.imgs[index],
                            fila.words[index],
                            fila.defs[index]
                          )
                        }
                      >
                        <img
                          src={fila.imgs[index]}
                          alt={`Imagen ${index + 1}`}
                          style={{ maxWidth: "100px", height: "auto" }}
                        />
                      </button>
                    ) : null}
                  </td>
                ))}
                <td>
                  <button title="Ver" onClick={() => abrirModalView(fila)}>
                    <Eye size={16} />
                  </button>
                  <button title="Editar" onClick={() => abrirModalEditar(fila)}>
                    <Edit size={16} />
                  </button>
                  <button
                    title="Eliminar"
                    onClick={() => abrirModalEliminar(fila)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Match Image*/}
      {modalAbierto && itemSeleccionado && (
        <Modal
          onClose={cerrarModal}
          contenido={
            <ModalMatchImage
              Emoji={itemSeleccionado.emoji}
              Name={itemSeleccionado.word}
              Definition={itemSeleccionado.def}
            />
          }
        />
      )}

      {/* Modal Agregar Match */}
      {ModalAgregarAbierto && (
        <Modal onClose={cerrarModalAgregar} contenido={<ModalAgregarMatch />} />
      )}

      {/* Modal Vista Detallada */}
      {ModalViewAbierto && registroSeleccionado && (
        <Modal
          onClose={cerrarModalView}
          contenido={
            <div>
              <h3>Vista Detallada Registro</h3>
              <p>
                <b>Emojis:</b> {registroSeleccionado.imgs.join(" ")}
              </p>
              <p>
                <b>Palabras:</b> {registroSeleccionado.words.join(", ")}
              </p>
              <p>
                <b>Definiciones:</b>
              </p>
              <ul>
                {registroSeleccionado.defs.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          }
        />
      )}

      {/* Modal Editar */}
      {ModalEditarAbierto && registroSeleccionado && (
        <Modal
          onClose={cerrarModalEditar}
          contenido={
            <div>
              <h3>Editar Registro</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Registro actualizado ✅");
                  cerrarModalEditar();
                }}
              >
                <label>Emojis (separados por coma):</label>
                <input
                  type="text"
                  defaultValue={registroSeleccionado.imgs.join(", ")}
                />
                <label>Palabras (separadas por coma):</label>
                <input
                  type="text"
                  defaultValue={registroSeleccionado.words.join(", ")}
                />
                <label>Definiciones (separadas por coma):</label>
                <textarea defaultValue={registroSeleccionado.defs.join(", ")} />
                <button type="submit">Guardar Cambios</button>
              </form>
            </div>
          }
        />
      )}

      {/* Modal Eliminar */}
      {ModalEliminarAbierto && (
        <Modal
          onClose={cerrarModalEliminar}
          contenido={
            <div>
              <h3>Eliminar Registro</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Registro eliminado ✅");
                  cerrarModalEliminar();
                }}
              >
                <button type="submit">Eliminar</button>
              </form>
            </div>
          }
        />
      )}
    </div>
  );
};

export default VistaMatch;  