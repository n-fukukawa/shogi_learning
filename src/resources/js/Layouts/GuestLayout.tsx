import ApplicationLogo from '@/Components/ApplicationLogo'
import { Link } from '@inertiajs/react'
import { PropsWithChildren } from 'react'
import { theme } from './theme'
import { ThemeProvider } from '@mui/material'

export default function Guest({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
        <div className="w-full sm:max-w-md px-4">
          <Link href="/" className="w-full">
            <div className="flex items-center justify-start sm:justify-center">
              <ApplicationLogo className="sm:w-16 sm:h-16 w-12 h-12 fill-current text-gray-500" />
              <div className="sm:text-2xl text-lg text-stone-700 mr-2">将棋学習帳</div>
            </div>
          </Link>
        </div>
        <div className="w-full sm:max-w-md p-6 overflow-hidden sm:rounded-lg">{children}</div>
      </div>
    </ThemeProvider>
  )
}
