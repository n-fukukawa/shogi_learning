import { formatMonthAndDate } from '@/utils/dateUtil'

type Props = {
  learning: Learning
}
export default function LearningListItem(props: Props) {
  const { learning } = props

  return (
    <tr className="border-b-2 border-stone-200 text-stone-700">
      <td className="w-14 py-1 whitespace-nowrap">{formatMonthAndDate(learning.learning_at)}</td>
      <td className="w-20 py-1 whitespace-nowrap">{learning.category.name}</td>
      <td className="py-1 text-sm text-stone-500">{learning.title}</td>
      <td className="w-16 py-1 whitespace-nowrap text-right">{learning.learning_time}分</td>
    </tr>
  )
}
