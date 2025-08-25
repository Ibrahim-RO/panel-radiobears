import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { TrashIcon, PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/solid"
import { Modal } from "../components/global/Modal"
import { deleteEvent, getAllEvents } from "../api/eventsAPI"
import { toast } from "sonner"
import { ConfirmAction } from "../components/global/ConfirmAction"
import { FormEvent } from "../components/EventComponents/FormEvent"
import { EditEventForm } from "../components/EventComponents/EditEventForm"

export const UsersView = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: getAllEvents,
  })

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: deleteEvent,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ["events"] })
    }
  })

  // MODALES

  const [modalCreate, setModalCreate] = useState(false)
  const [eventToEdit, setEventToEdit] = useState<number | null>(null)
  const [modalDelete, setModalDelete] = useState(false)
  const [eventToDelete, setEventToDelete] = useState<number | null>(null)

  const openEditModal = (id: number) => {
    setEventToEdit(id)
  }

  const closeEditModal = () => {
    setEventToEdit(null)
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
      <h1 className="text-4xl font-extrabold uppercase">Usuarios</h1>

      {/* Modal para crear evento */}
      <Modal
        show={modalCreate}
        setShow={setModalCreate}
        title="Agregar"
        icon={<PlusCircleIcon className="size-5" />}
        color="bg-amber-300 hover:bg-amber-400 font-semibold uppercase"
      >
        <FormEvent setShow={setModalCreate} />
      </Modal>

      {/* Modal para confirmar eliminación */}
      <ConfirmAction
        isOpen={modalDelete}
        onClose={() => setModalDelete(false)}
        onConfirm={confirmDelete}
      />

      {/* Modal para editar evento */}
      {eventToEdit !== null && (
        <Modal
          show={true}
          setShow={closeEditModal}
          title="Editar"
          icon={<PencilSquareIcon className="size-7" />}
          color="hidden bg-blue-500 hover:bg-blue-600 text-white"
        >
          <EditEventForm
            setShow={closeEditModal}
            id={eventToEdit}
          />
        </Modal>
      )}

      {data?.length ? (
        <div className="space-y-5">
          {data.map(evento => (
            <div
              key={evento.id}
              className="max-w-6xl bg-white rounded-2xl shadow-lg flex flex-col lg:flex-row justify-between p-5 gap-3"
            >
              {/* Imagen */}
              <img
                src="https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2020/12/01/16068171341967.jpg"
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
                  <p className="font-bold">Fecha del evento</p>
                  <p>{evento.dateEvent}</p>
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
      ) : (
        <p className="text-gray-900">No hay usuarios, añade uno</p>
      )}
    </div>
  )
}
