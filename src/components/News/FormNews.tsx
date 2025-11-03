import { useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { api } from "../../lib/api"
import { RichTextEditor } from "./RichTextEditor"

export const FormNews = ({ setShow }: { setShow: (v: boolean) => void }) => {
    const { register, handleSubmit, reset } = useForm()
    const queryClient = useQueryClient()
    const [content, setContent] = useState("")

    const { mutate } = useMutation({
        mutationFn: async (formData: FormData) => {
            const { data } = await api.post("/news", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            return data
        },
        onSuccess: () => {
            toast.success("Noticia creada correctamente")
            queryClient.invalidateQueries({ queryKey: ["news"] })
            reset()
            setShow(false)
        },
        onError: (error: any) => toast.error(error.message),
    })

    const onSubmit = (data: any) => {
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("content", content)
        if (data.image[0]) formData.append("image", data.image[0])
        mutate(formData)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input {...register("title", { required: true })} placeholder="Título" className="w-full p-2 border rounded" />

            <RichTextEditor value={content} onChange={setContent} />

            <input type="file" {...register("image")} accept="image/*" className="w-full" />

            <button type="submit" className="bg-amber-400 hover:bg-amber-500 text-white px-4 py-2 rounded">
                Guardar
            </button>
        </form>
    )
}
