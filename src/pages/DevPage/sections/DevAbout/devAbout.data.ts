export type StackCategory = {
  id: string
  label: string
  items: string[]
}

export type PhilosophyStatement = {
  id: string
  text: string
}

export type WorkStep = {
  number: number
  title: string
  description: string
}

export type MetricCard = {
  id: string
  value: string
  label: string
  href?: string
}

export const stackCategories: StackCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    items: ['React', 'TypeScript', 'Next.js', 'Vue', 'HTML5 / CSS'],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: ['Node.js', 'Django', 'Python', 'PostgreSQL', 'REST API'],
  },
  {
    id: 'tools',
    label: 'Tools',
    items: ['Git', 'Figma', 'Prisma', 'Docker', 'Vercel'],
  },
  {
    id: 'architecture',
    label: 'Architecture',
    items: ['Modular structure', 'JWT auth', 'API-first', 'Clean code'],
  },
]

export const philosophyStatements: PhilosophyStatement[] = [
  { id: 'p1', text: 'Чистый, читаемый код вместо хитрых трюков.' },
  { id: 'p2', text: 'Архитектурные решения — до старта, не переработка потом.' },
  { id: 'p3', text: 'Бизнес-логика отделена от UI.' },
  { id: 'p4', text: 'Производительность — это тоже фича.' },
  { id: 'p5', text: 'Документация — часть работы.' },
  { id: 'p6', text: 'UX важен так же, как качество backend.' },
]

export const workSteps: WorkStep[] = [
  {
    number: 1,
    title: 'Бриф и анализ',
    description:
      'Уточняем цели, ограничения и сроки. Требования и критерии успеха фиксируются до написания кода.',
  },
  {
    number: 2,
    title: 'Техническая архитектура',
    description:
      'Выбираем stack и структуру под конкретную задачу — не по тренду.',
  },
  {
    number: 3,
    title: 'Итеративная разработка',
    description: 'Регулярные сборки и демо — чтобы запуск не стал неожиданностью.',
  },
  {
    number: 4,
    title: 'Прозрачная коммуникация',
    description: 'Понятные статус-апдейты в процессе. Никакой разработки в «чёрном ящике».',
  },
  {
    number: 5,
    title: 'Поддержка после запуска',
    description:
      'Работа не заканчивается на деплое. Остаюсь на связи для правок и итераций.',
  },
]

export const metrics: MetricCard[] = [
  { id: 'm1', value: '4+', label: 'года в разработке' },
  { id: 'm2', value: '~50', label: 'проектов завершено' },
  { id: 'm3', value: '~50', label: 'учеников прошли обучение', href: '/tutor' },
  { id: 'm4', value: '3', label: 'основных tech-стека' },
]
