import { User } from "src/user/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Deck {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @CreateDateColumn({ default: 0 })
  updatedAt: number;

  @Column({ nullable: true })
  image: string;

  @Column({ default: 0 })
  numberOfCards: number;

  @ManyToOne(() => User, (user) => user.decks)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  userId: number;
}
