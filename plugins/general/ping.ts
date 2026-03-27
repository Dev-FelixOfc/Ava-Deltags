import moment from 'moment'

export default {
  command: ['ping', 'p'],
  description: 'Verifique a conexão do bot',
  category: 'general',
  run: async (sock: any, m: any, { prefix }: any) => {
    const start = Date.now()
    const latency = Date.now() - start

    const msg = `✰ \`ping\`
> ¡Pong! » ${latency}ms`.trim()

    await sock.sendMessage(m.chat, { text: msg }, { quoted: m })
  },
      }
