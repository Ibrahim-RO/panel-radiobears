import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { HostFormType, HostType } from '../../schemas/hostSchema';
import { updateHost } from '../../api/hostsAPI';
import { ErrorMessage } from '../global/ErrorMessage';

type UpdateHostProps = {
  data: HostFormType & { image?: string };
  id: HostType['id'];
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UpdateHostForm = ({ data, id, setShow }: UpdateHostProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(data.image || null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<HostFormType>({
    defaultValues: {
      name: data.name,
      description: data.description,
      age: data.age
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateHost,
    onError: (error: any) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
      setShow(false);
      queryClient.invalidateQueries({ queryKey: ['hosts'] });
      queryClient.invalidateQueries({ queryKey: ['host', id] });
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selected);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const selected = e.dataTransfer.files?.[0];
    if (selected) {
      setFile(selected);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selected);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => e.preventDefault();

  const handleForm = (formData: Omit<HostFormType, "image">) => {
    const dataToSend = new FormData();
    dataToSend.append("name", formData.name);
    dataToSend.append("description", formData.description);
    dataToSend.append("age", formData.age)

    if (file) {
      dataToSend.append("image", file);
    }

    mutate({ id, formData: dataToSend });
  };

  return (
    <>
      <h3 className='text-3xl uppercase text-center font-bold border-b-4 border-b-amber-950'>
        Editar Host
      </h3>

      <form onSubmit={handleSubmit(handleForm)} className='w-full space-y-3'>
        <div className='flex flex-col gap-3'>
          <label htmlFor='name' className='text-sm uppercase font-bold'>Nombre del Host</label>
          <input
            type='text'
            id='name'
            className='bg-slate-100 p-2'
            {...register('name', { required: 'El nombre es obligatorio' })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
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
          <label htmlFor='age' className='text-sm uppercase font-bold'>Edad</label>
          <input
            type='text'
            id='age'
            className='bg-slate-100 p-2'
            {...register('age', { required: 'La edad es obligatoria' })}
          />
          {errors.age && <ErrorMessage>{errors.age.message}</ErrorMessage>}
        </div>

        <div className='flex flex-col gap-3'>
          <label className='text-sm uppercase font-bold'>Imagen</label>
          <label
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className='flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition overflow-hidden'
          >
            {preview ? (
              <img src={preview} alt='Vista previa' className='h-full object-contain' />
            ) : (
              <span className='text-gray-500 text-sm'>Arrastra y suelta una imagen aquí o haz clic para seleccionar</span>
            )}
            <input type='file' accept='image/*' className='hidden' onChange={handleImageChange} />
          </label>
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
