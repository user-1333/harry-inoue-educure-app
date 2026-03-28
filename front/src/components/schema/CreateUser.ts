import z, { string } from "zod";

export const createUserSchema = z.object({
    name : string(),
    email : string(),
    password : string()
});

export type createUser = z.infer<typeof createUserSchema>;
