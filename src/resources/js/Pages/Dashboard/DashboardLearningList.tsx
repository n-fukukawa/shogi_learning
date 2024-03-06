import React, { CSSProperties, useState } from 'react'
import LearningEdit from '../Learning/LearningEdit/LearningEdit'
import LearningList from '../Learning/LearningList/LearningList'

type Props = {
  learnings: Learning[]
  categories: Category[]
  className?: string
  style?: CSSProperties
}

export const DashboardLearningList: React.FC<Props> = (props) => {
  const { learnings, categories, className, style } = props

  const [activeLearning, setActiveLearning] = useState<Learning | null>(null)

  return (
    <>
      <LearningList
        learnings={learnings}
        onClickItem={setActiveLearning}
        className={className}
        style={style}
      />

      {activeLearning && (
        <LearningEdit
          learning={activeLearning}
          categories={categories}
          onClose={() => setActiveLearning(null)}
        />
      )}
    </>
  )
}
