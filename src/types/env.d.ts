/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PTERODACTYL_URL: string
  readonly VITE_PTERODACTYL_API_KEY: string
  readonly VITE_DISCORD_BOT_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 