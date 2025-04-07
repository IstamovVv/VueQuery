import { Express } from 'express';

import { wait } from '../../utils';
import { useTodoState } from './todo.state';

export const registerTodo = (app: Express): void => {
  const { todos } = useTodoState()

  app.get('/api/v1/todo', async (request, response) => {
    await wait(1000);

    const error = request.query.error === 'true'

    if (error) {
      response.status(500).send('got an error')

      return
    }

    const result = [...todos]

    if (request.query.flagOne === 'true') {
      await wait(1000);
      result.push({
        text: 'flagOne'
      })
    }

    if (request.query.flagTwo === 'true') {
      await wait(1000);
      result.push({
        text: 'flagTwo'
      })
    }

    response.status(200).json(result)
  })

  app.post('/api/v1/todo', async (request, response) => {
    await wait(1000);

    const error = request.query.error === 'true'

    if (error) {
      response.status(500).send('got an error')

      return
    }

    if (!request.query.text || typeof request.query.text !== 'string') {
      response.status(500).send('invalid text param')

      return
    }

    todos.push({
      text: request.query.text,
    })
    response.status(200).send()
  })

  const pageSize = 10
  const todoPaginated = []

  for (let i = 0; i < 1000; i++) {
    todoPaginated.push({
      text: `todo ${i}`
    })
  }

  app.get('/api/v1/todo/paginated', async (request, response) => {
    await wait(1000);

    const error = request.query.error === 'true'

    if (error) {
      response.status(500).send('got an error')

      return
    }

    const page = Number(request.query.page) || 0

    response.status(200).json(todoPaginated.slice(page*pageSize, (page+1)*pageSize))
  })
}