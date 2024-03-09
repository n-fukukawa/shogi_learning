import DateInput from '@/Components/DateInput'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import SecondaryButton from '@/Components/SecondaryButton'
import TextInput from '@/Components/TextInput'
import { useForm } from '@inertiajs/react'
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material'
import { getProperForegroundColor } from '@/utils/colorHelper'
import { formatDate } from '@/utils/dateUtil'

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
    title: learning.title
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
      <DialogActions style={{ display: 'block' }}>
        <div className="flex justify-between w-full px-4 py-2">
          <SecondaryButton className="w-1/2" onClick={onClose} disabled={processing}>
            閉じる
          </SecondaryButton>
          <PrimaryButton className="w-1/2 ml-4" onClick={save} disabled={processing}>
            保存
          </PrimaryButton>
        </div>
        <div>
          <Button
            disabled={form.processing}
            onClick={remove}
            style={{ width: '100%', color: '#ff5555' }}
          >
            削除する
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  )
}
