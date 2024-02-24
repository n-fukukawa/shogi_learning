import ApplicationLogo from '@/Components/ApplicationLogo'
import { Link } from '@inertiajs/react'
import { PropsWithChildren } from 'react'

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-stone-500">
      <div>
        <Link href="/">
          <ApplicationLogo className="sm:w-48 sm:h-48 w-32 h-32 fill-current text-gray-500" />
        </Link>
      </div>

      <div className="w-full sm:max-w-md mt-6 p-6 bg-stone-200 shadow-md overflow-hidden sm:rounded-lg">
        {children}
      </div>
    </div>
  )
}
