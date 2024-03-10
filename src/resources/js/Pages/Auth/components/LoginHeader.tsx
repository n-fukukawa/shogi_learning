import { Link } from '@inertiajs/react'
import React from 'react'

type Props = {
  className?: string
}

export const LoginHeader: React.FC<Props> = (props) => {
  const { className } = props

  return (
    <div className={'w-3/4 mx-auto text-stone-500 ' + className}>
      <Link
        href={route('login')}
        className={
          'inline-block w-1/2 p-2 text-center font-bold hover:bg-stone-50 ' +
          (route().current('login') ? 'border-b-2 border-amber-500 text-amber-700' : '')
        }
      >
        ログイン
      </Link>
      <Link
        href={route('register')}
        className={
          'inline-block w-1/2 p-2 text-center font-bold hover:bg-stone-50 ' +
          (route().current('register') ? 'border-b-2 border-amber-500 text-amber-700' : '')
        }
      >
        新規登録
      </Link>
    </div>
  )
}
