
export async function encryptString(text: string): Promise<{ encrypted: string; hash: string}> {
    const response = await fetch('/api/encrypt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: text })
    });
  
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  
    const result = await response.json();
    if (result.error) throw new Error(result.details);
  
    return {
      encrypted: result.encrypted,
      hash: result.password_hash 
    };
}


export async function decryptString(encryptedData: string): Promise<string> {
    try {
      // 1. Faz a requisição para o endpoint de descriptografia
      const response = await fetch('/api/decrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ encryptedData })
      });
  
      // 2. Verifica se a resposta foi bem sucedida
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
  
      // 3. Extrai os dados da resposta
      const result = await response.json();
  
      // 4. Verifica se houve erro no servidor
      if (result.error) {
        throw new Error(result.details || 'Erro na descriptografia');
      }
  
      // 5. Retorna apenas a string descriptografada
      return result.decrypted;
      
    } catch (error) {
      // 6. Log detalhado do erro
      console.error('Falha ao descriptografar:', error instanceof Error ? error.message : error);
      
      // 7. Relança o erro para tratamento externo
      throw error;
    }
  }