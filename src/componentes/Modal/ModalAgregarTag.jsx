import React, { useState } from 'react';

function ModalAgregarTag() {
    const [nuevoTag, setNuevoTag] = useState({
    image: "",
    writingFields: ["", "", "", "", ""],
    audio: "",
  });

  // Manejar cambios en el modal
  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    if (name === "writingFields" && index !== null) {
      const nuevasFields = [...nuevoTag.writingFields];
      nuevasFields[index] = value;
      setNuevoTag({ ...nuevoTag, writingFields: nuevasFields });
    } else {
      setNuevoTag({ ...nuevoTag, [name]: value });
    }
  };

  // Guardar nuevo registro
  const handleGuardar = () => {
    const nuevo = { ...nuevoTag, id: Date.now() };
    setDatosEjemplo([...datosEjemplo, nuevo]);
    setNuevoTag({ image: "", writingFields: ["", "", "", "", ""], audio: "" });
    setMostrarModal(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">

        <h3 className="text-lg font-semibold mb-4">Add Tag</h3>

        {/* Image - file */}
        <label className="block mb-2 font-semibold">Image</label>
        <input
          type="file"
          name="imagen"
          accept="image/*"
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        {nuevoTag.writingFields.map((field, index) => (
          <input
            key={index}
            type="text"
            name="writingFields"
            placeholder={`WritingField ${index + 1}`}
            value={field}
            onChange={(e) => handleChange(e, index)}
            className="border p-2 w-full mb-2"
          />
        ))}

        {/* Audio - file */}
        <label className="block mb-2 font-semibold">Audio</label>
        <input
          type="file"
          name="audio"
          accept="audio/*"
          onChange={handleChange}
          className="border p-2 w-full mb-4"
        />

        <div className="flex justify-end gap-2">
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

export default ModalAgregarTag;
