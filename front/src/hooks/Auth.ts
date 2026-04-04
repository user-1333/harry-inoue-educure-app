import type { APIres } from "@/components/schema/APIresponse";
import { request } from "@/lib/ApiFetch";
import { setTokenToCookie } from "@/lib/cookie";
import { toast } from "sonner"

export async function login(postData:{email:string,password:string}) {
    const res = await request<{ token: string }>("auth/login", {
        method: "POST",
        data: postData
    }).catch((err) => {
        console.error(err);
        toast.error(err.message || "Login failed", {
            position: "top-center",
        });
        throw err;
    });

    setTokenToCookie(res.token);
    return res;
}

export async function signup(postData:{name:string,email:string,password:string}) {
    const res = await request<{ token: string }>("auth/signup", {
        method: "POST",
        data: postData
    }).catch((err) => {
        console.error(err);
        toast.error(err.message || "Signup failed", {
            position: "top-center",
        });
        throw err;
    });

    setTokenToCookie(res.token);
    return res;
}

export function ChangeRole(postData:{userId:number,roleId:number}) {
    request<APIres>("auth/change/role", {
        method: "PUT",
        data: postData
    }).then((res) => {
        toast.success(res.message, {
            position: "top-center",
        });
        console.log(`User ID: ${postData.userId}, New Role: ${postData.roleId}`);
    }).catch((err) => {
        console.error(err);
        toast.error(err.message || "Failed to update role", {
            position: "top-center",
        });
    });

}