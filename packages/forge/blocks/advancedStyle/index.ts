import { createBlock } from '@typebot.io/forge'
import { AdvancedStyleLogo } from './logo'
import { bgImage } from './actions/bgImage'
import { bgVideo } from './actions/bgVideo'
import { applyCss } from './actions/applyCss'

export const advancedStyleBlock = createBlock({
  id: 'advanced-style',
  name: 'Adv. Style',
  tags: ['image'],
  LightLogo: AdvancedStyleLogo,
  actions: [bgImage, bgVideo, applyCss],
})
