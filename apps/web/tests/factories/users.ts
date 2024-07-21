import { faker } from '@faker-js/faker'
import { KindleCountry } from '$/lib/types'
import { createUser, type CreateUserColumns } from '$/services/user/createUser'

function makeRandomUserData() {
  return {
    username: faker.internet.userName(),
    name: faker.person.firstName(),
    email: faker.internet.email(),
    kindle: KindleCountry.ES,
  } as CreateUserColumns
}

export async function createUserFactory(
  input: Partial<CreateUserColumns> = {},
) {
  const randomUserData = makeRandomUserData()
  const data = { ...randomUserData, ...input }

  const result = await createUser({ data })
  return result.unwrap()
}
