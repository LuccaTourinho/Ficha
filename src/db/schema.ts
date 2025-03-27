import { pgTable, bigserial, varchar, timestamp, uniqueIndex} from 'drizzle-orm/pg-core';

export const usuario = pgTable('usuario', {
    id: bigserial('id', {mode: 'bigint'}).primaryKey(),
    email: varchar('email', {length: 255}).notNull().unique(),
    senha: varchar('password', {length: 120}).notNull().unique(),
    criado: timestamp('created_at').notNull().defaultNow(),
    atualizado: timestamp('updated_at').notNull().defaultNow(),
}, (table) => {
    return {
        emailIdx: uniqueIndex('email_idx').on(table.email),
    };
});