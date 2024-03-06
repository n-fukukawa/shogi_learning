import React from 'react'
import LearningPieChart from '../Learning/LearningChart/LearningPieChart'

type Props = {
  statistics: Statistics[]
  className?: string
}

export const DashboardPieChart: React.FC<Props> = (props) => {
  const { statistics, className } = props

  if (statistics.length === 0) {
    return (
      <div className={'h-24 flex items-center justify-center ' + className}>
        学習の記録がありません
      </div>
    )
  }

  return (
    <div
      className="relative flex justify-center w-full h-100 sm:w-1/2 sm:h-auto sm:p-4"
      style={{ width: '90vw', height: '90vw', maxWidth: 480, maxHeight: 480 }}
    >
      <LearningPieChart statistics={statistics} />
    </div>
  )
}
