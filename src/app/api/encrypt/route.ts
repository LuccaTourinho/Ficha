// app/api/encrypt/route.js
import { publicEncrypt, createHash, randomBytes } from 'crypto';
import { readFileSync } from 'fs';
import { deflateSync } from 'zlib';

export async function POST(request: Request) {
  // try {
  //   const { data } = await request.json();

  //   // 1. Comprime os dados para reduzir o tamanho
  //   const compressed = deflateSync(Buffer.from(data));
    
  //   // 2. Carrega a chave pública
  //   const publicKey = readFileSync('./src/keys/public-key.pem', 'utf8');
    
  //   // 3. Criptografa os dados comprimidos
  //   const encryptedBuffer = publicEncrypt(
  //     publicKey,
  //     compressed
  //   );
    
  //   // 4. Converte para Base64 (sem truncamento)
  //   const encryptedBase64 = encryptedBuffer.toString('base64');

  //   return Response.json({ 
  //     encrypted: encryptedBase64,
  //     originalLength: encryptedBase64.length,
  //     truncated: false // Como não há mais truncamento, sempre será false
  //   });
    
  // } catch (error: unknown) {
  //   if (error instanceof Error) {
  //     return Response.json(
  //       { error: 'Falha na criptografia', details: error.message },
  //       { status: 500 }
  //     );
  //   } else {
  //     return Response.json(
  //       { error: 'Falha na criptografia', details: 'Erro desconhecido' },
  //       { status: 500 }
  //     );
  //   }
  // }

  try {
    const { data } = await request.json();

    // 1. Gera padding aleatório (16 bytes)
    const padding = randomBytes(16).toString('hex');
    
    // 2. Cria versão com padding (ex: "a1b2c3d4|senha123")
    const paddedData = `${padding}|${data}`;
    
    // 3. Gera hash SHA-256 da senha original (para verificação)
    const passwordHash = createHash('sha256').update(data).digest('hex');
    
    // 4. Comprime os dados com padding
    const compressed = deflateSync(Buffer.from(paddedData));
    
    // 5. Criptografa
    const publicKey = readFileSync('./src/keys/public-key.pem', 'utf8');
    const encrypted = publicEncrypt(publicKey, compressed);
    
    return Response.json({
      encrypted: encrypted.toString('base64'),
      password_hash: passwordHash, // ← Novo campo
      padding: padding // Opcional: útil para debug
    });

  } catch (error) {
    return Response.json(
      { error: 'Falha na criptografia', details: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}