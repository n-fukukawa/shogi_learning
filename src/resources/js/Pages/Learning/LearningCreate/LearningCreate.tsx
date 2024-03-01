import DateInput from '@/Components/DateInput'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import SecondaryButton from '@/Components/SecondaryButton'
import TextInput from '@/Components/TextInput'
import { User } from '@/types'
import { useForm } from '@inertiajs/react'
import { Dialog, DialogActions, DialogContent } from '@mui/material'
import { useEffect } from 'react'
import { getProperForegroundColor } from '@/utils/colorHelper'

type Props = {
  user: User
  defaultYear: number
  defaultMonth: number
  categories: Category[]
  onClose: () => void
}
export default function LearningCreate({
  user,
  defaultYear,
  defaultMonth,
  categories,
  onClose
}: Props) {
  const { data, setData, post, processing, errors } = useForm({
    user_id: user.id,
    learning_at: '',
    category_id: categories[0].id,
    learning_time: '',
    title: ''
  })

  useEffect(() => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const date = today.getDate()

    if (year === defaultYear && month === defaultMonth) {
      setData({ ...data, learning_at: `${year}-${`0${month}`.slice(-2)}-${`0${date}`.slice(-2)}` })
    } else {
      setData({
        ...data,
        learning_at: `${defaultYear}-${`0${defaultMonth}`.slice(-2)}-01`
      })
    }
  }, [defaultYear, defaultMonth])

  const handleLearningTime = (minutes: number) => {
    const learning_time = Math.max(0, Number(data.learning_time) + minutes)
    setData({ ...data, learning_time: String(learning_time) })
  }

  const save = () => {
    post(route('store-learning'), { onSuccess: onClose })
  }

  return (
    <Dialog
      open={true}
      fullWidth
      maxWidth="xs"
      onClose={onClose}
      PaperProps={{ style: { width: '100%', margin: 0 } }}
    >
      <DialogContent>
        <InputLabel className="mb-1" value="学習日" />
        <DateInput
          className="w-48"
          value={data.learning_at}
          onChange={(e) => {
            setData({ ...data, learning_at: e.target.value })
          }}
        />
        <InputError message={errors.learning_at} className="mt-2" />

        <InputLabel value="内容" className="mt-6 mb-1" />
        <div className="flex flex-wrap gap-1">
          {categories.map((category) => (
            <SecondaryButton
              className="justify-center"
              style={{
                width: 'calc(33% - 0.2rem)',
                borderColor: data.category_id === category.id ? category.color : undefined,
                background: data.category_id === category.id ? category.color : undefined,
                color:
                  data.category_id === category.id
                    ? getProperForegroundColor(category.color)
                    : undefined
              }}
              size="small"
              onClick={() => setData({ ...data, category_id: category.id })}
              key={category.id}
            >
              {category.name}
            </SecondaryButton>
          ))}
        </div>
        <InputError message={errors.category_id} className="mt-2" />

        <InputLabel value="学習時間" className="mt-6 mb-1" />
        <div className="flex items-center justify-start">
          <TextInput
            className="w-16"
            type="text"
            value={data.learning_time ?? ''}
            onChange={(e) =>
              setData({
                ...data,
                learning_time: isNaN(Number(e.target.value)) ? '' : e.target.value
              })
            }
          />
          <span className="ml-2">分</span>
          <div className="flex">
            <SecondaryButton className="ml-4 mr-1" onClick={() => handleLearningTime(-15)}>
              -15分
            </SecondaryButton>
            <SecondaryButton onClick={() => handleLearningTime(15)}>+15分</SecondaryButton>
          </div>
        </div>
        <InputError message={errors.learning_time} className="mt-2" />

        <InputLabel value="メモ" className="mt-6 mb-1" />
        <TextInput
          className="w-full"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        <InputError message={errors.title} className="mt-2" />

        <InputError message={errors.user_id} className="mt-2" />
      </DialogContent>
      <DialogActions>
        <div className="flex justify-between w-full px-4 py-2">
          <SecondaryButton className="w-28" onClick={onClose} disabled={processing}>
            閉じる
          </SecondaryButton>
          <PrimaryButton className="w-28" onClick={save} disabled={processing}>
            保存
          </PrimaryButton>
        </div>
      </DialogActions>
    </Dialog>
  )
}
