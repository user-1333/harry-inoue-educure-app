import z from "zod";
export const UserSchema = z.object({
    userId: z.number().int(),
    userName: z.string(),
    email: z.string().max(100),
    departmentName: z.string().max(100).nullable(),
    roleName: z.enum(["EMPLOYEE", "MANAGER", "ADMIN"]),
});
export type User = z.infer<typeof UserSchema>;