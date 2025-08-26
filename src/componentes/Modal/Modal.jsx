import React from "react";
import "./Modal.css";

function ModalMatch({ onClose, contenido}) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        {contenido}
      </div>
    </div>
  );
}

export default ModalMatch;
