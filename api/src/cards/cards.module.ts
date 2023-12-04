import { Module } from "@nestjs/common";
import { CardsService } from "./cards.service";
import { CardsController } from "./cards.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Card } from "./card.entity";
import { UserService } from "src/user/user.service";
import { Deck } from "src/decks/deck.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Card, Deck])],
  providers: [CardsService, UserService],
  controllers: [CardsController],
})
export class CardsModule {}
