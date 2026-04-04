import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { type ComponentProps, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '@/hooks/Auth';

export default function Signin() {
    type FormOnSubmit = NonNullable<ComponentProps<'form'>['onSubmit']>

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isFormValid = formData.email.trim() !== '' && formData.password !== '';

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const signinSubmit: FormOnSubmit = async (event) => {
        event.preventDefault();

        if (!isFormValid || isSubmitting) {
            return;
        }

        setIsSubmitting(true);

        try {
            await login(formData);
            navigate('/');
        } finally {
            setIsSubmitting(false);
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
                            <Link to="/auth/signup">
                                Sign Up
                            </Link>
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form autoComplete="off" onSubmit={signinSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={!isFormValid || isSubmitting}>
                                {isSubmitting ? 'Signing In...' : 'Sign In'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2" />
            </Card>
        </div>
    )
}

