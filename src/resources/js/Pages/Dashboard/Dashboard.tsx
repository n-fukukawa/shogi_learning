import { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import { PageProps } from '@/types'
import PieChart from './PieChart'
import LearningList from '../Learning/LearningList/LearningList'
import PrimaryButton from '@/Components/PrimaryButton'
import LearningCreate from '../Learning/LearningCreate/LearningCreate'
import MyYearMonthPicker from '@/Components/MyYearMonthPicker'

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

  const [open, setOpen] = useState(false)

  const handleSubmit = (dateString: string | null) => {
    if (!dateString) return

    const date = new Date(dateString)

    get(route('dashboard', { year: date.getFullYear(), month: date.getMonth() + 1 }))
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">ダッシュボード</h2>}
    >
      <Head title="ダッシュボード" />

      <div className="sm:py-8 py-2 px-4">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <MyYearMonthPicker defaultValue={`${year}-${month}-01`} onAccept={handleSubmit} />
            <PrimaryButton className="w-40 h-10" onClick={() => setOpen(true)}>
              学習を記録する
            </PrimaryButton>
          </div>
          <div className="sm:flex">
            {statistics.length > 0 && (
              <div className="flex justify-center w-full h-72 sm:w-1/2 sm:h-auto sm:p-4">
                <PieChart statistics={statistics} />
              </div>
            )}
            <div
              className="w-full px-4 mt-4 sm:w-1/2 sm:mt-0"
              // style={{ height: 'calc(100vh - 480px)', overflow: 'auto' }}
            >
              <LearningList learnings={learnings} />
            </div>
          </div>

          <LearningCreate
            auth={auth}
            categories={categories}
            open={open}
            onClose={() => setOpen(false)}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
