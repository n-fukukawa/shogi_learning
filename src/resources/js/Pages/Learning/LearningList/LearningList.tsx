import { CSSProperties } from 'react'
import LearningListItem from './LearningListItem'

type Props = {
  dailyLearnings: DailyLearning[]
  onClickItem: (item: Learning) => void
  className?: string
  style?: CSSProperties
}
export default function LearningList(props: Props) {
  const { dailyLearnings, onClickItem, className, style } = props

  if (dailyLearnings.length === 0) {
    return <div className={'py-8 text-center' + className}>学習記録がありません</div>
  }

  return (
    <div className={className} style={style}>
      <div>
        {dailyLearnings.map(({ learning_at, learnings }) => (
          <LearningListItem
            learning_at={learning_at}
            learnings={learnings}
            onClick={(learning: Learning) => onClickItem(learning)}
            key={learning_at}
          />
        ))}
      </div>
    </div>
  )
}
