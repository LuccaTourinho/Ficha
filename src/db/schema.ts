import { pgTable, bigserial, varchar, timestamp, uniqueIndex, text} from 'drizzle-orm/pg-core';

export const usuario = pgTable('usuario', {
    id: bigserial('id', {mode: 'bigint'}).primaryKey(),
    email: varchar('email', {length: 255}).notNull().unique(),
    senha: text('password').notNull().unique(),
    criado: timestamp('created_at').notNull().defaultNow(),
    atualizado: timestamp('updated_at').notNull().defaultNow(),
}, (table) => {
    return {
        emailIdx: uniqueIndex('email_idx').on(table.email),
    };
});