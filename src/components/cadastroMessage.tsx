'use client';

import Link from "next/link";
import { Button } from "./ui/button";

import React from 'react'

const cadastroMessage = () => {
  return (
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
                Cadastro
            </h1>
            <p 
                className={`
                    text-xs md:text-lg
                `}
            >
                Bem vindo a ficha do Elder Scrolls de mesa. 
                Insira o seu email e senha ao lado para ver sua ficha para cadastrar sua ficha.
                Se já possui uma ficha ja cadastrada, clique em login. 
            </p>
            <Link href={'/login'}>
                <Button variant={"default"}>Login</Button>
            </Link>
        </div>
  )
}

export default cadastroMessage;
