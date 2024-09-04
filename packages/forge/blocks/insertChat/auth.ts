import { option, createAuth } from '@typebot.io/forge'

export const auth = createAuth({
  type: 'encryptedCredentials',
  name: 'Insert Chat account',
  schema: option.object({
    jwtToken: option.string.layout({
      label: 'JWT Token',
      isRequired: true,
      moreInfoTooltip: 'Use your browser console on the insert chat admin UI to get the Authorization header',
      placeholder: 'NHsjIDkl.xjsdofhs8s9djsal01pcmNALSIFakNAPskdhf0823lsandOS',
      withVariableButton: false,
      isDebounceDisabled: true,
    }),
  }),
})


export function authHeader({ jwtToken }: any) {
  return `Bearer ${jwtToken}`
}
