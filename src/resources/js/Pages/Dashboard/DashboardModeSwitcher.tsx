import { Button } from '@mui/material'
import React from 'react'
import { DashboardMode } from './const/DashboardMode'
import { BarChart, List, PieChart } from '@mui/icons-material'

type Props = {
  mode: DashboardMode
  switchMode: (mode: DashboardMode) => void
  className?: string
}

const source = {
  [DashboardMode.PIE_CHART]: { title: '円グラフ', icon: <PieChart /> },
  [DashboardMode.BAR_CHART]: { title: '棒グラフ', icon: <BarChart /> },
  [DashboardMode.LIST]: { title: '一覧', icon: <List /> }
}

export const DashboardModeSwitcher: React.FC<Props> = (props) => {
  const { mode, switchMode, className } = props

  return (
    <div className={'flex ' + className}>
      {(Object.keys(DashboardMode) as Array<keyof typeof DashboardMode>).map((key) => {
        const isActive = DashboardMode[key] === mode

        return (
          <Button
            startIcon={source[key].icon}
            variant="outlined"
            color="secondary"
            onClick={() => switchMode(DashboardMode[key])}
            className="w-full"
            style={{ boxShadow: 'none', border: !isActive ? 'none' : undefined }}
            key={key}
          >
            {source[key].title}
          </Button>
        )
      })}
    </div>
  )
}
