import { createAction, option } from '@typebot.io/forge'
// @ts-ignore
import content from '!!raw-loader!./bgVideoClient.js'

export const bgVideo = createAction({
  name: "Background video",
  turnableInto: undefined,
  options: option.object({
    url: option.string.layout({
      label: 'Video URL',
      placeholder: 'https://example.com/myvideo.mp4',
      moreInfoTooltip: 'The video URL, must be direct video URL (mp4, m3u...)',
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

