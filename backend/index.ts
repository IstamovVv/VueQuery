import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'

import { registerAuth } from './src/endpoint/auth/auth.endpoint';
import { registerBonus } from './src/endpoint/bonus/bonus.endpoint';
import { registerTable } from './src/endpoint/table/table.endpoint';
import { registerTodo } from './src/endpoint/todo/todo.endpoint';

const app = express()

app.use(cors())
app.use(bodyParser.json())

registerAuth(app)
registerTodo(app)
registerBonus(app)
registerTable(app)

const PORT = 8000

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})