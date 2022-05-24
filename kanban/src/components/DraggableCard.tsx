import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { ITodo } from "../atom";

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${({ isDragging, theme }) => (isDragging ? "#74b9ff" : theme.cardColor)};
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 5px;
  box-shadow: ${({ isDragging }) => (isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none")};
`;

interface DraggableCardProps {
  toDo: ITodo;
  index: number;
}

function DraggableCard({ toDo, index }: DraggableCardProps) {
  return (
    <Draggable draggableId={toDo.id + ""} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {toDo.text}
        </Card>
      )}
    </Draggable>
  );
}

/* NOTE: 특정 위치에서만 드래그 가능 */

/* <Draggable draggableId="first" index={0}>
    {(provided) => (
      <Card ref={provided.innerRef} {...provided.draggableProps}>
        <span {...provided.dragHandleProps}>💀</span>
        One
      </Card>
    )}
  </Draggable> */

// NOTE: props가 바뀔 경우에만 렌더링되도록 -> 그렇지 않으면 부모의 state가 변경될 때마다 모두 렌더링
// 필요한 경우애만 사용
export default React.memo(DraggableCard);
