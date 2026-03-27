import { exec } from 'child_process'
import { promisify } from 'util'
import { loadPlugins, pluginCache } from '../../manipulador.js'

const execute = promisify(exec)

export default {
  command: ['update', 'actualizar'],
  description: 'Atualize o repositório e recarregue os plugins dinamicamente.',
  category: 'owner',
  isOwner: true,

  run: async (sock: any, m: any) => {
    try {
      await m.reply('Verificando atualizações no repositório...')

      const { stdout } = await execute('git pull')

      if (stdout.includes('Já está atualizado')) {
        return await m.reply('O sistema já está atualizado.')
      }

      await m.reply('Alterações detectadas. Limpando o cache e recarregando os plugins...')

      pluginCache.clear()

      await loadPlugins()

      await m.reply('Atualização concluída com sucesso.\n\n' + stdout)
    } catch (e: any) {
      await m.reply('Erro durante a atualização:\n' + e.message)
    }
  },
}
