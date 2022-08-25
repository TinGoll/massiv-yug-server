import { Injectable } from '@nestjs/common';
import { Color } from 'src/engine/core/models/color/Color';

import { ColorListEditor, ListEditor } from 'src/engine/core/interfaces/dtos/client-dtos/edit-list-dto';
import { ColorEditorService } from './color-editor/color-editor.service';
import { InitializingClientLists } from 'src/engine/core/interfaces/dtos/server-dtos/init-state-dto';
import { ProfileEditorService } from './profile-editor/profile-editor.service';
import { WorkEditorService } from './work-editor/work-editor.service';

@Injectable()
export class ListEditorService {
  constructor(
    private readonly colorEditorService: ColorEditorService,
    private readonly profileEditorService: ProfileEditorService,
    private readonly workEditorService: WorkEditorService,
  ) {}
  act(msg: ListEditor) {
    if (msg.listName === 'colors') {
      this.colorEditorService.act(msg);
    }
     if (msg.listName === 'works') {
       this.workEditorService.act(msg);
     }
      if (msg.listName === 'profiles') {
        this.profileEditorService.act(msg);
      }
  }

  getLists(): InitializingClientLists {
    return {
      colors: this.colorEditorService.getList(),
      profiles: this.profileEditorService.getList(),
      works: this.workEditorService.getList(),
      lists: [
        { label: 'Цвет', value: 'colors' },
        { label: 'Профиль', value: 'profiles' },
        { label: 'Работы', value: 'works' },
      ],
    };
  }
}
