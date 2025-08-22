import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../../ErrorMessage';
import { toast } from 'sonner';
import type { YoutubeForm, YoutubeType } from '../../../schemas/youtubeSchema';
import { updateVideo } from '../../../api/youtubeAPI';

type UpdateYoutubeProps = {
    data: YoutubeForm
    id: YoutubeType['id'];
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UpdateYoutubeForm = ({ data, id, setShow }: UpdateYoutubeProps) => {

    const initialValues = {
        title: data.title,
        description: data.description,
        url: data.url,
        youtube_link: data.youtube_link,
        short: data.short
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm<YoutubeForm>({ defaultValues: initialValues });

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: updateVideo,
        onError: (error: any) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            reset();
            setShow(false);
            queryClient.invalidateQueries({ queryKey: ["youtubeVideos"] });
            queryClient.invalidateQueries({ queryKey: ["youtubeVideos", id] });
        },
    });

    const handleForm = (formData: YoutubeForm) => {
        const data = {
            formData,
            id
        }
        mutate(data);
    }

    return (
        <>
            <h3 className='text-3xl uppercase text-center font-bold border-b-4 border-b-amber-950'>
                Editar Video de Youtube
            </h3>

            <form onSubmit={handleSubmit(handleForm)} className='w-full space-y-3'>
                <div className='flex flex-col gap-3'>
                    <label htmlFor='name' className='text-sm uppercase font-bold'>Nombre del video</label>
                    <input
                        type='text'
                        id='title'
                        className='bg-slate-100 p-2'
                        {...register('title', { required: 'El nombre es obligatorio' })}
                    />
                    {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
                </div>

                <div className='flex flex-col gap-3'>
                    <label htmlFor='description' className='text-sm uppercase font-bold'>Descripción</label>
                    <input
                        type='text'
                        id='description'
                        className='bg-slate-100 p-2'
                        {...register('description', { required: 'La descripción es obligatoria' })}
                    />
                    {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
                </div>

                <div className='flex flex-col gap-3'>
                    <label htmlFor='url' className='text-sm uppercase font-bold'>URL</label>
                    <input
                        type='text'
                        id='url'
                        className='bg-slate-100 p-2'
                        {...register('url', { required: 'La URL es obligatoria' })}
                    />
                    {errors.url && <ErrorMessage>{errors.url.message}</ErrorMessage>}   
                </div>
                <div className='flex flex-col gap-3'>
                    <label htmlFor='youtube_link' className='text-sm uppercase font-bold'>Link de Youtube</label>
                    <input
                        type='text'
                        id='youtube_link'
                        className='bg-slate-100 p-2'
                        {...register('youtube_link', { required: 'El link de Youtube es obligatorio' })}
                    />
                    {errors.youtube_link && <ErrorMessage>{errors.youtube_link.message}</ErrorMessage>}
                </div>
                <div className='flex flex-col gap-3'>
                    <label htmlFor='short' className='text-sm uppercase font-bold'>Short</label>
                    <input
                        type='text'
                        id='short'
                        className='bg-slate-100 p-2'
                        {...register('short', { required: 'El short es obligatorio' })}
                    />
                    {errors.short && <ErrorMessage>{errors.short.message}</ErrorMessage>}
                </div>

                

                <input
                    type='submit'
                    value='Guardar Cambios'
                    className='bg-amber-300 hover:bg-amber-400 transition-colors w-full p-2 rounded-lg font-bold uppercase cursor-pointer'
                />
            </form>
        </>
    );
};
