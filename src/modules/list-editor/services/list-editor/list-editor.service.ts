import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { ListEditor } from 'src/engine/core/interfaces/dtos/client-dtos/edit-list-dto';
import { InitializingClientLists } from 'src/engine/core/interfaces/dtos/server-dtos/init-state-dto';
import { ColorEditorService } from '../color-editor/color-editor.service';
import { ProfileEditorService } from '../profile-editor/profile-editor.service';
import { WorkEditorService } from '../work-editor/work-editor.service';

@Injectable()
export class ListEditorService {
  listsLoaded: boolean = false;
  constructor(
    private readonly colorEditorService: ColorEditorService,
    private readonly profileEditorService: ProfileEditorService,
    private readonly workEditorService: WorkEditorService,
  ) {}
  async act(msg: ListEditor): Promise<void> {
    try {
      if (msg.listName === 'colors') {
        await this.colorEditorService.act(msg);
      }
      if (msg.listName === 'works') {
        await this.workEditorService.act(msg);
      }
      if (msg.listName === 'profiles') {
        await this.profileEditorService.act(msg);
      }

      await this.loadLists()
    } catch (e) {
      console.log("Отловили");
      throw e; 
    }
  }

  async loadLists (): Promise<void> {
    await this.colorEditorService.load()
    await this.workEditorService.load();
    /** Загрузка всех списков */
    this.listsLoaded = true;
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
