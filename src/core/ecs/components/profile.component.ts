import { ProfileData } from 'src/core/@types/app.types';
import { Component } from 'yug-entity-component-system';
import { IComponent } from './component-interface';

export class ProfileComponent
  extends Component
  implements IComponent<ProfileData>
{
  data: ProfileData = {
    profiles: [],
    workData: [],
  };
  constructor(data: ProfileData) {
    super(ProfileComponent);
    this.data = {...this.data, ...data };
  }
  getData() {
    return this.data;
  }
}
