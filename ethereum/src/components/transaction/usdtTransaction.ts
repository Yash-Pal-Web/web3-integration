// import { Entity, Column, BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
// //import { TRANSACTIONSTATUS } from '../constant/enum';

// @Entity()
// export class UsdtTransaction extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   'id': string;
//   @Column('varchar', { default: null })
//   'to': string;
//   @Column('varchar', { default: null })
//   'hashId': string;
//   @Column('varchar', { default: null })
//   'from': string;
//   //   @Column('varchar')
//   //   'symbol': string;
//   //   @Column('boolean', { default: false })
//   //   'msgSent': boolean;
//   @Column({ type: 'varchar', default: null })
//   'amount': string;
//   //   @Column({ type: 'enum', enum: TRANSACTIONSTATUS, default: TRANSACTIONSTATUS.FAILED })
//   //   'status': string;
//   @CreateDateColumn()
//   'createdAt': Date;
//   @UpdateDateColumn()
//   'updatedAt': Date;
// }
