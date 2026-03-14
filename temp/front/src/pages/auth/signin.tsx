import { Link } from 'react-router-dom'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Label } from "@radix-ui/react-label"
import { Input } from "../../components/ui/input";

export default function Signin() {
    const signinSubmit = () => {
        const form = document.getElementById('signin-form') as HTMLFormElement;
        const formData = new FormData(form);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        if (username && password) {
            document.getElementById('btn')?.setAttribute('disabled', 'true');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Sign in to your account</CardTitle>
                    <CardDescription>
                        Enter your email and password to access your account
                    </CardDescription>
                    <CardAction>
                        <Button variant="link">
                            <Link to="/auth/login">
                                Login
                            </Link>
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form id="signin-form" autoComplete="off">
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    name="password"
                                    type="password"
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full" id="btn" onClick={signinSubmit}>
                        Sign In
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
