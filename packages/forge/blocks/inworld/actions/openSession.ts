import { createAction, option } from '@typebot.io/forge'
import { auth } from '../auth'
import ky, { HTTPError } from 'ky'
import { BASE_URL } from '../constants'

export const openSession = createAction({
  auth,
  name: "Open a session",
  turnableInto: undefined,
  options: option.object({
    characterId: option.string.layout({
      label: 'Character ID',
      placeholder: 'workspaces/foo/characters/jon',
      moreInfoTooltip: 'The inworld character ID can be found on the character list',
    }),
    endUser: option.object({
      id: option.string.optional().layout({
        label: 'User id',
        moreInfoTooltip: 'End user id',
      }),
      name: option.string.optional().layout({
        label: 'User name',
        moreInfoTooltip: 'End user name',
      }),
      gender: option.enum(["M", "F"]).optional().layout({
        label: 'Gender',
        moreInfoTooltip: 'Male or female',
      }),
      role: option.string.optional().layout({
        label: 'Role',
        moreInfoTooltip: 'End user role',
      }),
      age: option.number.optional().layout({
        label: 'Age',
        moreInfoTooltip: 'End user age',
      }),
    }).optional(),
    sessionVariable: option.string.layout({
      label: "Session Variable",
      moreInfoTooltip: 'The variable that will receive the session',
      inputType: "variableDropdown"
    })
  }),
  run: {
    server: async ({
      credentials,
      options,
      variables,
    }) => {
      const res = await ky.post([
        BASE_URL,
        `${options.characterId}:openSession`].join("/"), {
        headers: {
          Authorization: auth.authHeader(credentials),
        },
      }).json()

      variables.set(options.sessionVariable, JSON.stringify(res))
    }
  }
})
