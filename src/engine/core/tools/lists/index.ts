
import { InitializingClientLists } from "../../interfaces/dtos/server-dtos/init-state-dto";
import { colorList } from "./color-list";


/** Функция получения всех списков. */
const getLists = (): InitializingClientLists => {
  return {
    colors: colorList,
    profiles: [],
    works: [],
    lists: [
      { label: 'Цвет', value: 'colors' },
      { label: 'Профиль', value: 'profiles' },
      { label: 'Работы', value: 'works' },
    ],
  };
};

export default { getLists };