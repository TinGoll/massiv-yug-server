import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ColorEntity } from '../../entities/color.entity';
import { CreateColorInput } from '../../inputs/create-color.input';
import { UpdateColorInput } from '../../inputs/update-color.input';
import { ColorService } from '../../services/color/color.service';

@Resolver('Color')
export class ColorResolver {
  constructor(private readonly colorService: ColorService) {}

  @Mutation(() => ColorEntity)
  async createColor(
    @Args('createColor') createColorInput: CreateColorInput,
  ): Promise<ColorEntity> {
    return await this.colorService.crateColor(createColorInput);
  }

  @Mutation(() => ColorEntity)
  async updateColor(
    @Args('updateColor') updateColorInput: UpdateColorInput,
  ): Promise<ColorEntity> {
    return await this.colorService.updateColor(updateColorInput);
  }

  @Mutation(() => Number)
  async removeColor(@Args('id') id: number): Promise<number> {
    return await this.colorService.removeColor(id);
  }

  @Query(() => ColorEntity)
  async getOneColor(@Args('id') id: number) {
    return await this.colorService.getOneColor(id);
  }

  @Query(() => [ColorEntity])
  async getAllColors(): Promise<ColorEntity[]> {
    return await this.colorService.getAllColors();
  }
  
}
