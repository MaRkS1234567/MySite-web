import { useState } from 'react'

import { useContactForm } from '../../../../features/contact-form/useContactForm'
import { Button } from '../../../../shared/ui/Button'
import { Container } from '../../../../shared/ui/Container'

import styles from './DevContact.module.scss'

export function DevContact() {
  const { name, contact, description, isLoading, isSuccess, error, setName, setContact, setDescription, handleSubmit } =
    useContactForm('dev')

  const [fieldErrors, setFieldErrors] = useState<Set<string>>(new Set())

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const empty = new Set<string>()
    if (!name.trim()) empty.add('name')
    if (!contact.trim()) empty.add('contact')
    if (!description.trim()) empty.add('description')

    if (empty.size > 0) {
      setFieldErrors(empty)
      return
    }

    setFieldErrors(new Set())
    handleSubmit()
  }

  const clearError = (field: string) => {
    if (fieldErrors.has(field)) {
      setFieldErrors((prev) => {
        const next = new Set(prev)
        next.delete(field)
        return next
      })
    }
  }

  return (
    <section id="contacts" className={styles.section}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>Связаться со мной</h2>
          <p className={styles.subtitle}>
            Оставьте заявку — я отвечу с кратким планом и оценкой сроков.
          </p>
        </div>

        <div className={styles.content}>
          {isSuccess ? (
            <div className={[styles.form, styles.successState].join(' ')}>
              <h3 className={styles.successTitle}>Заявка отправлена</h3>
              <p className={styles.successText}>Я свяжусь с вами в ближайшее время</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={onSubmit}>
              <div className={styles.formGrid}>
                <input
                  className={[styles.input, fieldErrors.has('name') ? styles.inputError : ''].filter(Boolean).join(' ')}
                  name="name"
                  type="text"
                  placeholder="Имя"
                  value={name}
                  onChange={(e) => { setName(e.target.value); clearError('name') }}
                />

                <input
                  className={[styles.input, fieldErrors.has('contact') ? styles.inputError : ''].filter(Boolean).join(' ')}
                  name="contact"
                  type="text"
                  placeholder="Контакт (Telegram / телефон)"
                  value={contact}
                  onChange={(e) => { setContact(e.target.value); clearError('contact') }}
                />
              </div>

              <textarea
                className={[styles.textarea, fieldErrors.has('description') ? styles.inputError : ''].filter(Boolean).join(' ')}
                name="project"
                rows={5}
                placeholder="Расскажите о проекте — идея, задача, стек если есть, сроки и бюджет..."
                value={description}
                onChange={(e) => { setDescription(e.target.value); clearError('description') }}
              />

              <div className={styles.formActions}>
                <Button variant="primary" type="submit" disabled={isLoading} style={isLoading ? { opacity: 0.7 } : undefined}>
                  {isLoading ? 'Отправка...' : 'Отправить'}
                </Button>
              </div>

              {error && (
                <p className={styles.errorMessage}>
                  Что-то пошло не так — напишите мне напрямую
                </p>
              )}
            </form>
          )}

          <div className={styles.infoGraphic}>
            <h3 className={styles.infoGraphicTitle}>Как это работает</h3>
            <div className={styles.steps}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>01</div>
                <div className={styles.stepContent}>
                  <h4 className={styles.stepTitle}>Обсуждение проекта</h4>
                  <p className={styles.stepDescription}>
                    Расскажите задачу — обсудим стек, сроки и объём работ
                  </p>
                </div>
              </div>

              <div className={styles.stepConnector} />

              <div className={styles.step}>
                <div className={styles.stepNumber}>02</div>
                <div className={styles.stepContent}>
                  <h4 className={styles.stepTitle}>Техническое предложение</h4>
                  <p className={styles.stepDescription}>
                    Подготовлю план реализации и оценку стоимости
                  </p>
                </div>
              </div>

              <div className={styles.stepConnector} />

              <div className={styles.step}>
                <div className={styles.stepNumber}>03</div>
                <div className={styles.stepContent}>
                  <h4 className={styles.stepTitle}>Разработка и запуск</h4>
                  <p className={styles.stepDescription}>
                    Итеративная разработка с регулярными обновлениями
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
