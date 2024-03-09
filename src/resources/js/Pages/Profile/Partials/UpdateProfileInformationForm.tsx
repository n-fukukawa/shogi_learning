import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { Link, useForm, usePage } from '@inertiajs/react'
import { FormEventHandler } from 'react'
import { PageProps } from '@/types'

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = ''
}: {
  mustVerifyEmail: boolean
  status?: string
  className?: string
}) {
  const user = usePage<PageProps>().props.auth.user

  const { data, setData, patch, errors, processing } = useForm({
    name: user.name,
    email: user.email
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    patch(route('profile.update'))
  }

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">プロフィール編集</h2>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-6">
        <div>
          <InputLabel htmlFor="name" value="名前" />

          <TextInput
            id="name"
            className="mt-1 block w-full"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            required
            isFocused
            autoComplete="name"
          />

          <InputError className="mt-2" message={errors.name} />
        </div>

        <div>
          <InputLabel htmlFor="email" value="メールアドレス" />

          <TextInput
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            required
            autoComplete="username"
          />

          <InputError className="mt-2" message={errors.email} />
        </div>

        {mustVerifyEmail && user.email_verified_at === null && (
          <div>
            <p className="text-sm mt-2 text-gray-800">
              メールアドレスの認証が完了していません。
              <Link
                href={route('verification.send')}
                method="post"
                as="button"
                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                認証用のリンクを受け取る
              </Link>
            </p>

            {status === 'verification-link-sent' && (
              <div className="mt-2 font-medium text-sm text-green-600">
                認証用のメールを送信しました
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-4">
          <PrimaryButton disabled={processing}>変更</PrimaryButton>
        </div>
      </form>
    </section>
  )
}
