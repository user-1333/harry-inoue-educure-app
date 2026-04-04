import React, { useState, type ComponentProps } from 'react'
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
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '@/hooks/Auth';

export default function Signup() {
    type FormOnSubmit = NonNullable<ComponentProps<'form'>['onSubmit']>
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isFormValid = formData.name.trim() !== '' && formData.email.trim() !== '' && formData.password !== '';

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        // 既存の入力値は残しつつ、変更された項目だけを更新する
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const SignupSubmit: FormOnSubmit = async (event) => {
        event.preventDefault();
        if (!isFormValid || isSubmitting) {
            return;
        }

        setIsSubmitting(true);

        try {
            await signup(formData);
            navigate('/');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Sign up for your account</CardTitle>
                    <CardDescription>
                        Enter your details below to create your account
                    </CardDescription>
                    <CardAction>
                        <Button variant="link">
                            <Link to="/auth/signin">
                                Sign In
                            </Link>
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form autoComplete="off" onSubmit={SignupSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
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
                                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2" />
            </Card>
        </div>
    )
}
