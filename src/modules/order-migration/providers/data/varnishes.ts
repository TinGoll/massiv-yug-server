/**'Акриловый' | 'Полиуретановый'; */

import { VarnisCreateInput } from "src/modules/repository/finishing/document-varnish/inputs/varnish-create.input";

export const createdMigrateVarnishes: Array<VarnisCreateInput> = [
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
