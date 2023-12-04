import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Delete,
    UseGuards,
    Query,
  } from "@nestjs/common";
  import { CardsService } from "./cards.service";
  import { CreateCardDto } from "./card-create.dto";
  import { CardResponseDto } from "./card-response.dto";
  import { UpdateCardDto } from "./card-update.dto";
  import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
  import { DeckOwnershipGuard } from "src/guards/deck-owner.guard";
  import { UserService } from "src/user/user.service";
  import { FindCardsQueryDTO } from "./find-cards-query.dto";
  import { FindCardsResponseDTO } from "./find-cards-response.dto";
  
  @Controller("decks/:id/cards")
  @UseGuards(JwtAuthGuard, DeckOwnershipGuard)
  export class CardsController {
    constructor(
      private readonly cardsService: CardsService,
      private readonly userService: UserService,
    ) {}
  
    @Post()
    async create(
      @Body() createCardDto: CreateCardDto,
      @Param("id") deckId: string,
    ): Promise<CardResponseDto> {
      const card = await this.cardsService.create(createCardDto, deckId);
      return card;
    }

    @Get(":id")
    async findOne(@Param("id") id: string): Promise<CardResponseDto> {
      const card = await this.cardsService.findOne(id);
      if (!card) {
        throw new NotFoundException(`Card with ID ${id} not found`);
      }
      return card;
    }
  
    @Patch(":id")
    async update(
      @Param("id") id: string,
      @Body() updateCardDto: UpdateCardDto,
    ): Promise<CardResponseDto> {
      const card = await this.cardsService.update(id, updateCardDto);
      delete card.deckId;
      return card;
    }
  
    @Delete(":id")
    async remove(
      @Param("id") id: string,
    ): Promise<{ statusCode: number; message: string }> {
      await this.cardsService.remove(id);
  
      return {
        statusCode: 200,
        message: "Card deleted successfully",
      };
    }
  
    @Get()
    async findAll(
      @Param() deckId: number,
      @Query() query: FindCardsQueryDTO,
    ): Promise<FindCardsResponseDTO> {
      const { limit, offset, search } = query;
  
      const cards = await this.cardsService.findAll(
        limit,
        offset,
        search,
        deckId,
      );
  
      return {
        limit,
        offset,
        search,
        data: cards.map((card) => {
          // STEP 3 in Task 12
          if (card.deckId) {
            delete card.deckId;
          }
          return card as CardResponseDto;
        }),
      };
    }
  }
  