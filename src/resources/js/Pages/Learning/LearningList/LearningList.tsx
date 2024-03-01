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
