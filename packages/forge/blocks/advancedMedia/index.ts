import { createBlock } from '@typebot.io/forge'
import { AdvancedMediaLogo } from './logo'
import { bgImage } from './actions/bgImage'

export const advancedMediaBlock = createBlock({
  id: 'advanced-media',
  name: 'Adv. Media',
  tags: [],
  LightLogo: AdvancedMediaLogo,
  actions: [bgImage],
})
