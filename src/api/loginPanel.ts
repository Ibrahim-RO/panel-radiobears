import { isAxiosError } from "axios"
import { api } from "../lib/api"
import type { AuthPanelForm, AuthPanelRegister } from "../schemas/authPanel"

export const registerUser = async (formData: AuthPanelRegister) => {
    try {
        const { data } = await api.post<string>('/auth-panel/create-account', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export const authenticateUser = async (formData: AuthPanelForm) => {
    try {
        const { data } = await api.post<string>('/auth-panel/login', formData)
        localStorage.setItem('AUTH_TOKEN', data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}