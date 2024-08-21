import { createAction, option } from '@typebot.io/forge'
import ky, { HTTPError } from 'ky'

export const login = createAction({
  name: "OpenID Login",
  turnableInto: undefined,
  options: option.object({
  }),
  run: {
    server: async ({
      credentials,
      options,
      variables,
    }) => {
      const res = await ky.get(credentials.configurationUrl).json<any>()

      console.log(res.authorization_endpoint)
    }
  }
})

