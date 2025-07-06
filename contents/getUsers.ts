
import type { UserProps } from '@/app/(private)/dashboard/dashboardPageClient';
export async function getUsers(token:string): Promise<UserProps[]> {
    try {
        const res = await fetch('http://localhost:3333/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
        });

        
        const json = await res.json();
        if (!res.ok) {
            console.error('Erro ao buscar usuários:', json);
            throw new Error(json.error || 'Erro desconhecido');
        }

        if (!Array.isArray(json)) {
            console.error('Conteúdo inesperado:', json);
            throw new Error('Estrutura da resposta inválida');
        }

        return json;
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        return [];
    }
}



