import { createBlock } from '@typebot.io/forge'
import { InworldLogo } from './logo'
import { auth } from './auth'
import { conversation } from './actions/conversation'

export const inworldBlock = createBlock({
  id: 'inworld',
  name: 'Inworld',
  tags: [],
  LightLogo: InworldLogo,
  auth,
  actions: [conversation],
})
