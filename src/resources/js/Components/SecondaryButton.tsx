import { ButtonHTMLAttributes } from 'react'

export default function SecondaryButton({
  type = 'button',
  className = '',
  size = 'medium',
  disabled,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { size?: 'medium' | 'small' }) {
  return (
    <button
      {...props}
      type={type}
      className={
        `block py-2 bg-white border border-gray-300 rounded-md text-center font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 ${
          disabled && 'opacity-25'
        } ${size === 'small' ? 'px-2' : 'px-4'} ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  )
}
