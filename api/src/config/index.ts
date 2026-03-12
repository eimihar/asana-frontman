import dotenv from 'dotenv';

dotenv.config();

export default {
  port: parseInt(process.env.PORT || '3000', 10),
  asana: {
    accessToken: process.env.ASANA_ACCESS_TOKEN || '',
    workspaceId: process.env.ASANA_WORKSPACE_ID || '',
  },
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN || '',
  },
};