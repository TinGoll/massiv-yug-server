import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { InitializingClientTools } from 'src/core/types/event-types/init/init-state-dto';
import { ListEditorService } from '../list-editor/list-editor.service';

@Injectable()
export class ToolsService {
  ready: boolean = false;
  constructor(private readonly _listEditorService: ListEditorService) {}
  getListEditorService(): ListEditorService {
    try {
      return this._listEditorService;
    } catch (e) {
      new WsException(e);
    }
  }

  isReady(): boolean {
    return this.ready;
  }

  async load () {
    await this._listEditorService.loadLists()
    this.ready = true;
  }

  getTools(): InitializingClientTools {
    const lists = this._listEditorService.getLists();
    return {
      lists: lists,
    };
  }
}
