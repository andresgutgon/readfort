import path from 'path'
import { Readable } from 'stream'
import { fileURLToPath } from 'url'

import env, { DriveDiskSchema } from '$/env'
import Result from '$/lib/Result'
import { Disk, errors } from 'flydrive'
import { FSDriver } from 'flydrive/drivers/fs'
import { S3Driver } from 'flydrive/drivers/s3'
import { WriteOptions } from 'flydrive/types'
import { z } from 'zod'

const DIRNAME_PATH = path.dirname(fileURLToPath(import.meta.url))
const UPLOADS_PATH = path.join(DIRNAME_PATH, 'public', 'uploads')

function getAwsCredentials() {
  const accessKeyId = env.AWS_ACCESS_KEY
  const secretAccessKey = env.AWS_ACCESS_SECRET

  if (!accessKeyId || !secretAccessKey) {
    throw new Error('AWS credentials not configured')
  }

  return { accessKeyId, secretAccessKey }
}

async function getReadableStreamFromFile(file: File) {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const stream = new Readable()
  stream.push(buffer)
  stream.push(null)

  return stream
}

type DiskKey = z.infer<typeof DriveDiskSchema>
class DiskWrapper {
  private disk: Disk

  constructor(diskKey: DiskKey) {
    this.disk = new Disk(this.buildDisk(diskKey))
  }

  async putFile(key: string, file: File) {
    const contents = await getReadableStreamFromFile(file)
    return this.putStream(key, contents)
  }

  /**
   * Create new file or update an existing file. In case of an error,
   * the "E_CANNOT_WRITE_FILE" exception is thrown
   */
  async putStream(key: string, contents: Readable, options?: WriteOptions) {
    try {
      await this.disk.putStream(key, contents, options)
      return Result.nil()
    } catch (e) {
      if (e instanceof errors.E_CANNOT_WRITE_FILE) {
        return Result.error(new Error('Cannot write file'))
      }

      const error = e as Error
      return Result.error(error)
    }
  }

  private buildDisk(key: DiskKey) {
    if (key === 'local' && process.env.NODE_ENV === 'production') {
      new Error('Local file system not allowed as file storage in production')
    }

    if (key === 'local') {
      return new FSDriver({
        // FIX THIS SHIT
        location:
          '/Users/andres/code/andresgutgon/readfort/apps/web/public/uploads',
        /* location: UPLOADS_PATH, */
        visibility: 'public',
      })
    }

    return new S3Driver({
      credentials: getAwsCredentials(),
      region: env.AWS_REGION,
      bucket: env.S3_BUCKET,
      visibility: 'public',
    })
  }
}

export default new DiskWrapper(env.DRIVE_DISK)
