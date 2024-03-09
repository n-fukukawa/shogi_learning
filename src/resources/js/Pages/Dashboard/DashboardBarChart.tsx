import React, { useState } from 'react'
import LearningBarChart from '../Learning/LearningChart/LearningBarChart'
import { IconButton, Typography } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'

type Props = {
  statisticsSet: StatisticsSet
  className?: string
}

export const DashboardBarChart: React.FC<Props> = (props) => {
  const { statisticsSet, className } = props

  const [offset, setOffset] = useState(0)

  return (
    <div
      className={'sm:p-4 ' + className}
      style={{
        width: '90vw',
        height: 'calc(90vh - 240px)',
        maxWidth: 600,
        minHeight: 300
      }}
    >
      <div className="flex justify-end">
        <IconButton onClick={() => setOffset((offset) => offset + 1)}>
          <ChevronLeft />
        </IconButton>
        <IconButton disabled={offset === 0} onClick={() => setOffset((offset) => offset - 1)}>
          <ChevronRight />
        </IconButton>
      </div>
      <Typography variant="caption">学習時間（時間）</Typography>
      <LearningBarChart statisticsSet={statisticsSet} offset={offset} />
    </div>
  )
}
