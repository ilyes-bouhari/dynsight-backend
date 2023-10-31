import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class BuildingsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createBuildingDto: CreateBuildingDto) {
    return this.prisma.building.create({ data: createBuildingDto });
  }

  findAll() {
    return this.prisma.building.findMany();
  }

  async findOne(id: string) {
    const building = await this.prisma.building.findUnique({
      where: { id },
    });
    if (!building) {
      throw new NotFoundException(`Building #${id} not found`);
    }
    return building;
  }

  async update(id: string, updateBuildingDto: UpdateBuildingDto) {
    await this.findOne(id);
    return this.prisma.building.update({
      where: { id },
      data: updateBuildingDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.building.delete({ where: { id } });
  }
}
