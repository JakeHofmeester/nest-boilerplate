import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User.entity';

export enum TaskStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in-progress',
  DONE = 'done'
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'datetime' })
  dueDate: Date;

  @Column({
    type: 'varchar',
    enum: TaskStatus,
    default: TaskStatus.OPEN
  })
  status: TaskStatus;

  @Column({ nullable: true })
  attachment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.tasks)
  user: User;

  get isOverdue(): boolean {
    return new Date() > new Date(this.dueDate);
  }
} 