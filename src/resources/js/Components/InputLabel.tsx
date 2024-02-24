import { LabelHTMLAttributes } from 'react'

export default function InputLabel({
  value,
  className = '',
  children,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { value?: string }) {
  return (
    <label
      {...props}
      className={`block font-medium text-sm text-stone-700 select-none ` + className}
    >
      {value ? value : children}
    </label>
  )
}
