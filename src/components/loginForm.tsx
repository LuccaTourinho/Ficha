'use client';

import {useEffect, useState} from "react";
import { encryptString } from "@/lib/crypto";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createdUserIdCookie } from "@/lib/cookie";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const loginFormSchema = z.object({
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

type LoginFormType = z.infer<typeof loginFormSchema>;

function validateField <K extends keyof LoginFormType> (field: K, value: LoginFormType[K]) {
  const singleFieldSchema = z.object({ [field]: loginFormSchema.shape[field] });
  return singleFieldSchema.safeParse({ [field]: value });
}

const LoginForm = () => {
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
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
  });

  const handleValidation = (field: keyof LoginFormType, value: string) => {
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

  const onSubmit = async (data: LoginFormType) => {
    try {
      // 1. Gerar hash da senha (igual feito no cadastro)
      const { hash: senhaHash } = await encryptString(data.senha);
  
      // 2. Fazer requisição GET com os parâmetros
      const response = await fetch(`/api/db/usuario?email=${encodeURIComponent(data.email)}&senha_hash=${senhaHash}`);
      
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.error || 'Credenciais inválidas');
      }
  
      // 3. Login bem-sucedido
      console.log('Usuário autenticado:', result);
      setAlert('Login realizado com sucesso!');
      
      // 4. Criptografar o ID antes de armazenar
      const { encrypted: encryptedId } = await encryptString(result.id.toString());
      
      // 5. Armazenar usando a função dedicada (melhor organização)
      createdUserIdCookie(encryptedId); // Padrão: 7 dias
      
      // Opcional: manter no localStorage também (se necessário)
      localStorage.setItem('user_encrypted_id', encryptedId);
  
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setAlert(errorMessage.includes('Credenciais inválidas') 
        ? 'Email ou senha incorretos' 
        : 'Erro ao fazer login'
      );
    }finally{
      reset();
    }
  };

  useEffect(() => {
      ['email', 'senha'].forEach((fieldChoosen) => {
        handleValidation(fieldChoosen as keyof LoginFormType, '');
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
            {isSubmitting ? 'Logando...' : 'Logar'}
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

export default LoginForm
