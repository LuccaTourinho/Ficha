'use client';

import Link from "next/link";
import { Button } from "./ui/button";

const loginMessage = () => {
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
  )
}

export default loginMessage
