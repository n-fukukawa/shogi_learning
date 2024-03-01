import { memo, useMemo } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import chroma from 'chroma-js'

ChartJS.register(ArcElement, Tooltip, Legend)

type Props = {
  statistics: Statistics[]
  onClickInner?: () => void
}

function LearningPieChart(props: Props) {
  const { statistics, onClickInner } = props

  const reversedStatistics = useMemo(() => {
    const result = structuredClone(statistics)
    result.sort((a, b) => b.category.id - a.category.id)
    return result
  }, [statistics])

  const totalLearningHours = useMemo(() => {
    const total = statistics.reduce((pV, cV) => pV + cV.learning_time, 0)
    return (total / 60).toFixed(2)
  }, [statistics])

  return (
    <Doughnut
      className="cursor-pointer"
      data={generateData(reversedStatistics)}
      options={{
        plugins: {
          legend: { display: true, position: 'bottom', reverse: true },
          tooltip: { enabled: false }
        },
        cutout: '75%',
        onClick: (event, _, chart) => {
          if (isInnerOfDoughnut(event, _, chart)) {
            onClickInner && onClickInner()
          }
        }
      }}
      plugins={[centerText(totalLearningHours)]}
      redraw
    />
  )
}

export default memo(
  LearningPieChart,
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
  afterDraw(chart: any) {
    const {
      ctx,
      chartArea: { top, width, height }
    } = chart
    ctx.save()

    ctx.fillRect(width / 2, top + height / 2, 0, 0)

    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    if (chart._active.length > 0) {
      const category = chart.config.data.labels[chart._active[0].index]
      const color = chart.config.data.datasets[0].backgroundColor[chart._active[0].index]
      const learningTime = chart.config.data.datasets[0].data[chart._active[0].index]

      ctx.fillStyle = chroma(color).darken(0.5).hex('rgb')
      ctx.font = `normal ${width / 18}px San-serif`
      ctx.fillText(`${category}`, width / 2, top + height / 2 - height / 12)

      ctx.font = `normal ${width / 12}px San-serif`
      ctx.fillText(`${learningTime}時間`, width / 2, top + height / 2 + height / 40)
    } else {
      ctx.font = `normal ${width / 12}px San-serif`
      ctx.fillStyle = '#777'
      ctx.fillText(`${text}時間`, width / 2, top + height / 2 - height / 50)
      ctx.font = `normal ${Math.max(width / 30, 13)}px San-serif`
      ctx.fillText(`詳細を見る`, width / 2, top + height / 2 + height / 12)
    }
  }
})

const isInnerOfDoughnut = (event: any, elms: any, chart: any) => {
  const meta = chart.getDatasetMeta(0)
  const arc = meta.data[0]
  const { innerRadius, x, y } = arc.getProps(['innerRadius', 'x', 'y'])
  const { x: eventX, y: eventY } = event
  if (eventX === null || eventY === null) return

  const distFromCenter = Math.sqrt(Math.abs(x - eventX) ** 2 + Math.abs(y - eventY) ** 2)

  return distFromCenter < innerRadius
}
