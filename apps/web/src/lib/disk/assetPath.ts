import env from '$/env'

export const DISK_PATH = 'uploads'

/*
 * This methods gets the base path for assets
 */
export function getAssetPath({ key }: { key: string | null | undefined }) {
  const assetType = env.NEXT_PUBLIC_DRIVE_DISK
  if (assetType === 'local') return `/${DISK_PATH}/${key}`

  // TODO: Implement S3 bucket name when S3 is working
  // Use CDN config or S3 bucket name
  return 'NO_S3_CONFIGURED'
}
