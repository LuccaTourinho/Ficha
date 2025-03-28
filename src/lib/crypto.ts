/**
 * Função para criptografar strings usando o endpoint da API
 * @param {string} text - O texto a ser criptografado (máx. 1000 caracteres recomendado)
 * @returns {Promise<string>} - Retorna a string criptografada em Base64 (limitada a 120 caracteres)
 * @throws {Error} - Lança erro se:
 *                   - O texto exceder o tamanho máximo suportado
 *                   - A chave pública for inválida
 *                   - Houver falha na comunicação com a API
 * 
 * @example
 * // Exemplo básico
 * const encrypted = await encryptString("Dado sensível");
 * console.log(encrypted); // "N7acJx9TlRXCyv7+dcF..."
 * 
 * @example
 * // Exemplo com tratamento de erro
 * try {
 *   const result = await encryptString(texto);
 * } catch (error) {
 *   console.error("Falha na criptografia:", error.message);
 * }
 * 
 * @remarks
 * Esta função usa:
 * 1. Compressão DEFLATE antes da criptografia
 * 2. Algoritmo RSA-OAEP com chave pública
 * 3. Codificação Base64 para o resultado
 */
export async function encryptString(text: string): Promise<string> {
    try {
      // 1. Faz a requisição para o endpoint de criptografia
      const response = await fetch('/api/encrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: text })
      });
  
      // 2. Verifica se a resposta foi bem sucedida
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
  
      // 3. Extrai os dados da resposta
      const result = await response.json();
  
      // 4. Verifica se houve erro no servidor
      if (result.error) {
        throw new Error(result.details || 'Erro na criptografia');
      }
  
      // 5. Retorna apenas a string criptografada
      return result.encrypted;
      
    } catch (error) {
      // 6. Log detalhado do erro (opcional)
      console.error('Falha ao criptografar:', error instanceof Error ? error.message : error);
      
      // 7. Relança o erro para tratamento externo
      throw error;
    }
}

/**
 * Função para descriptografar strings usando o endpoint da API
 * @param {string} encryptedData - Dados criptografados em Base64
 * @returns {Promise<string>} - Retorna a string descriptografada
 * @throws {Error} - Lança erro se a descriptografia falhar
 * 
 * Exemplo de uso:
 * ```
 * const decrypted = await decryptString("N7acJx9TlRXCyv7+dcF...");
 * console.log(decrypted); // "Texto original"
 * ```
 */
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