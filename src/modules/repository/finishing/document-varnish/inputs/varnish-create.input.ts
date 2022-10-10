import {
  VarnishGlossiness,
  VarnishType,
} from 'src/core/types/model-types/varnish-type';

export class VarnisCreateInput {
  name: string;
  type: VarnishType;
  glossiness: VarnishGlossiness;
}
