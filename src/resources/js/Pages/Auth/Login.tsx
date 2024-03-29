import { useEffect, FormEventHandler } from 'react'
import GuestLayout from '@/Layouts/GuestLayout'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { Head, Link, useForm } from '@inertiajs/react'
import { LinearProgress } from '@mui/material'
import { LoginHeader } from './components/LoginHeader'

export default function Login({
  status,
  canResetPassword
}: {
  status?: string
  canResetPassword: boolean
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: true
  })

  useEffect(() => {
    return () => {
      reset('password')
    }
  }, [])

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('login'))
  }

  return (
    <GuestLayout>
      <Head title="ログイン" />

      {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

      <LoginHeader className="mb-6" />

      {processing && (
        <LinearProgress variant="indeterminate" className="mb-4" style={{ height: 6 }} />
      )}

      <form onSubmit={submit} className={processing ? 'opacity-50' : undefined}>
        <div>
          <InputLabel htmlFor="email" value="メールアドレス" />

          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            isFocused={true}
            onChange={(e) => setData('email', e.target.value)}
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password" value="パスワード" />

          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="current-password"
            onChange={(e) => setData('password', e.target.value)}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="flex items-center justify-between mt-4">
          {canResetPassword && (
            <Link
              href={route('password.request')}
              className="underline text-sm text-stone-700 hover:text-stone-900 select-none rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              パスワードを忘れましたか?
            </Link>
          )}

          <PrimaryButton className="ms-4" disabled={processing}>
            ログイン
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  )
}
