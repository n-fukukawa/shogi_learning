import { Link, Head, useForm } from '@inertiajs/react'
import { PageProps } from '@/types'
import ApplicationLogo from '@/Components/ApplicationLogo'
import SecondaryButton from '@/Components/SecondaryButton'
import PrimaryButton from '@/Components/PrimaryButton'

export default function Welcome({
  auth
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
  const { get } = useForm({})
  return (
    <>
      <Head title="ようこそ" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <ApplicationLogo className="block h-9 w-auto  mr-2 fill-current text-gray-800" />
              <span className="sm:block hidden">将棋学習帳</span>
            </Link>
          </div>
          <div className="text-end">
            {auth.user ? (
              <SecondaryButton onClick={() => get(route('dashboard'))} className="inline-block">
                ホーム
              </SecondaryButton>
            ) : (
              <>
                <SecondaryButton onClick={() => get(route('login'))} className="inline-block">
                  ログイン
                </SecondaryButton>
                <PrimaryButton onClick={() => get(route('register'))} className="inline-block ms-2">
                  新規登録
                </PrimaryButton>
              </>
            )}
          </div>
        </div>
      </div>

      <div
        className="relative sm:flex sm:justify-center sm:items-center items-start bg-center bg-white  dark:bg-gray-900 selection:bg-red-500 selection:text-white"
        style={{ minHeight: 'calc(100vh - 140px)' }}
      >
        <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
          <div>
            <div className="p-6 py-8 bg-white from-gray-700/50 via-transparent rounded-lg shadow-2xl shadow-gray-500/20 flex">
              <div>
                <h2 className="mb-4 text-xl font-semibold text-stone-500">
                  将棋専用の学習記録アプリ
                </h2>

                <div className="sm:flex sm:justify-between">
                  <div className="sm:w-1/2 sm:pr-8 sm:mt-0 mt-8">
                    <div className="w-full flex justify-center items-center mx-auto">
                      <img src="images/app_intro.png" />
                    </div>
                  </div>
                  <div className="sm:w-1/2 mt-8 text-stone-500 text-sm leading-relaxed">
                    将棋の学習には、定跡を学んだり詰将棋を解いたり棋譜並べしたりと様々な方法があります。
                    <br />
                    <br />
                    「将棋学習帳」ではそういった方法ごとの学習時間を日々記録し、自分がどのくらいどの学習をしているのか一目でわかるアプリとなっています。
                    <br />
                    <br />
                    みなさまの棋力向上に少しでもお役立ちできればうれしい限りです。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center p-6">
        <div className="text-center text-xs text-stone-500">©fukulab 2024</div>
      </div>

      <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
    </>
  )
}
