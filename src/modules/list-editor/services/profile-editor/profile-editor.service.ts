import { Injectable } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import {
  ListEditor,
  ProfileListEditor,
} from "src/core/types/event-types/list-editor/client/edit-list-actions";
import { ProfileDto } from "src/core/types/dtos/profile-dto/profile-dto";
import { Profile } from "src/core/modeles/profile/Profile";

const mokProfile: ProfileDto = {
  name: "Пётр",
  profileWidth: 80,
  depth: 20,
  assemblyAngle: 90,
  grooveThickness: 5,
  grooveDepth: 10,
  chamferSize: 12,
  tenonSize: 15,
  bottomShelfThickness: 20,
};

@Injectable()
export class ProfileEditorService {
  list: Profile[] = [Profile.create(mokProfile)];

  act(msg: ListEditor) {
    if (
      (<ProfileListEditor<"add_new_profile">>msg).operation ===
      "add_new_profile"
    ) {
      const args = (<ProfileListEditor<"add_new_profile">>msg).arguments;
      this.add(args.profileName, args.dto);
    }
    if (
      (<ProfileListEditor<"remove_profile">>msg).operation === "remove_profile"
    ) {
      const args = (<ProfileListEditor<"remove_profile">>msg).arguments;
      this.remove(args.profileName);
    }
    if (
      (<ProfileListEditor<"update_profile">>msg).operation === "update_profile"
    ) {
      const args = (<ProfileListEditor<"update_profile">>msg).arguments;
      this.update(args.profileName, args.dto);
    }
  }

  find(profileName: string): Profile | null {
    const profile = this.list.find(
      (w) => w.name.toUpperCase() === profileName.toUpperCase()
    );
    return profile || null;
  }

  add(profileName: string, dto?: Partial<ProfileDto>): Profile {
    const candidate = this.find(profileName);
    if (candidate)
      throw new WsException(
        "Работа с таким названием не может быть создана, так как уже существует."
      );
    const profile = new Profile(profileName);
    this.list.push(profile);
    return profile.update(dto);
  }

  remove(profileName: string): boolean {
    const profileIndex = this.list.findIndex(
      (w) => w.name.toUpperCase() === profileName.toUpperCase()
    );
    if (profileIndex === -1) return false;
    this.list.splice(profileIndex, 1);
  }

  update(profileName: string, dto: Partial<ProfileDto>): Profile | null {
    return this.find(profileName)?.update(dto);
  }

  getList(): Profile[] {
    return this.list;
  }
}
