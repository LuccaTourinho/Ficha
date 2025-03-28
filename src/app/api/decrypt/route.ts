// app/api/decrypt/route.ts
import { privateDecrypt } from 'crypto';
import { readFileSync } from 'fs';
import { inflateSync } from 'zlib';
import * as crypto from 'crypto';

export async function POST(request: Request) {
  try {
    // 1. Extrai os dados da requisição
    const { encryptedData } = await request.json();

    // 2. Validação básica do input
    if (!encryptedData || typeof encryptedData !== 'string') {
      return Response.json(
        { error: 'Dados inválidos', details: 'encryptedData é obrigatório e deve ser uma string' },
        { status: 400 }
      );
    }

    // 3. Carrega a chave privada
    const privateKey = readFileSync('./src/keys/private-key.pem', 'utf8');

    // 4. Descriptografa os dados
    const decryptedBuffer = privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      },
      Buffer.from(encryptedData, 'base64')
    );

    // 5. Descomprime os dados
    const decompressedData = inflateSync(decryptedBuffer).toString('utf8');

    return Response.json({ 
      decrypted: decompressedData,
      success: true
    });

  } catch (error: unknown) {
    // 6. Tratamento de erros detalhado
    let errorMessage = 'Falha na descriptografia';
    let errorDetails = 'Erro desconhecido';
    let statusCode = 500;

    if (error instanceof Error) {
      errorDetails = error.message;
      
      // Erros específicos do OpenSSL
      if (error.message.includes('decryption error')) {
        statusCode = 400;
        errorMessage = 'Dados criptografados inválidos';
      } else if (error.message.includes('no start line')) {
        statusCode = 500;
        errorMessage = 'Chave privada inválida';
      }
    }

    console.error('Erro na descriptografia:', error);
    return Response.json(
      { 
        error: errorMessage,
        details: errorDetails,
        success: false
      },
      { status: statusCode }
    );
  }
}