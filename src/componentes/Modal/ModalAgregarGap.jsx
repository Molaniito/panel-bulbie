import React from 'react'

function ModalAgregarGap() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">

            <h3 className="text-lg font-semibold mb-4">Add Gap</h3>

            <input
              type="text"
              name="text1"
              placeholder="Text 1"
              className="border p-2 w-full mb-2"
            />

            <input
              type="text"
              name="word1"
              placeholder="Word 1"
              className="border p-2 w-full mb-2"
            />

            <input
              type="text"
              name="word2"
              placeholder="Word 2"
              className="border p-2 w-full mb-2"
            />

            <input
              type="text"
              name="word3"
              placeholder="Word 3"
              className="border p-2 w-full mb-2"
            />

            <input
              type="text"
              name="word4"
              placeholder="Word 4"
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
  )
}

export default ModalAgregarGap