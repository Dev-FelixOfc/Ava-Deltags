import config from '../../config.ts'

export default {
  command: ['kick', 'kill', 'expulsar', 'remover'],
  description: 'Expulsa um membro do grupo',
  category: 'grupos',
  isGroup: true,
  isAdmin: true,
  isBotAdmin: true,
  use: '(@0 ou responder a uma mensagem)',

  run: async (sock, m, { args, isOwner }) => {
    const botJid = sock.user.id.split(':')[0] + '@s.whatsapp.net'

    let user =
      m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : null

    if (!user) return m.reply('❁ Marque ou responda à mensagem da pessoa que deseja remover.')

    const targetUser = user.split(':')[0] + '@s.whatsapp.net'
    if (targetUser === botJid) return m.reply('❁ Não posso me remover do grupo.\n> Desculpe, não posso fazer isso!')

    try {
      await sock.groupParticipantsUpdate(m.chat, [user], 'remove')

      if (global.db.data.chats[m.chat]) {
        const chatData = global.db.data.chats[m.chat]
        if (!chatData.logs) chatData.logs = []
        chatData.logs.push({
          action: 'kick',
          target: targetUser,
          by: m.sender,
          date: new Date().toISOString(),
        })
      }

      return m.reply('❁ Usuário removido com sucesso.')
    } catch (e) {
      console.error(e)
      return m.reply(
        '❁ Não foi possível remover o usuário. Verifique se é um número válido ou minhas permissões.'
      )
    }
  },
  }
