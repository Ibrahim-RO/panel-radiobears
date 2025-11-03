import axios from "axios"

const API_URL = "http://localhost:4000/api/news"

export const getAllNews = async () => {
  const { data } = await axios.get(API_URL)
  return data
}

export const deleteNews = async (id: number) => {
  const { data } = await axios.delete(`${API_URL}/${id}`)
  return data.message || "Noticia eliminada"
}
