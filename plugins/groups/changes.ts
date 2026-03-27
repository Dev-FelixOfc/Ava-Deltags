export default {
  command: ['logs'],
  description: 'Mostra o histórico de mudanças nas funções do grupo',
  category: 'grupos',
  isGroup: true,
  isAdmin: true,
  run: async (sock, m) => {
    const chatData = global.db.data.chats[m.chat]

    if (!chatData.logs || chatData.logs.length === 0) {
      return m.reply('❁ *Nenhum histórico de mudanças registrado neste grupo.*')
    }

    await m.reply('❁ Gerando relatório do histórico, aguarde um momento...')

    let text = `❁ Logs

> 𝖧𝗂𝗌𝗍ó𝗋𝗂𝖼𝗈 𝖽𝖾 𝗆𝗈𝖽𝖎𝖋𝖎𝖈𝖆çõ𝖊𝗌 ›\n\n`

    chatData.logs.forEach((log, i) => {
      text += `❁ *Evento* › ${i + 1}\n`
      text += `✿︎ *Função* › ${log.option}\n`
      text += `ꕥ *Ação* › ${log.action}\n`
      text += `❁ *Usuário* › @${log.by.split('@')[0]}\n`
      text += `✿︎ *Data* › ${new Date(log.date).toLocaleString('pt-BR')}\n\n`
    })

    await sock.sendMessage(
      m.chat,
      {
        text,
        mentions: chatData.logs.map(log => log.by),
      },
      { quoted: m }
    )
  },
}
