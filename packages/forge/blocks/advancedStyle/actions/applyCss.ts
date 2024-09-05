import { createAction, option } from '@typebot.io/forge'
// @ts-ignore
import content from '!!raw-loader!./applyCssClient.js'

export const applyCss = createAction({
  name: "Apply CSS",
  turnableInto: undefined,
  options: option.object({
    css: option.string.layout({
      label: 'CSS Source',
      moreInfoTooltip: 'CSS Source',
      inputType: 'code',
    }),
  }),
  run: {
    web: {
      parseFunction: ({ options }) => {
        return {
          args: {
            CSS: options.css ?? null
          },
          content,
        }
      },
    },
  },
})

