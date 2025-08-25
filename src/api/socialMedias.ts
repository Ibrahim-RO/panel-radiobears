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

type SocialMediaAPIType = {
    id: SocialMediaType['id']
    formData: SocialMediaForm
}

export const updateSocialMedia = async ({ id, formData } : SocialMediaAPIType) => {
    try {
        const { data } = await api.patch<string>(`social/edit-social/${id}`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const toggleSocialMedia = async (id: SocialMediaType['id']) => {
    try {
        const { data } = await api.patch<string>(`social/toggle-social/${id}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
