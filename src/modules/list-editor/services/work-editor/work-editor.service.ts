import { Injectable } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import {
  ListEditor,
  WorkListEditor,
} from "src/core/types/event-types/list-editor/client/edit-list-actions";
import { WorkDto } from "src/core/types/dtos/work-dto/work-dto";
import { Work } from "src/core/modeles/work/Work";
import { UpdateWorkInput } from "src/modules/repository/work/inputs/update-work.input";
import { WorkService } from "src/modules/repository/work/services/work/work.service";

@Injectable()
export class WorkEditorService {
  list: Work[] = [];

  constructor(private readonly workService: WorkService) {}

  async act(msg: ListEditor) {
    if ((<WorkListEditor<"add_new_work">>msg).operation === "add_new_work") {
      const args = (<WorkListEditor<"add_new_work">>msg).arguments;
      await this.addWork(args.workName, args.dto);
    }

    if ((<WorkListEditor<"remove_work">>msg).operation === "remove_work") {
      const args = (<WorkListEditor<"remove_work">>msg).arguments;
      await this.removeWork(args.workName);
    }

    if ((<WorkListEditor<"update_work">>msg).operation === "update_work") {
      const args = (<WorkListEditor<"update_work">>msg).arguments;
      await this.updateWork(args.workName, args.dto);
    }

    await this.load();
  }

  async load(): Promise<void> {
    const works = await this.findAll();
    this.list = works;
  }

  async findWork(workName: string): Promise<Work | null> {
    const workEntity = await this.workService.getOneByName(workName);
    if (!workEntity) return null;
    const work = Work.define(workEntity);
    return work || null;
  }

  async findAll(): Promise<Work[]> {
    const entityWorks = await this.workService.getAll();
    const works = entityWorks.map((e) => Work.define(e));
    return works;
  }

  async addWork(workName: string, dto?: Partial<WorkDto>): Promise<Work> {
    const candidate = await this.findWork(workName);
    if (candidate)
      throw new WsException(
        "Работа с таким названием не может быть создана, так как уже существует."
      );
    const workDto = new Work(workName).update(dto).getDto();
    const workEntity = await this.workService.crate(workDto);
    await this.load();
    return Work.define(workEntity);
  }

  async removeWork(workName: string): Promise<boolean> {
    await this.workService.removeByName(workName);
    await this.load();
    return true;
  }

  async updateWork(
    workName: string,
    dto: Partial<WorkDto>
  ): Promise<Work | null> {
    const work = await this.findWork(workName);
    const workDto = work.update(dto).getDto();
    const workEntity = await this.workService.update(
      workDto as UpdateWorkInput
    );
    await this.load();
    return Work.define(workEntity);
  }

  getList(): Work[] {
    return this.list;
  }
}
