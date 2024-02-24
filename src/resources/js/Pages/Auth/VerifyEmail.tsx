import GuestLayout from '@/Layouts/GuestLayout'
import PrimaryButton from '@/Components/PrimaryButton'
import { Head, Link, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'

export default function VerifyEmail({ status }: { status?: string }) {
  const { post, processing } = useForm({})

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('verification.send'))
  }

  return (
    <GuestLayout>
      <Head title="メールアドレス認証" />

      <div className="mb-4 text-sm text-gray-600 leading-8">
        ご登録ありがとうございます！
        <br />
        メールアドレス確認のためのメールをお送りしました。
        <br />
        メール本文に記載されているURLをクリックしてください。
      </div>

      {status === 'verification-link-sent' && (
        <div className="mb-4 font-medium text-sm text-green-600">
          ご登録いただいたメールアドレスに新しく確認用のメールをお送りしました。
        </div>
      )}

      <form onSubmit={submit}>
        <div className="mt-8 flex items-center justify-between">
          <PrimaryButton disabled={processing}>メールを再送信</PrimaryButton>

          <Link
            href={route('logout')}
            method="post"
            as="button"
            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            ログアウト
          </Link>
        </div>
      </form>
    </GuestLayout>
  )
}
