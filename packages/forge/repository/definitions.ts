// Do not edit this file manually
import { anthropicBlock } from '@typebot.io/anthropic-block'
import { openRouterBlock } from '@typebot.io/open-router-block'
import { togetherAiBlock } from '@typebot.io/together-ai-block'
import { elevenlabsBlock } from '@typebot.io/elevenlabs-block'
import { difyAiBlock } from '@typebot.io/dify-ai-block'
import { mistralBlock } from '@typebot.io/mistral-block'
import { qrCodeBlock } from '@typebot.io/qrcode-block'
import { chatNodeBlock } from '@typebot.io/chat-node-block'
import { calComBlock } from '@typebot.io/cal-com-block'
import { openAIBlock } from '@typebot.io/openai-block'
import { nocodbBlock } from '@typebot.io/nocodb-block'
import { segmentBlock } from '@typebot.io/segment-block'
import { inworldBlock } from '@typebot.io/inworld-block'

export const forgedBlocks = {
  [openAIBlock.id]: openAIBlock,
  [calComBlock.id]: calComBlock,
  [chatNodeBlock.id]: chatNodeBlock,
  [qrCodeBlock.id]: qrCodeBlock,
  [difyAiBlock.id]: difyAiBlock,
  [mistralBlock.id]: mistralBlock,
  [elevenlabsBlock.id]: elevenlabsBlock,
  [anthropicBlock.id]: anthropicBlock,
  [togetherAiBlock.id]: togetherAiBlock,
  [openRouterBlock.id]: openRouterBlock,
  [nocodbBlock.id]: nocodbBlock,
  [segmentBlock.id]: segmentBlock,
  [inworldBlock.id]: inworldBlock,
}
