import { useMemo } from 'react'
import chroma from 'chroma-js'
import { getDateAndWeekday } from '@/utils/dateUtil'
import { minutesToString } from '@/utils/timeUtil'

type Props = {
  learning_at: string
  learnings: Learning[]
  onClick: (learning: Learning) => void
}
export default function LearningListItem(props: Props) {
  const { learning_at, learnings, onClick } = props

  const totalTime = useMemo(() => {
    const minutes = learnings.reduce((pV, cV) => {
      return pV + cV.learning_time
    }, 0)

    return minutesToString(minutes)
  }, [learnings])

  const { date, weekday, bgColor, textColor } = useMemo(() => {
    const { date, weekday } = getDateAndWeekday(learning_at)
    const [bgColor, textColor] = (() => {
      switch (weekday) {
        case '土':
          return ['bg-blue-100', 'text-blue-500']
        case '日':
          return ['bg-rose-100', 'text-red-500']
        default:
          return ['bg-stone-100', 'text-stone-500']
      }
    })()
    return { date, weekday, bgColor, textColor }
  }, [learning_at])

  return (
    <div className="mb-4 pb-2 border-l border-r rounded-md shadow-md">
      <div
        className={
          'flex justify-between items-center mb-2 p-4 text-lg ' + bgColor + ' ' + textColor
        }
      >
        <div>
          <span>{date}</span>
          <span className="ml-1 text-sm">({weekday})</span>
        </div>
        <div className="text-sm font-bold">{totalTime}</div>
      </div>
      <div>
        {learnings.map((learning) => (
          <div
            className="flex items-center px-4 py-2 text-stone-700 hover:bg-stone-100 cursor-pointer"
            onClick={() => onClick(learning)}
          >
            <div
              className="w-3 h-3 my-1 mr-2 rounded-full"
              style={{ background: chroma(learning.category.color).darken(0.3).hex('rgb') }}
            ></div>
            <div className="whitespace-nowrap">{learning.category.name}</div>
            <div className="px-1 pl-4 grow text-sm text-stone-500">{learning.title}</div>
            <div className="px-1 whitespace-nowrap text-right">{learning.learning_time}分</div>
          </div>
        ))}
      </div>
    </div>
  )
}
