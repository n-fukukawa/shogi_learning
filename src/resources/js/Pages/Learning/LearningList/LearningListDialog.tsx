import { CSSProperties, useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import LearningList from './LearningList'
import SecondaryButton from '@/Components/SecondaryButton'
import LearningEdit from '../LearningEdit/LearningEdit'

type Props = {
  open: boolean
  onClose: () => void
  learnings: Learning[]
  year: number
  month: number
  categories: Category[]
  className?: string
  style?: CSSProperties
}
export default function LearningListDialog(props: Props) {
  const { open, onClose, learnings, year, month, categories, className, style } = props

  const [activeLearning, setActiveLearning] = useState<Learning | null>(null)

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          style: { margin: 0, width: 'calc(100% - 32px)' }
        }}
        className={className}
        style={style}
      >
        <DialogTitle>
          {year}年{month}月の記録
        </DialogTitle>
        <DialogContent>
          <LearningList learnings={learnings} onClickItem={setActiveLearning} />
        </DialogContent>
        <DialogActions>
          <SecondaryButton onClick={onClose}>閉じる</SecondaryButton>
        </DialogActions>
      </Dialog>
      {activeLearning && (
        <LearningEdit
          learning={activeLearning}
          categories={categories}
          onClose={() => setActiveLearning(null)}
        />
      )}
    </>
  )
}
