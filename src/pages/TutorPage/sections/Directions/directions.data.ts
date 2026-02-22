import type { ComponentType } from 'react'
import type { IconProps } from '@phosphor-icons/react'
import { GraduationCap, Exam, Code, MathOperations } from '@phosphor-icons/react'

export type DirectionId = 'oge' | 'ege' | 'programming' | 'math'

export type Intensity = 'light' | 'standard' | 'intensive'

type Localized = { ru: string; en: string }

export type Direction = {
  id: DirectionId
  icon: ComponentType<IconProps>
  title: Localized
  promise: Localized
  audience: Localized
  bullets: { ru: string[]; en: string[] }
  tags: { ru: string[]; en: string[] }
  goal: Localized
}

export const directions: Direction[] = [
  {
    id: 'oge',
    icon: GraduationCap,
    title: { ru: 'Подготовка к ОГЭ', en: 'OGE Preparation' },
    promise: {
      ru: 'Уверенная сдача экзамена с высоким баллом',
      en: 'Confident exam pass with a high score',
    },
    audience: { ru: '8–9 класс', en: 'Grades 8–9' },
    bullets: {
      ru: [
        'Разбор формата и структуры экзамена',
        'Закрытие пробелов в базовых темах',
        'Решение типовых заданий по каждому блоку',
        'Пробные экзамены с разбором ошибок',
      ],
      en: [
        'Exam format and structure breakdown',
        'Filling gaps in fundamental topics',
        'Solving typical tasks for each section',
        'Mock exams with detailed error analysis',
      ],
    },
    tags: {
      ru: ['Онлайн', 'ДЗ + обратная связь', 'Еженедельные тесты', 'Личный план'],
      en: ['Online', 'Homework + feedback', 'Weekly tests', 'Personal plan'],
    },
    goal: { ru: 'Подготовка к ОГЭ', en: 'OGE exam preparation' },
  },
  {
    id: 'ege',
    icon: Exam,
    title: { ru: 'Подготовка к ЕГЭ', en: 'EGE Preparation' },
    promise: {
      ru: 'Стратегия подготовки и максимальный результат',
      en: 'Preparation strategy for the best possible result',
    },
    audience: { ru: '10–11 класс', en: 'Grades 10–11' },
    bullets: {
      ru: [
        'Стратегия набора баллов и распределение времени',
        'Углублённый разбор сложных тем',
        'Решение заданий второй части с развёрнутым ответом',
        'Регулярные пробники в формате ЕГЭ',
        'Работа над типичными ошибками',
      ],
      en: [
        'Score strategy and time management',
        'Deep dive into advanced topics',
        'Part 2 tasks with detailed solutions',
        'Regular mock exams in EGE format',
        'Working through common mistakes',
      ],
    },
    tags: {
      ru: ['Онлайн', 'ДЗ + обратная связь', 'Пробники', 'Личный план'],
      en: ['Online', 'Homework + feedback', 'Mock exams', 'Personal plan'],
    },
    goal: { ru: 'Подготовка к ЕГЭ', en: 'EGE exam preparation' },
  },
  {
    id: 'programming',
    icon: Code,
    title: { ru: 'Программирование', en: 'Programming' },
    promise: {
      ru: 'От нуля до уверенного написания собственных проектов',
      en: 'From zero to confidently building your own projects',
    },
    audience: { ru: 'Начинающие и продолжающие', en: 'Beginners to intermediate' },
    bullets: {
      ru: [
        'Основы: переменные, циклы, функции, структуры данных',
        'Практика на реальных задачах и мини-проектах',
        'Решение алгоритмических задач',
        'Разбор ошибок и code review',
      ],
      en: [
        'Fundamentals: variables, loops, functions, data structures',
        'Practice with real tasks and mini-projects',
        'Algorithm problem solving',
        'Error analysis and code review',
      ],
    },
    tags: {
      ru: ['Онлайн', 'Проекты', 'Code review', 'Личный темп'],
      en: ['Online', 'Projects', 'Code review', 'Own pace'],
    },
    goal: { ru: 'Изучение программирования', en: 'Learning programming' },
  },
  {
    id: 'math',
    icon: MathOperations,
    title: { ru: 'Математика', en: 'Mathematics' },
    promise: {
      ru: 'Крепкая база и уверенность в решении задач',
      en: 'Strong foundation and confidence in problem solving',
    },
    audience: { ru: 'Школьная математика, укрепление базы', en: 'School math, strengthening the base' },
    bullets: {
      ru: [
        'Алгебра и геометрия по школьной программе',
        'Разбор типовых задач и закрепление формул',
        'Устранение пробелов в понимании',
        'Развитие математического мышления',
      ],
      en: [
        'Algebra and geometry (school curriculum)',
        'Typical problem solving and formula practice',
        'Filling comprehension gaps',
        'Developing mathematical thinking',
      ],
    },
    tags: {
      ru: ['Онлайн', 'ДЗ + обратная связь', 'Личный план', 'Гибкий график'],
      en: ['Online', 'Homework + feedback', 'Personal plan', 'Flexible schedule'],
    },
    goal: { ru: 'Укрепление базы по математике', en: 'Strengthening math foundation' },
  },
]

export const intensityLabels: Record<Intensity, Localized> = {
  light: { ru: 'Лёгкий', en: 'Light' },
  standard: { ru: 'Стандарт', en: 'Standard' },
  intensive: { ru: 'Интенсив', en: 'Intensive' },
}

export const intensityOptions: Intensity[] = ['light', 'standard', 'intensive']

export const sectionText = {
  title: { ru: 'Направления обучения', en: 'Learning Directions' },
  subtitle: {
    ru: 'Выберите направление — и оставьте заявку с уже заполненными данными',
    en: 'Choose a direction — and apply with your preferences already filled in',
  },
  cta: { ru: 'Оставить заявку', en: 'Apply' },
  intensityLabel: { ru: 'Интенсивность', en: 'Intensity' },
  audienceLabel: { ru: 'Для кого', en: 'Who it\'s for' },
  insideLabel: { ru: 'Что включено', en: 'What\'s inside' },
}
