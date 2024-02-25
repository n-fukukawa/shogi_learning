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
  categories: Category[]
  learnings: Learning[]
}

export default function Dashboard(props: Props) {
  const { auth, year, month, learnings, categories } = props

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
          <MyYearMonthPicker defaultValue={`${year}-${month}-01`} onAccept={handleSubmit} />
          <div className="mt-8 sm:flex">
            <div className="flex justify-center sm:w-1/2">
              <PieChart />
            </div>
            <div className="sm:w-1/2 sm:mt-0 mt-8">
              <LearningList
                learnings={learnings}
                className="px-4"
                style={{ height: 'calc(100vh - 540px)', overflow: 'auto' }}
              />
            </div>
          </div>
          <PrimaryButton className="sm:w-60 sm:mx-auto w-full mt-4" onClick={() => setOpen(true)}>
            学習を記録する
          </PrimaryButton>
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
