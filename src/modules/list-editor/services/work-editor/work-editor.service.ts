import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { ListEditor, WorkListEditor } from 'src/engine/core/interfaces/dtos/client-dtos/edit-list-dto';
import { WorkDto } from 'src/engine/core/interfaces/dtos/model-dtos/work-dto';
import { Work } from 'src/engine/core/models/work/Work';

const mokWork: WorkDto = {
  name: 'Курение за забором',
  unit: 'шт.',
  price: 5,
  cost: 0,
  norm: 10,
  dateBeginning: new Date(),
  dateEnd: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
};

@Injectable()
export class WorkEditorService {
  list: Work[] = [Work.create(mokWork)];

  act(msg: ListEditor) {
    if ((<WorkListEditor<'add_new_work'>>msg).operation === 'add_new_work') {
      const args = (<WorkListEditor<'add_new_work'>>msg).arguments;
      this.addWork(args.workName, args.dto);
    }

    if ((<WorkListEditor<'remove_work'>>msg).operation === 'remove_work') {
      const args = (<WorkListEditor<'remove_work'>>msg).arguments;
      this.removeWork(args.workName);
    }

    if ((<WorkListEditor<'update_work'>>msg).operation === 'update_work') {
      const args = (<WorkListEditor<'update_work'>>msg).arguments;
      this.updateWork(args.workName, args.dto);
    }
  }

  findWork(workName: string): Work | null {
    const work = this.list.find(
      (w) => w.name.toUpperCase() === workName.toUpperCase(),
    );
    return work || null;
  }

  addWork(workName: string, dto?: Partial<WorkDto>): Work {
    const candidate = this.findWork(workName);
    if (candidate)
      throw new WsException(
        'Работа с таким названием не может быть создана, так как уже существует.',
      );
    const work = new Work(workName);
    this.list.push(work);
    return work.update(dto);
  }

  removeWork(workName: string): boolean {
    const workIndex = this.list.findIndex(
      (w) => w.name.toUpperCase() === workName.toUpperCase(),
    );
    if (workIndex === -1) return false;
    this.list.splice(workIndex, 1);
  }

  updateWork(workName: string, dto: Partial<WorkDto>): Work | null {
    return this.findWork(workName)?.update(dto);
  }

  getList(): Work[] {
    return this.list;
  }
}
