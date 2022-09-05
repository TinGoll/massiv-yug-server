import { Profile } from "src/engine/core/models/profile/Profile";
import { Component } from "yug-entity-component-system";

export class ProfileFasadComponent extends Component {
  constructor(
    public readonly leftProfile: Profile | null = null,
    public readonly topProfile: Profile | null = null,
    public readonly rightProfile: Profile | null = null,
    public readonly botProfile: Profile | null = null,
  ) {
    super(ProfileFasadComponent);
  }
}