import { isAxiosError } from "axios"
import { api } from "../lib/api"

export const getAllUsers = async () => {
    try {
        const { data } = await api('')        
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const createUser = async () => {
    try {
        const { data } = await api.post('')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const getUserById = async () => {
    try {
        const { data } = await api('')
        return data        
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

// type UserAPIType = {

// }

export const updateUser = async () => {
    try {
        const { data } = await api.put('')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const deleteUser = async () => {
    try {
        const { data } = await api.delete('')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}