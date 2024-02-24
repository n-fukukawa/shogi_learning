import { ImgHTMLAttributes } from 'react'

export default function ApplicationLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img src="/images/shogi_koma.png" {...props} />
}
