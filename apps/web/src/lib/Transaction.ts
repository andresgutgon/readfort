import db from '$/db/client'
import * as schema from '$/db/schema'
import { ConflictError } from '$/lib/errors'
import Result, { ErrorResult, TypedResult } from '$/lib/Result'
import type { ExtractTablesWithRelations } from 'drizzle-orm'
import { PgTransaction, QueryResultHKT } from 'drizzle-orm/pg-core'
import { DatabaseError } from 'pg'

export type DBSchema = typeof schema
export type ITransaction<T extends DBSchema = DBSchema> = PgTransaction<
  QueryResultHKT,
  T,
  ExtractTablesWithRelations<typeof schema>
>
type PromisedResult<F> = Promise<TypedResult<F, Error>>

const DB_ERROR_CODES = {
  UNIQUE_VIOLATION: '23505',
  TRANSACTION_ABORTED: '25P02',
}

export default class Transaction<T extends DBSchema = DBSchema> {
  public db: ITransaction<T> | undefined = undefined
  public result: TypedResult<unknown, Error> | undefined = undefined

  public static async call<A, B extends DBSchema = DBSchema>(
    callback: (trx: Transaction) => PromisedResult<A>,
    trx?: Transaction,
  ): PromisedResult<A> {
    return trx?.call<A>(callback) || new Transaction<B>().call(callback)
  }

  public async call<A>(
    callback: (trx: this) => PromisedResult<A>,
  ): PromisedResult<A> {
    try {
      if (this.db) {
        this.result = await callback(this)
      } else {
        await db.transaction(async (trx) => {
          // FIXME: This is a hack to make the type checker happy.
          // What's the problem here?
          //
          // @ts-expect-error - The type of `this` is `Transaction` in this context.
          this.db = trx
          this.result = await callback(this)
        })
      }

      return this.result as TypedResult<A, Error>
    } catch (error) {
      if (
        (error as DatabaseError)?.code === DB_ERROR_CODES.TRANSACTION_ABORTED
      ) {
        return this.result! as TypedResult<A, Error>
      } else {
        this.result = this.toResultError(error)

        return this.result
      }
    }
  }

  /**
   * Refer to the errors list at
   * https://github.com/rails/rails/blob/main/activerecord/lib/active_record/connection_adapters/postgresql_adapter.rb#L769.
   */
  private toResultError(error: unknown): ErrorResult<Error> {
    const code = (error as DatabaseError)?.code
    switch (code) {
      case DB_ERROR_CODES.UNIQUE_VIOLATION:
        return Result.error(new ConflictError('Database conflict'))
      default:
        return Result.error(error as Error)
    }
  }
}
