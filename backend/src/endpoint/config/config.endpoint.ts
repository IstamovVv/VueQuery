import { Express } from 'express';

import { wait } from '../../utils';
import { useAuth } from '../auth/auth.service';
import {
  MAX_ERROR_CHANCE, MAX_REQUEST_DELAY_MS,
  MAX_TOKEN_LIFETIME_SECONDS, MIN_CACHE_STALE_TIME,
  MIN_ERROR_CHANCE, MIN_REQUEST_DELAY_MS,
  MIN_TOKEN_LIFETIME_SECONDS
} from './config.constants';
import { useConfig } from './config.state';

const { check: checkAuth } = useAuth();

export const registerConfig = (app: Express): void => {
  app.get('/api/v1/config', async (request, response) => {
    const config = useConfig()

    await wait(config.requestDelay);

    if (!checkAuth(request, response)) return

    if (Math.random() < config.errorChance) {
      response.status(500).send('unexpected error')

      return
    }

    const result = {
      tokenLifeTime: config.tokenLifeTime === 0 ? config.tokenLifeTime : config.tokenLifeTime / 1000,
      errorChance: config.errorChance === 0 ? config.errorChance : config.errorChance * 100,
      requestDelay: config.requestDelay,
      staleTime: config.staleTime,
    }

    response.status(200).json(result)
  })

  app.post('/api/v1/config', async (request, response) => {
    const config = useConfig()

    await wait(config.requestDelay);

    if (!checkAuth(request, response)) return

    if (Math.random() < config.errorChance) {
      response.status(500).send('unexpected error')

      return
    }

    const { tokenLifeTime, requestDelay, errorChance, staleTime } = request.body

    if (
      tokenLifeTime === undefined ||
      requestDelay === undefined ||
      errorChance === undefined ||
      staleTime === undefined
    ) {
      response.status(400).send('invalid request')

      return
    }

    if (tokenLifeTime < MIN_TOKEN_LIFETIME_SECONDS || tokenLifeTime > MAX_TOKEN_LIFETIME_SECONDS) {
      response.status(400).send('invalid tokenLifeTime')

      return
    }

    if (requestDelay < MIN_REQUEST_DELAY_MS || requestDelay > MAX_REQUEST_DELAY_MS) {
      response.status(400).send('invalid requestDelay')

      return
    }

    if (errorChance < MIN_ERROR_CHANCE || errorChance > MAX_ERROR_CHANCE) {
      response.status(400).send('invalid errorChance')

      return
    }

    if (staleTime < MIN_CACHE_STALE_TIME) {
      response.status(400).send('invalid errorChance')

      return
    }

    config.errorChance = errorChance === 0 ? errorChance : errorChance / 100
    config.requestDelay = requestDelay
    config.tokenLifeTime = tokenLifeTime * 1000
    config.staleTime = staleTime

    response.status(200).send()
  })
}