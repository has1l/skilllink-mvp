// Fake helpers to simulate Telegram linking for the MVP UI.

export function generateLinkCode(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i=0; i<6; i++) code += alphabet[Math.floor(Math.random()*alphabet.length)]
  return code
}

export const tgBotUsername = 'skilllink_demo_bot'

export function telegramDeepLink(code: string) {
  // tg:// protocol works on desktop app; https://t.me also works in browsers.
  return `https://t.me/${tgBotUsername}?start=${code}`
}
