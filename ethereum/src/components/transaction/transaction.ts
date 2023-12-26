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
} from 'typeorm';
import { TRANSACTIONSTATUS, TRANSACTIONTYPE } from '../../constant/enum';
import { Wallet } from '../wallet/walletModel';

@Entity()
@Unique(['transactionId'])
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  'transactionId': string;
  @Column({
    type: 'varchar',
    unique: true,
    default: null,
  })
  'txHashId': string;
  @Column({ type: 'enum', enum: TRANSACTIONTYPE })
  'txType': string;
  @Column('varchar', { default: null })
  'from': string;
  @Column('varchar', { default: null })
  'to': string;
  @Column('varchar', { default: null })
  'balance': number | string;
  @Column('varchar', { default: null })
  'coinId': string;
  @Column('varchar', { default: null })
  'coinSymbol': string;
  @Column('varchar', { default: null })
  'fee': string;
  // @Column('varchar', { default: null })
  // 'minBlock': number;
  @Column({ type: 'enum', enum: TRANSACTIONSTATUS, default: TRANSACTIONSTATUS.PENDING })
  'status': string;
  @CreateDateColumn()
  'createdAt': Date;
  @UpdateDateColumn()
  'updatedAt': Date;
  // @Column({ default: null })
  // 'previousEstimatedGas': string;
  // @Column({ default: null })
  // 'currentEstimatedGas': string;
  @ManyToOne(() => Wallet, (wallet) => wallet.transactions)
  @JoinColumn({ name: 'walletId' })
  'wallet': Wallet;
}
