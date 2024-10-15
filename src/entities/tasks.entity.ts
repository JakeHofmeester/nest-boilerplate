import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  status: string;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'assignee' })
  assignee: User;

  @Column({ type: 'varchar', nullable: true })
  fileUrl: string;

  @Column({ type: 'text', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({ type: 'varchar' })
  dueDate: string;

  @UpdateDateColumn({
    type: 'text',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;
}
