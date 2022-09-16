import { InitializingClientTools } from "src/engine/core/interfaces/dtos/server-dtos/init-state-dto";
import listTool from "./lists";

export const getTools = (): InitializingClientTools | any => {
    const lists = listTool.getLists();
    // Превращаем согласно интерфесу
  
    return {
      lists: lists,
    };
}