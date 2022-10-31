import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WsException } from '@nestjs/websockets';
import { ComponentMapper } from 'src/modules/ecs/services/component-mapper';
import { Repository } from 'typeorm';
import { ElementEntity } from '../../entities/document-element.entity';
import { ElementSampleEntity } from '../../entities/sample-element.entity';
import {
  ElementSampleCreateInput,
  ElementSampleUpdateInput,
} from '../../inputs/element-sample.input';

@Injectable()
export class ElementService {
  constructor(
    @InjectRepository(ElementSampleEntity)
    private readonly sampleRepository: Repository<ElementSampleEntity>,
    @InjectRepository(ElementEntity)
    private readonly elementRepository: Repository<ElementEntity>,
    private readonly componentMapper: ComponentMapper,
  ) {}

  async save(entity: ElementEntity): Promise<ElementEntity> {
    try {
      return await this.elementRepository.save(entity);
    } catch (e) {
      throw new WsException(e);
    }
  }

  /**
   * Этот метод надо перенести в processing.
   * Метод находится здесь, для простоты миграции
   * Модуль EcsModule - удалить из репозитория
   * @param sampleName
   * @returns
   */
  async createElementToName(sampleName: string, createDummy?: boolean): Promise<ElementEntity | null> {
    try {
      const nomeclatures = await this.findAll();
      let sample = nomeclatures.find((n) =>
        n.body.find((b) => b.identifier === sampleName),
      );

      if (!sample) {
        if (createDummy) {
          sample = nomeclatures.find((n) => n.name === 'No Name');
        }else{
          return null;
        }
      }

      const bodyElement = sample.body.find((b) => b.identifier === sampleName);

      const newElement = this.elementRepository.create();
      newElement.sample = sample;
      newElement.name = bodyElement?.identifier || sampleName;
      /*** Тут работа с компонентами. */

      newElement.components = sample.components.map((componentName) => {
        const cmpDto = this.componentMapper.getDefaultDto(componentName) || {};

        const data =
          sample.default.find((d) => d.componentName === componentName)
            ?.default || {};

        const cmp = {
          componentName,
          data: cmpDto,
        };

        const bodyData =
          bodyElement?.componentData?.find(
            (bd) => bd.componentName === componentName,
          )?.default || {};

        cmp.data = { ...cmp.data, ...data, ...bodyData };
        return cmp;
      });

      return await this.elementRepository.save(newElement);
    } catch (e) {
      throw new WsException(e);
    }
  }

  async createSample(
    input: ElementSampleCreateInput,
  ): Promise<ElementSampleEntity> {
    try {
      const sample = await this.sampleRepository.save({ ...input });
      return sample;
    } catch (e) {
      throw new WsException(e);
    }
  }

  async updateSample(
    input: ElementSampleUpdateInput,
  ): Promise<ElementSampleEntity> {
    try {
      const { id, ...data } = input;
      await this.sampleRepository.update({ id }, { ...data });
      return await this.findOne(id);
    } catch (e) {
      throw new WsException(e);
    }
  }

  async findOne(id: number): Promise<ElementSampleEntity | null> {
    try {
      const sample = await this.sampleRepository.findOne({ where: { id } });
      return sample || null;
    } catch (e) {
      throw new WsException(e);
    }
  }

  async findAll(): Promise<ElementSampleEntity[]> {
    try {
      const samples = await this.sampleRepository.find();
      return samples;
    } catch (e) {
      throw new WsException(e);
    }
  }
}
