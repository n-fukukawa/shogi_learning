type Category = {
  id: number
  name: string
  color: string
  sort_order: number
}

type Learning = {
  id: number
  user_id: number
  category: Category
  learning_time: number
  learning_at: string
  title?: string
  comment?: string
}

type Statistics = {
  category: Category
  learning_time: number
}

type StatisticsSet = {
  [ym: string]: Statistics[]
}
