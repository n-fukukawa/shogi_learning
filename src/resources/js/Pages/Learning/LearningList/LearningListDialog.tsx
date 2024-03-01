import { CSSProperties } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import LearningList from './LearningList'
import SecondaryButton from '@/Components/SecondaryButton'

type Props = {
  open: boolean
  onClose: () => void
  learnings: Learning[]
  year: number
  month: number
  className?: string
  style?: CSSProperties
}
export default function LearningListDialog(props: Props) {
  const { open, onClose, learnings, year, month, className, style } = props
  return (
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
        <LearningList learnings={learnings} />
      </DialogContent>
      <DialogActions>
        <SecondaryButton onClick={onClose}>閉じる</SecondaryButton>
      </DialogActions>
    </Dialog>
  )
}
