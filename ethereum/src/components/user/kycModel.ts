import { PrimaryGeneratedColumn, Column, BaseEntity, Entity, OneToOne, JoinColumn } from 'typeorm';
import { User } from './userModel';
import { KYCSTATUS } from '../../constant/enum';
@Entity()
export class UserKyc extends BaseEntity {
  @PrimaryGeneratedColumn()
  'KycId': string;
  @Column('varchar', { nullable: true })
  'imageLinks': {
    userPhoto: string | null;
    userSelfie: string | null;
    userAdharCard: string | null;
  };
  @Column({ type: 'varchar', nullable: true })
  'userAdharNo': string | null;
  @Column({ type: 'varchar', nullable: true })
  'userPanNo': string | null;
  // @Column({
  //   type: 'enum',
  //   enum: ['NotStarted', 'Approved', 'Rejected', 'Submitted'],
  //   default: 'NotStarted',
  // })
  // 'kycStatus': string;

  @Column({ type: 'enum', enum: KYCSTATUS, default: KYCSTATUS.NOTSTARTED })
  'kycStatus': string;

  @OneToOne(() => User, (user) => user.userKyc, { eager: true })
  @JoinColumn({ name: 'userId' })
  'user': User;
}
