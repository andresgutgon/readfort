import { usersAttachments } from '$/db/withAttachments'
import mockFs from 'mock-fs'
import { FAKE_DIR } from 'tests/factories'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

describe('placeholder', async () => {
  beforeEach(() => {
    mockFs(FAKE_DIR)
  })

  afterEach(() => {
    mockFs.restore()
  })

  it('reads blob entity from user', async (ctx) => {
    const blob = await ctx.factories.createBlobFactory()
    const user = await ctx.factories.createUserFactory({
      avatarId: blob.id,
    })

    const attachment = await usersAttachments.getAvatar(user.id)

    expect(attachment).toBeDefined()
  })
})
