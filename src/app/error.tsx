'use client';

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Mostrar o erro no console
        console.error(error);
    }, [error]);

    return (
        <html lang="en" suppressHydrationWarning>
            <body className="w-full h-full flex flex-col items-center justify-center">
                <h2>Algo deu errado!</h2>
                <button onClick={() => reset()}>Tentar novamente</button>
            </body>
        </html>
    );
}