import React from "react";
import "./Modal.css";
import Ejemplo from "./Ejemplo";

function ModalMatch({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <Ejemplo/>
      </div>
    </div>
  );
}

export default ModalMatch;
