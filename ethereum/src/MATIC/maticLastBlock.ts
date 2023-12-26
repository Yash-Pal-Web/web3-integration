import { Entity, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MaticLastBlock extends BaseEntity {
  // tokenId is being passed from frontend
  @PrimaryGeneratedColumn()
  'blockId': string;
  @Column({ type: 'int' })
  'lastBlock': number;
  @CreateDateColumn()
  'createdAt': Date;
  @UpdateDateColumn()
  'updatedAt': Date;
  @Column({ type: 'bool', default: true })
  'isActive': boolean;
}
