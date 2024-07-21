import { ExtractTablesWithRelations } from "drizzle-orm"
import { PgTableWithColumns } from "drizzle-orm/pg-core"

export type GenericSchema = Record<string, unknown>

export type Attachment<
  T extends GenericSchema = Record<string, unknown>,
  U extends PgTableWithColumns<any> = PgTableWithColumns<any>,
> = {
  relation: keyof ExtractTablesWithRelations<T>[U['_']['name']]['relations']
}
