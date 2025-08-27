import React, { useState } from 'react';

function ModalAgregarVocabulary() {
    const [nuevaPregunta, setNuevaPregunta] = useState({
    pregunta: "",
    opcion1: "",
    opcion2: "",
    opcion3: "",
    correcta: "",
    audio: "",
  });
  // Manejar cambios en inputs del modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaPregunta((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardar = () => {
    console.log("Nueva pregunta guardada:", nuevaPregunta);
    setMostrarModal(false);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <h3 className="text-lg font-semibold mb-4">Add Vocabulary</h3>

        {/* ObjectName */}
        <input
          type="text"
          name="pregunta"
          placeholder="ObjectName"
          value={nuevaPregunta.pregunta}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        {/* IPA */}
        <input
          type="text"
          name="opcion1"
          placeholder="IPA"
          value={nuevaPregunta.opcion1}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        {/* Description - textarea */}
        <textarea
          name="opcion2"
          placeholder="Description"
          value={nuevaPregunta.opcion2}
          onChange={handleChange}
          className="border p-2 w-full mb-2 h-24 resize-none"
        />

        {/* Imagen - file */}
        <label className="block mb-2 font-semibold">Imagen</label>
        <input
          type="file"
          name="imagen"
          accept="image/*"
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        {/* Audio - file */}
        <label className="block mb-2 font-semibold">Audio</label>
        <input
          type="file"
          name="audio"
          accept="audio/*"
          onChange={handleChange}
          className="border p-2 w-full mb-4"
        />

        {/* Level + SubLevel juntos */}
        <div className="flex gap-4 mb-2">
          <div className="flex-1">
            <label className="block mb-2 font-semibold">Level</label>
            <select
              name="level"
              value={nuevaPregunta.level}
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option value="">Selecciona un nivel</option>
              <option value="1">Nivel 1</option>
              <option value="2">Nivel 2</option>
              <option value="3">Nivel 3</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block mb-2 font-semibold">SubLevel</label>
            <select
              name="sublevel"
              value={nuevaPregunta.sublevel}
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option value="">Selecciona un subnivel</option>
              <option value="A1">Subnivel A1</option>
              <option value="A2">Subnivel A2</option>
              <option value="B1">Subnivel B1</option>
              <option value="B2">Subnivel B2</option>
            </select>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={() => setMostrarModal(false)}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleGuardar}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAgregarVocabulary;
