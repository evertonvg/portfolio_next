export async function getCountries(): Promise<string[]> {
    try {
        const res = await fetch('https://countriesnow.space/api/v0.1/countries/positions');

        const json = await res.json();

        if (!Array.isArray(json.data)) {
            console.error('Conteúdo inesperado:', json);
            throw new Error('Estrutura da resposta inválida');
        }

        return json.data
            .map((item: any) => item.name)
            .filter(Boolean)
            .sort((a: string, b: string) => a.localeCompare(b));
    } catch (error) {
        console.error('Erro ao buscar países:', error);
        return [];
    }
}
