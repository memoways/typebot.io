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
    muted: option.boolean.optional().layout({
      label: 'Mute audio',
      defaultValue: true,
      moreInfoTooltip: 'If audio is not muted, the video CANNOT be the first item of the flow, there must be at least one user input before'
    }),
    loop: option.boolean.optional().layout({
      label: 'Loop video',
      defaultValue: true
    }),
  }),
  run: {
    web: {
      parseFunction: ({ options }) => {
        return {
          args: {
            URL: options.url ?? null,
            MUTED: +(options.muted ?? true),
            LOOP: +(options.loop ?? true),
          },
          content,
        }
      },
    },
  },
})

