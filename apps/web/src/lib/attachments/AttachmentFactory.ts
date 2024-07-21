import { Attachment, GenericSchema } from '$/lib/attachments/types'
import { getPrimaryKey, getRelations } from '$/lib/attachments/utils'
import {
  eq,
  getTableName,
  type ExtractTablesWithRelations,
  type TableRelationalConfig,
} from 'drizzle-orm'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { PgTableWithColumns } from 'drizzle-orm/pg-core'
import { RelationalQueryBuilder } from 'drizzle-orm/pg-core/query-builders/query'

export function AttachmentFactory<
  R extends object,
  T extends GenericSchema = Record<string, unknown>,
  O extends NodePgDatabase<T> = NodePgDatabase<T>,
>({ dbSchema, orm }: { dbSchema: T; orm: O }) {
  return {
    build: function <
      U extends PgTableWithColumns<any> = PgTableWithColumns<any>,
    >({ table, attachments }: { table: U; attachments: Attachment<T, U>[] }) {
      const tableName = getTableName(table)
      const primaryKey = getPrimaryKey({ table, tableName })
      const queryBuilder = orm.query[tableName] as RelationalQueryBuilder<
        ExtractTablesWithRelations<typeof dbSchema>,
        TableRelationalConfig
      >
      const relations = getRelations({ dbSchema, table, tableName })
      const relation = relations[attachments[0]?.relation!]!
      return {
        getAvatar: async (value: unknown): Promise<R> => {
          const attachment = await queryBuilder.findFirst({
            columns: {},
            with: { [relation.fieldName]: true },
            where: eq(table[primaryKey], value),
          })

          // It's hard to return correct typing of `findFirst` result
          // but this works for now
          // @ts-ignore
          return attachment?.[relation.fieldName] as R
        },
      }
    },
  }
}
