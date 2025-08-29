import { isAxiosError } from "axios"
import { api } from "../lib/api"
import type { AuthPanelForm } from "../schemas/authPanel"

export const authenticateUser = async (formData: AuthPanelForm) => {
    try {
        const { data } = await api.post<string>('auth-panel/login', formData)
        localStorage.setItem('AUTH_TOKEN', data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}