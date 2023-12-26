import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Wallet } from '../wallet/walletModel';

import { KYCSTATUS } from '../../constant/enum';
import { UserKyc } from './kycModel';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  'userId': string;
  @Column()
  'email': string;

  @Column('integer', { default: 0 })
  'loginAttempt': number;
  @Column('varchar', { default: 0 })
  'lockedTimeInMs': string;
  @Column('boolean', { default: false })
  'isLocked': boolean;
  @Column('boolean', { default: true })
  'isActive': boolean;
  @Column('boolean', { default: false })
  'emailVerified': boolean;
  @Column('boolean', { default: true })
  'isLoginFirstAttempt': boolean;
  @Column({ select: false })
  'password'?: string;
  @Column('boolean', { default: false })
  'is2FAactive': boolean;
  @CreateDateColumn()
  'createdAt': Date;
  @UpdateDateColumn()
  'updateedAt': Date;
  @Column()
  'userName': string;
  // @Column({ type: 'enum', enum: KYCSTATUS, default: KYCSTATUS.NOTSTARTED })
  // 'kycStatus': string;
  @OneToOne(() => Wallet, (wallet) => wallet.users)
  @JoinColumn({ name: 'walletId' })
  'wallet': Wallet;
  // retaltion for kyc
  @OneToOne(() => UserKyc, (userkyc) => userkyc.user)
  'userKyc': UserKyc;
}
