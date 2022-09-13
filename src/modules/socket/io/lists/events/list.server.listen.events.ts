import { ListEditor } from "src/engine/core/interfaces/dtos/client-dtos/edit-list-dto";
import { InitializingClientTools } from "src/engine/core/interfaces/dtos/server-dtos/init-state-dto";

export interface GatewayServerListsListenEvents {
  listEditor: (listObject: ListEditor) => void;
  tools: () => InitializingClientTools;
}