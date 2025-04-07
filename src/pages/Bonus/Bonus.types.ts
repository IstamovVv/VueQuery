export interface Tag {
  id: string
}

export interface Bonus {
  name: string
  tags: Tag[]
}

export interface BonusTagRequest {
  name: string
  tagId: string
}

export interface BonusMutationContext {
  rollback: () => void
}