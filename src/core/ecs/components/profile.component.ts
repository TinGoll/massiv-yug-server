import { ProfileData } from 'src/core/@types/app.types';
import { Component } from 'yug-entity-component-system';
import { IComponent } from './component-interface';

export class ProfileComponent
  extends Component
  implements IComponent<ProfileData>
{
  data: ProfileData;
  constructor() {
    super(ProfileComponent);
  }
  getData() {
    return this.data;
  }
}
