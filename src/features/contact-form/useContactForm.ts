import { useState } from 'react'

type ContactType = 'tutor' | 'dev'

export function useContactForm(type: ContactType) {
  const [format, setFormat] = useState('')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ format, name, contact, description, type }),
      })

      if (res.ok) {
        setIsSuccess(true)
      } else {
        setError('Что-то пошло не так. Попробуйте ещё раз.')
      }
    } catch {
      setError('Что-то пошло не так. Попробуйте ещё раз.')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    format,
    name,
    contact,
    description,
    isLoading,
    isSuccess,
    error,
    setFormat,
    setName,
    setContact,
    setDescription,
    handleSubmit,
  }
}
