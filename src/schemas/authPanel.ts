import { z } from 'zod'

const authSchema = z.object({
    email: z.email(),
    password: z.string(),
    password_confirmation: z.string(),
})

export type AuthPanelType = z.infer<typeof authSchema>
export type AuthPanelForm = Pick<AuthPanelType, 'email' | 'password'>
export type AuthPanelRegister = Pick<AuthPanelType, 'email' | 'password' | 'password_confirmation'>