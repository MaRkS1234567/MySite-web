import type { VercelRequest, VercelResponse } from '@vercel/node'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

function formatTutorMessage(fields: {
  format: string
  name: string
  contact: string
  description: string
}) {
  return [
    '🔔 *Новая заявка — Репетитор*',
    `📋 Формат: ${fields.format}`,
    `👤 Имя: ${fields.name}`,
    `📞 Контакт: ${fields.contact}`,
    `📝 Ситуация: ${fields.description}`,
  ].join('\n')
}

function formatDevMessage(fields: {
  format: string
  name: string
  contact: string
  description: string
}) {
  return [
    '🔔 *Новая заявка — Разработка*',
    `📋 Формат: ${fields.format}`,
    `👤 Имя: ${fields.name}`,
    `📞 Контакт: ${fields.contact}`,
    `📝 Описание: ${fields.description}`,
  ].join('\n')
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  Object.entries(CORS_HEADERS).forEach(([key, value]) => {
    res.setHeader(key, value)
  })

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { format, name, contact, description, type } = req.body

    const text =
      type === 'tutor'
        ? formatTutorMessage({ format, name, contact, description })
        : formatDevMessage({ format, name, contact, description })

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.CHAT_ID,
          text,
          parse_mode: 'Markdown',
        }),
      },
    )

    if (!telegramRes.ok) {
      const errorBody = await telegramRes.text()
      console.error('Telegram API error:', errorBody)
      return res.status(500).json({ error: 'Failed to send message' })
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Handler error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
