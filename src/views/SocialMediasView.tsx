import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllSocialMedias, toggleSocialMedia, updateSocialMedia } from "../api/socialMedias"
import type { JSX } from "react"
import { toast } from "sonner"
import type { SocialMediaForm, SocialMediaType } from "../schemas/socialMediaSchema"
import { SocialMediaItem } from "../components/SocialMediaItem"

export const SocialMediasView = () => {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ["socialMedias"],
    queryFn: getAllSocialMedias,
  })

  console.log(data)

  const updateSocial = useMutation({
    mutationFn: updateSocialMedia,
    onSuccess: (msg) => {
      toast.success(msg)
      queryClient.invalidateQueries({ queryKey: ["socialMedias"] })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  type UpdateSocialProps = {
    formData: SocialMediaForm
    id: SocialMediaType["id"]
  }

  const handleUpdateSocial = ({ formData, id }: UpdateSocialProps) => {
    updateSocial.mutate({ formData, id })
  }

  const toggleSocial = useMutation({
    mutationFn: toggleSocialMedia,
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ["socialMedias"] })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleToggleSocial = (id: SocialMediaType["id"]) => {
    toggleSocial.mutate(id)
  }

  if (isLoading) return "Cargando..."

  // Mapa de íconos
  const iconMap: Record<string, JSX.Element> = {
    X: <i className="fa-brands fa-x-twitter text-2xl"></i>,
    Youtube: <i className="fa-brands fa-youtube text-3xl"></i>,
    Kick: <i className="fa-brands fa-kickstarter text-2xl"></i>,
    Discord: <i className="fa-brands fa-discord text-2xl"></i>,
    Tiktok: <i className="fa-brands fa-tiktok text-2xl"></i>,
    Instagram: <i className="fa-brands fa-instagram text-3xl"></i>,
  }

  // Mapa de colores
  const colorMap: Record<string, string> = {
    X: "bg-neutral-900 text-white",
    Youtube: "bg-[#FF0000] text-white",
    Kick: "bg-green-600 text-white",
    Discord: "bg-[#5865F2] text-white",
    Tiktok: "bg-neutral-900 text-white",
    Instagram:
      "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white",
  }

  return (
    <div className="space-y-5">
      <h1 className="text-4xl font-extrabold uppercase">Redes sociales</h1>

      {data?.length ? (
        <div className="space-y-5">
          {data.map((social) => (
            <>
              <SocialMediaItem
                key={social.id}
                social={social}
                icon={iconMap[social.name] || <i className="fa-solid fa-link"></i>}
                color={colorMap[social.name] || "bg-gray-200"}
                onUpdate={handleUpdateSocial}
                onToggle={handleToggleSocial}
              />
            </>

          ))}
        </div>
      ) : (
        <p className="text-gray-900">No hay redes sociales, añade uno</p>
      )}
    </div>
  )
}
