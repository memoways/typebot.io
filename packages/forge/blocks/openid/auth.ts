import { option, AuthDefinition } from '@typebot.io/forge'

export const auth = {
  type: 'encryptedCredentials',
  name: 'OpenID credentials',
  schema: option.object({
    clientId: option.string.layout({
      label: 'Client ID',
      isRequired: true,
      helperText: 'OpenID client ID',
      withVariableButton: false,
      isDebounceDisabled: true,
    }),
    clientSecret: option.string.layout({
      label: 'Client Secret',
      isRequired: true,
      inputType: 'password',
      helperText: 'OpenID client secret',
      withVariableButton: false,
      isDebounceDisabled: true,
    }),
    configurationUrl: option.string.layout({
      label: 'Config URL',
      isRequired: true,
      helperText: 'The OpenID configuration URL',
      placeholder: 'https://auth.example.com/.well-known/openid-configuration',
      withVariableButton: false,
      isDebounceDisabled: true,
    }),
  }),
} satisfies AuthDefinition
