import { ColorConverterGloss, ConverterTransparency, TypeColorConverter } from 'src/engine/core/@types/color-types';
import { ColerEntity } from './coler.entity';
import { ColorEntity } from './color.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';



@ObjectType()
@Entity('converters')
export class ConverterEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'numeric', precision: 10, scale: 3 })
  value: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({
    type: 'enum',
    enum: ['Акрил', 'Полиуретан'],
    default: 'Акрил',
  })
  typeConverter: TypeColorConverter;

  @Field()
  @Column({
    type: 'enum',
    enum: ['20%', '40%', '70%'],
  })
  converterGloss: ColorConverterGloss;

  @Field()
  @Column({
    type: 'enum',
    enum: ['Прозрачный', 'Белый'],
  })
  transparency: ConverterTransparency;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({nullable: true})
  colorId: number;

  @ManyToOne(() => ColorEntity, (color) => color.converters, {onDelete: "CASCADE"})
  color: ColorEntity;

  @OneToMany(() => ColerEntity, (coler) => coler.converter, {
    eager: true,
    onDelete: 'CASCADE',
  })
  colers: ColerEntity[];
}
