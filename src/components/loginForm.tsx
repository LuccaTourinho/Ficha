'use client';

import { Input } from "./ui/input";
import { Button } from "./ui/button";

const LoginForm = () => {
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

export default LoginForm
