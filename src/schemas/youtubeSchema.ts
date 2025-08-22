import { z } from 'zod'

export const youtubeSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    url: z.string(),
    youtube_link: z.string(),
    short: z.string()
})

export const dashboardYoutubeSchema = z.array(youtubeSchema)

export type YoutubeType = z.infer<typeof youtubeSchema>
export type YoutubeForm = Pick<YoutubeType, 'title' | 'description' | 'url' | 'youtube_link' | 'short'>