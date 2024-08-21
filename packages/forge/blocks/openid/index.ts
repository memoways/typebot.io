import { createBlock } from '@typebot.io/forge'
import { OpenidLogo } from './logo'
import { auth } from './auth'
import { login } from './actions/login'

export const openidBlock = createBlock({
  id: 'openid',
  name: 'OpenID',
  tags: [],
  LightLogo: OpenidLogo,
  auth,
  actions: [login],
})
