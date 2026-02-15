

import type { ButtonHTMLAttributes } from 'react'

import styles from './Button.module.scss'

type Variant = 'primary' | 'ghost'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
}

export function Button({ variant = 'primary', className, ...props }: Props) {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ')

  return <button className={classes} {...props} />
}