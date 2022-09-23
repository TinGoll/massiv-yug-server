import { Color } from "../../modeles/finishing/color/Color";

/********************************************************************** */
/***************** Декларации от Сервера к Клиенту ******************** */
/********************************************************************** */

export interface ServerToClientEvents {
  tools: (data: InitializingClientTools) => void;
  log: (data: ClientLog) => void;
  init: (data: InitializingClientState) => void;
}
