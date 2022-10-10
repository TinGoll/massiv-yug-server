import {
  VarnishType,
  VarnishGlossiness,
} from 'src/core/types/model-types/varnish-type';

export class PatinaUpdateInput {
  id: number;
  name?: string;
  type?: VarnishType;
  glossiness?: VarnishGlossiness;
}
