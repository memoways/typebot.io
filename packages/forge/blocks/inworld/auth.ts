import { option, AuthDefinition } from '@typebot.io/forge'

export const auth = {
  type: 'encryptedCredentials',
  name: 'Inworld account',
  schema: option.object({
    apiKey: option.string.layout({
      label: 'API key',
      isRequired: true,
      inputType: 'password',
      helperText: 'You can generate an API key and secret in your workspace.',
      withVariableButton: false,
      isDebounceDisabled: true,
    }),
    apiSecret: option.string.layout({
      label: 'API secret',
      isRequired: true,
      inputType: 'password',
      withVariableButton: false,
      isDebounceDisabled: true,
    }),
  }),
} satisfies AuthDefinition

export function authHeader({ apiKey, apiSecret }: any) {
  const b64 = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')
  return `Basic ${b64}`
}
