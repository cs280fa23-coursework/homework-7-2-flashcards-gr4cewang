import { Deck } from "src/decks/deck.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Card {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  front: string;

  @Column()
  back: string;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @ManyToOne(() => Deck, (deck) => deck.cards, { onDelete: "CASCADE" })
  @JoinColumn({ name: "deckId" })
  deck: Deck;

  @Column()
  deckId: string;
}
