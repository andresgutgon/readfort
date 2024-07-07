import db from '$/db/client'
import { eq } from 'drizzle-orm'
import { PgColumn } from 'drizzle-orm/pg-core'

type DB = typeof db
type TableNames = keyof DB['query']

export type FindFirstArg<T extends TableNames> = Parameters<
  DB['query'][T]['findFirst']
>[0]

type ModelArgs<N extends TableNames> = {
  tableName: N
  identifier: PgColumn
}

export class BaseModel<N extends TableNames> {
  tableName: N
  identifier: PgColumn

  constructor({ tableName, identifier }: ModelArgs<N>) {
    this.tableName = tableName
    this.identifier = identifier
  }

  async findById(value: string) {
    return this.findOne({
      where: eq(this.identifier, value),
    })
  }

  async findOne(args: FindFirstArg<N>) {
    return this.query().findFirst(args)
  }

  private query() {
    return db.query[this.tableName]
  }
}
