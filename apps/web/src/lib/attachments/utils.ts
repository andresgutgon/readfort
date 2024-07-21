import { GenericSchema } from '$/lib/attachments/types'
import {
  createTableRelationsHelpers,
  ExtractTablesWithRelations,
  getTableColumns,
  Relations,
} from 'drizzle-orm'
import { PgTableWithColumns } from 'drizzle-orm/pg-core'

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

export function getRelations<
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

export function getPrimaryKey<U extends PgTableWithColumns<any>>({
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
