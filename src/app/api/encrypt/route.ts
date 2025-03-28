// app/api/encrypt/route.js
import { publicEncrypt } from 'crypto';
import { readFileSync } from 'fs';
import { deflateSync } from 'zlib';

export async function POST(request: Request) {
  try {
    const { data } = await request.json();

    // 1. Comprime os dados para reduzir o tamanho
    const compressed = deflateSync(Buffer.from(data));
    
    // 2. Carrega a chave pública
    const publicKey = readFileSync('./src/keys/public-key.pem', 'utf8');
    
    // 3. Criptografa os dados comprimidos
    const encryptedBuffer = publicEncrypt(
      publicKey,
      compressed
    );
    
    // 4. Converte para Base64 (sem truncamento)
    const encryptedBase64 = encryptedBuffer.toString('base64');

    return Response.json({ 
      encrypted: encryptedBase64,
      originalLength: encryptedBase64.length,
      truncated: false // Como não há mais truncamento, sempre será false
    });
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json(
        { error: 'Falha na criptografia', details: error.message },
        { status: 500 }
      );
    } else {
      return Response.json(
        { error: 'Falha na criptografia', details: 'Erro desconhecido' },
        { status: 500 }
      );
    }
  }
}