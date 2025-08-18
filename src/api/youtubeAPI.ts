import { isAxiosError } from "axios"
import { api } from "../lib/api"
import { youtubeSchema, type YoutubeForm, type YouubeType } from "../schemas/youtubeSchema"

export const getAllVideos = async () => {
    try {
        const { data } = await api('youtube/videos-youtube') 
        const response = youtubeSchema.safeParse(data)
        if(response.success) return response.data       
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const createVideo = async (formData: YoutubeForm) => {
    try {
        const { data } = await api.post<string>('youtube/create-video', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const getVideoById = async (id: YouubeType['id']) => {
    try {
        const { data } = await api<string>(`youtube/video-youtube/${id}`)
        return data        
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

type YoutubeAPIType = {
    id: YouubeType['id']
    formData: YoutubeForm
}

export const updateVideo = async ({ id, formData } : YoutubeAPIType) => {
    try {
        const { data } = await api.put<string>(`youtube/update-video/${id}`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const deleteVideo = async (id: YouubeType['id']) => {
    try {
        const { data } = await api.delete<string>(`youtube/delete-video/${id}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}