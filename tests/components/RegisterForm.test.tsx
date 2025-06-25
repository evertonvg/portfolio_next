import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from '@/app/(public)/register/RegisterForm';

describe('RegisterForm', () => {
    const mockCountries = ['Brasil'];

    it('renderiza campos obrigatórios', () => {
        render(<RegisterForm countries={mockCountries} />);
        expect(screen.getByLabelText(/Nome completo/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Confirmar Senha/i)).toBeInTheDocument();
        expect(screen.getByText(/política de privacidade/i)).toBeInTheDocument();
    });

    it('mostra erro ao tentar enviar sem preencher', async () => {
        render(<RegisterForm countries={mockCountries} />);
        fireEvent.click(screen.getByRole('button', { name: /Cadastrar/i }));

        await waitFor(() => {
            expect(screen.getByText(/O nome deve ter no mínimo/i)).toBeInTheDocument();
            expect(screen.getByText(/E-mail inválido/i)).toBeInTheDocument();
        });
    });
});
