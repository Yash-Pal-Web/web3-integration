import { Entity, Column, BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TRANSACTIONSTATUS, USDTTRANSACTION } from '../constant/enum';

@Entity()
export class CentralDeposit extends BaseEntity {
  @PrimaryGeneratedColumn()
  'id': string;
  @Column('varchar')
  'from': string;
  @Column('varchar')
  'to': string;
  @Column('varchar')
  'hashId': string;
  @Column({ type: 'varchar', default: null })
  'gasfee': string;
  @Column({ type: 'varchar', default: null })
  'amount': string;
  @Column({ type: 'enum', enum: TRANSACTIONSTATUS, default: TRANSACTIONSTATUS.PENDING })
  'status': string;
  @Column({ type: 'enum', enum: USDTTRANSACTION, default: USDTTRANSACTION.APPROVAL })
  'type': string;
  @CreateDateColumn()
  'createdAt': Date;
  @UpdateDateColumn()
  'updatedAt': Date;
}
