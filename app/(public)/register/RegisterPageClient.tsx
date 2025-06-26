'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useQuery } from '@tanstack/react-query';
import ReCAPTCHA from 'react-google-recaptcha';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Loading from '@/components/Loading';

import { formatPhone } from '@/utils/formatNumber';
import { getStates } from '@/contents/getStates';
import { getCities } from '@/contents/getCities';

const DEFAULT_AVATAR = 'https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg';
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '';

import { registerSchema } from '@/schemas/registerSchema';

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
    countries: string[];
}

export default function RegisterForm({ countries }: RegisterFormProps) {
    const [preview, setPreview] = useState<string>(DEFAULT_AVATAR);
    const [loading, setLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        control,
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema) as any,
    });

    const selectedCountry = watch('country');
    const selectedState = watch('state');

    const { data: states = [], isLoading: loadingStates } = useQuery({
        queryKey: ['states', selectedCountry],
        queryFn: () => getStates(selectedCountry!),
        enabled: !!selectedCountry,
    });

    const { data: cities = [], isLoading: loadingCities } = useQuery({
        queryKey: ['cities', selectedCountry, selectedState],
        queryFn: () => getCities(selectedCountry!, selectedState!),
        enabled: !!selectedCountry && !!selectedState,
    });

    useEffect(() => {
        setValue('state', '');
        setValue('city', '');
    }, [selectedCountry, setValue]);

    useEffect(() => {
        setValue('city', '');
    }, [selectedState, setValue]);

    const onSubmit = (data: RegisterFormData) => {
        console.log(data);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
            setValue('profilePic', e.target.files);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-700 p-4">
            {loading && <Loading />}
            <Card className="w-full max-w-md shadow-lg mt-20 mb-20">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Cadastro</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" noValidate>
                    <CardContent className="space-y-4">
                        {/* FOTO + PREVIEW */}
                        <div className="flex items-center gap-4 mb-6">
                            <div>
                                <Label htmlFor="profilePic">Foto de Perfil</Label>
                                <Input id="profilePic" type="file" accept="image/*" onChange={handleImageChange} />
                            </div>
                            <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-300">
                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        {/* CAMPOS DE TEXTO */}
                        {[
                            ['username', 'Usuário', 'Digite seu nome de usuário'],
                            ['email', 'E-mail', 'Digite seu e-mail', 'email'],
                            ['phone', 'Telefone', '(00) 00000-0000'],
                        ].map(([id, label, placeholder, type = 'text']) => (
                            <div key={id} className="relative mb-6">
                                <Label htmlFor={id}>{label}</Label>
                                <Input
                                    id={id}
                                    type={type}
                                    placeholder={placeholder}
                                    className={errors[id as keyof RegisterFormData] ? 'border-red-500' : ''}
                                    {...register(id as keyof RegisterFormData)}
                                    onChange={
                                        id === 'phone'
                                            ? (e) => {
                                                  const formatted = formatPhone(e.target.value);
                                                  e.target.value = formatted;
                                                  setValue('phone', formatted);
                                              }
                                            : undefined
                                    }
                                />
                                <div className="min-h-[1rem]">
                                    {errors[id as keyof RegisterFormData] && (
                                        <p className="absolute text-sm text-red-500 mt-1">
                                            {errors[id as keyof RegisterFormData]?.message as string}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* SELECT PAÍS */}
                        <div className="relative mb-6">
                            <Label htmlFor="country">País</Label>
                            <Select
                                onValueChange={(value) => setValue('country', value, { shouldValidate: true })}
                                defaultValue=""
                            >
                                <SelectTrigger id="country" className={errors.country ? 'border-red-500' : ''}>
                                    <SelectValue placeholder="Selecione um país" />
                                </SelectTrigger>
                                <SelectContent>
                                    {countries.map((country) => (
                                        <SelectItem key={country} value={country}>
                                            {country}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <div className="min-h-[1rem]">
                                {errors.country && (
                                    <p className="absolute text-sm text-red-500 mt-1">{errors.country.message}</p>
                                )}
                            </div>
                        </div>

                        {/* SELECT ESTADO */}
                        <div className="relative mb-6">
                            <Label htmlFor="state">Estado</Label>
                            <Select
                                onValueChange={(value) => setValue('state', value, { shouldValidate: true })}
                                value={watch('state') || ''}
                                disabled={!selectedCountry || loadingStates}
                            >
                                <SelectTrigger id="state" className={errors.state ? 'border-red-500' : ''}>
                                    <SelectValue
                                        placeholder={
                                            selectedCountry ? 'Selecione um estado' : 'Selecione o país primeiro'
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {states.map((state) => (
                                        <SelectItem key={state} value={state}>
                                            {state}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <div className="min-h-[1rem]">
                                {errors.state && (
                                    <p className="absolute text-sm text-red-500 mt-1">{errors.state.message}</p>
                                )}
                            </div>
                        </div>

                        {/* SELECT CIDADE */}
                        <div className="relative mb-6">
                            <Label htmlFor="city">Cidade</Label>
                            <Select
                                onValueChange={(value) => setValue('city', value, { shouldValidate: true })}
                                value={watch('city') || ''}
                                disabled={!selectedState || loadingCities}
                            >
                                <SelectTrigger id="city" className={errors.city ? 'border-red-500' : ''}>
                                    <SelectValue
                                        placeholder={
                                            selectedState ? 'Selecione uma cidade' : 'Selecione o estado primeiro'
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {cities.map((city) => (
                                        <SelectItem key={city} value={city}>
                                            {city}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <div className="min-h-[1rem]">
                                {errors.city && (
                                    <p className="absolute text-sm text-red-500 mt-1">{errors.city.message}</p>
                                )}
                            </div>
                        </div>

                        {/* SENHAS */}
                        {[
                            ['password', 'Senha', 'Digite sua senha', 'password'],
                            ['confirmPassword', 'Confirmar Senha', 'Confirme sua senha', 'password'],
                        ].map(([id, label, placeholder, type]) => (
                            <div key={id} className="relative mb-6">
                                <Label htmlFor={id}>{label}</Label>
                                <Input
                                    id={id}
                                    type={type}
                                    placeholder={placeholder}
                                    className={errors[id as keyof RegisterFormData] ? 'border-red-500' : ''}
                                    {...register(id as keyof RegisterFormData)}
                                />
                                <div className="min-h-[1rem]">
                                    {errors[id as keyof RegisterFormData] && (
                                        <p className="absolute text-sm text-red-500 mt-1">
                                            {errors[id as keyof RegisterFormData]?.message as string}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* CHECKBOX POLÍTICA */}
                        <div className="relative mb-6 flex items-center space-x-2">
                            <input
                                id="acceptPrivacyPolicy"
                                type="checkbox"
                                {...register('acceptPrivacyPolicy')}
                                className={errors.acceptPrivacyPolicy ? 'border-red-500' : ''}
                            />
                            <Label htmlFor="acceptPrivacyPolicy" className="cursor-pointer">
                                Eu li e aceito a{' '}
                                <Link
                                    href="/politica"
                                    className="text-blue-600 hover:underline"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    política de privacidade
                                </Link>
                            </Label>
                        </div>
                        <div className="min-h-[1rem]">
                            {errors.acceptPrivacyPolicy && (
                                <p className="absolute text-sm text-red-500 mt-1">
                                    {errors.acceptPrivacyPolicy.message}
                                </p>
                            )}
                        </div>

                        {/* CAPTCHA */}
                        <div className="relative mb-6">
                            <Controller
                                name="recaptcha"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <ReCAPTCHA
                                        sitekey={RECAPTCHA_SITE_KEY}
                                        onChange={(token) => field.onChange(token ?? '')}
                                    />
                                )}
                            />
                            <div className="min-h-[1rem]">
                                {errors.recaptcha && (
                                    <p className="absolute text-sm text-red-500 mt-1">{errors.recaptcha.message}</p>
                                )}
                            </div>
                        </div>

                        <Button type="submit" className="w-full mt-2">
                            Cadastrar
                        </Button>
                    </CardContent>
                </form>
                <CardFooter className="justify-center">
                    <p className="text-sm text-gray-600">
                        Já tem uma conta?{' '}
                        <Link href="/login" className="text-blue-600 hover:underline">
                            Entrar
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
