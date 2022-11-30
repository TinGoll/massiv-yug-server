import { Injectable } from '@nestjs/common';
import { from, mergeMap, of } from 'rxjs';
import { Geometry } from 'src/core/common/models/geometry';
import { ColorService } from 'src/modules/repository/color/color.service';
import { MaterialService } from 'src/modules/repository/material/material.service';
import { BOOK_BARCODE_PREFIX } from 'src/modules/repository/order/entities/book.entity';
import { OrderService } from 'src/modules/repository/order/order.service';
import { PanelService } from 'src/modules/repository/panel/panel.service';
import { PatinaService } from 'src/modules/repository/patina/patina.service';
import { ProfileService } from 'src/modules/repository/profile/profile.service';
import { VarnishService } from 'src/modules/repository/varnish/varnish.service';
import { WorkService } from 'src/modules/repository/work/work.service';
import { OrderCreator } from './order-creator';

@Injectable()
export class TestEngine {
  constructor(
    private readonly orderService: OrderService,
    private readonly materialService: MaterialService,
    private readonly profileService: ProfileService,
    private readonly colorService: ColorService,
    private readonly patinaService: PatinaService,
    private readonly varnishService: VarnishService,
    private readonly panelService: PanelService,
    private readonly workService: WorkService,
    private readonly orderCreator: OrderCreator,
  ) {
    // this.createTestOrder();

    // this.orderCreator.getIdentifiers().then((identifiers) => {
    //   console.log('identifiers', identifiers);
    // });

    // this.orderCreator
    //   .addBook(1, {
    //     note: 'Общий комментарий для книги заказа',
    //     nameFromClient: 'Номер заказа от клиента',
    //   })
    //   .then((book) => {
    //     this.orderCreator
    //       .addDocument(book.id, {
    //         documentType: 'Лестницы',
    //         glossiness: 'Лёгкий глянец (40%)',
    //         note: 'Комментарий к документу',
    //       })
    //       .then((doc) => {
    //         return this.orderCreator
    //           .assignColor(doc.id, 'Эмаль', {
    //             note: 'Коммент к цвету',
    //             previousName: 'Какой то там цвет из старой бд',
    //             value: 100,
    //           })
    //           .then((doc) => {
    //             return this.orderCreator.assignPanel(doc.id, 'Афина', {
    //               colorId: 1,
    //               materialId: 1,
    //               note: 'Комментарий к филёнке',
    //               shirtWorkData: [],
    //               workData: [],
    //             });
    //           })
    //           .then((dok) => {
    //             return this.orderCreator.assignMaterial(doc.id, 'Дуб');
    //           })
    //           .then((doc) => {
    //             return this.orderCreator.assignColor(doc.id, 'Морилка');
    //           })
    //           .then((result) => {
    //             return this.orderCreator
    //               .addElement(result.id, 'Фасад глухой', {
    //                 name: 'Другое название',
    //               })
    //               .then((el) => {

    //                 this.orderCreator.changeComponent<Geometry>(el.id, "component_geometry", {
    //                   height: 916, width: 396, amount: 5
    //                 })


    //                 return el.document.then((d) => {
    //                   return this.orderCreator.addElement(d.id, 'Фасад глухой');
    //                 });
    //               });
    //           })
    //           .then((element) => {
    //             element.document.then((d) =>
    //               d.book.then((b) => console.log(b)),
    //             );
    //           });
    //       });
    //   });
  }

  async createTestOrder(): Promise<void> {
    const book = await this.orderService.createBook({
      nameFromClient: 'Тестовая книга',
      note: 'Комментарий к книге',
      resultData: {},
    });

    const status = await this.orderService.findStatusToId(1);

    await this.orderService.assignStatusToBook(book, status);

    let barcodeLength = 6;
    let lenght = `${book.id}`.length;
    let repeat = barcodeLength - lenght < 0 ? 0 : barcodeLength - lenght;
    let barcode = `${BOOK_BARCODE_PREFIX}${'0'.repeat(repeat)}${book.id}`;
    book.barcode = barcode;

    const works = await this.workService.findAll();
    book.works = works;

    const panel = await this.panelService.findToName('Афина');
    const material = await this.materialService.findToName('Дуб');
    const color = await this.colorService.findColorToName('Морилка');
    const patina = await this.patinaService.findPatinaToName(
      'Многокомпонентная',
    );
    const varnish = await this.varnishService.findToName('Акриловый');

    const profile = await this.profileService.findToName('Флоренция');

    const documentFasade = await this.orderService.createDocument({
      documentType: 'Фасады',
      glossiness: null,
      note: 'Комментарий к документу',
      resultData: {},
    });

    await this.orderService.assignMaterial(documentFasade, material);

    await this.orderService.assignPanel(documentFasade, panel, {});
    await this.orderService.assignColor(documentFasade, color);
    await this.orderService.assignPatina(documentFasade, patina);
    await this.orderService.assignVarnish(documentFasade, varnish);
    await this.orderService.assignProfile(documentFasade, profile);

    await this.orderService.assignDocumentToBook(book, documentFasade);

    const testBook = await this.orderService.findBookToId(book.id);

    console.log(JSON.stringify(testBook, null, 2));

    // console.log(
    //   testBook.works.reduce<number>((acc, w) => {
    //     acc += Number(w.price);
    //     return acc;
    //   }, 0),
    // );
  }
}


