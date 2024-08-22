import { createAction, option } from '@typebot.io/forge'
import ky, { HTTPError } from 'ky'
// @ts-ignore
import content from '!!raw-loader!./loginClient.js'

export const login = createAction({
  name: "OpenID Login",
  turnableInto: undefined,
  options: option.object({
    userInfoVariable: option.string.layout({
      label: "User info Variable",
      moreInfoTooltip: 'The variable that will receive user info after the user logged in',
      inputType: "variableDropdown"
    })
  }),
  run: {
    web: {
      parseFunction: ({ options }) => {
        let opts = options as any
        return {
          args: {
            AUTH_ENDPOINT: opts._authEndpoint,
            CLIENT_ID: opts._clientId,
            ACTION: opts._action
          },
          content
        }
      },
    },
    server: async ({
      credentials,
      options,
      variables,
    }) => {

      let code = null
      let state = null

      variables.list().forEach((v) => {
        if (v.name == "code") {
          code = v.value
        }
        if (v.name == "state") {
          state = v.value
        }
      })

      const config = await ky.get(credentials.configurationUrl).json<any>()


      let opts = options as any
      opts._authEndpoint = config.authorization_endpoint
      opts._clientId = credentials.clientId
      if (!code && !state) {
        opts._action = "redirect"
        return
      } else if (code && state) {
        opts._action = "none"
      } else {
        return
      }

      const redirectUri = new Buffer(state, 'base64').toString()

      const params = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: credentials.clientId,
        client_secret: credentials.clientSecret,
        redirect_uri: redirectUri,
        code: code
      })


      let res = await ky.post(config.token_endpoint, {
        body: params
      }).json<any>()


      let info = await ky.get(config.userinfo_endpoint, {
        headers: {
          Authorization: `Bearer ${res.access_token}`
        }
      }).json<any>()

      if (options.userInfoVariable)
        variables.set(options.userInfoVariable, JSON.stringify(info))

    }
  }
})

