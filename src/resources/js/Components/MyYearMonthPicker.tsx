import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { jaJP } from '@mui/x-date-pickers/locales'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@emotion/react'

type Props = {
  defaultValue: string
  onAccept: (value: string | null) => void
}
export default function MyDatePicker(props: Props) {
  const { defaultValue, onAccept } = props

  const theme = createTheme({}, jaJP)

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        dateFormats={{
          monthAndYear: 'yyyy年 M月',
          monthShort: 'M月',
          year: 'yyyy年',
          month: 'M月'
        }}
      >
        <MobileDatePicker
          views={['year', 'month']}
          minDate={'2020-01-01'}
          maxDate={new Date().toLocaleDateString()}
          defaultValue={defaultValue}
          onAccept={onAccept}
          onMonthChange={onAccept}
          // onClose={}
          format="yyyy年 M月"
          slotProps={{
            toolbar: { toolbarFormat: 'yyyy年 M月' }
          }}
          sx={{
            '& fieldSet': { border: 'none' },
            '& input': { fontSize: '1.5rem', cursor: 'pointer' },
            '& input:focus': { '--tw-ring-color': 'transparent' },
            '& .MuiInputBase-root': { borderRadius: 0 }
          }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  )
}
