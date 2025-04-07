import { Request, Response } from 'express';

export interface UseAuthReturnType {
  check: (request: Request, response: Response) => boolean
}