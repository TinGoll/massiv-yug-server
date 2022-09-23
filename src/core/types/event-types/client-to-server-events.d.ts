
/********************************************************************** */
/***************** Декларации от Клиента к Серверу ******************** */
/********************************************************************** */

import { ListEditor } from "./list-editor/client/edit-list-actions";

export interface ClientToServerEvents {
  listEditor: (listObject: ListEditor) => void;
  tools: () => InitializingClientTools;
}
