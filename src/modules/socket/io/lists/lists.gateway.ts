import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Namespace, Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { GatewayServerListsListenEvents } from './events/list.server.listen.events';
import { GatewayServerListsEmitEvents } from './events/list.server.emit.even';
import { GatewayClientListsEmitEvents } from './events/list.client.emit.even';
import { GatewayClientListsListenEvents } from './events/list.client.listen.events';

import { WsException } from '@nestjs/websockets/errors';
import { ColorCreateSampleInput } from 'src/modules/repository/finishing/document-color/inputs/color-sample-create.Input';
import { ColorService } from 'src/modules/repository/finishing/document-color/services/document-color/document-color.service';
import { ConverterCreateInput } from 'src/modules/repository/finishing/document-color/inputs/converter-create.input';
import { ColerCreateInput } from 'src/modules/repository/finishing/document-color/inputs/coler-create.input';
import { PatinaService } from 'src/modules/repository/finishing/document-patina/services/document-patina/document-patina.service';
import {
  PatinaCreateInput,
  PatinaConverterCreateInput,
  PatinaColerCreateInput,
} from 'src/modules/repository/finishing/document-patina/inputs/patina-create.input';
import { VarnishService } from 'src/modules/repository/finishing/document-varnish/services/document-varnish/document-varnish.service';
import { VarnisCreateInput } from 'src/modules/repository/finishing/document-varnish/inputs/varnish-create.input';
import { MaterialService } from 'src/modules/repository/material/services/document-material/document-material.service';
import { MaterialCreateInput } from 'src/modules/repository/material/inputs/material-create.input';
import { PanelService } from 'src/modules/repository/panel/services/document-panel/document-panel.service';
import { PanelCreateInput } from 'src/modules/repository/panel/inputs/panel-create.input';
import { ProfileCreateInput } from 'src/modules/repository/profile/inputs/profile-create.input';
import { ProfileService } from 'src/modules/repository/profile/services/profile/profile.service';
import { ProfileImporter } from 'src/modules/repository/profile/services/profile-importer';
import { OrderExtractorService } from 'src/modules/order-migration/services/order-extractor/order-extractor.service';

type ClientIo = Socket<
  GatewayClientListsListenEvents,
  GatewayClientListsEmitEvents
>;
type ServerIo = Server<
  GatewayServerListsListenEvents,
  GatewayServerListsEmitEvents,
  GatewayServerListsListenEvents
>;

@WebSocketGateway({
  namespace: 'lists',
  transports: ['websocket', 'polling', 'flashsocket'],
  cors: {
    origin: '*',
  },
})
export class ListsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: ServerIo;
  private logger: Logger = new Logger('SocketLists');
  /************************************************************* */
  constructor(
    private readonly colorService: ColorService,
    private readonly patinaService: PatinaService,
    private readonly varnishService: VarnishService,
    private readonly materialService: MaterialService,
    private readonly panelService: PanelService,
    private readonly profileService: ProfileService,
    private readonly profileImporter: ProfileImporter,
    private readonly orderExtractorService: OrderExtractorService,
  ) {}
  /************************************************************* */
  afterInit(server: ServerIo) {}

  handleConnection(client: ClientIo, ...args: string[]): void {
    this.logger.log('Подключение к namespace списков.');
  }
  handleDisconnect(client: ClientIo) {
    this.logger.log('Отключение к namespace списков.');
  }

  /** Ошибки */
  sendError(client: Socket, e: WsException): void {
    client.emit('error', {
      ...e,
    });
  }

  /************************************************************* */
  /** Редактор списков */

  /** Создание шаблона цвета */
  @SubscribeMessage('sample-color-create')
  async createSampleColor(
    client: Socket,
    payload: ColorCreateSampleInput,
  ): Promise<WsResponse<any>> {
    try {
      const color = await this.colorService.createSample(payload);
      return {
        event: 'sample-color-create',
        data: color,
      };
    } catch (e) {
      this.sendError(client, e);
    }
  }

  /** Создание нового конвертера для цвета */
  @SubscribeMessage('color-converter-create')
  async createColorConverter(
    client: Socket,
    payload: ConverterCreateInput,
  ): Promise<void> {
    try {
      await this.colorService.createConverter(payload);
    } catch (e) {
      this.sendError(client, e);
    }
  }

  @SubscribeMessage('color-coler-create')
  async createColorColer(
    client: Socket,
    payload: ColerCreateInput,
  ): Promise<void> {
    try {
      await this.colorService.createColer(payload);
    } catch (e) {
      this.sendError(client, e);
    }
  }

  //************************************************ */

  /** Создание шаблона патины */
  @SubscribeMessage('sample-patina-create')
  async createSamplePatina(
    client: Socket,
    payload: PatinaCreateInput,
  ): Promise<WsResponse<any>> {
    try {
      const data = await this.patinaService.createSample(payload);
      return {
        event: 'sample-patina-create',
        data,
      };
    } catch (e) {
      this.sendError(client, e);
    }
  }

  /** Создание нового конвертера для цвета */
  @SubscribeMessage('patina-converter-create')
  async createPatinaConverter(
    client: Socket,
    payload: PatinaConverterCreateInput,
  ): Promise<void> {
    try {
      await this.patinaService.createConverter(payload);
    } catch (e) {
      this.sendError(client, e);
    }
  }

  @SubscribeMessage('patina-coler-create')
  async createPatinaColer(
    client: Socket,
    payload: PatinaColerCreateInput,
  ): Promise<void> {
    try {
      await this.patinaService.createColer(payload);
    } catch (e) {
      this.sendError(client, e);
    }
  }

  /**************************************************** */
  // Лаки
  @SubscribeMessage('sample-varnish-create')
  async createSampleVarnish(
    client: Socket,
    payload: VarnisCreateInput,
  ): Promise<WsResponse<any>> {
    try {
      const data = await this.varnishService.createSample(payload);
      return {
        event: 'sample-varnish-create',
        data,
      };
    } catch (e) {
      this.sendError(client, e);
    }
  }
  /**************************************************** */
  // Материал
  @SubscribeMessage('sample-material-create')
  async createSampleMaterial(
    client: Socket,
    payload: MaterialCreateInput,
  ): Promise<WsResponse<any>> {
    try {
      const data = await this.materialService.createSample(payload);
      return {
        event: 'sample-material-create',
        data,
      };
    } catch (e) {
      this.sendError(client, e);
    }
  }
  /**************************************************** */
  // Филёнка
  @SubscribeMessage('sample-panel-create')
  async createSamplePanel(
    client: Socket,
    payload: PanelCreateInput,
  ): Promise<WsResponse<any>> {
    try {
      const data = await this.panelService.createSample(payload);
      return {
        event: 'sample-panel-create',
        data,
      };
    } catch (e) {
      this.sendError(client, e);
    }
  }
  /**************************************************** */
  // Профиль
  @SubscribeMessage('sample-profile-create')
  async createSampleProfile(
    client: Socket,
    payload: ProfileCreateInput,
  ): Promise<WsResponse<any>> {
    try {
      const data = await this.profileService.createSample(payload);
      return {
        event: 'sample-profile-create',
        data,
      };
    } catch (e) {
      this.sendError(client, e);
    }
  }

  @SubscribeMessage('sample-profile-import')
  async importSampleProfile(client: Socket, payload: any): Promise<void> {
    try {
      // await this.profileImporter.import()
      // const data = await this.profileService.findSample(163);
      // const data = await this.profileService.findAllSamples();
      // this.orderExtractorService.getNextOrder(17000).subscribe({
      //   next(value) {
      //     client.emit('sample-profile-import', value);
      //   },
      //   error(err) {
      //     console.log(err);
      //   },
      //   complete() {
      //     console.log('COMPLITE');
      //   },
      // });
      const value = await this.orderExtractorService.getNextOrder(17000);
      client.emit('sample-profile-import', value);
    } catch (e) {
      this.sendError(client, e);
    }
  }
  /**************************************************** */
}
