import { CSSProperties } from 'react'
import LearningListItem from './LearningListItem'

type Props = {
  learnings: Learning[]
  className?: string
  style?: CSSProperties
}
export default function LearningList(props: Props) {
  const { learnings, className, style } = props
  return (
    <div className={className} style={style}>
      {learnings.length === 0 && (
        <div className="h-24 flex items-center justify-center">学習の記録がありません</div>
      )}
      <table className="w-full">
        <tbody>
          {learnings.map((learning) => (
            <LearningListItem learning={learning} key={learning.id} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
