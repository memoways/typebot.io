import { createBlock } from '@typebot.io/forge'
import { AdvancedMediaLogo } from './logo'
import { bgImage } from './actions/bgImage'
import { bgVideo } from './actions/bgVideo'

export const advancedMediaBlock = createBlock({
  id: 'advanced-media',
  name: 'Adv. Media',
  tags: ['image'],
  LightLogo: AdvancedMediaLogo,
  actions: [bgImage, bgVideo],
})
