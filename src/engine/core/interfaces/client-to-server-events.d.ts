
/********************************************************************** */
/***************** Декларации от Клиента к Серверу ******************** */
/********************************************************************** */

import { ListEditor } from "./dtos/client-dtos/edit-list-dto";

export interface ClientToServerEvents {
  listEditor: (listObject: ListEditor) => void;
  tools: () => InitializingClientTools;
}
