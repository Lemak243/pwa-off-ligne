import { Module } from '@nestjs/common';
import { SignalementService } from './signalement.service';
import { SignalementController } from './signalement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Signalement } from './entities/signalement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Signalement])],
  controllers: [SignalementController],
  providers: [SignalementService],
})
export class SignalementModule {}
