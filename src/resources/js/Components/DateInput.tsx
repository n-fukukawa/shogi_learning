import { forwardRef, useEffect, useImperativeHandle, useRef, InputHTMLAttributes } from 'react'

export default forwardRef(function DateInput(
  {
    type = 'date',
    className = '',
    isFocused = false,
    ...props
  }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean },
  ref
) {
  const localRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus()
  }))

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus()
    }
  }, [])

  return (
    <input
      {...props}
      type={type}
      className={
        'border-stone-300 focus:border-stone-500 focus:ring-stone-500 rounded-md shadow-sm ' +
        className
      }
      ref={localRef}
    />
  )
})