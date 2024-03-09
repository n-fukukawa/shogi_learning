import React from 'react'
import LearningPieChart from '../Learning/LearningChart/LearningPieChart'

type Props = {
  statistics: Statistics[]
  className?: string
}

export const DashboardPieChart: React.FC<Props> = (props) => {
  const { statistics, className } = props

  return (
    <div
      className={'relative flex justify-center w-full h-100 sm:w-1/2 sm:h-auto sm:p-4 ' + className}
      style={{ width: '90vw', height: '90vw', maxWidth: 480, maxHeight: 480 }}
    >
      <LearningPieChart statistics={statistics} />
    </div>
  )
}
