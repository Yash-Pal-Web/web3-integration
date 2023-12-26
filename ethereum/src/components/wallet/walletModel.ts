import {
  Entity,
  Column,
  BaseEntity,
  Unique,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { User } from '../user/userModel';

//import { Coin } from '../coin/coinModel';
import { Transaction } from '../transaction/transaction';
import { TOKENTYPE } from '../../constant/enum';

@Entity()
@Unique(['walletId'])
export class Wallet extends BaseEntity {
  @PrimaryGeneratedColumn()
  'walletId': string;
  @Column()
  'userId'?: string;
  @Column({ type: 'varchar', unique: true })
  'walletAddress': string;
  @Column('varchar', { select: false, default: null })
  'walletPrivateKey': string;
  @Column('double', { default: null })
  'balance': number;
  @Column('varchar', { default: 0 })
  'lockAmount': string;

  @Column({
    type: 'enum',
    enum: TOKENTYPE,
  })
  'tokenType': TOKENTYPE;
  @CreateDateColumn()
  'createdAt': Date;
  @UpdateDateColumn()
  'updatedAt': Date;
  @Column('boolean', { default: true })
  'isWalletActive': boolean;
  @OneToOne(() => User, (user) => user.wallet, { nullable: true })
  'users': User;
  //@ManyToOne(() => Coin, (coin: { wallets: any }) => coin.wallets, { createForeignKeyConstraints: false })
  //   @JoinColumn({ name: 'coinId', referencedColumnName: 'coinId' })
  //   'coin': Coin;
  @OneToMany(() => Transaction, (transaction) => transaction.wallet, { nullable: true })
  'transactions': Transaction[];
}
