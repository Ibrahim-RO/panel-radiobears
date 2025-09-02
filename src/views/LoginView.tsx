import { UserCircleIcon, LockClosedIcon } from "@heroicons/react/24/outline"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ErrorMessage } from "../components/global/ErrorMessage"
import { toast } from "sonner"
import { authenticateUser } from "../api/loginPanel"
import type { AuthPanelForm } from "../schemas/authPanel"
import { useNavigate } from "react-router-dom"

export const LoginView = () => {

  const initialValues: AuthPanelForm = {
    email: '',
    password: ''
  }

  const { register, handleSubmit, formState: { errors } } = useForm({defaultValues: initialValues})

  const queryClient = useQueryClient()
  const navigate= useNavigate()

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user)
      navigate('/dashboard')
    }
  })

  const handleLogin = (formData: AuthPanelForm) => mutate(formData)

  return (
    <>
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="w-60 animation-float " />
      </div>
      <form
        onSubmit={handleSubmit(handleLogin)} 
        className="w-full max-w-lg bg-white/15 p-10 rounded-lg space-y-5 mt-10"
      >
        <div>
          <div className="h-14 flex items-center bg-white-100 p-1">
            <div className="h-full bg-gray-800 p-2.5 rounded-l-lg">
              <UserCircleIcon className="size-7 text-gray-200 " />
            </div>
            <input
              type="email"
              id="email"
              className="w-full h-full border-2 border-gray-800 pl-2 py-2.5 outline-0 rounded-r-lg text-white"
              placeholder="Correo electrónico"
              {...register('email', {
                required: 'El correo es obligatorio',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'El correo no es válido'
                }
              })}
            />
          </div>
        </div>
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

        <div>
          <div className="h-14 flex items-center bg-white-100 p-1">
            <div className="h-full bg-gray-800 p-2.5 rounded-l-lg">
              <LockClosedIcon className="size-7 text-gray-200 " />
            </div>
            <input
              type="password"
              id="password"
              className="w-full h-full border-2 border-gray-800 pl-2 py-2.5 outline-0 rounded-r-lg text-white"
              placeholder="********"
              {...register('password', {
                required: 'La contraseña es obligatoria',
                minLength: {
                  value: 8,
                  message: 'La contraseña debe tener al menos 6 caracteres'
                }
              })}
            />
          </div>
        </div>
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

        <input
          type="submit"
          value="Iniciar sesión"
          className="w-full bg-yellow-400 hover:bg-yellow-500 transition-colors cursor-pointer text-black uppercase font-bold p-3 rounded-lg"
        />
      </form>
    </>
  )
}
