import { createAction, option } from '@typebot.io/forge'
import { auth, authHeader } from '../auth'
import ky, { HTTPError } from 'ky'
import { BASE_URL } from '../constants'

export const sendMessage = createAction({
  auth,
  name: "Send a message",
  turnableInto: undefined,
  options: option.object({
    sessionVariable: option.string.layout({
      label: "Session Variable",
      moreInfoTooltip: 'The variable with the session set by a previous call to openSession',
      inputType: "variableDropdown"
    }),
    responseVariable: option.string.optional().layout({
      label: "Message response variable",
      moreInfoTooltip: 'The variable that will be populated with the reponse',
      inputType: "variableDropdown"
    }),
    role: option.enum(["user", "assistant"]).layout({
      label: "Bot role",
      moreInfoTooltip: 'The bot role',
      defaultValue: "user"
    }),
    message: option.string.layout({
      label: 'Message',
      placeholder: 'hello',
      moreInfoTooltip: 'the message to send to the bot',
    }),
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

      const params = new URLSearchParams({
        widget_uid: session.widget_uid,
        chat_uid: session.uid,
        input: options.message,
        role: options.role ?? "user",
        disable_stream: true
      } as any)


      const res = await ky.post([
        BASE_URL,
        "embeds",
        "messages"].join("/"), {
        headers: {
          Authorization: authHeader(credentials),
        },
        body: params,
        timeout: 30000
      }).json<any>()

      if (options.responseVariable) {
        variables.set(options.responseVariable, res.output_text)
      }
    }
  }
})
