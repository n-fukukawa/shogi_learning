import { getDateAndWeekday } from '@/utils/dateUtil'

type Props = {
  learning: Learning
  onClick: () => void
}
export default function LearningListItem(props: Props) {
  const { learning, onClick } = props

  return (
    <tr
      className="border-b-2 border-stone-200 text-stone-700 hover:bg-stone-100 cursor-pointer"
      onClick={onClick}
    >
      <td className="text-sm text-right py-2 px-2 whitespace-nowrap">
        {getDateAndWeekday(learning.learning_at)}
      </td>
      <td className="py-2 px-2 whitespace-nowrap">{learning.category.name}</td>
      <td className="py-2 px-2 w-full text-stone-500">{learning.title}</td>
      <td className="py-2 px-2 whitespace-nowrap text-right">{learning.learning_time}分</td>
    </tr>
  )
}
