import { isAxiosError } from "axios"
import { api } from "../lib/api"

export const getAllVideos = async () => {
    try {
        const { data } = await api('')        
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const createVideo = async () => {
    try {
        const { data } = await api.post('')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const getVideoById = async () => {
    try {
        const { data } = await api('')
        return data        
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

type VideoAPIType = {

}

export const updateVideo = async () => {
    try {
        const { data } = await api.put('')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const deleteVideo = async () => {
    try {
        const { data } = await api.delete('')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}