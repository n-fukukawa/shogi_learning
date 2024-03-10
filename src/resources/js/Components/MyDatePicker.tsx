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
          fullDate: 'yyyy/M/d',
          monthAndYear: 'yyyy年 M月',
          monthShort: 'M月',
          year: 'yyyy年',
          month: 'M月'
        }}
      >
        <MobileDatePicker
          views={['year', 'month', 'day']}
          minDate={'2020-01-01'}
          maxDate={new Date().toLocaleDateString()}
          defaultValue={defaultValue}
          closeOnSelect
          onAccept={onAccept}
          onMonthChange={onAccept}
          format="yyyy/M/d"
          slotProps={{
            toolbar: {
              toolbarFormat: 'yyyy年M月d日',
              className: 'text-stone-600 text-md',
              sx: { '& h4': { fontSize: 24 } }
            }
          }}
          sx={{
            '& fieldSet': { border: 'none' },
            '& input': { padding: 0, fontSize: '1rem', color: '#57534f', cursor: 'pointer' },
            '& input:focus': { '--tw-ring-color': 'transparent' },
            '& .MuiInputBase-root': { borderRadius: 0, color: '#57534f' }
          }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  )
}
