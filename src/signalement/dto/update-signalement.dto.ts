import { PartialType } from '@nestjs/mapped-types';
import { CreateSignalementDto } from './create-signalement.dto';

export class UpdateSignalementDto extends PartialType(CreateSignalementDto) {}
