import { createBlock } from '@typebot.io/forge'
import { InworldLogo } from './logo'
import { auth } from './auth'
import { openSession } from './actions/openSession'
import { sendMessage } from './actions/sendMessage'
import { synthesizeSpeech } from './actions/synthesizeSpeech'

export const inworldBlock = createBlock({
  id: 'inworld',
  name: 'Inworld',
  tags: ['ai'],
  LightLogo: InworldLogo,
  auth,
  actions: [openSession, sendMessage, synthesizeSpeech],
})
