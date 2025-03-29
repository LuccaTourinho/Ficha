// app/api/db/usuario/route.ts
import { NextResponse } from "next/server";
import db from "@/db";
import { usuario } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    // 1. Validar o corpo da requisição
    const { email, senha_criptografada, senha_hash } = await request.json();
    
    if (!email || !senha_criptografada || !senha_hash) {
      return NextResponse.json(
        { error: "Dados incompletos no corpo da requisição" },
        { status: 400 }
      );
    }

    // 2. Verificar se email já existe
    const [usuarioExistente] = await db.select().from(usuario).where(eq(usuario.email, email));

    if (usuarioExistente) {
      return NextResponse.json(
        { error: "Email já cadastrado", field: "email" },
        { status: 409 }
      );
    }

    // 3. Verificar se hash da senha já existe (opcional)
    const [senhaExistente] = await db
      .select()
      .from(usuario)
      .where(eq(usuario.senha_hash, senha_hash));

    if (senhaExistente) {
      return NextResponse.json(
        { error: "Senha já está em uso", field: "senha" },
        { status: 409 }
      );
    }

    // 4. Inserir no banco de dados
    await db
      .insert(usuario)
      .values({
        email,
        senha: senha_criptografada,
        senha_hash,
        criado: new Date(),
        atualizado: new Date()
    });

    // 4.5 Recuperar o ID do novo usuário
    const [novoUsuario] = await db.select({ id: usuario.id }).from(usuario).where(eq(usuario.email, email)).limit(1);
    if( !novoUsuario ) {
        throw new Error("Falha ao recuperar o ID do novo usuário");
    }

    // 5. Retornar sucesso
    return new Response(JSON.stringify({
        success: true,
        id: novoUsuario.id.toString(),
        message: "Cadastro realizado com sucesso!"
    }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    // 6. Tratamento de erros inesperados
    console.error('Erro no cadastro:', error);
    return new Response(JSON.stringify({
      error: "Erro interno",
      details: error instanceof Error ? error.message : String(error)
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function GET(request: Request) {
  try {
    // 1. Extrair parâmetros da query string
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const senha_hash = searchParams.get('senha_hash');

    // 2. Validar parâmetros
    if (!email || !senha_hash) {
      return NextResponse.json(
        { error: "Email e hash da senha são obrigatórios" },
        { status: 400 }
      );
    }

    // 3. Buscar usuário no banco
    const [usuarioEncontrado] = await db
      .select({
        id: usuario.id,
        email: usuario.email
      })
      .from(usuario)
      .where(
        and(
          eq(usuario.email, email),
          eq(usuario.senha_hash, senha_hash)
        )
      )
      .limit(1);

    // 4. Verificar se encontrou o usuário
    if (!usuarioEncontrado) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    // 5. Retornar dados do usuário (sem informações sensíveis)
    return NextResponse.json({
      success: true,
      id: usuarioEncontrado.id.toString(),
      email: usuarioEncontrado.email
    });

  } catch (error) {
    console.error('Erro na autenticação:', error);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}