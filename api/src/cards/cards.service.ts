import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Card } from "./card.entity";
import { CreateCardDto } from "./card-create.dto";
import { UpdateCardDto } from "./card-update.dto";
import { DecksService } from "src/decks/decks.service";

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    private readonly decksService: DecksService,
  ) {}

  async create(createCardDto: CreateCardDto, deckId: string): Promise<Card> {
    const card = this.cardRepository.create({
      ...createCardDto,
      deckId: deckId,
    });
    await this.decksService.incrementNumCards(deckId);
    return this.cardRepository.save(card);
  }

  async findOneCard(id: string): Promise<Card | null> {
    return this.cardRepository.findOneBy({ id });
  }

  async update(id: string, updateCardDto: UpdateCardDto): Promise<Card | null> {
    const card = await this.cardRepository.preload({ id, ...updateCardDto });
    if (!card) {
      return null;
    }
    return this.cardRepository.save(card);
  }

  async remove(cardId: string): Promise<Card | null> {
    const card = await this.findOneCard(cardId);
    if (!card) {
      return null;
    }

    let deckId = card.deckId;
    await this.decksService.decrementNumCards(deckId);
    return this.cardRepository.remove(card);
  }

  async findAll(
    deckId: string,
    limit: number,
    offset: number,
    search?: string,
  ): Promise<Card[]> {
    const front = search ? ILike(`%${search}%`) : undefined;
    const back = search ? ILike(`%${search}%`) : undefined;
    const cards = await this.cardRepository.find({
      take: limit,
      skip: offset,
      where: [
        {
          deckId,
          front
        },
        {
          deckId,
          back
        },
      ],
      order: {
        createdAt: "DESC",
      },
      relations: ["deck"],
    })

    return cards;
  }
}
