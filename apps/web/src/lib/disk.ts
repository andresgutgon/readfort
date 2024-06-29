import env, { DriveDiskSchema } from '$/env'
import { Disk } from 'flydrive'
import { FSDriver } from 'flydrive/drivers/fs'
import { S3Driver } from 'flydrive/drivers/s3'
import { z } from 'zod'

function getAwsCredentials() {
  const accessKeyId = env.AWS_ACCESS_KEY
  const secretAccessKey = env.AWS_ACCESS_SECRET

  if (!accessKeyId || !secretAccessKey) {
    throw new Error('AWS credentials not configured')
  }

  return { accessKeyId, secretAccessKey }
}

export function buildDisk(key: z.infer<typeof DriveDiskSchema>) {
  if (key === 'local' && process.env.NODE_ENV === 'production') {
    new Error('Local file system not allowed as file storage in production')
  }

  if (key === 'local') {
    return new FSDriver({
      location: new URL('./uploads', import.meta.url),
      visibility: 'public',
    })
  }

  return new S3Driver({
    credentials: getAwsCredentials(),
    region: env.AWS_REGION,
    bucket: env.S3_BUCKET,
    visibility: 'private',
  })
}

export default new Disk(buildDisk(env.DRIVE_DISK))
