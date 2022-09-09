import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ConverterEntity } from '../../entities/converter.entity';
import { CreateConverterInput } from '../../inputs/create-converter.input';
import { UpdateConverterInput } from '../../inputs/update-converter.input';
import { ConverterService } from '../../services/converter/converter.service';

@Resolver('Converter')
export class ConverterResolver {
  constructor(private readonly converterService: ConverterService) {}

  @Mutation(() => ConverterEntity)
  async createColor(
    @Args('createConverter') createConverterInput: CreateConverterInput,
  ): Promise<ConverterEntity> {
    return await this.converterService.crate(createConverterInput);
  }

  @Mutation(() => ConverterEntity)
  async updateColor(
    @Args('updateConverter') updateConverterInput: UpdateConverterInput,
  ): Promise<ConverterEntity> {
    return await this.converterService.update(updateConverterInput);
  }

  @Mutation(() => Number)
  async removeColor(@Args('id') id: number): Promise<number> {
    return await this.converterService.remove(id);
  }

  @Query(() => ConverterEntity)
  async getOneColor(@Args('id') id: number) {
    return await this.converterService.getOne(id);
  }

  @Query(() => [ConverterEntity])
  async getAllColors(): Promise<ConverterEntity[]> {
    return await this.converterService.getAll();
  }
}
