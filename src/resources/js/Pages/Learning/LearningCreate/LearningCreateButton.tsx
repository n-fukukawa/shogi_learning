import SecondaryButton from '@/Components/SecondaryButton'
import { useContext, useState } from 'react'
import LearningCreate from './LearningCreate'
import { UserContext } from '@/Context/UserContext'

type Props = {
  categories: Category[]
  year: number
  month: number
}

export default function LearningCreateButton(props: Props) {
  const user = useContext(UserContext)

  const { categories, year, month } = props
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false)

  return (
    <>
      <SecondaryButton className="w-48 h-10" onClick={() => setCreateDialogOpen(true)}>
        学習を記録する
      </SecondaryButton>

      {isCreateDialogOpen && (
        <LearningCreate
          user={user}
          categories={categories}
          defaultYear={year}
          defaultMonth={month}
          onClose={() => setCreateDialogOpen(false)}
        />
      )}
    </>
  )
}
