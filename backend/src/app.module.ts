import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { PlayerModule } from './player/player.module';
import { PlayModule } from './play/play.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/dyslexia'),
    AuthModule,
    UserModule,
    GameModule,
    PlayerModule,
    PlayModule
  ],
})
export class AppModule {}

