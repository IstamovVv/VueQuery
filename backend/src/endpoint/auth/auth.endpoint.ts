import { Express } from 'express';

import { wait } from '../../utils';

const tokenLife = 30 * 60 * 1000 // 30m token lifetime

const validCredentials = {
  login: 'admin',
  password: 'admin',
}

export const registerAuth = (app: Express): void => {
  app.post('/api/v1/auth', async (request, response) => {
    await wait(1000);

    if (request.body.login === validCredentials.login && request.body.password === validCredentials.password) {
      response.status(200).json({
        token: Date.now() + tokenLife
      })

      return
    }

    response.status(401).send()
  })
}