export default {
  command: ['listusers', 'usuarios', 'database'],
  description: 'Mostra a lista de usuários registrados no banco de dados',
  category: 'proprietário',
  isOwner: true,
  run: async (sock, m, { isOwner }) => {
    try {
      const users = global.db.users
      const userJids = Object.keys(users)
      const totalUsers = userJids.length

      if (totalUsers === 0) return m.reply('❁ Nenhum usuário registrado no banco de dados ainda.')

      let message = `❁ *Total de usuários:* ${totalUsers}\n\n`

      const topUsers = userJids.slice(0, 50)

      topUsers.forEach((jid, index) => {
        const user = users[jid]
        const name = user.name || 'Usuário'
        const tag = jid.split('@')[0]
        message += `✿︎ ${index + 1}. ◦ @${tag} (${name.substring(0, 15)})\n`
      })

      if (totalUsers > 50) {
        message += `\n_... e ${totalUsers - 50} usuários a mais._`
      }

      return sock.sendMessage(
        m.chat,
        {
          text: message,
          mentions: topUsers,
        },
        { quoted: m }
      )
    } catch (e: any) {
      console.error(e)
      return m.reply('❁ Erro ao ler o banco de dados: ' + e.message)
    }
  },
        }
