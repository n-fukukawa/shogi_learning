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

type Props = PageProps & {
  year: number
  month: number
  learnings: Learning[]
  statistics: Statistics[]
  categories: Category[]
}

export default function Dashboard(props: Props) {
  const { year, month, learnings, statistics, categories } = props

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
          <div className="flex items-center justify-between">
            <MyYearMonthPicker defaultValue={`${year}-${month}-01`} onAccept={handleSubmit} />
            <LearningCreateButton categories={categories} year={year} month={month} />
          </div>

          <DashboardModeSwitcher className="my-4" mode={mode} switchMode={switchMode} />

          <div className="flex justify-center mt-6">
            {mode === DashboardMode.PIE_CHART && <DashboardPieChart statistics={statistics} />}
            {mode === DashboardMode.LIST && (
              <DashboardLearningList
                className="w-full px-4"
                learnings={learnings}
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
