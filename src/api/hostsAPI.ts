import { isAxiosError } from "axios"
import { api } from "../lib/api"

export const getAllHost = async () => {
    try {
        const { data } = await api('')        
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const createHost = async () => {
    try {
        const { data } = await api.post('')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const getHostById = async () => {
    try {
        const { data } = await api('')
        return data        
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

type HostAPIType = {

}

export const updateHost = async () => {
    try {
        const { data } = await api.put('')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const deleteHost = async () => {
    try {
        const { data } = await api.delete('')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}