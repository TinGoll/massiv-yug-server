import { Module } from '@nestjs/common';
import { FinishingModule } from '../repository/finishing/finishing.module';
import { WorkModule } from '../repository/work/work.module';
import { ColorEditorService } from './services/color-editor/color-editor.service';
import { ListEditorService } from './services/list-editor/list-editor.service';
import { ProfileEditorService } from './services/profile-editor/profile-editor.service';
import { ToolsService } from './services/tools/tools.service';
import { WorkEditorService } from './services/work-editor/work-editor.service';

@Module({
  imports: [FinishingModule, WorkModule],
  providers: [
    ColorEditorService,
    ListEditorService,
    ProfileEditorService,
    ToolsService,
    WorkEditorService,
  ],
  exports: [ToolsService],
})
export class ListEditorModule {}
