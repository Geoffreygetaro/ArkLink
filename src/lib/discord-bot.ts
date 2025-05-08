import { Client, GatewayIntentBits, Events } from 'discord.js'
import { pterodactylApi } from './api-client'

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
})

client.once(Events.ClientReady, () => {
  console.log('Discord bot is ready!')
})

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return

  const { commandName } = interaction

  try {
    switch (commandName) {
      case 'servers': {
        const servers = await pterodactylApi.getServers()
        await interaction.reply({
          content: servers.map(server => 
            `${server.attributes.name} (${server.attributes.status})`
          ).join('\n'),
          ephemeral: true,
        })
        break
      }
      case 'start': {
        const serverId = interaction.options.getString('server_id', true)
        await pterodactylApi.startServer(serverId)
        await interaction.reply({
          content: `Server ${serverId} is starting...`,
          ephemeral: true,
        })
        break
      }
      case 'stop': {
        const stopServerId = interaction.options.getString('server_id', true)
        await pterodactylApi.stopServer(stopServerId)
        await interaction.reply({
          content: `Server ${stopServerId} is stopping...`,
          ephemeral: true,
        })
        break
      }
      default: {
        await interaction.reply({
          content: 'Unknown command',
          ephemeral: true,
        })
      }
    }
  } catch (error) {
    console.error('Error handling command:', error)
    await interaction.reply({
      content: 'An error occurred while processing your command.',
      ephemeral: true,
    })
  }
})

export function startDiscordBot() {
  client.login(import.meta.env.VITE_DISCORD_BOT_TOKEN)
} 