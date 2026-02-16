

import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

import clsx from 'clsx'

import styles from './Input.module.scss'

type BaseProps = {
  label?: string
  hint?: string
  error?: string
  className?: string
}

type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement> & { as?: 'input' }

type TextareaProps = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement> & { as: 'textarea' }

type Props = InputProps | TextareaProps

export function Input(props: Props) {
  const { label, hint, error, className, as, id, ...rest } = props

  const controlId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className={clsx(styles.root, className)}>
      {label && (
        <label className={styles.label} htmlFor={controlId}>
          {label}
        </label>
      )}

      {as === 'textarea' ? (
        <textarea
          id={controlId}
          className={styles.textarea}
          aria-invalid={Boolean(error) || undefined}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={controlId}
          className={styles.input}
          aria-invalid={Boolean(error) || undefined}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {error ? <div className={styles.error}>{error}</div> : hint ? <div className={styles.hint}>{hint}</div> : null}
    </div>
  )
}