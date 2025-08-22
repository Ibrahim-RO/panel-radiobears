import { isAxiosError } from "axios"
import { api } from "../lib/api"
import { dashboardEventSchema, type EventType } from "../schemas/eventSchema"

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

export const createEvent = async (formData: FormData) => {
    try {
        const { data } = await api.post("/event/create-event", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};

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
    formData: FormData
}

export const updateEvent = async ({ id, formData }: EventAPIType) => {
    try {
        const { data } = await api.put<string>(`/event/edit-event/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};


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