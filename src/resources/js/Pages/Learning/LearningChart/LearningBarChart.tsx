import { memo, useMemo } from 'react'
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type Props = {
  statisticsSet: StatisticsSet
  offset: number
  onClickInner?: () => void
}

const PER_PAGE = 6

function LearningBarChart(props: Props) {
  const { statisticsSet, offset } = props

  const displayedData = useMemo(() => {
    return generateData(statisticsSet, offset)
  }, [statisticsSet, offset])

  return (
    <Bar
      className="w-full h-full cursor-pointer"
      data={displayedData}
      style={{ width: '100%', height: '100%' }}
      options={{
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false
            }
          },
          y: {
            stacked: true,
            grid: {
              display: true
            }
          }
        },
        plugins: {
          legend: { display: true, position: 'bottom' }
        }
      }}
      redraw
    />
  )
}

export default memo(
  LearningBarChart,
  (prevProps, newProps) => JSON.stringify(prevProps) === JSON.stringify(newProps)
)

const generateData = (statisticsSet: StatisticsSet, offset: number) => {
  const categories: Category[] = []
  const labels: string[] = []

  const entries = Object.entries(statisticsSet).reverse()

  entries.slice(offset, PER_PAGE + offset).forEach(([ym, statistics]) => {
    labels.push(ym)

    statistics.forEach(({ category }) => {
      if (categories.findIndex((_category) => category.id === _category.id) === -1) {
        categories.push(category)
      }
    })
  })

  labels.reverse()
  categories.sort((a, b) => a.sort_order - b.sort_order)

  const datasets: { label: string; data: number[]; backgroundColor: string }[] = []

  categories.forEach((category) => {
    const data = labels.map((ym) => {
      const statistics = statisticsSet[ym]
      const target = statistics.find((statistic) => statistic.category.id === category.id)
      return target?.learning_time ? target.learning_time / 60 : 0
    })
    datasets.push({
      label: category.name,
      data: data,
      backgroundColor: category.color
    })
  })

  return {
    labels,
    datasets
  }
}
