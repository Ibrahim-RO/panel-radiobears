import { isAxiosError } from "axios"
import { api } from "../lib/api"

export const getAllSocialMedias = async () => {
    try {
        const { data } = await api('')        
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const createSocialMedia = async () => {
    try {
        const { data } = await api.post('')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const getSocialMediaById = async () => {
    try {
        const { data } = await api('')
        return data        
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

type SocialMediaAPIType = {

}

export const updateSocialMedia = async () => {
    try {
        const { data } = await api.put('')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const deleteSocialMedia = async () => {
    try {
        const { data } = await api.delete('')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}