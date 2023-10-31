import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBuildingDto {
  @IsString()
  @ApiProperty()
  name: string;
}
