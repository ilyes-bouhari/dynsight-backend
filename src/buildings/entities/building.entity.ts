import { ApiProperty } from '@nestjs/swagger';
import { Building } from '@prisma/client';

export class BuildingEntity implements Building {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
