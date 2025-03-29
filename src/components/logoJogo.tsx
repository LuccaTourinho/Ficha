'use client';

import Image from "next/image";

import React from 'react'

const LogoJogo = () => {
  return (
    <div className='relative w-[200px] sm:w-[300px] md:w-[350px] lg:w-full h-[50%] lg:h-[60%]'>
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
  )
}

export default LogoJogo
