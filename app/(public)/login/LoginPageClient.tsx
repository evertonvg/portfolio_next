'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signIn } from 'next-auth/react';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { CheckCircle, WarningCircle } from 'phosphor-react';

import Loading from '@/components/Loading';
import { loginSchema } from '@/schemas/loginSchema';

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPageClient() {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        if (loading) return;
        setLoading(true);

        const result = await signIn('credentials', {
            redirect: false,
            username: data.username,
            password: data.password,
        });

        if (result?.error) {
            toast.error('Usuário ou senha inválidos.', {
                icon: <WarningCircle size={20} className="text-red-500" />,
                duration: 1500,
            });
        } else {
            toast('Login bem sucedido!', {
                icon: <CheckCircle size={20} className="text-green-500" />,
                description: 'Você será redirecionado para o dashboard.',
                duration: 1500,
            });

            setTimeout(() => {
                router.push('/dashboard');
            }, 1500);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-700 p-4">
            {loading && <Loading />}
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Login</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <CardContent className="space-y-4">
                        <div className="relative mb-6">
                            <Label htmlFor="username">Usuário ou E-mail</Label>
                            <Input
                                id="username"
                                placeholder="Digite seu usuário"
                                aria-invalid={!!errors.username}
                                className={errors.username ? 'border-red-500' : ''}
                                {...register('username')}
                            />
                            <div className="min-h-[1rem]">
                                {errors.username && (
                                    <p className="absolute text-sm text-red-500 mt-1">{errors.username.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="relative mb-6">
                            <Label htmlFor="password">Senha</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Digite sua senha"
                                aria-invalid={!!errors.password}
                                className={errors.password ? 'border-red-500' : ''}
                                {...register('password')}
                            />
                            <div className="min-h-[1rem]">
                                {errors.password && (
                                    <p className="absolute text-sm text-red-500 mt-1">{errors.password.message}</p>
                                )}
                            </div>
                        </div>

                        <Button type="submit" className="w-full mt-2" disabled={loading}>
                            {loading ? 'Entrando...' : 'Entrar'}
                        </Button>
                    </CardContent>
                </form>
                <CardFooter className="justify-center">
                    <p className="text-sm text-gray-600">
                        Não tem uma conta?{' '}
                        <Link href="/register" className="text-blue-600 hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
