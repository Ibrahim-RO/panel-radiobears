import { api } from "../lib/api"

export const getAllNews = async () => {
  const { data } = await api('news')
  return data
}

export const deleteNews = async (id: number) => {
  const { data } = await api.delete(`news/${id}`)
  return data.message || "Noticia eliminada"
}
