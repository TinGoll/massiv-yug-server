import { Geometry } from 'src/core/common/models/geometry';
import { Family, IteratingSystem } from 'yug-entity-component-system';
import { GeometryComponent } from '../components/geometry.component';
import { ProfileComponent } from '../components/profile.component';
import { MYEngine } from '../engine/my-engine';
import { MYEntity } from '../engine/my-entity';
import { BookState } from 'src/modules/repository/order/entities/book.state';

/**
 * Система для расчета профиля.
 */
export class ProfileSystem extends IteratingSystem {
  constructor() {
    super(ProfileSystem, Family.all(GeometryComponent, ProfileComponent).get());
  }

  /** Переопределяем движок, на расширенный */
  getMYEngine(): MYEngine {
    return super.getEngine<MYEngine>();
  }

  /** Код запускается перед обновлением, можно использовать для решения об отключении системы и. т. д. */
  async beforeUpdate(): Promise<void> {
    const book = this.getMYEngine().bookEntity;
    if (book && book.state === BookState.EDITING) {
      this.setProcessing(true);
    } else {
      this.setProcessing(false);
    }
  }

  protected async processEntity(
    entity: MYEntity,
    deltaTime: number,
  ): Promise<void> {
    const document = entity.documentEntity;
    const gmCmp = entity.getComponent<GeometryComponent>(GeometryComponent);
    const profileCmp = entity.getComponent<ProfileComponent>(ProfileComponent);

    const profile = document.profile;
    if (!profile.sample) {
      return;
    }
    let widths =
      profile.widths && profile.widths.length
        ? profile.widths
        : profile.sample.widths;

    let angle = profile.angle ? profile.angle : profile.sample.angle;

    let Parentheight = gmCmp.data.height || 0;
    let Parentwidth = gmCmp.data.width || 0;
    let ParentAmount = gmCmp.data.amount || 0;

    let lehtW: number = 0,
      topW: number = 0,
      rightW: number = 0,
      botW: number = 0;

    if (widths && widths.length === 1) {
      lehtW = Number(widths[0]);
      topW = Number(widths[0]);
      rightW = Number(widths[0]);
      botW = Number(widths[0]);
    }

    if (widths && widths.length === 2) {
      lehtW = Number(widths[0]);
      topW = Number(widths[1]);
      rightW = Number(widths[0]);
      botW = Number(widths[1]);
    }

    if (widths && widths.length === 3) {
      lehtW = Number(widths[0]);
      topW = Number(widths[1]);
      rightW = Number(widths[2]);
      botW = Number(widths[1]);
    }

    if (widths && widths.length > 3) {
      lehtW = Number(widths[0]);
      topW = Number(widths[1]);
      rightW = Number(widths[2]);
      botW = Number(widths[3]);
    }

    profileCmp.data.profiles = (profileCmp.data.profiles || []).map((pr) => {
      // Зависимость от угла сборки не настроена!!!
      let height = 0;
      let width = 0;
      const geometry: Geometry = {
        square: 0,
        cubature: 0,
        perimeter: 0,
        linearMeters: 0,
      };
      if (pr.name === 'Левый') {
        height = Parentheight;
        width = lehtW;
      }
      if (pr.name === 'Правый') {
        height = Parentheight;
        width = rightW;
      }

      if (pr.name === 'Верхний') {
        height = Parentwidth;
        width = topW;
      }

      if (pr.name === 'Нижний') {
        height = Parentwidth;
        width = botW;
      }
      geometry.height = height;
      geometry.width = width;

      geometry.square = (height / gmCmp.mm) * (width / gmCmp.mm) * ParentAmount;
      geometry.perimeter =
        ((height / gmCmp.mm) * 2 + (width / gmCmp.mm) * 2) * ParentAmount;
      geometry.amount = ParentAmount;

      pr.geometry = geometry;

      return pr;
    });

    //  console.log(JSON.stringify(profileCmp, null, 2));
  }
}
