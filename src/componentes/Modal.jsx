// Modal.js
import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ titulo, children, onClose, onGuardar, mostrar }) => {
  if (!mostrar) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">{titulo}</h3>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="p-4">{children}</div>
        <div className="flex justify-end gap-2 p-4 border-t bg-gray-50">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={onGuardar}>
            Guardar
          </button>
          <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
