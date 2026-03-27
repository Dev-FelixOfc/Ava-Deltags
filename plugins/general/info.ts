import os from 'os'

export default {
  command: ['info', 'botinfo'],
  description: 'Exibe informações técnicas sobre o bot',
  category: 'geral',
  run: async (sock: any, m: any, { prefix }: any) => {
    const up = process.uptime()
    const h = Math.floor(up / 3600)
    const min = Math.floor((up % 3600) / 60)
    const s = Math.floor(up % 60)
    const cpu = os.cpus()[0]?.model.trim() || 'Desconhecido'
    const cores = os.cpus().length
    const mem = [(os.freemem() / 1024 / 1024).toFixed(0), (os.totalmem() / 1024 / 1024).toFixed(0)]
    const platform = `${os.platform()} ${os.release()} (${os.arch()})`
    const nodeV = process.version
    const host = os.hostname()
    const shell = process.env.SHELL || process.env.COMSPEC || 'desconhecido'
    const now = new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      hour12: false,
    })

    const botname = 'Ava Deltags'
    const owner = 'Deymon\'s Clubs'

    const info = `✰ *Nome do Bot:* ${botname}
❁ *Versão:* Ts-testing@1.0.0
✿︎ *Criador:* ${owner}
ꕥ *Tempo de atividade:* ${h}h ${min}m ${s}s
✰ *Plataforma:* ${platform}
❁ *Node.js:* ${nodeV}
✿︎ *Host:* ${host}
ꕥ *Shell:* ${shell}

✰ *CPU:* ${cpu} (${cores} núcleos)
❁ *Memória:* ${mem[0]} MiB livre / ${mem[1]} MiB total

✿︎ *Data & Hora:* ${now}`

    await sock.sendMessage(m.chat, { text: info.trim() }, { quoted: m })
  },
}
