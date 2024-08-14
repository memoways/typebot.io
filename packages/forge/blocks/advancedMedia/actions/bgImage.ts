import { createAction, option } from '@typebot.io/forge'
// @ts-ignore
import content from '!!raw-loader!./bgImageClient.js'

export const bgImage = createAction({
  name: "Background image",
  turnableInto: undefined,
  options: option.object({
    url: option.string.layout({
      label: 'Image URL',
      placeholder: 'https://example.com/myimage.jpg',
      moreInfoTooltip: 'The image URL',
    }),
  }),
  run: {
    web: {
      parseFunction: ({ options }) => {
        return {
          args: {
            url: options.url ?? null
          },
          content,
        }
      },
    },
  },
})
