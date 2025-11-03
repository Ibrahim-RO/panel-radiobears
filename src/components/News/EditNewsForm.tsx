import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { api } from "../../lib/api"
import { RichTextEditor } from "./RichTextEditor"

export const EditNewsForm = ({ id, setShow }: { id: number; setShow: (v: boolean) => void }) => {
  const { register, handleSubmit, reset } = useForm()
  const queryClient = useQueryClient()
  const [content, setContent] = useState("")

  // ✅ Hook para cargar noticia
  const { data, isLoading } = useQuery({
    queryKey: ["news", id],
    queryFn: async () => {
      const { data } = await api.get(`/news/${id}`)
      return data
    },
  })

  // ✅ Efecto para llenar el formulario cuando llegan los datos
  useEffect(() => {
    if (data) {
      reset(data)
      setContent(data.content)
    }
  }, [data, reset])

  // ✅ Mutación para actualizar
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.put(`/news/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      return data
    },
    onSuccess: () => {
      toast.success("Noticia actualizada correctamente")
      queryClient.invalidateQueries({ queryKey: ["news"] })
      setShow(false)
    },
    onError: (error: any) => toast.error(error.message),
  })

  // ✅ Enviar formulario
  const onSubmit = (data: any) => {
    const formData = new FormData()
    formData.append("title", data.title)
    formData.append("content", content)
    if (data.image?.[0]) formData.append("image", data.image[0])
    mutation.mutate(formData)
  }

  if (isLoading) return <p className="text-center py-4">Cargando noticia...</p>

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("title", { required: true })}
        placeholder="Título"
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none"
      />

      <RichTextEditor value={content} onChange={setContent} />

      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">Imagen (opcional)</label>
        <input
          type="file"
          {...register("image")}
          accept="image/*"
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setShow(false)}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="bg-amber-400 hover:bg-amber-500 text-white px-4 py-2 rounded"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Actualizando..." : "Actualizar"}
        </button>
      </div>
    </form>
  )
}
