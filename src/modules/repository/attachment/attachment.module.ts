import { Module } from '@nestjs/common';
import { PanelService } from './services/panel/panel.service';
import { ProfileService } from './services/profile/profile.service';
import { PanelResolver } from './resolvers/panel/panel.resolver';
import { ProfileResolver } from './resolvers/profile/profile.resolver';

@Module({
  providers: [PanelService, ProfileService, PanelResolver, ProfileResolver]
})
export class AttachmentModule {}
