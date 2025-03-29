'use client';

import CadastroForm from '@/components/cadastroForm';
import CadastroMessage from '@/components/cadastroMessage';
import LogoJogo from '@/components/logoJogo';

const page = () => {

  return (
    <div 
        className={`
            w-[300px] sm:w-[400px] md:w-[600px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px] h-full  
            mx-auto flex flex-col lg:flex-row items-center justify-center p-2 lg:p-6 xl:p-8 
        `}
    >
        <CadastroMessage/>
        <div
            className={`
                w-full 
                h-[500px] lg:h-[600px]
                bg-primary text-primary-foreground 
                rounded-lg p-4 lg:p-6 2xl:p-8
                flex flex-col items-center justify-center gap-0.5 md:gap-2 lg:gap-4
            `}
        >
            <LogoJogo/>
            <CadastroForm/>
        </div>
    </div>
  )
}

export default page;
