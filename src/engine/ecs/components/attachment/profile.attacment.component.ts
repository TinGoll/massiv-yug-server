import { Profile } from 'src/engine/core/models/profile/Profile';
import { Component } from 'yug-entity-component-system';

interface ProfileAttachmentProbs {
  left: Profile | null;
  top: Profile | null;
  right: Profile | null;
  bot: Profile | null;
  cross: Profile[];
}

export class ProfileAttachmentComponent extends Component {
  public profiles: ProfileAttachmentProbs = {
    left: null,
    top: null,
    right: null,
    bot: null,
    cross: [],
  };
  constructor() {
    super(ProfileAttachmentComponent);
  }
}
