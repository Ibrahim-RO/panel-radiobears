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
    email: "",
    password: "",
  }

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialValues,
  })

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user)
      navigate("/dashboard")
    },
  })

  const handleLogin = (formData: AuthPanelForm) => mutate(formData)

  return (
    <div className="w-lg flex flex-col justify-center items-center bg-white/10 rounded-2xl text-white p-10">
      {/* Logo */}
      <div className="flex flex-col items-center mb-6">
        <img src="/logo.png" alt="Logo" className="w-40 animate-pulse" />
        <h1 className="text-3xl font-bold mt-4">Bienvenido</h1>
        <p className="text-gray-400 text-sm">Inicia sesión para continuar</p>
      </div>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-xl space-y-6"
      >
        <div>
          <div className="h-14 flex items-center bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden transition">
            <div className="h-full flex justify-center items-center bg-gray-800 p-3">
              <UserCircleIcon className="size-6 text-gray-300" />
            </div>
            <input  
              type="email"
              id="email"
              className="w-full h-full bg-transparent px-3 py-2 outline-none text-white"
              placeholder="Correo electrónico"
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "El correo no es válido",
                },
              })}
            />
          </div>
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <div>
          <div className="h-14 flex items-center bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden transition">
            <div className="h-full flex justify-center items-center bg-gray-800 p-3">
              <LockClosedIcon className="size-6 text-gray-300" />
            </div>
            <input
              type="password"
              id="password"
              className="w-full h-full bg-transparent px-3 py-2 outline-none text-white"
              placeholder="Contraseña"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 8,
                  message: "Debe tener al menos 8 caracteres",
                },
              })}
            />
          </div>
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 transition-all cursor-pointer text-black font-bold py-3 rounded-lg shadow-lg uppercase tracking-wide"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  )
}
