import { getOperators, getOrderByOperators } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const createDb = () => {
  const connectionString = process.env.DATABASE_URL!
  const client = postgres(connectionString, { prepare: false })

  const db = drizzle(client, { schema })
  return Object.assign(db, {
    $schema: schema,
    $cmp: getOperators(),
    $order: getOrderByOperators(),
  })
}

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var __db: ReturnType<typeof createDb> | undefined
}

export const db = globalThis.__db || createDb()