import { useForm } from '@inertiajs/react'
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material'
import { AccessTime, CalendarMonth, Edit, ImportContacts } from '@mui/icons-material'
import { getProperForegroundColor } from '@/utils/colorHelper'
import { formatDate } from '@/utils/dateUtil'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import SecondaryButton from '@/Components/SecondaryButton'
import TextInput from '@/Components/TextInput'
import MyDatePicker from '@/Components/MyDatePicker'
import DangerButton from '@/Components/DangerButton'

type Props = {
  learning: Learning
  categories: Category[]
  onClose: () => void
}
export default function LearningEdit({ learning, categories, onClose }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    user_id: learning.user_id,
    learning_at: formatDate(learning.learning_at, '-', true),
    category_id: learning.category.id,
    learning_time: String(learning.learning_time),
    title: learning.title ?? ''
  })

  const form = useForm({})

  const handleLearningTime = (minutes: number) => {
    const learning_time = Math.max(0, Number(data.learning_time) + minutes)
    setData({ ...data, learning_time: String(learning_time) })
  }

  const save = () => {
    put(`learning/${learning.id}`, { onSuccess: onClose })
  }

  const remove = () => {
    form.delete(route('delete-learning', learning.id), { onSuccess: onClose })
  }

  return (
    <Dialog
      open={true}
      fullWidth
      maxWidth="xs"
      onClose={onClose}
      PaperProps={{ style: { width: '100%', margin: 16 } }}
    >
      <DialogContent>
        <div className="mt-4 flex items-center justify-start">
          <CalendarMonth color="secondary" fontSize="small" className="mr-4" />
          <MyDatePicker
            defaultValue={data.learning_at}
            onAccept={(date) => setData({ ...data, learning_at: date ?? '' })}
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
      <DialogActions style={{ display: 'block' }}>
        <div className="flex justify-between w-full px-8 pb-4">
          <DangerButton className="w-28" disabled={form.processing} onClick={remove}>
            削除
          </DangerButton>
          <PrimaryButton className="w-28 ml-4" onClick={save} disabled={processing}>
            保存
          </PrimaryButton>
        </div>
      </DialogActions>
    </Dialog>
  )
}
