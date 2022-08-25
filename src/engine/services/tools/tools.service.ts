import { Injectable } from '@nestjs/common';
import { InitializingClientTools } from 'src/engine/core/interfaces/dtos/server-dtos/init-state-dto';
import { ColorEditorService } from '../list-editor/color-editor/color-editor.service';
import { ListEditorService } from '../list-editor/list-editor.service';

@Injectable()
export class ToolsService {
  constructor(private readonly _listEditorService: ListEditorService, ) {}
  getListEditorService(): ListEditorService {
    return this._listEditorService;
  }

  getTools(): InitializingClientTools {
    const lists = this._listEditorService.getLists();
    return {
      lists: lists,
    };
  }
}
