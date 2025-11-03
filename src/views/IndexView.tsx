import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { TrashIcon, PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/solid"
import { toast } from "sonner"
import { Modal } from "../components/global/Modal"
import { ConfirmAction } from "../components/global/ConfirmAction"
import { deleteNews, getAllNews } from "../api/newsAPI"
import { EditNewsForm } from "../components/News/EditNewsForm"
import { FormNews } from "../components/News/FormNews"

type Noticia = {
  id: number
  title: string
  summary: string
  content: string
  image?: string
  date?: string
}


export const IndexView = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: getAllNews,
  })

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: deleteNews,
    onError: (error: any) => toast.error(error.message),
    onSuccess: (msg: string) => {
      toast.success(msg)
      queryClient.invalidateQueries({ queryKey: ["news"] })
    }
  })

  // Estado de modales
  const [modalCreate, setModalCreate] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [modalEdit, setModalEdit] = useState<number | null>(null)

  const openEditModal = (id: number) => setModalEdit(id)
  const closeEditModal = () => setModalEdit(null)

  const [newsToDelete, setNewsToDelete] = useState<number | null>(null)

  const openDeleteModal = (id: number) => {
    setNewsToDelete(id)
    setModalDelete(true)
  }

  const confirmDelete = () => {
    if (newsToDelete !== null) {
      mutate(newsToDelete)
      setNewsToDelete(null)
      setModalDelete(false)
    }
  }

  if (isLoading) return <p>Cargando noticias...</p>

  return (
    <div className="space-y-5">
      <h1 className="text-4xl font-extrabold uppercase">Noticias</h1>

      {/* Modal Crear */}
      <Modal
        show={modalCreate}
        setShow={setModalCreate}
        title="Agregar Noticia"
        icon={<PlusCircleIcon className="size-6" />}
        color="bg-amber-300 hover:bg-amber-400 font-semibold uppercase"
      >
        <FormNews setShow={setModalCreate} />
      </Modal>

      {/* Modal Confirmar eliminación */}
      <ConfirmAction
        isOpen={modalDelete}
        onClose={() => setModalDelete(false)}
        onConfirm={confirmDelete}
      />

      {/* Modal Editar */}
      {modalEdit !== null && (
        <Modal
          show={true}
          setShow={closeEditModal}
          title="Editar Noticia"
          icon={<PencilSquareIcon className="size-7" />}
          color="hidden bg-blue-500 hover:bg-blue-600 text-white"
        >
          <EditNewsForm id={modalEdit} setShow={closeEditModal} />
        </Modal>
      )}

      {/* Lista de noticias */}
      {data?.length ? (
        <div className="space-y-5">
          {data.map((noticia: Noticia) => (
            <div
              key={noticia.id}
              className="max-w-6xl bg-white rounded-2xl shadow-lg flex flex-col lg:flex-row justify-between p-5 gap-4"
            >
              {/* Imagen */}
              {noticia.image && (
                <img
                  src={noticia.image}
                  alt={noticia.title}
                  className="w-full md:w-auto lg:size-40 rounded-xl object-cover"
                />
              )}

              {/* Contenido */}
              <div className="flex-1 lg:px-5 space-y-3">
                <h2 className="text-2xl lg:text-3xl font-bold">{noticia.title}</h2>
                <div
                  className="prose max-w-none text-gray-800 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: noticia.content }}
                ></div>
              </div>

              {/* Botones */}
              <div className="flex flex-row lg:flex-col justify-normal lg:justify-center gap-3">
                <button
                  className="bg-blue-500 hover:bg-blue-600 transition-colors rounded-lg px-3 py-2 flex items-center gap-2 cursor-pointer text-white"
                  onClick={() => openEditModal(noticia.id)}
                >
                  <PencilSquareIcon className="size-6" /> Editar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 transition-colors rounded-lg px-3 py-2 flex items-center gap-2 cursor-pointer text-white"
                  onClick={() => openDeleteModal(noticia.id)}
                >
                  <TrashIcon className="size-6" /> Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-900">No hay noticias, agrega una nueva</p>
      )}

    </div>
  )
}
