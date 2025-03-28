'use client';

import { useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { encryptString, decryptString } from "@/lib/crypto";

const CadastroForm = () => {
  // useEffect(() => {
  //   const testEncryptionDecryption = async () => {
  //     console.log('Iniciando teste completo de criptografia/descriptografia...');
      
  //     try {
  //       // 1. Texto original
  //       const originalText = "MinhaSenha123!";
  //       console.log('✅ Texto original:', originalText);

  //       // 2. Criptografa
  //       const encrypted = await encryptString(originalText);
  //       console.log('🔐 Texto criptografado:', encrypted);
  //       console.log('📏 Tamanho do criptografado:', encrypted.length, 'caracteres');

  //       // 3. Descriptografa
  //       const decrypted = await decryptString(encrypted);
  //       console.log('🔓 Texto descriptografado:', decrypted);

  //       // 4. Verificação de integridade
  //       if (originalText === decrypted) {
  //         console.log('✔️ Teste concluído com sucesso! Os textos coincidem.');
  //       } else {
  //         console.warn('⚠️ Atenção: O texto descriptografado não coincide com o original!');
  //         console.log('Comparação:');
  //         console.log('Original:', originalText);
  //         console.log('Descriptografado:', decrypted);
  //       }
        
  //     } catch (error) {
  //       console.error('❌ Falha no processo:', error instanceof Error ? error.message : error);
  //     }
  //   };

  //   testEncryptionDecryption();
  // }, []);

  return (
    <div className="flex flex-col gap-2 w-full items-center">
      <Input
        type="email"
        placeholder="Email" 
      />
      <Input
        type="password"
        placeholder="Senha" 
      />
      <Button className="w-[50%]">
        Entrar
      </Button>
    </div>
  )
}

export default CadastroForm
