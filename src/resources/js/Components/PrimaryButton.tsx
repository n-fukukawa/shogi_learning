import { ButtonHTMLAttributes } from 'react'

export default function PrimaryButton({
  className = '',
  disabled,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={
        `block px-4 py-2 bg-stone-600 border border-transparent rounded-md text-center font-semibold text-sm text-white uppercase tracking-widest hover:bg-stone-800 transition ease-in-out duration-150 ${
          disabled && 'opacity-25'
        } ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  )
}
