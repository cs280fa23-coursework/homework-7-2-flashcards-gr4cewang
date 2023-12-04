import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Card } from "./card.entity";
import { CreateCardDto } from "./card-create.dto";
import { UpdateCardDto } from "./card-update.dto";
import { DecksService } from "src/decks/decks.service";

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    private decksService: DecksService,
  ) {}

  async create(createCardDto: CreateCardDto, deckId: string): Promise<Card> {
    const card = await this.cardRepository.create({
      ...createCardDto,
    });
    await this.decksService.incrementNumCards(deckId);
    return this.cardRepository.save(card);
  }

  async findOne(id: string): Promise<Card | null> {
    return this.cardRepository.findOneBy({ id });
  }

  async update(id: string, updateCardDto: UpdateCardDto): Promise<Card | null> {
    const card = await this.cardRepository.preload({ id, ...updateCardDto });
    if (!card) {
      return null;
    }
    return this.cardRepository.save(card);
  }

  async remove(id: string): Promise<Card | null> {
    const card = await this.findOne(id);
    if (!card) {
      return null;
    }
    const deckId = card.deckId;
    await this.decksService.incrementNumCards(deckId);
    return this.cardRepository.remove(card);
  }

  async findAll(
    limit: number,
    offset: number,
    search?: string,
    deckId?: number,
    withUserData?: boolean,
  ): Promise<Card[]> {
    const queryBuilder = this.cardRepository.createQueryBuilder("cards");

    if (withUserData) {
      queryBuilder.leftJoinAndSelect("cards.user", "user");
    }

    let hasWhereCondition = false;

    if (search !== undefined) {
      queryBuilder.where("cards.title ILIKE :search", {
        search: `%${search}%`,
      });
      hasWhereCondition = true;
    }

    if (deckId !== undefined) {
      if (hasWhereCondition) {
        queryBuilder.andWhere("cards.deckId = :deckId", { deckId });
      } else {
        queryBuilder.where("cards.deckId = :deckId", { deckId });
        hasWhereCondition = true;
      }
    }

    queryBuilder.limit(limit);
    queryBuilder.offset(offset);

    queryBuilder.orderBy("cards.createdAt", "DESC");

    return await queryBuilder.getMany();
  }
}
