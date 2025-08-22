import { useQuery} from "@tanstack/react-query"
import { getAllSocialMedias } from "../api/socialMedias"

export const SocialMediasView = () => {

  const { data, isLoading } = useQuery({
    queryKey: ["socialMedias"],
    queryFn: getAllSocialMedias,
  })

  if (isLoading) return 'Cargando...'

  const socialMedias = [
    { name: "X", icon: <i className="fa-brands fa-x-twitter"></i>, url: "https://x.com/TheRadioBear" },
    { name: "Youtube", icon: <i className="fa-brands fa-youtube text-3xl"></i>, url: "https://www.youtube.com/channel/UCB2WkR_4U9Gn-2NmwB7Clpg" },
    { name: "Kick", icon: <i className="fa-brands fa-kickstarter"></i>, url: "https://kick.com/radiobearss" },
    { name: "Tiktok", icon: <i className="fa-brands fa-tiktok"></i>, url: "http://tiktok.com/@radiobearss" },
    { name: "Instagram", icon: <i className="fa-brands fa-instagram text-3xl"></i>, url: "https://www.instagram.com/radiobears?igsh=dXppcDR2MGpybGJp" },
  ]

  const colorMap: Record<string, string> = {
    X: "bg-neutral-900 text-white hover:bg-neutral-800",
    Youtube: "bg-[#FF0000] text-white hover:bg-[#cc0000]", 
    Kick: "bg-green-600 text-black hover:bg-green-700 ", 
    Tiktok: "bg-neutral-900 text-white hover:bg-neutral-800",
    Instagram: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white hover:brightness-90",
  };

  return (
    <div className="space-y-5">
      <h1 className="text-4xl font-extrabold uppercase">Redes sociales</h1>

      {data?.length ? (
        <div className="space-y-5">
          {socialMedias.map((social, idx) => (
            <section
              key={idx}
              className="max-w-6xl flex justify-between"
            >
              <input type="checkbox" name="" id="" />
              {social.icon}
              <input
                type="text"
                name="url"
                id="url"
                value={social.url}
                className="bg-slate-100 border border-slate-300 p-2 rounded-lg outline-0"
              />
            </section>
          ))}
        </div>
      ) : (
        <p className="text-gray-900">No hay redes sociales, añade uno</p>
      )}
    </div>
  )
}
