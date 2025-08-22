import { useState } from "react"
import { PencilSquareIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Modal } from "../components/Modal"
import { deleteHost, getAllHost } from "../api/hostsAPI"
import { HostForm } from "../components/forms/hosts/HostForm"
import { toast } from "sonner"
import { EditHost } from "../components/forms/hosts/EditHost"
import { ConfirmAction } from "../components/ConfirmAction"

export const HostsView = () => {

  const [modalCreate, setModalCreate] = useState(false)
  const [hostToEdit, setHostToEdit] = useState<number | null>(null)
  const [modalDelete, setModalDelete] = useState(false)
  const [eventToDelete, setEventToDelete] = useState<number | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ["hosts"],
    queryFn: getAllHost,
    retry: 3
  })

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: deleteHost,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ["hosts"] })
    }
  })

  const openEditModal = (id: number) => {
    setHostToEdit(id)
  }

  const closeEditModal = () => {
    setHostToEdit(null)
  }

  const openDeleteModal = (id: number) => {
    setEventToDelete(id)
    setModalDelete(true)
  }

  const confirmDelete = () => {
    if (eventToDelete !== null) {
      mutate(eventToDelete)
      setEventToDelete(null)
      setModalDelete(false)
    }
  }
  if (isLoading) return 'Cargando...'

  return (
    <div className="space-y-5">
      <h1 className="text-4xl font-extrabold uppercase">Hosts</h1>

      <Modal
        show={modalCreate}
        setShow={setModalCreate}
        title="Agregar"
        icon={<PlusCircleIcon className="size-5" />}
        color="bg-amber-300 hover:bg-amber-400 font-semibold uppercase"
      >
        <HostForm setShow={setModalCreate} />
      </Modal>

      {/* Modal para confirmar eliminación */}
      <ConfirmAction
        isOpen={modalDelete}
        onClose={() => setModalDelete(false)}
        onConfirm={confirmDelete}
      />

      {hostToEdit !== null && (
        <Modal
          show={true}
          setShow={closeEditModal}
          title="Agregar"
          icon={<PlusCircleIcon className="size-5" />}
          color="hidden bg-amber-300 hover:bg-amber-400 font-semibold uppercase"
        >
          <EditHost
            setShow={closeEditModal}
            id={hostToEdit}
          />
        </Modal>
      )}

      {data ? (
        <div className="space-y-5">
          {data.map(evento => (
            <div
              key={evento.id}
              className="max-w-6xl bg-white rounded-2xl shadow-lg flex flex-col lg:flex-row justify-between p-5 gap-3"
            >
              {/* Imagen */}
              <img
                src={evento.image || ''}
                alt={evento.name}
                className="w-full md:w-auto lg:size-40 rounded-xl object-cover"
              />

              {/* Texto */}
              <div className="flex-1 lg:px-5 space-y-3">
                <p className="text-2xl lg:text-3xl font-bold">{evento.name}</p>

                <div>
                  <p className="font-bold">Descripción</p>
                  <p>{evento.description}</p>
                </div>

                <div>
                  <p className="font-bold">Edad</p>
                  <p>{evento.age}</p>
                </div>
              </div>

              {/* Botones */}
              <div className="flex flex-row lg:flex-col justify-normal lg:justify-center gap-3">
                <button
                  className="bg-blue-500 hover:bg-blue-600 transition-colors rounded-lg px-3 py-2 flex items-center gap-2 cursor-pointer text-white"
                  onClick={() => openEditModal(evento.id)}
                >
                  <PencilSquareIcon className="size-7" /> Editar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 transition-colors rounded-lg px-3 py-2 flex items-center gap-2 cursor-pointer text-white"
                  onClick={() => openDeleteModal(evento.id)}
                >
                  <TrashIcon className="size-7" /> Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )
        : (
          <p className="text-gray-900">No hay hosts registrados, añade uno</p>
        )}

    </div>
  )
}
