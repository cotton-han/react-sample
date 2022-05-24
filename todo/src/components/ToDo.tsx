import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDosState } from "../atom";

function ToDo({ text, category, id }: IToDo) {
  // NOTE: 첫 번째 방법 -> 이 방법을 더 권장 as any 때문에
  // const onClick = (newCategory: IToDo["category"]) => {}; // NOTE: typescript tip
  // onClick={() => onClick("TO_DO")}

  const setToDos = useSetRecoilState(toDosState);

  // NOTE: 두 번째 방법
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // NOTE: 첫 번째 방법
    // setToDos((oldToDos) => {
    //   const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
    //   const newToDo = { text, id, category: event.currentTarget.name as any };
    //   return [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex + 1)];
    // });
    // NOTE: 두 번째 방법 -> 내가 생각한 방법
    setToDos((oldToDos) =>
      oldToDos.map((toDo) => (toDo.id === id ? { text, id, category: event.currentTarget.name as any } : toDo))
    );
  };

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
