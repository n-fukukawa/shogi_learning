import GuestLayout from '@/Layouts/GuestLayout'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { Head, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'

export default function ForgotPassword({ status }: { status?: string }) {
  const { data, setData, post, processing, errors } = useForm({
    email: ''
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('password.email'))
  }

  return (
    <GuestLayout>
      <Head title="Forgot Password" />

      <div className="mb-4 text-sm text-gray-600">
        パスワードを忘れた場合は、パスワードの再設定をおこなってください。
      </div>

      {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

      <form onSubmit={submit}>
        <TextInput
          id="email"
          type="email"
          name="email"
          value={data.email}
          className="mt-1 block w-full"
          placeholder="メールアドレス"
          isFocused={true}
          onChange={(e) => setData('email', e.target.value)}
        />

        <InputError message={errors.email} className="mt-2" />

        <div className="flex items-center justify-end mt-4">
          <PrimaryButton className="ms-4" disabled={processing}>
            パスワード再設定メールを受け取る
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  )
}
