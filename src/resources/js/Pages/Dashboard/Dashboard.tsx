import { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import { PageProps } from '@/types'
import MyYearMonthPicker from '@/Components/MyYearMonthPicker'
import LearningCreateButton from '../Learning/LearningCreate/LearningCreateButton'
import { DashboardModeSwitcher } from './DashboardModeSwitcher'
import { DashboardMode } from './const/DashboardMode'
import { DashboardPieChart } from './DashboardPieChart'
import { DashboardLearningList } from './DashboardLearningList'
import { DashboardBarChart } from './DashboardBarChart'

type Props = PageProps & {
  year: number
  month: number
  dailyLearnings: DailyLearning[]
  statistics: Statistics[]
  statisticsSet: StatisticsSet
  categories: Category[]
}

export default function Dashboard(props: Props) {
  const { year, month, dailyLearnings, statistics, statisticsSet, categories } = props

  const [mode, switchMode] = useState(DashboardMode.PIE_CHART)

  const { get } = useForm()

  const handleSubmit = (dateString: string | null) => {
    if (!dateString) return
    const date = new Date(dateString)
    get(route('dashboard', { year: date.getFullYear(), month: date.getMonth() + 1 }))
  }

  return (
    <AuthenticatedLayout user={props.auth.user} flash={props.flash}>
      <Head title="ダッシュボード" />

      <div className="sm:py-4 py-2 px-4">
        <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mt-4 px-2">
            <MyYearMonthPicker defaultValue={`${year}/${month}/01`} onAccept={handleSubmit} />
            <LearningCreateButton categories={categories} year={year} month={month} />
          </div>

          <DashboardModeSwitcher className="mt-8 px-2" mode={mode} switchMode={switchMode} />

          <div className="flex justify-center mt-8">
            {mode === DashboardMode.PIE_CHART && <DashboardPieChart statistics={statistics} />}
            {mode === DashboardMode.BAR_CHART && (
              <DashboardBarChart statisticsSet={statisticsSet} />
            )}
            {mode === DashboardMode.LIST && (
              <DashboardLearningList
                className="w-full sm:px-4"
                dailyLearnings={dailyLearnings}
                categories={categories}
                style={{ height: 'calc(100vh - 260px)', overflowY: 'auto' }}
              />
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
