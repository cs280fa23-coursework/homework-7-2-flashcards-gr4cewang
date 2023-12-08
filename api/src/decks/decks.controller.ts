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
import { DecksService } from "./decks.service";
import { CreateDeckDto } from "./create-deck.dto";
import { DeckResponseDto } from "./deck-response.dto";
import { UpdateDeckDto } from "./deck-update.dto";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { UserId } from "src/decorators/user-id.decorator";
import { DeckOwnershipGuard } from "src/guards/deck-owner.guard";
import { UserService } from "src/user/user.service";
import { FindDecksQueryDTO } from "./find-decks-query.dto";
import { FindDecksResponseDTO } from "./find-decks-response.dto";

@UseGuards(JwtAuthGuard)
@Controller("decks")
export class DecksController {
  constructor(
    private readonly decksService: DecksService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(
    @Body() createDeckDto: CreateDeckDto,
    @UserId() userId: number,
  ): Promise<DeckResponseDto> {
    const deck = await this.decksService.create(createDeckDto, userId);
    delete deck.userId;
    return deck;
  }

  @UseGuards(DeckOwnershipGuard)
  @Get(":id")
  async findOne(
    @Param("id") id: string,
    @Query("withUserData") withUserData?: boolean,
  ): Promise<DeckResponseDto> {
    const deck = await this.decksService.findOne(id, withUserData);
    if (!deck) {
      throw new NotFoundException(`Deck with ID ${id} not found`);
    }

    delete deck.userId;
    if (withUserData) {
      delete deck.user.password;
    }
    return deck;
  }

  @UseGuards(DeckOwnershipGuard)
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateDeckDto: UpdateDeckDto,
  ): Promise<DeckResponseDto> {
    const deck = await this.decksService.update(id, updateDeckDto);
    delete deck.userId;
    return deck;
  }

  @UseGuards(DeckOwnershipGuard)
  @Delete(":id")
  async remove(
    @Param("id") id: string,
  ): Promise<{ statusCode: number; message: string }> {
    await this.decksService.remove(id);

    return {
      statusCode: 200,
      message: "Deck deleted successfully",
    };
  }

  @Get()
  async findAll(
    @UserId() userId: number,
    @Query() query: FindDecksQueryDTO,
  ): Promise<FindDecksResponseDTO> {
    const { limit, offset, search, withUserData } = query;

    const decks = await this.decksService.findAll(
      limit,
      offset,
      search,
      userId,
      withUserData,
    );

    return {
      limit,
      offset,
      search,
      withUserData,
      data: decks.map((deck) => {
        // STEP 3 in Task 12
        if (deck.user) {
          delete deck.user.password;
        }
        return deck as DeckResponseDto;
      }),
    };
  }
}
