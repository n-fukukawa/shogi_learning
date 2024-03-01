import { User } from '@/types'
import { createContext } from 'react'

export const UserContext = createContext<User>({
  id: 0,
  name: 'default',
  email: 'default',
  email_verified_at: 'default'
})
