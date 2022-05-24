import { atom, selector } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

// 확장성을 위해 -> 추후에 보드가 추가될 여지가 있음
interface IToDoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
});
