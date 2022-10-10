import { ListEditor } from "src/core/types/event-types/list-editor/client/edit-list-actions";
import { InitializingClientTools } from "src/core/types/event-types/init/init-state-dto";

/** Клиент отпарвляет серверу  */
export interface GatewayServerListsListenEvents {
  listEditor: (listObject: ListEditor) => void;
  tools: () => InitializingClientTools;
}