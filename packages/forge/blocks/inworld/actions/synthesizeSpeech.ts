import { createAction, option } from '@typebot.io/forge'
import { auth, authHeader } from '../auth'
import ky, { HTTPError } from 'ky'
import { TTS_BASE_URL } from '../constants'

export const synthesizeSpeech = createAction({
  auth,
  name: "Synthesize Speech",
  turnableInto: undefined,
  options: option.object({
    voiceName: option.string.layout({
      label: 'The name of the inworld voice',
      placeholder: 'Alex',
      moreInfoTooltip: 'The inworld voice name to use',
    }),
    message: option.string.layout({
      label: 'Message',
      placeholder: 'hello',
      moreInfoTooltip: 'the message to synthesize',
    }),
    responseVariable: option.string.layout({
      label: "Audio file response variable",
      moreInfoTooltip: 'The variable that will be populated with URL of the audio clip',
      inputType: "variableDropdown"
    })
  }),
  run: {
    server: async ({
      credentials,
      options,
      variables,
    }) => {

      let message = (options.message ?? "no message given")
      message = message.replace(/(\r\n|\n|\r|\s)/gm, " ").substring(0, 2400)


      const res = await ky.post([
        TTS_BASE_URL,
        "text:synthesize-sync"].join("/"), {
          headers: {
            Authorization: authHeader(credentials)
          },
          json: {
            input: {
              text: message
            },
            voice: {
              name: options.voiceName
            },
            audio_config: {
              audio_encoding: 1
            }
          }
        }).json<any>()

      const audio = "data:audio/wav;base64," + res.audioContent

      if (options.responseVariable)
        variables.set(options.responseVariable, audio)
    }
  }
})

