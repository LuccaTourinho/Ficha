export function createdUserIdCookie(id: string, expiresDays: number = 7) {
    try{
        const cookieSetting = [
            `user_id=${encodeURIComponent(id)}`, // Codifica para evitar caracteres inválidos
            `path=/`, // Disponivel em toda a aplicação
            `max-age=${expiresDays * 24 * 60 * 60}`, // Converte para segundos
            process.env.NODE_ENV === 'production' ? 'secure' : '', // HTTPS em producao
            'SameSite=Lax', // Protecao básica contra CSRF
        ].filter(Boolean).join('; '); // Remove vazios e concatena com '; '
        document.cookie = cookieSetting;
    }catch(error){
        console.error('Erro ao criar cookie:', error);
        throw new Error('Erro ao criar cookie');
    }
}

export function logUserIdCookie(): string | null {
    // 1. Encontre cookie pelo nome
    const cookie = document.cookie.split('; ').find(row => row.startsWith('user_id='));

    // 2. Extrai e decodifica o valor
    const value = cookie ? decodeURIComponent(cookie.split('=')[1]) : null;

    return value;
}