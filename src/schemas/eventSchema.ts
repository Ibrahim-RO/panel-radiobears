import { z } from "zod";

export const eventSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    image: z.string(),
    dateEvent: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha debe tener formato YYYY-MM-DD")
    .refine(val => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    }, {
      message: "Fecha inválida",
    })
});


export const dashboardEventSchema = z.array(eventSchema)

export type EventType = z.infer<typeof eventSchema>
export type EventFormType = Pick<EventType, 'name' | 'description' | 'image' | 'dateEvent'>