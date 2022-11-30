/**'Акриловый' | 'Полиуретановый'; */

import { VarnishCreateInput } from 'src/modules/repository/varnish/inputs/varnish.input';

export const createdMigrateVarnishes: Array<VarnishCreateInput> = [
  {
    name: 'Акриловый',
    type: 'Акриловый',
    glossiness: '40%',
  },
  {
    name: 'Полиуретановый',
    type: 'Полиуретановый',
    glossiness: '40%',
  },
];
