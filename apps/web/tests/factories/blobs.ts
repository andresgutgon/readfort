import { faker } from '@faker-js/faker'
import { createBlob, type CreateBlobColumns } from '$/services/blob/createBlob'

export const FAKE_DIR = {
  '/fake-root': {
    'fake-file.jpg': Buffer.from([8, 6, 7, 5, 3, 0, 9]),
  },
}
function makeFakeData() {
  return {
    key: '/fake-root/fake-file.jpg',
    contentType: 'image/jpeg',
    contentLength: '1024',
    etag: faker.string.uuid(),
  } as CreateBlobColumns
}

export async function createBlobFactory(
  input: Partial<CreateBlobColumns> = {},
) {
  const fakeData = makeFakeData()
  const data = { ...fakeData, ...input }

  const result = await createBlob({ data })
  return result.unwrap()
}
