import { isAxiosError } from "axios"
import { api } from "../lib/api"
import { dashboardEventSchema, type EventFormType, type EventType } from "../schemas/eventSchema"

export const getAllEvents = async () => {
    try {
        const { data } = await api.get('/event/events')
        const response = dashboardEventSchema.safeParse(data)
        if (response.success) return response.data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const createEvent = async (formData: EventFormType) => {
    try {
        const { data } = await api.post('/event/create-event', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const getEventById = async (id: EventType['id']) => {
    try {
        const { data } = await api.get(`/event/event/${id}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

type EventAPIType = {
    id: EventType['id']
    formData: EventFormType
}

export const updateEvent = async ({ id, formData }: EventAPIType) => {
    try {
        const { data } = await api.put<string>(`/event/edit-event/${id}`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const deleteEvent = async (id: EventType['id']) => {
    try {
        const { data } = await api.delete<string>(`/event/delete-event/${id}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}