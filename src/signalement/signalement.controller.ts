import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SignalementService } from './signalement.service';
import { CreateSignalementDto } from './dto/create-signalement.dto';
import { UpdateSignalementDto } from './dto/update-signalement.dto';

@Controller('signalement')
export class SignalementController {
  constructor(private readonly signalementService: SignalementService) {}

  @Post()
  creer(@Body('contenu') contenu: string) {
    return this.signalementService.creer(contenu);
  }

  @Get()
  findAll() {
    return this.signalementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.signalementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSignalementDto: UpdateSignalementDto) {
    return this.signalementService.update(+id, updateSignalementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.signalementService.remove(+id);
  }
}
