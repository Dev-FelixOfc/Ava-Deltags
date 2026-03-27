import moment from 'moment-timezone'

export default {
  command: ['menu', 'help'],
  category: 'general',
  run: async (sock, m, { prefix, isOwner }) => {
    const time = moment().tz('America/Mexico_City').format('HH:mm:ss')
    const name = m.pushName || 'User'
    
    const menuText = `*¡Hola ${name}!* espero que te encuentres bien, aquí tienes mi lista de funciones... *!!* ˙

*» ฅ^•ﻌ•^ฅ* *< \`MAIN\` >*
> ꕥ Comandos principales del bot.

✿︎ *${prefix}menu • ${prefix}help*
> ❀ Solicita la lista de comandos del bot.
✿︎ *${prefix}system • ${prefix}sistema*
> ❀ Solicita el sistema del bot en tiempo real.
✿︎ *${prefix}links • ${prefix}enlaces*
> ❀ Solicita los enlaces importantes del bot.

*» ฅ^•ﻌ•^ฅ* *< \`ECONOMY\` >* 
> ꕥ Comandos de economía para divertirse en el grupo.

✿︎ *${prefix}daily • ${prefix}diario*
> ❀ Reclama una recompensa cada 24 horas.
✿︎ *${prefix}work • ${prefix}trabajo • ${prefix}trabajar*
> ❀ Trabaja cada 10 minutos para obtener recompensas.
✿︎ *${prefix}crime • ${prefix}crimen*
> ❀ Comete un crimen para obtener más dinero.
✿︎ *${prefix}sluts • ${prefix}prostitución • ${prefix}prostituirse*
> ❀ Vendete a millonarios y corre la suerte de perder o ganar más dinero.
✿︎ *${prefix}cofre • ${prefix}chest*
> ❀ Consigue un cofre lleno de dinero y minerales exóticos.`

    await sock.sendMessage(
      m.chat,
      {
        text: menuText.trim(),
        contextInfo: {
          externalAdReply: {
            title: 'Ava Deltags Bot',
            body: `Ava. Desenvolvido por Deymoon's Clubs`,
            mediaType: 1,
            renderLargerThumbnail: false,
            thumbnailUrl:
              'https://cdn.evogb.org/AzamiJs/NevMd-37f1e73bea2c8868c8a2a1b288f42b67.jpg',
            sourceUrl: 'https://api.yotsuba.giize.com',
          },
        },
      },
      { quoted: m }
    )
  },
}
