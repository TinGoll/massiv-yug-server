import { InitializingClientTools, ClientLog, InitializingClientState } from "src/core/types/event-types/init/init-state-dto";

export interface GatewayServerListsEmitEvents {
  tools: (data: InitializingClientTools) => void;
  log: (data: ClientLog) => void;
  init: (data: InitializingClientState) => void;
}