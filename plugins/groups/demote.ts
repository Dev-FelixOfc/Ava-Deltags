export default {
  command: ['demote', 'degradar', 'removeradmin'],
  description: 'Degrada um administrador no grupo usando menções ou mensagem respondida',
  category: 'grupos',
  use: '@0 ou responder à mensagem',
  isGroup: true,
  isAdmin: true,
  isBotAdmin: true,
  run: async (sock, m, args) => {
    let target

    if (m.quoted) target = m.quoted.sender
    if (!target) {
      const mentions = m.mentionedJid
      if (mentions && mentions.length > 0) target = mentions[0]
    }

    if (!target) return m.reply('❁ Marque ou responda à mensagem do admin que deseja degradar.')

    try {
      await sock.groupParticipantsUpdate(m.chat, [target], 'demote')

      const chatData = global.db.data.chats[m.chat]

      if (!chatData.logs) chatData.logs = []

      chatData.logs.push({
        action: 'demote',
        option: 'DEL ADMIN',
        by: m.sender,
        date: new Date().toISOString(),
      })

      await sock.sendMessage(m.chat, {
        text: `❁ *@${target.split('@')[0]}* foi degradado de administrador.`,
        mentions: [target],
      })
    } catch (e) {
      m.reply('❁ Não foi possível degradar o usuário. Verifique se é um administrador.')
    }
  },
        }
