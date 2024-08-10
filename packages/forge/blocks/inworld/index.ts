import { createBlock } from '@typebot.io/forge'
import { InworldLogo } from './logo'
import { auth } from './auth'
import { openSession } from './actions/openSession'
import { sendMessage } from './actions/sendMessage'

export const inworldBlock = createBlock({
  id: 'inworld',
  name: 'Inworld',
  tags: [],
  LightLogo: InworldLogo,
  auth,
  actions: [openSession, sendMessage],
})
