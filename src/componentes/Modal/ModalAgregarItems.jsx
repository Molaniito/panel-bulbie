import React from 'react'

function ModalAgregarItems() {
  return (
   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">

            <h3 className="text-lg font-semibold mb-4">Add Item</h3>

            <input
              type="text"
              name="pregunta"
              placeholder="Pregunta"
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              name="opcion1"
              placeholder="Opción 1"
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              name="opcion2"
              placeholder="Opción 2"
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              name="opcion3"
              placeholder="Opción 3"
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              name="correcta"
              placeholder="Respuesta Correcta"
              className="border p-2 w-full mb-2"
            />
            {/* Audio - file */}
            

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

export default ModalAgregarItems