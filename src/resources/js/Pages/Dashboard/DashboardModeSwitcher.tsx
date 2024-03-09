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
  [DashboardMode.PIE_CHART]: { icon: <PieChart /> },
  [DashboardMode.BAR_CHART]: { icon: <BarChart /> },
  [DashboardMode.LIST]: { icon: <List /> }
}

export const DashboardModeSwitcher: React.FC<Props> = (props) => {
  const { mode, switchMode, className } = props

  return (
    <div className={'flex rounded-sm ' + className}>
      {(Object.keys(DashboardMode) as Array<keyof typeof DashboardMode>).map((key, i) => {
        const isActive = DashboardMode[key] === mode

        return (
          <Button
            variant={isActive ? 'contained' : 'outlined'}
            color="secondary"
            onClick={() => switchMode(DashboardMode[key])}
            className="w-full sm:w-20"
            style={{
              boxShadow: 'none',
              borderRadius:
                i === 0
                  ? '4px 0 0 4px'
                  : i === Object.keys(DashboardMode).length - 1
                    ? '0 4px 4px 0'
                    : 0,
              borderLeft: i !== 0 ? 'none' : undefined
            }}
            key={key}
          >
            {source[key].icon}
          </Button>
        )
      })}
    </div>
  )
}
