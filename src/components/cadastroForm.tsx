'use client';

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { encryptString } from "@/lib/crypto";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { createdUserIdCookie } from "@/lib/cookie";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const cadastroFormSchema = z.object({
  email: z.string().trim().email({ message: 'Email inválido' }),
  senha: z 
            .string()
            .trim()
            .min(8, { message: 'Senha deve ter pelo menos 8 caracteres' })
            .regex(/[A-Z]/, { message: 'Senha deve conter pelo menos uma letra maiúscula' })
            .regex(/[a-z]/, { message: 'Senha deve conter pelo menos uma letra minúscula' })
            .regex(/\d/, { message: 'Senha deve conter pelo menos um número' })
            .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { message: 'Senha deve conter pelo menos um caractere especial' })
            .refine(
              (value) => !/\s/.test(value),
              { message: 'Senha não pode conter espaços em branco' }
            ),
});

type CadastroFormType = z.infer<typeof cadastroFormSchema>;

function validateField <K extends keyof CadastroFormType> (field: K, value: CadastroFormType[K]) {
  const singleFieldSchema = z.object({ [field]: cadastroFormSchema.shape[field] });
  return singleFieldSchema.safeParse({ [field]: value });
}

const CadastroForm = () => {
  const [alert, setAlert] = useState<string|null>(null);
  const [fieldErros, setFieldErrors] = useState<Record<string, string|null>>({});
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      isSubmitting,
    },
    reset
  } = useForm<CadastroFormType>({
    resolver: zodResolver(cadastroFormSchema),
  });

  const handleValidation = (field: keyof CadastroFormType, value: string) => {
    try{
      setValue(field, value); // Atualiza o campo com o novo valor
      const validation = validateField(field, value); 
      if(validation.success){
        setFieldErrors((prevErros) => ({
          ...prevErros,
          [field]: null,
        }));
      }else{
        const errorMessages = validation.error.errors.map((err) => err.message).join(" \n");
        setFieldErrors((prevErros) => ({
          ...prevErros,
          [field]: errorMessages || 'Erro desconhecido',
        }));
      }
    }catch(error){
      if(error instanceof z.ZodError){
        const errorMessages = error.errors.map((err) => err.message).join(" \n");
        
        setFieldErrors((prevErros) => ({
          ...prevErros,
          [field]: errorMessages || 'Erro desconhecido',
        }));
      }else{
        console.error("Erro desconhecido: ", error);
      }
    }
  };

  const formatErrorMessages = (errors: string) => {
    return errors.split('\n').map((line, index) => (
      <span key={index}>{line}<br /></span>
    ));
  };

  const onSubmit = async (data: CadastroFormType) => {
    try {
      // 1. Criptografa a senha e obtém o hash
      const { encrypted: senhaCriptografada, hash: senhaHash } = await encryptString(data.senha);
  
      // 2. Envia para a API de cadastro
      const response = await fetch('/api/db/usuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          senha_criptografada: senhaCriptografada,
          senha_hash: senhaHash
        })
      });
      
      // console.log('Status:', response.status, 'Body:', await response.clone().text()); 

      const result = await response.json();
      

      // 3. Trata erros da API
      if (!response.ok) {
        throw new Error(result.error || 'Erro no cadastro');
      }

      // 4. Criptografa o ID recebido
      // Esse idHase não será usado mesmo, pois o ID criptografado será armazenado no cookie
      // Essa function é de cryptografia é usada para outros locais por isso deixei aqui
      const { encrypted: idCriptografado, hash: idHash } = await encryptString(result.id.toString());
      console.log(idHash);
      // 5. Armazena o ID criptografado no cookie (usando a função centralizada)
      createdUserIdCookie(idCriptografado); // Padrão 7 dias
      
      // 6. Feedback ao usuário
      setAlert('Cadastro realizado com sucesso!');
      console.log('ID do novo usuário (criptografado):', idCriptografado);
  
    } catch (error) {
      // 7. Tratamento de erros específicos
      let errorMessage = 'Erro ao cadastrar';
    
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // Log detalhado para debug
        console.error('Detalhes do erro:', {
          message: error.message,
          // Adicione outros detalhes relevantes se necessário
        });
      }

      setAlert(errorMessage);
    } finally {
      reset();
    }
  };

  useEffect(() => {
    ['email', 'senha'].forEach((fieldChoosen) => {
      handleValidation(fieldChoosen as keyof CadastroFormType, '');
    });
  }, []);

  useEffect(() => {
    if(alert){
      const timer = setTimeout(() => {
        setAlert(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <div className="flex flex-col gap-2 w-full h-full items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-1 w-full h-full items-center justify-around"
      >
        {/* Email */}
        <div className="flex flex-col gap-1 w-full">
          <Input
            type="email"
            placeholder="Email" 
            {...register('email')}
            onChange={(e) => handleValidation('email', e.target.value)}
          />
          {fieldErros.email && (
            <p className="text-xs bg-destructive text-destructive-foreground px-2">
              {formatErrorMessages(fieldErros.email)}
            </p>
          )}
        </div>

        {/* Senha */}
        <div className="flex flex-col gap-1 w-full">
          <div className="relative w-full">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha" 
              {...register('senha')}
              onChange={(e) => handleValidation('senha', e.target.value)}
              className="w-full"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 hover:cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOffOutline size={18} className="text-muted"/> : <IoEyeOutline size={18} />}
            </button>
          </div>
          {fieldErros.senha && (
            <p className="text-xs bg-destructive text-destructive-foreground px-2">
              {formatErrorMessages(fieldErros.senha)}
            </p>
          )}
        </div>

        {/* Button */}
        <div className="flex flex-col gap-1 items-center w-full">
          <Button
            type="submit"
            className={"max-w-40"}
            disabled={isSubmitting}
            size={'sm'}
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
          </Button>
          {alert && (
            <p className="text-xs bg-destructive text-destructive-foreground px-2">
              {alert}
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

export default CadastroForm
