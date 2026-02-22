export type Format = 'individual' | 'pair' | 'mini-group'
export type Intensity = 'light' | 'standard' | 'intensive'
export type Frequency = '1x' | '2x' | '3x'
export type Goal = 'oge' | 'ege' | 'programming' | 'math' | 'grades'
export type Duration = 60 | 90

type Localized = { ru: string; en: string }
type Lang = 'ru' | 'en'

export type PricingConfig = {
  format: Format
  intensity: Intensity
  frequency: Frequency
  goal: Goal
  duration: Duration
  urgency: boolean
  estimatedMin: number
  estimatedMax: number
}

/* ── Base prices (per lesson) ── */

const basePrices: Record<Format, Record<Intensity, [number, number]>> = {
  individual: {
    light: [2000, 2500],
    standard: [2500, 3000],
    intensive: [3000, 3500],
  },
  pair: {
    light: [1500, 2000],
    standard: [1800, 2300],
    intensive: [2200, 2700],
  },
  'mini-group': {
    light: [1000, 1500],
    standard: [1300, 1800],
    intensive: [1600, 2100],
  },
}

/* ── Price calculation ── */

export function calculatePrice(config: {
  format: Format
  intensity: Intensity
  frequency: Frequency
  goal: Goal
  duration: Duration
  urgency: boolean
}): [number, number] {
  let [min, max] = [...basePrices[config.format][config.intensity]]

  if (config.duration === 90) {
    min += 500
    max += 500
  }

  if (config.goal === 'ege') {
    min += 200
    max += 200
  }

  if (config.urgency) {
    min += 300
    max += 300
  }

  if (config.frequency === '3x') {
    min -= 100
    max -= 100
  } else if (config.frequency === '2x') {
    min -= 50
    max -= 50
  }

  return [min, max]
}

export const lessonsPerMonth: Record<Frequency, number> = {
  '1x': 4,
  '2x': 8,
  '3x': 12,
}

export function formatPrice(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u2009')
}

/* ── Selector options ── */

export const formatOptions: Format[] = ['individual', 'pair', 'mini-group']
export const intensityOptions: Intensity[] = ['light', 'standard', 'intensive']
export const frequencyOptions: Frequency[] = ['1x', '2x', '3x']
export const goalOptions: Goal[] = ['oge', 'ege', 'programming', 'math', 'grades']
export const durationOptions: Duration[] = [60, 90]

/* ── Localized labels ── */

export const formatLabels: Record<Format, Localized> = {
  individual: { ru: 'Индивидуально', en: 'Individual' },
  pair: { ru: 'В паре (2)', en: 'Pair (2)' },
  'mini-group': { ru: 'Мини-группа (3–5)', en: 'Mini-group (3–5)' },
}

export const intensityLabels: Record<Intensity, Localized> = {
  light: { ru: 'Лёгкий', en: 'Light' },
  standard: { ru: 'Стандарт', en: 'Standard' },
  intensive: { ru: 'Интенсив', en: 'Intensive' },
}

export const frequencyLabels: Record<Frequency, Localized> = {
  '1x': { ru: '1 раз/нед', en: '1x/week' },
  '2x': { ru: '2 раза/нед', en: '2x/week' },
  '3x': { ru: '3 раза/нед', en: '3x/week' },
}

export const goalLabels: Record<Goal, Localized> = {
  oge: { ru: 'ОГЭ', en: 'OGE' },
  ege: { ru: 'ЕГЭ', en: 'EGE' },
  programming: { ru: 'Программирование', en: 'Programming' },
  math: { ru: 'Математика', en: 'Math' },
  grades: { ru: 'Улучшить оценки', en: 'Improve grades' },
}

export const durationLabels: Record<Duration, Localized> = {
  60: { ru: '60 мин', en: '60 min' },
  90: { ru: '90 мин', en: '90 min' },
}

/* ── "What's included" per intensity ── */

export const includesByIntensity: Record<Intensity, { ru: string[]; en: string[] }> = {
  light: {
    ru: [
      'Индивидуальный план обучения',
      'Домашние задания с проверкой',
      'Отслеживание прогресса',
    ],
    en: [
      'Individual learning plan',
      'Homework with verification',
      'Progress tracking',
    ],
  },
  standard: {
    ru: [
      'Индивидуальный план обучения',
      'Еженедельные практические сессии',
      'Регулярная обратная связь и разбор ошибок',
      'Отчёты о прогрессе',
    ],
    en: [
      'Individual learning plan',
      'Weekly practice sessions',
      'Regular feedback and corrections',
      'Progress reports',
    ],
  },
  intensive: {
    ru: [
      'Индивидуальный план обучения',
      'Максимум практики',
      'Пробные экзамены и тренировки',
      'Ускоренный график',
      'Поддержка между занятиями',
    ],
    en: [
      'Individual learning plan',
      'Maximum practice volume',
      'Mock exams and simulations',
      'Accelerated schedule',
      'Priority support between lessons',
    ],
  },
}

/* ── Section text ── */

export const sectionText = {
  title: { ru: 'Стоимость обучения', en: 'Pricing' },
  subtitle: {
    ru: 'Выберите формат и интенсивность, чтобы увидеть примерную стоимость.',
    en: 'Choose your format and intensity to see an estimated price range.',
  },
  formatLabel: { ru: 'Формат', en: 'Format' },
  intensityLabel: { ru: 'Интенсивность', en: 'Intensity' },
  frequencyLabel: { ru: 'Частота', en: 'Frequency' },
  goalLabel: { ru: 'Цель', en: 'Goal' },
  durationLabel: { ru: 'Длительность', en: 'Duration' },
  urgencyLabel: { ru: 'Срочность', en: 'Urgency' },
  urgencyToggle: { ru: 'Экзамен скоро (≤ 2 мес)', en: 'Exam soon (≤ 2 months)' },
  perLesson: { ru: '₽ / занятие', en: '₽ / lesson' },
  perPerson: { ru: 'за человека', en: 'per person' },
  monthlyLabel: { ru: '₽ / месяц', en: '₽ / month' },
  rangeExplanation: {
    ru: 'Точная стоимость зависит от уровня, целей и расписания.',
    en: 'Final price depends on level, goals, and schedule.',
  },
  includesTitle: { ru: 'Что входит', en: "What's included" },
  cta: { ru: 'Оставить заявку', en: 'Apply' },
  ctaHint: {
    ru: 'Ответим и уточним детали, чтобы назвать точную стоимость.',
    en: "We'll confirm details and provide an exact price.",
  },
  howCalculated: { ru: 'Как формируется цена', en: 'How pricing is calculated' },
  howCalculatedBody: {
    ru: 'Базовая стоимость зависит от формата и интенсивности. Длительность занятия, цель подготовки и срочность могут скорректировать диапазон. При высокой частоте занятий действует скидка.',
    en: 'The base price depends on format and intensity. Lesson duration, preparation goal, and urgency may adjust the range. Higher lesson frequency brings a discount.',
  },
}

/* ── Format pricing summary for Apply form banner ── */

export function formatPricingSummary(config: PricingConfig, lang: Lang): string {
  const parts = [
    formatLabels[config.format][lang],
    intensityLabels[config.intensity][lang],
    frequencyLabels[config.frequency][lang],
    `${formatPrice(config.estimatedMin)}–${formatPrice(config.estimatedMax)} ₽`,
  ]
  return parts.join(' · ')
}
