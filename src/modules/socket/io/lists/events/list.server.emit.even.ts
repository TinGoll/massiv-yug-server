import { InitializingClientTools, ClientLog, InitializingClientState } from "src/engine/core/interfaces/dtos/server-dtos/init-state-dto";

export interface GatewayServerListsEmitEvents {
  tools: (data: InitializingClientTools) => void;
  log: (data: ClientLog) => void;
  init: (data: InitializingClientState) => void;
}