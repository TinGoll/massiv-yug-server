import { Panel } from "../../../../core/modeles/panel/Panel";
import { Profile } from 'src/core/modeles/profile/Profile';
import { IteratingSystem, Family, Entity } from 'yug-entity-component-system';
import { PanelAttachmentComponent } from '../../components/attachment/panel.attachment.component';
import { ProfileAttachmentComponent } from '../../components/attachment/profile.attacment.component';
import { GeometryComponent } from '../../components/geometry/geometry.component';
import { ProductComponent } from '../../components/product/product.component';

export class ProductGeometrySystem extends IteratingSystem {
  constructor() {
    super(
      ProductGeometrySystem,
      Family.all(
        ProductComponent,
        PanelAttachmentComponent,
        ProfileAttachmentComponent,
        GeometryComponent,
      ).get(),
    );
  }

  processEntity(entity: Entity, deltaTime: number): void {
    
    const geo = entity.getComponent<GeometryComponent>(GeometryComponent);
    const panels = entity.getComponent<PanelAttachmentComponent<Panel>>(
      PanelAttachmentComponent,
    );
    const profile = entity.getComponent<ProfileAttachmentComponent>(
      ProfileAttachmentComponent,
    );
    const product = entity.getComponent<ProductComponent>(ProductComponent);

    if (!panels.items.length) {
      const p = new Panel();
      p.createShirt();
      panels.items.push({
        index: 0,
        item: p,
        hidden: false,
      });
    }
    if (!profile.profiles.top) {
      profile.profiles.left = new Profile('Левый профиль', {
        assemblyAngle: 45,
        bottomShelfThickness: 22,
        chamferSize: 10,
        depth: 20,
        grooveDepth: 10,
        profileWidth: 80,
      });
      profile.profiles.right = new Profile('Правый профиль', {
        assemblyAngle: 45,
        bottomShelfThickness: 22,
        chamferSize: 10,
        depth: 20,
        grooveDepth: 10,
        profileWidth: 80,
      });
      profile.profiles.top = new Profile('Верхний профиль', {
        assemblyAngle: 45,
        bottomShelfThickness: 22,
        chamferSize: 10,
        depth: 20,
        grooveDepth: 10,
        profileWidth: 80,
      });
      profile.profiles.bot = new Profile('Нижний профиль', {
        assemblyAngle: 45,
        bottomShelfThickness: 22,
        chamferSize: 10,
        depth: 20,
        grooveDepth: 10,
        profileWidth: 80,
      });
    }
    const panel = panels.items[0];

    panel.item.geometry.height =
      geo.geometry.height -
      (profile.profiles.top.profileWidth + profile.profiles.top.grooveDepth) -
      (profile.profiles.bot.profileWidth + profile.profiles.bot.grooveDepth);
    panel.item.geometry.width =
      geo.geometry.width -
      (profile.profiles.left.profileWidth + profile.profiles.left.grooveDepth) -
      (profile.profiles.right.profileWidth +
        profile.profiles.right.grooveDepth);
    panel.item.geometry.square = panel.item.geometry.getSquare();

    panel.item.shirt.geometry.height = panel.item.geometry.height - 80;
    panel.item.shirt.geometry.width = panel.item.geometry.width - 80;
    panel.item.shirt.geometry.square = panel.item.shirt.geometry.getSquare();
  }
}
