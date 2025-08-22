import { z } from 'zod'

export const socialMediaSchema = z.object({
    id: z.number(),
    name: z.string(),
    url: z.string()
})

export const dashboardSocialMedias = z.array(socialMediaSchema)

export type SocialMediaType = z.infer<typeof socialMediaSchema>
export type SocialMediaForm = Pick<SocialMediaType, | 'name' | 'url'>