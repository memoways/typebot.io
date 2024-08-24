import { createAction, option } from '@typebot.io/forge'
import { auth, authHeader } from '../auth'
import ky, { HTTPError } from 'ky'
import { BASE_URL } from '../constants'

export const openSession = createAction({
  auth,
  name: "Open a session",
  turnableInto: undefined,
  options: option.object({
    widgetUid: option.string.layout({
      label: 'The widget UID',
      placeholder: 'cd48cf5c-17d1-4fbc-aca7-cf5b10eadf1d',
      moreInfoTooltip: 'The UUID of the bot you want to use',
    }),
    label: option.string.layout({
      label: 'The chat label',
      placeholder: 'mylabel',
      moreInfoTooltip: 'A user defined label for the chat session',
    }),
    sessionVariable: option.string.layout({
      label: "Session Variable",
      moreInfoTooltip: 'The variable that will receive the session',
      inputType: "variableDropdown"
    }),
    responseVariable: option.string.optional().layout({
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


      const params = new URLSearchParams({
        widget_uid: options.widgetUid,
        label: options.label
      } as any)

      const res = await ky.post([
        BASE_URL,
        "embeds",
        "chats"].join("/"), {
        headers: {
          Authorization: authHeader(credentials),
        },
        body: params
      }).json<any>()

      if (options.sessionVariable) {
        const session = {
          uid: res.uid,
          widget_uid: res.widget_uid,
        }
        variables.set(options.sessionVariable, JSON.stringify(session))
      }

      if (options.responseVariable && res.computed_messages) {
        const message: string[] = []
        res.computed_messages.forEach((m: any) => message.push(m.output_text as string))
        variables.set(options.responseVariable, message.join("\n"))
      }
    }
  }
})
