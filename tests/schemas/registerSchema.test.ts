import { registerSchema } from '@/schemas/registerSchema/index';

describe('Register Schema', () => {
    it('valida dados corretos com sucesso', () => {
        const result = registerSchema.safeParse({
            username: 'João Silva',
            email: 'joao@email.com',
            phone: '(11) 91234-5678',
            password: 'Senha@123',
            confirmPassword: 'Senha@123',
            country: 'Brasil',
            state: 'SP',
            city: 'São Paulo',
            acceptPrivacyPolicy: true,
            recaptcha: 'token_valido',
        });

        expect(result.success).toBe(true);
    });

    it('falha se as senhas não coincidirem', () => {
        const result = registerSchema.safeParse({
            username: 'João Silva',
            email: 'joao@email.com',
            phone: '(11) 91234-5678',
            password: 'Senha@123',
            confirmPassword: 'SenhaErrada',
            country: 'Brasil',
            state: 'SP',
            city: 'São Paulo',
            acceptPrivacyPolicy: true,
            recaptcha: 'token_valido',
        });

        expect(result.success).toBe(false);
        expect(result?.error?.format().confirmPassword?._errors[0]).toBe('As senhas não coincidem');
    });
});
