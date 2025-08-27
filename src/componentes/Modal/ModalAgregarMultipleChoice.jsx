import React from 'react'

function ModalAgregarMultipleChoice() {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <h3 className="text-lg font-semibold mb-4">
          Add Multiple Choice Question
        </h3>

        <input
          type="text"
          name="instruction"
          placeholder="Instruction"
          className="border p-2 w-full mb-2"
        />

        <input
          type="text"
          name="text"
          placeholder="Text"
          className="border p-2 w-full mb-2"
        />

        <input
          type="text"
          name="items"
          placeholder="Items (comma separated)"
          className="border p-2 w-full mb-2"
        />

        {/* Audio - file */}
        <label className="block mb-2 font-semibold">Audio</label>
        <input
          type="file"
          name="audio"
          accept="audio/*"
          className="border p-2 w-full mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAgregarMultipleChoice