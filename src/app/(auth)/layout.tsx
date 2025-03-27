import { Metadata} from "next";
import { ReactNode } from "react";

// Metadados específicos para o grupo (auth), opcional
export const metadata: Metadata = {
  title: {
    default: "Autenticação",
    template: "%s | Ficha", // Mantém o padrão do layout raiz
  },
  description: "Faça login ou registre-se no Ficha",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen h-[90vh]">
      {children}
    </div>
  );
}