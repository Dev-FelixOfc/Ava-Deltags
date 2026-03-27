export default {
  command: ['on', 'off'],
  description: 'Ativa ou desativa funções do grupo',
  category: 'grupos',
  use: 'welcome',
  isGroup: true,
  isAdmin: true,
  isBotAdmin: true,

  run: async (sock, m, { args }) => {
    const cmd = m.text.trim().split(' ')[0].slice(1).toLowerCase()
    const setting = args[0]?.toLowerCase()

    if (!setting) {
      return m.reply('❁ Você deve especificar a *função*\n\n`Exemplo`\n!on antilink\n!off antilink')
    }

    const chatData = global.db.chats[m.chat]
    const isEnable = cmd === 'on'

    switch (setting) {
      case 'antilink':
        chatData.antilink = isEnable
        m.reply(`❁ A função *Antilink* foi *${isEnable ? 'ativada' : 'desativada'}*`)
        break

      case 'adminonly':
      case 'onlyadmin':
        chatData.adminonly = isEnable
        m.reply(`❁ O *Modo Admin* foi *${isEnable ? 'ativado' : 'desativado'}*`)
        break

      case 'welcome':
        chatData.welcome = isEnable
        m.reply(`❁ As *Boas-vindas* foram *${isEnable ? 'ativadas' : 'desativadas'}*`)
        break

      case 'detect':
        chatData.detect = isEnable
        m.reply(`❁ O *Detector* foi *${isEnable ? 'ativado' : 'desativado'}*`)
        break

      default:
        m.reply(
          'Opção não *válida*\n\n- Opções:\n`antilink`\n`welcome`\n`adminonly`\n`detect`\n\n> Exemplo: .on welcome'
        )
        break
    }
  },
                     }
