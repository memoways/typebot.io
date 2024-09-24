import { createBlock } from '@typebot.io/forge'
import { ConvaiLogo } from './logo'
import { auth } from './auth'

export const convaiBlock = createBlock({
  id: 'convai',
  name: 'Convai',
  tags: [],
  LightLogo: ConvaiLogo,
  auth,
  actions: [],
})
