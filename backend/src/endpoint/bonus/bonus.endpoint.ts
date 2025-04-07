import { Express } from 'express';

import { wait } from '../../utils';
import { useAuth } from '../auth/auth.service';
import { useConfig } from '../config/config.state';
import { useBonusState } from './bonus.state';

const { check: checkAuth } = useAuth();

export const registerBonus = (app: Express): void => {
  app.get('/api/v1/bonus', async (request, response) => {
    const config = useConfig()

    await wait(config.requestDelay);

    if (!checkAuth(request, response)) return

    const { bonuses } = useBonusState();

    response.status(200).json(bonuses)
  })

  app.get('/api/v1/tag', async (request, response) => {
    const config = useConfig()

    await wait(config.requestDelay);

    if (!checkAuth(request, response)) return

    const { tags } = useBonusState();

    response.status(200).json([...tags.values()])
  })

  app.post('/api/v1/tag', async (request, response) => {
    const config = useConfig()

    await wait(config.requestDelay);

    if (!checkAuth(request, response)) return

    const tagId = request.query.tagId

    if (!tagId || typeof tagId !== 'string') {
      response.status(400).send('invalid tagId')

      return
    }

    const { tags } = useBonusState();

    if (tags.has(tagId)) {
      response.status(400).send('tagId already exists')

      return
    }

    tags.add(tagId)
    response.status(200).send()
  })

  app.post('/api/v1/bonus', async (request, response) => {
    const config = useConfig()

    await wait(config.requestDelay);

    if (!checkAuth(request, response)) return

    const name = request.query.name

    if (!name || typeof name !== 'string') {
      response.status(400).send('invalid name')

      return
    }

    const { bonuses } = useBonusState();
    const exists = bonuses.some(b => b.name === name)

    if (exists) {
      response.status(400).send('bonus with such name already exists')

      return
    }

    bonuses.push({ name, tags: [] })
    response.status(200).send()
  })

  app.post('/api/v1/bonus/tag', async (request, response) => {
    const config = useConfig()

    await wait(config.requestDelay);

    if (!checkAuth(request, response)) return

    if (Math.floor(Math.random()*10) > 5) {
      response.status(500).send('unexpected error')

      return
    }

    const name = request.query.name

    if (!name || typeof name !== 'string') {
      response.status(400).send('invalid name')

      return
    }

    const { tags, bonuses } = useBonusState();
    const bonus = bonuses.find(b => b.name === name)

    if (!bonus) {
      response.status(400).send('bonus not found')

      return
    }

    const tagId = request.query.tagId

    if (!tagId || typeof tagId !== 'string') {
      response.status(400).send('invalid tagId')

      return
    }

    if (!tags.has(tagId)) {
      response.status(400).send('tag not found')

      return
    }

    const attached = bonus.tags.some(t => t.id === tagId)

    if (attached) {
      response.status(400).send('tag already attached')

      return
    }

    bonus.tags.push({
      id: tagId,
    })
    response.status(200).send()
  })

  app.delete('/api/v1/bonus/tag', async (request, response) => {
    const config = useConfig()

    await wait(config.requestDelay);

    if (!checkAuth(request, response)) return

    if (Math.floor(Math.random()*10) > 5) {
      response.status(500).send('unexpected error')

      return
    }

    const name = request.query.name

    if (!name || typeof name !== 'string') {
      response.status(400).send('invalid name')

      return
    }

    const { bonuses } = useBonusState();
    const bonus = bonuses.find(b => b.name === name)

    if (!bonus) {
      response.status(400).send('bonus not found')

      return
    }

    const tagId = request.query.tagId

    if (!tagId || typeof tagId !== 'string') {
      response.status(400).send('invalid tagId')

      return
    }

    const index = bonus.tags.findIndex(t => t.id === tagId)

    if (index === -1) {
      response.status(400).send('tag not found')

      return
    }

    bonus.tags.splice(index, 1)
    response.status(200).send()
  })
}