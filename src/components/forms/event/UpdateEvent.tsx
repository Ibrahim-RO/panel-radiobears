import React, { useState } from 'react'
import type { EventFormType, EventType } from '../../../schemas/eventSchema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../../ErrorMessage';
import { updateEvent } from '../../../api/eventsAPI';
import { toast } from 'sonner';

type UpdateEventProps = {
    data: EventFormType
    id: EventType['id']
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export const UpdateEvent = ({ data, id, setShow } : UpdateEventProps) => {
    
    const [preview, setPreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
    };

    const initialValues: EventFormType = {
        name: data.name,
        description: data.description,
        image: "",
        dateEvent: data.dateEvent.split("T")[0]
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: updateEvent,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            setShow(false)
            queryClient.invalidateQueries({queryKey: ["events"]})
            queryClient.invalidateQueries({queryKey: ["event", id]})
        }
    })

    const handleForm = (formData: EventFormType) => {
        mutate({formData, id})
    }

    return (
        <>
            <h3 className='text-3xl uppercase text-center font-bold border-b-4 border-b-amber-950'>
                Editar Evento
            </h3>

            <form
                onSubmit={handleSubmit(handleForm)}
                className='w-full space-y-3'
            >
                <div className='flex flex-col gap-3'>
                    <label htmlFor="name" className="text-sm uppercase font-bold">
                        Nombre del Evento
                    </label>
                    <input
                        type="text"
                        id='name'
                        className="bg-slate-100 p-2"
                        placeholder='Nombre del evento...'
                        {...register("name", {
                            required: "El nombre es obligatorio"
                        })}
                    />
                </div>
                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

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
                    <label htmlFor="date" className="text-sm uppercase font-bold">
                        Fecha
                    </label>
                    <input
                        type="date"
                        id='date'
                        className="bg-slate-100 p-2"
                        {...register("dateEvent", {
                            required: "La fecha es obligatoria"
                        })}
                    />
                </div>
                {errors.dateEvent && <ErrorMessage>{errors.dateEvent.message}</ErrorMessage>}

                <div className='flex flex-col gap-3'>
                    <label htmlFor="image" className="text-sm uppercase font-bold">
                        Imagen
                    </label>

                    <label
                        htmlFor="image"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition overflow-hidden"
                    >
                        {preview ? (
                            <img src={preview} alt="Vista previa" className="h-full object-contain" />
                        ) : (
                            <>
                                <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 014-4h14m-6 4l4-4m0 0l4 4m-4-4v12" />
                                </svg>
                                <span className="text-gray-500 text-sm">Arrastra y suelta una imagen aquí</span>
                                <span className="text-gray-400 text-xs">o haz clic para seleccionar</span>
                            </>
                        )}
                        <input id="image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                </div>

                <input
                    type="submit"
                    value="Guardar Evento"
                    className='bg-amber-300 hover:bg-amber-400 transition-colors w-full p-2 rounded-lg font-bold uppercase cursor-pointer'
                />
            </form>
        </>
    );
}
