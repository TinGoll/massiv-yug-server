import { Controller, Get, Post, HttpCode, Body } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { OrderCreator } from 'src/modules/order-processing/providers/order-creator';
import { ColorService } from '../color/color.service';
import { SampleColorEntity } from '../color/entities/sample.color.entity';
import { ColorCreateInput } from '../color/inputs/color.input';
import { SampleMaterialEntity } from '../material/entities/sample.material.entity';
import { MaterialCreateInput } from '../material/inputs/material.input';
import { MaterialService } from '../material/material.service';
import { SamplePanelEntity } from '../panel/entities/sample.panel.entity';
import { PanelCreateInput } from '../panel/inputs/panel.input';
import { PanelService } from '../panel/panel.service';
import { SamplePatinaEntity } from '../patina/entities/sample.patina.entity';
import { PatinaCreateInput } from '../patina/inputs/patina.input';
import { PatinaService } from '../patina/patina.service';
import { SampleProfileEntity } from '../profile/entities/sample.profile.entity';
import { ProfileCreateInput } from '../profile/inputs/profile.input';
import { ProfileService } from '../profile/profile.service';
import { SampleVarnishEntity } from '../varnish/entities/sample.varnish.entity';
import { VarnishCreateInput } from '../varnish/inputs/varnish.input';
import { VarnishService } from '../varnish/varnish.service';

@Controller('api/repository')
export class RepositoryController {
  constructor(
    private readonly materialService: MaterialService,
    private readonly colorService: ColorService,
    private readonly panelService: PanelService,
    private readonly patinaService: PatinaService,
    private readonly profileService: ProfileService,
    private readonly varnishService: VarnishService,
  ) {}

  @Get('/materials')
  @HttpCode(200)
  materials(): Observable<SampleMaterialEntity[]> {
    return from(this.materialService.findAll());
  }

  @Post('/materials')
  @HttpCode(201)
  createMaterial(
    @Body() input: MaterialCreateInput,
  ): Observable<SampleMaterialEntity> {
    return from(this.materialService.create(input));
  }

  @Get('/colors')
  @HttpCode(200)
  colors(): Observable<SampleColorEntity[]> {
    return from(this.colorService.findColors());
  }

  @Post('/colors')
  @HttpCode(201)
  createColor(@Body() input: ColorCreateInput): Observable<SampleColorEntity> {
    return from(this.colorService.createColor(input));
  }

  @Get('/panels')
  @HttpCode(200)
  panels(): Observable<SamplePanelEntity[]> {
    return from(this.panelService.findAll());
  }

  @Post('/panels')
  @HttpCode(201)
  createPanel(@Body() input: PanelCreateInput): Observable<SamplePanelEntity> {
    return from(this.panelService.create(input));
  }

  @Get('/patinas')
  @HttpCode(200)
  patinas(): Observable<SamplePatinaEntity[]> {
    return from(this.patinaService.findPatinas());
  }

  @Post('/patinas')
  @HttpCode(201)
  createPatina(
    @Body() input: PatinaCreateInput,
  ): Observable<SamplePatinaEntity> {
    return from(this.patinaService.createPatina(input));
  }

  @Get('/profiles')
  @HttpCode(200)
  profiles(): Observable<SampleProfileEntity[]> {
    return from(this.profileService.findAll());
  }

  @Post('/profiles')
  @HttpCode(201)
  createProfile(
    @Body() input: ProfileCreateInput,
  ): Observable<SampleProfileEntity> {
    return from(this.profileService.create(input));
  }

  @Get('/varnishes')
  @HttpCode(200)
  varnishes(): Observable<SampleVarnishEntity[]> {
    return from(this.varnishService.findAll());
  }

  @Post('/varnishes')
  @HttpCode(201)
  createVarnish(
    @Body() input: VarnishCreateInput,
  ): Observable<SampleVarnishEntity> {
    return from(this.varnishService.create(input));
  }
}
