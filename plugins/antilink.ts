import { resolveLidToRealJid } from '../configuraçōes/serviçōs_públicos.ts'

export async function antiLink(sock: any, m: any) {
  if (!m.text || !m.isGroup) return

  if (!global.db.chats[m.chat]) global.db.chats[m.chat] = { antilink: false }
  const chat = global.db.chats[m.chat]

  if (!chat.antilink) return

  const regexLink = /chat\.whatsapp\.com\/(?:invite\/)?([0-9a-zA-Z]{20,26})/i
  const isWaLink = regexLink.test(m.text)

  if (isWaLink) {
    try {
      const targetJid = await resolveLidToRealJid(m.sender, sock, m.chat)
      const groupCode = await sock.groupInviteCode(m.chat).catch(() => null)

      if (groupCode && m.text.includes(groupCode))
        return sock.sendMessage(m.chat, {
          text: 'Você enviou um *link* pertencente a este *grupo*.',
        })

      await sock.sendMessage(m.chat, {
        delete: {
          remoteJid: m.chat,
          fromMe: false,
          id: m.key.id,
          participant: m.sender,
        },
      })

      const caption = `@${targetJid.split('@')[0]} Ele enviou um link sem permissão de administrador.\n> ¡Você será removido do grupo!`

      await sock.sendMessage(
        m.chat,
        {
          text: caption,
          contextInfo: { mentionedJid: [targetJid] },
        },
        { quoted: m }
      )

      await sock.groupParticipantsUpdate(m.chat, [targetJid], 'remove')
    } catch (err) {
      console.error('Erro anti-link:', err)
    }
  }
}
