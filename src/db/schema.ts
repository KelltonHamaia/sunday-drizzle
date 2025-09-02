import { pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core'
export const roleEnum = pgEnum('user_role', ['ADMIN', 'MEMBER', 'VIEWER'])
export const taskStatusEnum = pgEnum('task_status', [
    'PENDING',
    'IN PROGRESS',
    'STOPPED',
    'DONE',
])

export const users = pgTable('users', {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    email: text().notNull().unique(),
    password: text().notNull(),
    role: roleEnum().default('VIEWER'),
})

export const tasks = pgTable('tasks', {
    id: uuid().primaryKey().defaultRandom(),
    title: text().notNull(),
    description: text(),
    managerId: uuid()
        .notNull()
        .references(() => users.id),
    userAssignedId: uuid()
        .notNull()
        .references(() => users.id),
    status: taskStatusEnum().default('PENDING'),
})
