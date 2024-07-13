import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateVerificationTokensTable1720948532565
  implements MigrationInterface
{
  name = 'CreateVerificationTokensTable1720948532565'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "verification_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "identifier" character varying NOT NULL, "expires" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_f2d4d7a2aa57ef199e61567db22" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "verification_tokens"`)
  }
}
