import env from '$/env'
import { Disk } from 'flydrive'
import { FSDriver } from 'flydrive/drivers/fs'
import { S3Driver } from 'flydrive/drivers/s3'

const drivers = {
  fs: () =>
    new FSDriver({
      location: new URL('./uploads', import.meta.url),
      visibility: 'public',
    }),
  s3: () => new S3Driver({
    credentials: {
      accessKeyId: 'AWS_ACCESS_KEY',
      secretAccessKey: 'AWS_ACCESS_SECRET',
    },
    region: 'S3_REGION',
    bucket: 'S3_BUCKET',
    visibility: 'private',
  })
}

const driverToUse = drivers[env.DRIVE_DISK as keyof typeof drivers]()
const disk = new Disk(driverToUse)

export default disk
