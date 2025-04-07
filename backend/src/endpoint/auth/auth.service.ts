import { Request, Response } from 'express'

import { UseAuthReturnType } from './auth.types';

const check = (request: Request, response: Response): boolean => {
  const token = Number(request.headers.authorization)
  const now = new Date()

  const result = now.getTime() < token

  if (!result) {
    response.status(401).send()
  }

  return result
}

export const useAuth = (): UseAuthReturnType => {
  return { check }
}