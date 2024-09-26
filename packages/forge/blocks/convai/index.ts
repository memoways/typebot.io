import { createBlock } from '@typebot.io/forge'
import { ConvaiLogo } from './logo'
import { auth } from './auth'
import { synthesizeSpeech } from './actions/synthesizeSpeech'
import { sendMessage } from './actions/sendMessage'

export const convaiBlock = createBlock({
  id: 'convai',
  name: 'Convai',
  tags: [],
  LightLogo: ConvaiLogo,
  auth,
  actions: [synthesizeSpeech, sendMessage],
})
