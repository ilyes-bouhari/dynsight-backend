import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { BuildingsService } from './buildings.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { BuildingEntity } from './entities/building.entity';

@Controller('buildings')
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) {}

  @Post()
  @ApiCreatedResponse({ type: BuildingEntity })
  create(@Body() createBuildingDto: CreateBuildingDto) {
    return this.buildingsService.create(createBuildingDto);
  }

  @Get()
  @ApiOkResponse({ type: BuildingEntity, isArray: true })
  findAll() {
    return this.buildingsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: BuildingEntity })
  findOne(@Param('id') id: string) {
    return this.buildingsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: BuildingEntity })
  update(
    @Param('id') id: string,
    @Body() updateBuildingDto: UpdateBuildingDto,
  ) {
    return this.buildingsService.update(id, updateBuildingDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: BuildingEntity })
  remove(@Param('id') id: string) {
    return this.buildingsService.remove(id);
  }
}
