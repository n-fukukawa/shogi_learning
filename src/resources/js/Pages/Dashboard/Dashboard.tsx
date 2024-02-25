import { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import PieChart from './PieChart'
import LearningList from '../Learning/LearningList/LearningList'
import PrimaryButton from '@/Components/PrimaryButton'
import LearningCreate from '../Learning/LearningCreate/LearningCreate'

type Props = PageProps & {
  categories: Category[]
}

export default function Dashboard({ auth, categories }: Props) {
  const [open, setOpen] = useState(false)
  return (
    <AuthenticatedLayout
      user={auth.user}
      // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">ダッシュボード</h2>}
    >
      <Head title="ダッシュボード" />

      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div>2024年2月</div>
          <div className="mt-8 sm:flex">
            <div className="flex justify-center sm:w-1/2">
              <PieChart />
            </div>
            <div className="sm:w-1/2 sm:mt-0 mt-8">
              <LearningList />
              <PrimaryButton className="sm:w-60 w-full mt-4" onClick={() => setOpen(true)}>
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
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
