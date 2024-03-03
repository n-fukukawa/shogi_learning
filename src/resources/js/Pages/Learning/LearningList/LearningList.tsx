import { CSSProperties } from 'react'
import LearningListItem from './LearningListItem'

type Props = {
  learnings: Learning[]
  onClickItem: (item: Learning) => void
  className?: string
  style?: CSSProperties
}
export default function LearningList(props: Props) {
  const { learnings, onClickItem, className, style } = props
  return (
    <div className={className} style={style}>
      <table className="w-full">
        <tbody>
          {learnings.map((learning) => (
            <LearningListItem
              learning={learning}
              onClick={() => onClickItem(learning)}
              key={learning.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
