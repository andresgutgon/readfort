import db, { type Schema } from '$/db/client'
import * as schema from '$/db/schema'
import { type Blob } from '$/db/schema'
import {
  createTableRelationsHelpers,
  eq,
  getTableColumns,
  getTableName,
  Relations,
  TableRelationalConfig,
  type ExtractTablesWithRelations,
} from 'drizzle-orm'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { type PgTableWithColumns } from 'drizzle-orm/pg-core'
import { RelationalQueryBuilder } from 'drizzle-orm/pg-core/query-builders/query'

type GenericSchema = Record<string, unknown>
type RelKey<
  T extends GenericSchema,
  U extends PgTableWithColumns<any>,
> = keyof ExtractTablesWithRelations<T>[U['_']['name']]['relations']

/**
 * Retrieves the keys of the given object as an array of its own keyof type,
 * ensuring the keys are typed according to the keys actually present in `O`.
 *
 * @template O - The object type from which keys are extracted.
 * @param {O} obj - The object whose keys are to be retrieved.
 * @returns {(keyof O)[]} An array of keys of the object `O`.
 */
export function objectKeys<O extends object>(obj: O): (keyof O)[] {
  return Object.keys(obj) as (keyof O)[]
}

function getPrimaryKey<U extends PgTableWithColumns<any>>({
  table,
  tableName,
}: {
  table: U
  tableName: string
}) {
  const columns = objectKeys(getTableColumns(table))
  const primaryCol = columns.find((column) => table[column].primary)

  if (!primaryCol) {
    throw new Error(`Primary key not found for table ${tableName}`)
  }

  return primaryCol
}

function getRelations<
  T extends GenericSchema,
  U extends PgTableWithColumns<any>,
>({
  dbSchema,
  table,
  tableName,
}: {
  dbSchema: T
  table: U
  tableName: U['_']['name']
}) {
  const relationKey =
    `${tableName}Relations` as keyof ExtractTablesWithRelations<T>

  const relSchema = dbSchema[relationKey] as Relations<
    typeof tableName,
    ExtractTablesWithRelations<T>[typeof tableName]['relations']
  >
  return relSchema.config(createTableRelationsHelpers(table))
}

type Attachment<
  T extends GenericSchema = Record<string, unknown>,
  U extends PgTableWithColumns<any> = PgTableWithColumns<any>,
> = {
  relation: keyof ExtractTablesWithRelations<T>[U['_']['name']]['relations']
}
export function withAttachments<
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
      const model = orm.query[tableName] as RelationalQueryBuilder<
        ExtractTablesWithRelations<typeof dbSchema>,
        TableRelationalConfig
      >
      const relations = getRelations({ dbSchema, table, tableName })
      const relation = relations[attachments[0]?.relation!]!
      return {
        getAvatar: async (value: unknown): Promise<R> => {
          const attachment = await model.findFirst({
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

const factory = withAttachments<Blob, typeof schema>({
  dbSchema: schema,
  orm: db,
})
export const usersAttachments = factory.build<Schema['users']>({
  table: schema['users'],
  attachments: [{ relation: 'avatar' }],
})
