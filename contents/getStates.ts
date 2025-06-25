export async function getStates(country: string): Promise<string[]> {
    try {
        const res = await fetch('https://countriesnow.space/api/v0.1/countries/states', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ country }),
        });

        const json = await res.json();

        if (!json.data || !Array.isArray(json.data.states)) {
            console.error('Conteúdo inesperado:', json);
            throw new Error('Estrutura da resposta inválida');
        }

        return json.data.states
            .map((state: any) => state.name)
            .filter(Boolean)
            .sort((a: string, b: string) => a.localeCompare(b));
    } catch (error) {
        console.error('Erro ao buscar estados:', error);
        return [];
    }
}
