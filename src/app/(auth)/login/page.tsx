'use client';

import {} from 'react';
import {Button} from "@/components/ui/button";
import Link from 'next/link';
import Image from 'next/image';
import LoginForm from '@/components/loginForm';

const page = () => {
  return (
    <div 
        className={`
            w-[300px] sm:w-[400px] md:w-[600px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px] h-full  
            mx-auto flex flex-col lg:flex-row items-center justify-center p-2 lg:p-6 xl:p-8 
        `}
    >
        {/* Login Mensagem */}
        <div 
            className={`
                w-full 
                h-[300px] sm:h-[40px] md:h-[500px] lg:h-[600px]
                flex flex-col items-center justify-center gap-5 px-2 lg:px-6 2xl:px-8   
            `}
        >
            <h1 
                className={`
                    text-lg sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl 
                `}
            >
                Login
            </h1>
            <p 
                className={`
                    text-xs md:text-lg
                `}
            >
                Bem vindo a ficha do Elder Scrolls de mesa. 
                Insira o seu email e senha ao lado para ver sua ficha. 
                Se ainda não possui uma conta, clique no botão abaixo para se cadastrar.
            </p>
            <Link href={'/cadastrar'}>
                <Button variant={"default"}>Cadastrar</Button>
            </Link>
        </div> 
        <div
            className={`
                w-full 
                h-[300px] sm:h-[40px] md:h-[500px] lg:h-[600px]
                bg-primary text-primary-foreground 
                rounded-lg p-2 lg:p-6 2xl:p-8
                flex flex-col items-center justify-center gap-0.5 md:gap-2 lg:gap-4
            `}
        >
            {/* Logo do jogo */}
            <div className='relative w-[200px] sm:w-[300px] md:w-[350px] lg:w-full h-[40%] lg:h-[50%]'>
                <div className='absolute inset-0 flex items-center justify-center overflow-hidden'>
                    <Image
                        src={'/imgs/elderscrolls.png'}
                        alt={'Logo'}
                        layout='fill'
                        objectFit='cover'
                        className='rounded-lg'
                    />
                </div>
            </div>
            {/* Formulario de login */}
            <LoginForm/>
        </div>
    </div>
  )
}

export default page;
