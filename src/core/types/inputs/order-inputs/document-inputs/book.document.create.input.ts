import { Profile } from 'passport';
import { Color } from 'src/core/modeles/finishing/color/Color';
import { Patina } from 'src/core/modeles/finishing/patina/patina';
import { Varnish } from 'src/core/modeles/finishing/varnish/varnish';
import { Material } from 'src/core/modeles/msterial/Material';
import { Panel } from 'src/core/modeles/panel/Panel';

export interface BookDocumentCreateInput {
  material?: Material;
  profile?: Profile;
  panel?: Panel;
  color?: Color;
  patina?: Patina;
  varnis?: Varnish;
}
