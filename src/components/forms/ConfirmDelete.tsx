export const ConfirmDelete = () => {

    const onClose = () => {}
    const onConfirm = () => {}

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Confirmar Eliminación</h2>
            <p className="text-gray-600">
                ¿Estás seguro de que quieres eliminar este elemento? Esta acción no se puede deshacer.
            </p>

            <div className="flex justify-end gap-3">
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg text-gray-800 transition-colors"
                >
                    Cancelar
                </button>
                <button
                    onClick={onConfirm}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                    Eliminar
                </button>
            </div>
        </div>

    )
}
