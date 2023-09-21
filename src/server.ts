import fastify from 'fastify'
import { knex } from './database'

import crypto from 'node:crypto'
import { env } from './env'

const app = fastify()

app.get('/hello', async () => {
  const transaction = await knex('transactions')
    .insert({
      id: crypto.randomUUID(),
      title: 'Hello World',
      amount: 1000,
    })
    .returning('*')

  return transaction
})
app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Server is running on port 3333 🚀')
  })
