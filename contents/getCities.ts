export async function getCities(country: string, state: string): Promise<string[]> {
    try {
        const res = await fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ country, state }),
        });

        const json = await res.json();

        if (!json.data || !Array.isArray(json.data)) {
            console.error('Conteúdo inesperado:', json);
            throw new Error('Estrutura da resposta inválida');
        }

        return json.data.filter(Boolean).sort((a: string, b: string) => a.localeCompare(b));
    } catch (error) {
        console.error('Erro ao buscar cidades:', error);
        return [];
    }
}
