import type { APIres } from "@/components/schema/APIresponse";
import { request } from "@/lib/ApiFetch";
import { setTokenToCookie } from "@/lib/cookie";

export function login(postData:{email:string,password:string}) {
    request<{ token: string }>("auth/login", {
        method: "POST",
        data: postData
    }).then((res) => {
        setTokenToCookie(res.token);
        window.location.href = "/";
    }).catch((err) => {
        console.error(err);
        alert(err.message || "Login failed");
        document.getElementById('btn')?.removeAttribute('disabled');
    });
}

export function signup(postData:{name:string,email:string,password:string}) {
    request<{ token: string }>("auth/signup", {
        method: "POST",
        data: postData
    }).then((res) => {
        setTokenToCookie(res.token);
        window.location.href = "/";
    }).catch((err) => {
        console.error(err);
        alert(err.message || "Signup failed");
        document.getElementById('btn')?.removeAttribute('disabled');
    });
}

export function ChangeRole(postData:{userId:number,roleId:number}) {
    request<APIres>("auth/change/role", {
        method: "PUT",
        data: postData
    }).then((res) => {
        console.log(`User ID: ${postData.userId}, New Role: ${postData.roleId}`);
    }).catch((err) => {
        console.error(err);
        alert(err.message || "Failed to update role");
    });

}