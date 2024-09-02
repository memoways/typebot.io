import { createBlock } from '@typebot.io/forge'
import { InsertChatLogo } from './logo'
import { auth } from './auth'
import { openSession } from './actions/openSession'
import { sendMessage } from './actions/sendMessage'

export const insertChatBlock = createBlock({
  id: 'insert-chat',
  name: 'Insert Chat',
  tags: ['ai'],
  LightLogo: InsertChatLogo,
  auth,
  actions: [openSession, sendMessage],
})
