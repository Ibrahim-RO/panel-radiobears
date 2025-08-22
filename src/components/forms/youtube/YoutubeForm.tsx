import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorMessage } from "../../ErrorMessage";
import { toast } from "sonner";
import { createVideo } from "../../../api/youtubeAPI";
import type { YoutubeForm } from "../../../schemas/youtubeSchema";

export const YoutubeVideoForm = ({ setShow }: { setShow: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const initialValues: YoutubeForm = {
        title: '',
        description: '',
        url: '',
        youtube_link: '',
        short: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: createVideo,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ["youtubeVideos"] })
            setShow(false)
            reset()
        }
    })

    const handleForm = (formData: YoutubeForm) => mutate(formData);

    return (
        <>
            <h3 className='text-3xl uppercase text-center font-bold border-b-4 border-b-amber-950'>
                Agregar Nuevo Video de YouTube
            </h3>

            <form
                onSubmit={handleSubmit(handleForm)}
                className='w-full space-y-3'
            >
                <div className='flex flex-col gap-3'>
                    <label htmlFor="name" className="text-sm uppercase font-bold">
                        Título del Video
                    </label>
                    <input
                        type="text"
                        id='title'
                        className="bg-slate-100 p-2"
                        placeholder='Título del video...'
                        {...register("title", {
                            required: "El título es obligatorio"
                        })}
                    />
                </div>
                {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}

                <div className='flex flex-col gap-3'>
                    <label htmlFor="description" className="text-sm uppercase font-bold">
                        Descripción
                    </label>
                    <input
                        type="text"
                        id='description'
                        className="bg-slate-100 p-2"
                        placeholder='Descripción...'
                        {...register("description", {
                            required: "La descripción es obligatoria"
                        })}
                    />
                </div>
                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}

                <div className='flex flex-col gap-3'>
                    <label htmlFor="url" className="text-sm uppercase font-bold">
                        URL del Video
                    </label>
                    <input
                        type="text"
                        id='url'
                        className="bg-slate-100 p-2"
                        placeholder='URL del video...'
                        {...register("url", {
                            required: "La URL es obligatoria"
                        })}
                    />
                </div>
                {errors.url && <ErrorMessage>{errors.url.message}</ErrorMessage>}

                <div className='flex flex-col gap-3'>
                    <label htmlFor="youtube_link" className="text-sm uppercase font-bold">
                        Enlace de YouTube
                    </label>
                    <input
                        type="text"
                        id='youtube_link'
                        className="bg-slate-100 p-2"
                        placeholder='Enlace de YouTube...'
                        {...register("youtube_link", {
                            required: "El enlace de YouTube es obligatorio"
                        })}
                    />
                </div>
                {errors.youtube_link && <ErrorMessage>{errors.youtube_link.message}</ErrorMessage>}

                <div className='flex flex-col gap-3'>
                    <label htmlFor="short" className="text-sm uppercase font-bold">
                        Tipo de Video
                    </label>
                    <select
                        id='short'
                        className="bg-slate-100 p-2"
                        {...register("short", {
                            required: "El tipo de video es obligatorio"
                        })}
                    >
                        <option value="">Seleccione un tipo</option>
                        <option value="short">Short</option>
                        <option value="video">Video</option>
                    </select>
                </div>
                {errors.short && <ErrorMessage>{errors.short.message}</ErrorMessage>}

                <input
                    type="submit"
                    value="Guardar Video"
                    className='bg-amber-300 hover:bg-amber-400 transition-colors w-full p-2 rounded-lg font-bold uppercase cursor-pointer'
                />
            </form>
        </>
    );
};
