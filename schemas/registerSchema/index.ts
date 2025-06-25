import z from 'zod';

export const registerSchema = z
    .object({
        username: z
            .string()
            .min(5, 'O nome deve ter no mínimo 5 caracteres')
            .refine((val) => val.trim().includes(' '), {
                message: 'Informe nome e sobrenome',
            }),
        email: z.string().email('E-mail inválido'),
        phone: z.string().min(14, 'No mínimo 8 números'),
        profilePic: z.any().optional(),
        password: z
            .string()
            .min(8, 'A senha deve ter no mínimo 8 caracteres')
            .regex(/[a-z]/, 'A senha deve conter letra minúscula')
            .regex(/[A-Z]/, 'A senha deve conter letra maiúscula')
            .regex(/[0-9]/, 'A senha deve conter número')
            .regex(/[^a-zA-Z0-9]/, 'A senha deve conter um caractere especial'),
        confirmPassword: z.string(),
        country: z.string().min(1, 'O país é obrigatório'),
        state: z.string().min(1, 'O estado é obrigatório'),
        city: z.string().min(1, 'A cidade é obrigatória'),
        acceptPrivacyPolicy: z.literal(true, {
            errorMap: () => ({ message: 'Você deve aceitar a política de privacidade' }),
        }),
        recaptcha: z.preprocess(
            (val) => (val == null ? '' : val),
            z.string().min(1, 'Por favor, confirme que você não é um robô')
        ),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'As senhas não coincidem',
        path: ['confirmPassword'],
    });
