import { UseBonusStateReturnType } from '../table/table.types';
import { Bonus } from './bonus.types';

const defaultTags = ['tag_1', 'tag_2', 'tag_3', 'tag_4', 'tag_5', 'tag_6']
const defaultBonuses: Bonus[] = [
  {
    name: 'First Bonus',
    tags: [
      { id: 'tag_1' },
      { id: 'tag_3' },
      { id: 'tag_5' },
    ]
  },
  {
    name: 'Second Bonus',
    tags: [
      { id: 'tag_2' },
      { id: 'tag_4' },
      { id: 'tag_6' },
    ]
  }
]

const tags = new Set<string>(defaultTags)
const bonuses: Bonus[] = [...defaultBonuses]

export const useBonusState = (): UseBonusStateReturnType => {
  return { tags, bonuses }
}