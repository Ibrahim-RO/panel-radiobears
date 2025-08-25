import { z } from 'zod'

export const socialMediaSchema = z.object({
    id: z.number(),
    name: z.string(),
    url: z.string(),
    isActive: z.boolean().optional()
})

export const dashboardSocialMedias = z.array(socialMediaSchema)

export type SocialMediaType = z.infer<typeof socialMediaSchema>
export type SocialMediaForm = Pick<SocialMediaType, 'url'>