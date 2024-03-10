import { useState, PropsWithChildren, ReactNode, useEffect } from 'react'
import ApplicationLogo from '@/Components/ApplicationLogo'
import Dropdown from '@/Components/Dropdown'
import ResponsiveNavLink from '@/Components/ResponsiveNavLink'
import { Link } from '@inertiajs/react'
import { Flash, User } from '@/types'
import { UserContext } from '@/Context/UserContext'
import {
  Alert,
  Divider,
  Slide,
  SlideProps,
  Snackbar,
  ThemeProvider,
  createTheme
} from '@mui/material'
import { theme } from './theme'

export default function Authenticated({
  user,
  flash,
  header,
  children
}: PropsWithChildren<{ user: User; flash: Flash; header?: ReactNode }>) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false)
  const [showFlashMessage, setShowFlashMessage] = useState(false)

  useEffect(() => {
    setShowFlashMessage(Boolean(flash.message))
  }, [flash])

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={user}>
        <div className="min-h-screen bg-white text-stone-600">
          <nav className="bg-white border-b border-gray-100">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="shrink-0 flex items-center">
                    <Link href="/dashboard" className="flex items-center">
                      <ApplicationLogo className="block h-9 w-auto  mr-2 fill-current text-gray-800" />
                      将棋学習記録
                    </Link>
                  </div>
                </div>

                <div className="hidden sm:flex sm:items-center sm:ms-6">
                  <div className="ms-3 relative">
                    <Dropdown>
                      <Dropdown.Trigger>
                        <span className="inline-flex rounded-md">
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                          >
                            {user.name}

                            <svg
                              className="ms-2 -me-0.5 h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </span>
                      </Dropdown.Trigger>

                      <Dropdown.Content>
                        <Dropdown.Link href={route('dashboard')}>ホーム</Dropdown.Link>
                        <Dropdown.Link href={route('profile.edit')}>プロフィール</Dropdown.Link>
                        <Divider className="pt-1" />
                        <Dropdown.Link href={route('logout')} method="post" as="button">
                          ログアウト
                        </Dropdown.Link>
                      </Dropdown.Content>
                    </Dropdown>
                  </div>
                </div>

                <div className="-me-2 flex items-center sm:hidden">
                  <button
                    onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                  >
                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                      <path
                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                      <path
                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div
              className={
                (showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden shadow-md mb-4'
              }
            >
              <div className="space-y-1">
                <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                  ホーム
                </ResponsiveNavLink>
                <ResponsiveNavLink
                  href={route('profile.edit')}
                  active={route().current('profile.edit')}
                >
                  プロフィール
                </ResponsiveNavLink>
                <ResponsiveNavLink method="post" href={route('logout')} as="button">
                  ログアウト
                </ResponsiveNavLink>
              </div>
            </div>
          </nav>

          {header && (
            <header className="bg-white shadow">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
            </header>
          )}

          <main>{children}</main>
        </div>
        <Snackbar
          open={showFlashMessage}
          autoHideDuration={flash.message?.noAutoHide ? null : 3000}
          TransitionComponent={TransitionComponent}
          onClose={() => setShowFlashMessage(false)}
        >
          <Alert
            className="sm:w-96 w-full"
            severity={flash.message?.status}
            variant="filled"
            onClose={() => setShowFlashMessage(false)}
          >
            {flash.message?.text}
          </Alert>
        </Snackbar>
      </UserContext.Provider>
    </ThemeProvider>
  )
}

const TransitionComponent = (props: SlideProps) => {
  return <Slide {...props} direction="up" />
}
