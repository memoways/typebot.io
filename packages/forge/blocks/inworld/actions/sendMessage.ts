import { createAction, option } from '@typebot.io/forge'
import { auth, authHeader } from '../auth'
import ky, { HTTPError } from 'ky'
import { BASE_URL } from '../constants'

export const sendMessage = createAction({
  auth,
  name: "Send a message",
  turnableInto: undefined,
  options: option.object({
    message: option.string.layout({
      label: 'Message',
      placeholder: 'hello',
      moreInfoTooltip: 'the message to send to the character',
    }),
    sessionVariable: option.string.layout({
      label: "Session Variable",
      moreInfoTooltip: 'The variable containing the result from openSession',
      inputType: "variableDropdown"
    }),
    responseVariable: option.string.layout({
      label: "Message response variable",
      moreInfoTooltip: 'The variable that will be populated with the reponse',
      inputType: "variableDropdown"
    })
  }),
  run: {
    server: async ({
      credentials,
      options,
      variables,
    }) => {

      let session = variables.get(options.sessionVariable!) as any
      if (!session) return
      session = JSON.parse(session)

      const char = session.sessionCharacters[0]
      const workspace = char.name.split('/')[1]

      const sessionId = session.name
      const characterId = char.character

      const res = await ky.post([
        BASE_URL,
        "workspaces",
        workspace,
        "sessions",
        sessionId,
        "sessionCharacters",
        `${characterId}:sendText`].join("/"), {
        headers: {
          Authorization: authHeader(credentials),
          "Grpc-Metadata-session-id": sessionId
        },
        json: {
          text: options.message
        }
      }).json() as any

      if (options.sessionVariable)
        variables.set(options.responseVariable as string, res.textList.join("\n"))
    }
  }
})
