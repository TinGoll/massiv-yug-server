import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ColerEntity } from '../../entities/coler.entity';
import { CreateColerInput } from '../../inputs/create-coler.input';
import { UpdateColerInput } from '../../inputs/update-coler.input';
import { ColerService } from '../../services/coler/coler.service';

@Resolver()
export class ColerResolver {
  constructor(private readonly colerService: ColerService) {}

  @Mutation(() => ColerEntity)
  async createColor(
    @Args('createColor') createColerInput: CreateColerInput,
  ): Promise<ColerEntity> {
    return await this.colerService.crateColer(createColerInput);
  }

  @Mutation(() => ColerEntity)
  async updateColor(
    @Args('updateColor') updateColerInput: UpdateColerInput,
  ): Promise<ColerEntity> {
    return await this.colerService.updateColer(updateColerInput);
  }

  @Mutation(() => Number)
  async removeColor(@Args('id') id: number): Promise<number> {
    return await this.colerService.removeColer(id);
  }

  @Query(() => ColerEntity)
  async getOneColor(@Args('id') id: number) {
    return await this.colerService.getOneColer(id);
  }

  @Query(() => [ColerEntity])
  async getAllColors(): Promise<ColerEntity[]> {
    return await this.colerService.getAllColer();
  }
}
