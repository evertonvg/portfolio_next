import z from 'zod';

export const loginSchema = z.object({
    username: z.string().min(1, 'Usuário ou e-mail é obrigatório').min(3, 'Usuário inválido'),
    password: z
        .string()
        .min(6, 'A senha deve ter no mínimo 6 caracteres'),
        // .regex(/[a-z]/, 'A senha deve conter letra minúscula')
        // .regex(/[A-Z]/, 'A senha deve conter letra maiúscula')
        // .regex(/[0-9]/, 'A senha deve conter número')
        // .regex(/[^a-zA-Z0-9]/, 'A senha deve conter um caractere especial'),
});
