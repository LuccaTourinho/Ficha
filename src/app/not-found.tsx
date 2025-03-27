import Link from "next/link";

export const metadata = {
    title: "Página inexistente",
}

export default function NotFound() {
    return (
        <div className="container h-screen mx-auto flex flex-col items-center justify-center text-center gap-2">
            <h2>Página não encontrada</h2>
            <Link href={'/'}>Retornar</Link>
        </div>
    )
}