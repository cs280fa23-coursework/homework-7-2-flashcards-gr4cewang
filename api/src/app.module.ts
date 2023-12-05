import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { validate } from "./env.validation";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./auth/auth.service";
import { LocalStrategy } from "./auth/local.strategy";
import { PassportModule } from "@nestjs/passport";
import { UserService } from "./user/user.service";
import { User } from "./user/user.entity";
import { UserController } from "./user/user.controller";
import { JwtModule } from "@nestjs/jwt";
import { DecksModule } from "./decks/decks.module";
import { JwtStrategy } from "./auth/jwt.strategy";
import { CardsModule } from "./cards/cards.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }), // Loads the .env file
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        username: configService.get<string>("DB_USER"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_NAME"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: configService.get<string>("NODE_ENV") !== "production",
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: configService.get<string>("JWT_EXPIRATION"),
        },
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    TypeOrmModule.forFeature([User]),
    DecksModule,
    CardsModule
  ],
  controllers: [AppController, UserController],
  providers: [AppService, AuthService, LocalStrategy, JwtStrategy, UserService],
})
export class AppModule {}
