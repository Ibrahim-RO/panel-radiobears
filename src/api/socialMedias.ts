import { isAxiosError } from "axios"
import { api } from "../lib/api"
import { dashboardSocialMedias, type SocialMediaForm, type SocialMediaType } from "../schemas/socialMediaSchema"

export const getAllSocialMedias = async () => {
    try {
        const { data } = await api('social/social-medias')   
        const response = dashboardSocialMedias.safeParse(data)
        if(response.success) return response.data     
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const createSocialMedia = async (formData: SocialMediaForm) => {
    try {
        const { data } = await api.post<string>('social/create-social', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const getSocialMediaById = async (id: SocialMediaType['id']) => {
    try {
        const { data } = await api<string>(`social/social-media/${id}`)
        return data        
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

type SocialMediaAPIType = {
    id: SocialMediaType['id']
    formData: SocialMediaForm
}

export const updateSocialMedia = async ({ id, formData } : SocialMediaAPIType) => {
    try {
        const { data } = await api.put<string>(`social/edit-social/${id}`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const deleteSocialMedia = async (id: SocialMediaType['id']) => {
    try {
        const { data } = await api.delete<string>(`social/delete-social/${id}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}