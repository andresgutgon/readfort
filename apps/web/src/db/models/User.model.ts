import { transformer } from '$/db/helpers'
import { AccountModel } from '$/db/models/Account.model'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'users' })
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar', nullable: true })
  name!: string | null

  @Column({ type: 'varchar', nullable: true, unique: true })
  email!: string | null

  @Column({
    name: 'email_verified',
    type: 'varchar',
    nullable: true,
    transformer: transformer.date,
  })
  emailVerified!: string | null

  @Column({ type: 'varchar', nullable: true })
  image!: string | null

  @OneToMany(() => AccountModel, (account) => account.userId)
  accounts!: AccountModel[]

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createAt!: Date

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt!: Date
}
