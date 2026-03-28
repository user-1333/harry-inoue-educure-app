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