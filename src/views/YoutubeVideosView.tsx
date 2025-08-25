import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { TrashIcon, PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/solid"
import { Modal } from "../components/global/Modal"
import { toast } from "sonner"
import { ConfirmAction } from "../components/global/ConfirmAction"
import { deleteVideo, getAllVideos } from "../api/youtubeAPI"
import { YoutubeVideoForm } from "../components/YoutubeVideosComponents/YoutubeForm"
import { EditYoutube } from "../components/YoutubeVideosComponents/EditYoutube"

export const YoutubeVideosView = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["youtubeVideos"],
    queryFn: getAllVideos,
  })

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: deleteVideo,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ["youtubeVideos"] })
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
      <h1 className="text-4xl font-extrabold uppercase">Videos de Youtube</h1>

      {/* Modal para crear evento */}
      <Modal
        show={modalCreate}
        setShow={setModalCreate}
        title="Agregar"
        icon={<PlusCircleIcon className="size-5" />}
        color="bg-amber-300 hover:bg-amber-400 font-semibold uppercase"
      >
        <YoutubeVideoForm setShow={setModalCreate} />
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
          <EditYoutube
            setShow={closeEditModal}
            id={eventToEdit}
          />
        </Modal>
      )}

      {data?.length ? (
        <div className="space-y-5">
          {data.map(video => (
            <div
              key={video.id}
              className="max-w-6xl bg-white rounded-2xl shadow-lg flex flex-col lg:flex-row justify-between p-5 gap-3"
            >
              <div>
                <h2 className="text-2xl font-bold">{video.title}</h2>
                <p className="text-gray-700">{video.description}</p>
                <a
                  href={video.youtube_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline" 
                >
                  Ver video
                </a>

                <p><b>Tipo:</b> {video.short ? 'Short' : 'Video'}</p>
              </div>

              {/* Botones */}
              <div className="flex flex-row lg:flex-col justify-normal lg:justify-center gap-3">
                <button
                  className="bg-blue-500 hover:bg-blue-600 transition-colors rounded-lg px-3 py-2 flex items-center gap-2 cursor-pointer text-white"
                  onClick={() => openEditModal(video.id)}
                >
                  <PencilSquareIcon className="size-7" /> Editar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 transition-colors rounded-lg px-3 py-2 flex items-center gap-2 cursor-pointer text-white"
                  onClick={() => openDeleteModal(video.id)}
                >
                  <TrashIcon className="size-7" /> Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-900">No hay videos, añade uno</p>
      )}
    </div>
  )
}
