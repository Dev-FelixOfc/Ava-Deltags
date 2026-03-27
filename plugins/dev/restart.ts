export default {
  command: ['restart', 'reiniciar'],
  description: 'Reinicie o bot remotamente.',
  category: 'owner',
  isDev: true,

  run: async (sock, m) => {
    await sock.sendMessage(
      m.chat,
      {
        text: `*[❁]* O bot começou a reiniciar\n> ¡Aguarde enquanto o sistema reinicia!`,
      },
      { quoted: m }
    )

    setTimeout(() => {
      process.exit(0)
    }, 3000)
  },
}
