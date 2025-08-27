import React, { useState } from "react";

function ModalAgregarMatch({ onGuardar }) {
  const [imgs, setImgs] = useState("");
  const [words, setWords] = useState("");
  const [defs, setDefs] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevo = {
      id: Date.now(),
      imgs: imgs.split(","),
      words: words.split(","),
      defs: defs.split(","),
    };

    onGuardar(nuevo);

    setImgs("");
    setWords("");
    setDefs("");
  };

  return (
    <div>
      <h3>Agregar Registro</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Emojis (🌳, 🚗, 🐶)"
          value={imgs}
          onChange={(e) => setImgs(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Palabras (Tree, Car, Dog)"
          value={words}
          onChange={(e) => setWords(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Definiciones (A plant..., A vehicle...)"
          value={defs}
          onChange={(e) => setDefs(e.target.value)}
        />
        <br />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default ModalAgregarMatch;
