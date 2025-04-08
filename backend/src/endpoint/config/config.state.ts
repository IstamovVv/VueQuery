import {
  DEFAULT_CACHE_STALE_TIME,
  DEFAULT_REQUEST_DELAY_MS,
  DEFAULT_TOKEN_LIFETIME_MS,
  MIN_ERROR_CHANCE,
} from './config.constants';
import { UseConfigReturnType } from './config.types';

const config = {
  errorChance: MIN_ERROR_CHANCE,
  requestDelay: DEFAULT_REQUEST_DELAY_MS,
  tokenLifeTime: DEFAULT_TOKEN_LIFETIME_MS,
  staleTime: DEFAULT_CACHE_STALE_TIME,
}

export const useConfig = (): UseConfigReturnType => {
  return config
}