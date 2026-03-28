import z from "zod";

export const APIresSchema = z.object({
    code: z.number().min(0).max(1),
    message: z.string()
});
export type APIres = z.infer<typeof APIresSchema>;