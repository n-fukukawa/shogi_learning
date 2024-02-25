import { memo, useMemo } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import chroma from 'chroma-js'

ChartJS.register(ArcElement, Tooltip, Legend)

type Props = {
  statistics: Statistics[]
}

function PieChart(props: Props) {
  const { statistics } = props

  const totalLearningHours = useMemo(() => {
    const total = statistics.reduce((pV, cV) => pV + cV.learning_time, 0)
    return (total / 60).toFixed(2)
  }, [statistics])

  return (
    <Doughnut
      data={generateData(statistics)}
      options={{ plugins: { legend: { display: false } } }}
      plugins={[centerText(totalLearningHours)]}
      redraw
    />
  )
}

export default memo(
  PieChart,
  (prevProps, newProps) => JSON.stringify(prevProps) === JSON.stringify(newProps)
)

const generateData = (statistics: Statistics[]) => {
  const labels: string[] = []
  const values: number[] = []
  const backgroundColor: string[] = []
  const borderColor: string[] = []

  statistics.forEach((statistic) => {
    const { category, learning_time } = statistic
    labels.push(category.name)
    values.push(learning_time / 60)
    const color = chroma(category.color)
    backgroundColor.push(color.hex('rgb'))
    borderColor.push('#ffffff')
  })

  return {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor,
        borderColor,
        borderWidth: 2
      }
    ]
  }
}

const centerText = (text: string) => ({
  id: 'total-time-text',
  beforeDraw(chart: any) {
    const {
      ctx,
      chartArea: { top, width, height }
    } = chart
    ctx.save()

    ctx.fillRect(width / 2, top + height / 2, 0, 0)

    ctx.font = 'bold 20px San-serif'
    ctx.fillStyle = '#888888'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(`${text}h`, width / 2, top + height / 2)
  }
})
