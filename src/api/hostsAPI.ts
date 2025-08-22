import { isAxiosError } from "axios"
import { api } from "../lib/api"
import { dashboardHostSchema, type HostType } from "../schemas/hostSchema"

export const getAllHost = async () => {
    try {
        const { data } = await api('host/hosts')
        const response = dashboardHostSchema.safeParse(data)
        if (response.success) return response.data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const createHost = async (formData: FormData) => {
    try {
        const { data } = await api.post<string>("host/create-host", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const getHostById = async (id: HostType['id']) => {
    try {
        const { data } = await api.get(`host/host/${id}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

type HostAPIType = {
    id: HostType['id'],
    formData: FormData
}

export const updateHost = async ({ id, formData }: HostAPIType) => {
    try {
        const { data } = await api.put<string>(`host/edit-host/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const deleteHost = async (id: HostType['id']) => {
    try {
        const { data } = await api.delete<string>(`host/delete-host/${id}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}