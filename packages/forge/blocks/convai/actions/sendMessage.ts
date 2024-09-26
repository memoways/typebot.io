import { createAction, option } from '@typebot.io/forge'
import { auth } from '../auth'
import ky, { HTTPError } from 'ky'

export const sendMessage = createAction({
  auth,
  name: "Send a message",
  turnableInto: undefined,
  options: option.object({
    sessionVariable: option.string.layout({
      label: "The session variable",
      moreInfoTooltip: 'Pass a variable to store the session, to start a new session, empty the variable value. To continue the session, pass the same variable along to multiple call to this block.',
      inputType: "variableDropdown"
    }),
    characterId: option.string.layout({
      label: 'Character ID',
      placeholder: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
    }),
    message: option.string.layout({
      label: 'Text Message',
      placeholder: 'hello',
      moreInfoTooltip: 'The text message to send to the character',
    }),
    audioMessageURL: option.string.optional().layout({
      label: 'Audio Message URL',
      moreInfoTooltip: 'If you want to use audio, set this to the URL of an audio clip. If set, the text message will be ignored.',
    }),
    audioResponse: option.boolean.layout({
      label: 'Generate audio response',
      moreInfoTooltip: 'Is set, the character will provide an audio response',
    }),
    audioResponseVariable: option.string.layout({
      label: "Audio file response variable",
      moreInfoTooltip: 'The variable that will be populated with URL of the audio clip',
      inputType: "variableDropdown"
    }),
    textResponseVariable: option.string.layout({
      label: "Text response variable",
      moreInfoTooltip: 'The variable that will be populated with the text response',
      inputType: "variableDropdown"
    }),
  }),
  run: {
    server: async ({
      credentials,
      options,
      variables,
    }) => {
      let sessionId = variables.get(options.sessionVariable!) as any
      if (!sessionId) {
        sessionId = -1
      }


      let audioResponse = !!options.audioResponse

      const params = new FormData()
      params.append("charID", options.characterId as any)
      params.append("sessionID",  sessionId as any)
      params.append("voiceResponse", audioResponse as any)

      if (options.audioMessageURL) {
        const util = await eval("import('util')")
        const cp = await eval("import('child_process')")
        const fs = (await eval("import('fs')")).promises
        const execFile = util.promisify(cp.execFile)
        const writeFile = fs.writeFile

        const now = Date.now()
        const webm = `/tmp/typebot_convai_convert_${now}.webm`
        const wav = `/tmp/typebot_convai_convert_${now}.wav`

        const res = await ky.get(options.audioMessageURL, { responseType: 'arrayBuffer' } as any)
        const bin = await res.arrayBuffer()
        await fs.writeFile(webm, Buffer.from(bin))

        const result = await execFile("ffmpeg", ["-i", webm, "-ac", "1", wav])
        const audio = await fs.readFile(wav)
        await fs.rm(wav)
        await fs.rm(webm)
        const blob = new Blob([audio])
        params.append("file", blob, "audio.wav")
      } else {
        let message = (options.message ?? "no message given")
        message = message.replace(/(\r\n|\n|\r|\s)/gm, " ").substring(0, 2400)

        params.append("userText", message)
      }


      const res = await ky.post("https://api.convai.com/character/getResponse",
        {
          headers: {
            "CONVAI-API-KEY": credentials.apiKey
          },
          body: params,
          timeout: 30000
        }).json<any>()

      if (options.sessionVariable && res.sessionID) {
        variables.set(options.sessionVariable, res.sessionID)
      }

      if (res.audio) {
        const audio = "data:audio/wav;base64," + res.audio

        if (options.audioResponseVariable) {
          variables.set(options.audioResponseVariable, audio)
        }
      }

      if (options.textResponseVariable) {
        variables.set(options.textResponseVariable, res.text)
      }
    }
  }
})

