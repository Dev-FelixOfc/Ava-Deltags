import fs from 'fs'
import { writeExifImg, writeExifVid } from '../../configuraçōes/rótulos.ts'

export default {
  command: ['sticker', 's'],
  description: 'Cria um adesivo a partir de uma imagem ou vídeo',
  category: 'stickers',
  use: '(responde a uma imagem ou vídeo)',

  run: async (sock, m, { args }) => {
    try {
      const quoted = m.quoted ? m.quoted : m
      const mime = (quoted.msg || quoted).mimetype || ''
      const packname = 'Lurus'
      const author = 'Zam'

      if (!/image|video/.test(mime)) {
        return m.reply('❁ Responda a uma imagem ou vídeo para criar o adesivo.')
      }

      await m.reply('❁ Processando seu adesivo...')

      let mediaBuffer = await quoted.download()

      if (/image/.test(mime)) {
        const sticker = await writeExifImg(mediaBuffer, { packname, author })
        await sock.sendMessage(m.chat, { sticker }, { quoted: m })
        console.log('❁ Adesivo de imagem criado com sucesso')
      } else if (/video/.test(mime)) {
        if ((quoted.msg || quoted).seconds > 15) {
          return m.reply('❁ O vídeo não pode durar mais de 15 segundos para ser adesivo.')
        }
        const sticker = await writeExifVid(mediaBuffer, { packname, author })
        await sock.sendMessage(m.chat, { sticker }, { quoted: m })
        console.log('❁ Adesivo de vídeo criado com sucesso')
      }
    } catch (err) {
      console.error('❁ Erro ao criar o adesivo:', err)
      return m.reply('❁ Ocorreu um erro ao criar o adesivo. Verifique os logs do painel.')
    }
  },
    }
