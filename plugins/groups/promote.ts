export default {
  command: ['promote', 'promover', 'daradmin'],
  description: 'Adiciona um novo administrador',
  category: 'grupos',
  use: '@0 ou responder à mensagem',
  isGroup: true,
  isAdmin: true,
  isBotAdmin: true,
  run: async (sock, m, { args }) => {
    let target = m.quoted
      ? m.quoted.sender
      : m.mentionedJid && m.mentionedJid.length > 0
        ? m.mentionedJid[0]
        : null

    if (!target) return m.reply('*❁ Marque ou responda à mensagem do usuário que deseja promover.*')

    const cleanTarget = target.split(':')[0] + '@s.whatsapp.net'
    const botJid = sock.user.id.split(':')[0] + '@s.whatsapp.net'

    if (cleanTarget === botJid) return m.reply('*❁ Já sou administrador do grupo.*\n> Obrigado por se preocupar comigo!')

    try {
      await sock.groupParticipantsUpdate(m.chat, [target], 'promote')

      if (global.db.data.chats[m.chat]) {
        const chatData = global.db.data.chats[m.chat]
        if (!chatData.logs) chatData.logs = []
        chatData.logs.push({
          action: 'promote',
          option: 'ADD ADMIN',
          target: cleanTarget,
          by: m.sender,
          date: new Date().toISOString(),
        })
      }

      return sock.sendMessage(m.chat, {
        text: `*[❁]* *${m.pushName}* agora é administrador.`,
        mentions: [cleanTarget],
      })
    } catch (e) {
      console.error(e)
      return m.reply('*❁ Não foi possível realizar a promoção.*\n> ¡Verifique minhas permissões no grupo.!')
    }
  },
  }
