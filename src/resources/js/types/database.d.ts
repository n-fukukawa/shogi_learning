type Category = {
  id: number
  name: string
  color: string
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
