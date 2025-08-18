import { z } from 'zod'

export const hostSchema = z.object({
    id: z.number(),
    name: z.string(),
    age: z.string(),
    description: z.string(),
    image: z.string()
})

export type HostType = z.infer<typeof hostSchema>
export type HostForm = Pick<HostType, 'name' | 'description' | 'age' | 'image'>