export type Service = {
  id: string
  title: string
  description: string
  meta: string
}

export const services: Service[] = [
  {
    id: 's1',
    title: 'Веб-приложение',
    description:
      'Кастомные веб-приложения, SaaS-продукты, аналитические дашборды и внутренние инструменты для команд.',
    meta: 'Stack: React + Node.js / Django',
  },
  {
    id: 's2',
    title: 'Лендинг и бизнес-сайт',
    description: 'Быстрые, SEO-готовые сайты с фокусом на конверсию.',
    meta: 'Stack: React / Next.js',
  },
  {
    id: 's3',
    title: 'Backend и API',
    description:
      'Проектирование REST API, архитектура баз данных, интеграция с внешними сервисами.',
    meta: 'Stack: Node.js / Django + PostgreSQL',
  },
  {
    id: 's4',
    title: 'Code Review и консультация',
    description:
      'Ревью архитектуры, выбор tech-стека, разовое или регулярное сопровождение.',
    meta: 'Формат: звонок или async',
  },
]
