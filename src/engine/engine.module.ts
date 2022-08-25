import { Module } from '@nestjs/common';
import { SocketGateway } from './socket/socket.gateway';
import { ListEditorService } from './services/list-editor/list-editor.service';
import { ToolsService } from './services/tools/tools.service';
import { ColorEditorService } from './services/list-editor/color-editor/color-editor.service';
import { ProfileEditorService } from './services/list-editor/profile-editor/profile-editor.service';
import { WorkEditorService } from './services/list-editor/work-editor/work-editor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkEntity } from './core/models/work/entities/work.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    WorkEntity
  ])],
  providers: [
    SocketGateway,
    ListEditorService,
    ToolsService,
    ColorEditorService,
    ProfileEditorService,
    WorkEditorService,
  ],
})
export class EngineModule {}
