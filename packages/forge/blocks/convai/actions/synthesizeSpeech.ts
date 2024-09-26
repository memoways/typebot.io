
import { createAction, option } from '@typebot.io/forge'
import { auth } from '../auth'
import ky, { HTTPError } from 'ky'
// import { TTS_BASE_URL } from '../constants'
import { LANGUAGE_CODES, LANGUAGE_MAP, VOICE_MAP, VOICE_LANGUAGE_MAP } from '../constants'

export const synthesizeSpeech = createAction({
  auth,
  name: "Synthesize Speech",
  turnableInto: undefined,
  options: option.object({
    language: option.enum(LANGUAGE_CODES as any).layout({
      toLabels: (v) => LANGUAGE_MAP[v!],
      label: 'Language',
      placeholder: 'Select...',
      moreInfoTooltip: 'The language in which to do the synthesize',
    }),
    voiceName: option.string.layout({
      label: 'Voice name',
      placeholder: 'Select a voice',
      fetcher: 'fetchVoices',
      moreInfoTooltip: 'The voice name to use',
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
  fetchers: [
    {
      id: "fetchVoices",
      fetch: async ({ options }) => {
        const voices: Array<string> | undefined = VOICE_LANGUAGE_MAP[options.language as string]
        if (!voices) return []
        return voices.map((v) => ({label: VOICE_MAP[v], value: v}))
      },
      dependencies: ['language'],
    }
  ],
  run: {
    server: async ({
      credentials,
      options,
      variables,
    }) => {
      let message = (options.message ?? "no message given")
      message = message.replace(/(\r\n|\n|\r|\s)/gm, " ").substring(0, 2400)


      const res = await ky.post("https://api.convai.com/tts/",
        {
          headers: {
            "CONVAI-API-KEY": credentials.apiKey
          },
          json: {
            transcript: message,
            voice: options.voiceName,
            language: options.language,
            encoding: "wav"
          },
          throwHttpErrors: false
        }).text()

      console.log(res)

      // const audio = "data:audio/wav;base64," + res.audioContent
      //
      // if (options.responseVariable)
      //   variables.set(options.responseVariable, audio)
    }
  }
})

