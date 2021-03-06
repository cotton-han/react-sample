import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, toDoState } from "../atom";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  width: 300px;
  background-color: ${({ theme }) => theme.boardColor};
  padding-top: 10px;
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface AreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Area = styled.div<AreaProps>`
  background-color: ${({ isDraggingOver, isDraggingFromThis }) =>
    isDraggingOver ? "#dfe6e9" : isDraggingFromThis ? "#b2bec3" : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;

  input {
    width: 100%;
  }
`;

interface BoardProps {
  toDos: ITodo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: BoardProps) {
  const { register, setValue, handleSubmit } = useForm<IForm>();

  const setToDos = useSetRecoilState(toDoState);

  const onSubmit = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => ({ ...allBoards, [boardId]: [newToDo, ...allBoards[boardId]] }));
    setValue("toDo", "");
  };

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("toDo", { required: true })} placeholder={`Add task on ${boardId}`} />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {/* NOTE: ?????? ??????????????? ????????? ?????? */}
            {toDos.map((toDo, index) => (
              // key??? draggableId??? ?????? ???????????????
              <DraggableCard toDo={toDo} key={toDo.id} index={index} />
            ))}
            {/* NOTE: ???????????? ????????? ?????????????????? ?????? */}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
