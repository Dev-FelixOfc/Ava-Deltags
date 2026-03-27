import fs from 'fs'

export default {
  command: ['backup', 'respaldo', 'creds'],
  description: 'Ele faz backup de arquivos importantes.',
  category: 'owner',
  isDev: true,

  run: async (sock, m) => {
    const credsPath = './auth/creds.json'

    if (!fs.existsSync(credsPath)) {
      return m.reply('*❁ O arquivo *creds.json* não existe no servidor.')
    }

    await m.reply('*❁ Preparando a transmissão de dados...*')

    try {
      const creds = fs.readFileSync(credsPath)

      await sock.sendMessage(
        m.sender,
        {
          document: creds,
          mimetype: 'application/json',
          fileName: 'creds.json',
        },
        { quoted: m }
      )

      await m.reply('*❁ Cópia de segurança enviada para o seu chat privado.*')
    } catch (e) {
      console.error(e)
      return m.reply('*❁ Ocorreu um erro ao tentar ler ou enviar as credenciais.*')
    }
  },
}
