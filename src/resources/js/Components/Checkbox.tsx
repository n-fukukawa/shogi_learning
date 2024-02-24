import { InputHTMLAttributes } from 'react'

export default function Checkbox({
  className = '',
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      type="checkbox"
      className={
        'rounded border-gray-300 text-stone-600 shadow-sm focus:ring-amber-500 ' + className
      }
    />
  )
}
