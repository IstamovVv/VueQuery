import { UseBonusStateReturnType } from '../table/table.types';
import { Bonus } from './bonus.types';

const tags = new Set<string>()
const bonuses: Bonus[] = []

export const useBonusState = (): UseBonusStateReturnType => {
  return { tags, bonuses }
}