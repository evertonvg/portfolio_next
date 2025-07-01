export function formatPhone(value: string): string {
    const cleaned = value.replace(/\D/g, '');

    if (cleaned.length <= 10) {
        return cleaned.replace(/^(\d{0,2})(\d{0,4})(\d{0,4}).*/, (_match, p1, p2, p3) =>
            [p1 ? `(${p1}` : '', p2 ? `) ${p2}` : '', p3 ? `-${p3}` : ''].join('')
        );
    } else {
        return cleaned.replace(/^(\d{0,2})(\d{0,5})(\d{0,4}).*/, (_match, p1, p2, p3) =>
            [p1 ? `(${p1}` : '', p2 ? `) ${p2}` : '', p3 ? `-${p3}` : ''].join('')
        );
    }
}
