import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

// Configurar o pool de conexoes com o postgresSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Inicializa o Drizzle com o pool de conexoes
const db = drizzle(pool);