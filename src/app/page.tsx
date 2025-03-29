'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main 
      className={`
        w-[300px] sm:w-[400px] md:w-[600px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px] h-screen  
        mx-auto flex flex-col items-center justify-center gap-4 p-2 lg:p-6 xl:p-8 
      `}
    >
      <h1
        className={`
          text-lg sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl 
        `}
      >
        Bem vindo ao ElderScrolls de mesa.
      </h1>
      <p
        className={`
          text-xs md:text-lg
        `}
      >
        Cadastre-se ou logue para ver suas fichas.
      </p>
      <Image
        src={'/imgs/elderscrolls.png'}
        alt={'Logo'}
        width={300}
        height={300}
        className='rounded-lg'
      />
      <div className="flex flex-row items-center justify-around w-full">
        <Link href={'/cadastrar'}>
          <Button variant={"default"}>Cadastrar</Button>
        </Link>
        <Link href={'/login'}>
          <Button variant={"default"}>Login</Button>
        </Link>
      </div>
    </main>
  );
}
