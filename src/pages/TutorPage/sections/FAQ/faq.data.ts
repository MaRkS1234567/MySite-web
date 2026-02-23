type Localized = { ru: string; en: string }

export type FaqItem = {
  id: string
  tags: string[]
  question: Localized
  answer: Localized
}

export const faqItems: FaqItem[] = [
  {
    id: 'lesson-structure',
    tags: ['format'],
    question: {
      ru: 'Как проходит занятие?',
      en: 'How are lessons structured?',
    },
    answer: {
      ru: 'Занятие длится 60 или 90 минут. Мы начинаем с разбора домашнего задания и вопросов, затем изучаем новую тему с примерами и практикой, а в конце закрепляем материал и обсуждаем задания на дом. Формат гибкий — если нужно больше практики или теории, подстраиваемся.',
      en: 'A lesson lasts 60 or 90 minutes. We start by reviewing homework and questions, then cover new material with examples and practice, and wrap up with a summary and assignments. The format is flexible — we adjust based on what you need more of.',
    },
  },
  {
    id: 'trial-lesson',
    tags: ['format', 'pricing'],
    question: {
      ru: 'Есть ли пробное занятие?',
      en: 'Is there a trial lesson?',
    },
    answer: {
      ru: 'Да. Первое занятие — диагностическое. На нём мы знакомимся, определяем текущий уровень, обсуждаем цели и формируем план. Это бесплатно и ни к чему не обязывает — вы решаете, подходит ли вам формат.',
      en: 'Yes. The first lesson is a diagnostic session. We get to know each other, assess the current level, discuss goals, and outline a plan. It\'s free and comes with no obligation — you decide if the format works for you.',
    },
  },
  {
    id: 'homework',
    tags: ['format'],
    question: {
      ru: 'Задаётся ли домашнее задание?',
      en: 'Is homework assigned?',
    },
    answer: {
      ru: 'Да, после каждого занятия. Объём зависит от интенсивности курса и ваших возможностей — обычно 30–60 минут самостоятельной работы. Все задания проверяются с подробной обратной связью до следующего урока.',
      en: 'Yes, after every lesson. The amount depends on course intensity and your availability — typically 30–60 minutes of independent work. All assignments are reviewed with detailed feedback before the next lesson.',
    },
  },
  {
    id: 'schedule',
    tags: ['schedule'],
    question: {
      ru: 'Как выбирается расписание?',
      en: 'How is the schedule determined?',
    },
    answer: {
      ru: 'Мы вместе подбираем удобные дни и время. Расписание фиксированное, но если нужно — можно перенести занятие, предупредив заранее. Количество занятий в неделю (1–3) зависит от выбранной интенсивности.',
      en: 'We choose convenient days and times together. The schedule is fixed, but lessons can be rescheduled with advance notice. The number of sessions per week (1–3) depends on the chosen intensity.',
    },
  },
  {
    id: 'cancellation',
    tags: ['schedule'],
    question: {
      ru: 'Можно ли отменить или перенести занятие?',
      en: 'Can I cancel or reschedule a lesson?',
    },
    answer: {
      ru: 'Да. Перенос возможен при уведомлении минимум за 12 часов. Если предупреждение поступило позже — занятие считается проведённым. Это помогает поддерживать стабильный ритм обучения.',
      en: 'Yes. Rescheduling is possible with at least 12 hours\' notice. If notice is given later, the lesson is considered completed. This helps maintain a steady learning rhythm.',
    },
  },
  {
    id: 'online-format',
    tags: ['format'],
    question: {
      ru: 'Как проходят онлайн-занятия? Что нужно?',
      en: 'How do online lessons work? What do I need?',
    },
    answer: {
      ru: 'Занятия проходят через Zoom или Google Meet с использованием интерактивной доски. Вам нужен компьютер или планшет с камерой и стабильный интернет. Все материалы отправляются в электронном виде.',
      en: 'Lessons are held via Zoom or Google Meet with an interactive whiteboard. You\'ll need a computer or tablet with a camera and stable internet. All materials are shared digitally.',
    },
  },
  {
    id: 'who-for',
    tags: ['format'],
    question: {
      ru: 'Для кого подходят занятия?',
      en: 'Who are the lessons for?',
    },
    answer: {
      ru: 'Для школьников 8–11 классов, готовящихся к ОГЭ/ЕГЭ по информатике и математике, а также для тех, кто хочет изучить программирование с нуля или подтянуть школьную математику. Уровень не важен — программа подстраивается под вас.',
      en: 'For students in grades 8–11 preparing for OGE/EGE in computer science and math, and for anyone who wants to learn programming from scratch or strengthen their school math. Level doesn\'t matter — the program adapts to you.',
    },
  },
  {
    id: 'exam-prep',
    tags: ['exam'],
    question: {
      ru: 'Чем подготовка к ОГЭ/ЕГЭ отличается от обычных занятий?',
      en: 'How does OGE/EGE prep differ from regular lessons?',
    },
    answer: {
      ru: 'При подготовке к экзаменам мы работаем по структуре КИМ: разбираем каждый тип задания, отрабатываем стратегию распределения времени, регулярно пишем пробники и анализируем ошибки. Цель — не просто знать тему, а уверенно решать в формате экзамена.',
      en: 'For exam prep, we follow the official exam structure: break down each task type, practice time management strategies, regularly take mock exams, and analyze mistakes. The goal isn\'t just knowing the material — it\'s confidently solving problems in exam format.',
    },
  },
  {
    id: 'progress',
    tags: ['format'],
    question: {
      ru: 'Как отслеживается прогресс?',
      en: 'How is progress tracked?',
    },
    answer: {
      ru: 'Через регулярные контрольные и пробные работы, а также по результатам домашних заданий. Я фиксирую сильные стороны и зоны роста, чтобы корректировать план. Вы всегда видите, где находитесь и куда двигаемся.',
      en: 'Through regular check-ups and mock tests, as well as homework results. I track strengths and areas for improvement to adjust the plan. You always know where you stand and where we\'re heading.',
    },
  },
  {
    id: 'pricing-range',
    tags: ['pricing'],
    question: {
      ru: 'Почему цена указана диапазоном?',
      en: 'Why is the price shown as a range?',
    },
    answer: {
      ru: 'Итоговая стоимость зависит от формата (индивидуально / пара / мини-группа), длительности занятия (60 или 90 минут), интенсивности и срочности подготовки. Точную стоимость можно рассчитать в разделе «Цены» или обсудить на пробном занятии.',
      en: 'The final price depends on the format (individual / pair / mini-group), lesson duration (60 or 90 min), intensity, and urgency. You can calculate the exact cost in the Pricing section or discuss it during the trial lesson.',
    },
  },
  {
    id: 'payment',
    tags: ['pricing'],
    question: {
      ru: 'Как и когда происходит оплата?',
      en: 'How and when is payment made?',
    },
    answer: {
      ru: 'Оплата производится помесячно или за пакет занятий — как удобнее. Перевод на карту или другим согласованным способом. Детали обсуждаются после пробного занятия.',
      en: 'Payment is made monthly or per lesson package — whichever is more convenient. Bank transfer or another agreed method. Details are discussed after the trial lesson.',
    },
  },
  {
    id: 'communication',
    tags: ['format'],
    question: {
      ru: 'Можно ли задавать вопросы между занятиями?',
      en: 'Can I ask questions between lessons?',
    },
    answer: {
      ru: 'Да, я на связи в Telegram. Короткие вопросы по материалу, уточнения по домашнему заданию — пишите в любое время. Отвечаю в течение дня.',
      en: 'Yes, I\'m available on Telegram. Quick questions about the material or homework clarifications — message anytime. I respond within the day.',
    },
  },
  {
    id: 'zero-level',
    tags: ['format'],
    question: {
      ru: 'Что если ученик совсем не понимает предмет?',
      en: 'What if the student doesn\'t understand the subject at all?',
    },
    answer: {
      ru: 'Это нормальная ситуация, и с ней можно работать. Мы начнём с основ, разберём пробелы и будем двигаться в комфортном темпе. Главное — регулярность и желание разобраться. Многие ученики приходили «с нуля» и добивались отличных результатов.',
      en: 'That\'s a completely normal starting point. We\'ll begin with the basics, address gaps, and move at a comfortable pace. The key is consistency and willingness to learn. Many students started from zero and achieved great results.',
    },
  },
  {
    id: 'platform',
    tags: ['format'],
    question: {
      ru: 'Будет ли личный кабинет или платформа?',
      en: 'Will there be a student dashboard or platform?',
    },
    answer: {
      ru: 'Да, сейчас в разработке личный кабинет ученика с отслеживанием прогресса, материалами и домашними заданиями. Пока все материалы отправляются через мессенджер, но скоро всё будет в одном месте.',
      en: 'Yes, a student dashboard is currently in development with progress tracking, materials, and homework. For now, all materials are shared via messenger, but soon everything will be in one place.',
    },
  },
]

export const infographicText = {
  csTitle: {
    ru: 'Информатика',
    en: 'Computer Science',
  },
  codeComment: {
    ru: '// Твой успех начинается здесь',
    en: '// Your success starts here',
  },
  codeFileName: 'student.py',
  statStudentsValue: '50+',
  statStudentsLabel: {
    ru: 'Учеников',
    en: 'Students',
  },
  statSuccessValue: '95%',
  statSuccessLabel: {
    ru: 'Сдали успешно',
    en: 'Success Rate',
  },
  mathTitle: {
    ru: 'Математика',
    en: 'Mathematics',
  },
  mathStatAvgValue: '+28',
  mathStatAvgLabel: {
    ru: 'Баллов в среднем',
    en: 'Avg. score boost',
  },
  mathStatTopValue: '92%',
  mathStatTopLabel: {
    ru: 'На 80+ баллов',
    en: 'Score 80+',
  },
}

export const sectionText = {
  title: {
    ru: 'Часто задаваемые вопросы',
    en: 'Frequently Asked Questions',
  },
  subtitle: {
    ru: 'Не нашли ответ — оставьте заявку, и я свяжусь с вами',
    en: 'Didn\'t find your answer — submit an application and I\'ll get back to you',
  },
  searchPlaceholder: {
    ru: 'Поиск по вопросам…',
    en: 'Search questions…',
  },
  noResults: {
    ru: 'Ничего не найдено — попробуйте другой запрос или оставьте заявку',
    en: 'No matches found — try a different query or submit an application',
  },
  cta: {
    ru: 'Оставить заявку',
    en: 'Apply',
  },
}

export type Lang = 'ru' | 'en'
