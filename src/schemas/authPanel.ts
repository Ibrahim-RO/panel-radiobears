import { z } from 'zod'

const authSchema = z.object({
    email: z.email(),
    password: z.string()
})

export type AuthPanelType = z.infer<typeof authSchema>
export type AuthPanelForm = Pick<AuthPanelType, 'email' | 'password'>