import { useForm } from '@inertiajs/react'
import { Dialog, DialogActions, DialogContent } from '@mui/material'
import { AccessTime, CalendarMonth, Edit, ImportContacts } from '@mui/icons-material'
import { User } from '@/types'
import { formatDate } from '@/utils/dateUtil'
import { getProperForegroundColor } from '@/utils/colorHelper'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import SecondaryButton from '@/Components/SecondaryButton'
import TextInput from '@/Components/TextInput'
import MyDatePicker from '@/Components/MyDatePicker'

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
    learning_at: getInitialDate(defaultYear, defaultMonth),
    category_id: categories[0].id,
    learning_time: '',
    title: ''
  })

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
        <div className="mt-4 flex items-center justify-start">
          <CalendarMonth color="secondary" fontSize="small" className="mr-4" />
          <MyDatePicker
            defaultValue={data.learning_at}
            onAccept={(date) => {
              setData({ ...data, learning_at: date ? new Date(date).toLocaleDateString() : '' })
            }}
          />
        </div>
        <InputError message={errors.learning_at} className="mt-2" />

        <div className="mt-6 flex items-center justify-start">
          <ImportContacts color="secondary" fontSize="small" className="mr-4" />

          <div className="flex flex-wrap gap-1">
            {categories.map((category) => (
              <SecondaryButton
                className={
                  'justify-center ' +
                  (category.name.length >= 4 ? 'text-xs sm:text-sm ' : undefined)
                }
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
        </div>
        <InputError message={errors.category_id} className="mt-2" />

        <div className="mt-6 flex items-center justify-start">
          <AccessTime color="secondary" fontSize="small" className="mr-4" />
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

        <div className="mt-6 flex items-center justify-start">
          <Edit color="secondary" fontSize="small" className="mr-4" />
          <TextInput
            className="w-full"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
        </div>
        <InputError message={errors.title} className="mt-2" />

        <InputError message={errors.user_id} className="mt-2" />
      </DialogContent>
      <DialogActions>
        <div className="flex justify-end w-full px-4 pb-4">
          <PrimaryButton className="w-28" onClick={save} disabled={processing}>
            保存
          </PrimaryButton>
        </div>
      </DialogActions>
    </Dialog>
  )
}

const getInitialDate = (defaultYear: number, defaultMonth: number) => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const date = today.getDate()

  if (year === defaultYear && month === defaultMonth) {
    return formatDate(`${year}/${month}/${date}`, '/', true)
  } else {
    return formatDate(`${defaultYear}/${defaultMonth}/1`, '/', true)
  }
}
