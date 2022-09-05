import { Profile } from 'src/engine/core/models/profile/Profile';
import { Component } from 'yug-entity-component-system';

interface FasadProfiles {
  left: Profile | null;
  top: Profile | null;
  right: Profile | null;
  bot: Profile | null;
  transverse: Profile[] | null;
}

export class FasadComponent extends Component {
  public type: 'standart' | 'combined' = 'standart';
  
  public profile: FasadProfiles = {
    left: null,
    top: null,
    right: null,
    bot: null,
    transverse: null,
  };
  panels: any[] | null = null;

  constructor() {
    super(FasadComponent);
  }
}
