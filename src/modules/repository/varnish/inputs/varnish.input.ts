import { VarnishGlossiness, VarnishType } from 'src/core/@types/app.types';

/** Набор полей необходимых для добавления лака */
export class VarnishCreateInput {
  name: string;

  type: VarnishType;

  glossiness?: VarnishGlossiness;
}
/** Набор полей необходимых для обновления лака */
export class VarnishUpdateInput {
  id: number;

  name?: string;

  type?: VarnishType;

  glossiness?: VarnishGlossiness;
}
