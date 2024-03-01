import { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import { PageProps } from '@/types'
import LearningPieChart from '../Learning/LearningChart/LearningPieChart'
import MyYearMonthPicker from '@/Components/MyYearMonthPicker'
import LearningCreateButton from '../Learning/LearningCreate/LearningCreateButton'
import LearningListDialog from '../Learning/LearningList/LearningListDialog'

type Props = PageProps & {
  year: number
  month: number
  learnings: Learning[]
  statistics: Statistics[]
  categories: Category[]
}

export default function Dashboard(props: Props) {
  const { auth, year, month, learnings, statistics, categories } = props

  const { get } = useForm()

  const [isLearningListOpen, setLearningListOpen] = useState(false)

  const handleSubmit = (dateString: string | null) => {
    if (!dateString) return

    const date = new Date(dateString)

    get(route('dashboard', { year: date.getFullYear(), month: date.getMonth() + 1 }))
  }

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="ダッシュボード" />

      <div className="sm:py-8 py-2 px-4">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <MyYearMonthPicker defaultValue={`${year}-${month}-01`} onAccept={handleSubmit} />
            <LearningCreateButton categories={categories} year={year} month={month} />
          </div>
          <div className="flex justify-center mt-6">
            {statistics.length > 0 && (
              <>
                <div
                  className="relative flex justify-center w-full h-100 sm:w-1/2 sm:h-auto sm:p-4"
                  style={{ width: '90vw', height: '90vw', maxWidth: 600, maxHeight: 600 }}
                >
                  <LearningPieChart
                    statistics={statistics}
                    onClickInner={() => setLearningListOpen(true)}
                  />
                </div>
              </>
            )}
            {statistics.length === 0 && (
              <div className="h-24 flex items-center justify-center">学習の記録がありません</div>
            )}
          </div>
        </div>
      </div>
      <LearningListDialog
        learnings={learnings}
        year={year}
        month={month}
        open={isLearningListOpen}
        onClose={() => setLearningListOpen(false)}
      />
    </AuthenticatedLayout>
  )
}
