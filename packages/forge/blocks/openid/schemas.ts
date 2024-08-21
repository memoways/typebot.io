// Do not edit this file manually
import { parseBlockCredentials, parseBlockSchema } from '@typebot.io/forge'
import { openidBlock } from '.'
import { auth } from './auth'

export const openidBlockSchema = parseBlockSchema(openidBlock)
export const openidCredentialsSchema = parseBlockCredentials(
  openidBlock.id,
  auth.schema
)
