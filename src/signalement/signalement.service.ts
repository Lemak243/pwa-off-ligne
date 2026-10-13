import { Injectable } from '@nestjs/common';
import { CreateSignalementDto } from './dto/create-signalement.dto';
import { UpdateSignalementDto } from './dto/update-signalement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Signalement } from './entities/signalement.entity';

@Injectable()
export class SignalementService {

  constructor(
    @InjectRepository(Signalement)
    private readonly repository: Repository<Signalement>
  ){}

  async creer(contenu: string) {
    const signalement = this.repository.create({
      contenu
    });

    return await this.repository.save(signalement);
  }

  findAll() {
    return `This action returns all signalement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} signalement`;
  }

  update(id: number, updateSignalementDto: UpdateSignalementDto) {
    return `This action updates a #${id} signalement`;
  }

  remove(id: number) {
    return `This action removes a #${id} signalement`;
  }
}
