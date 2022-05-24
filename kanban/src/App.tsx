import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atom";
import Board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same board movement
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        // 1) Delete item on source.index
        const [deleteToDo] = boardCopy.splice(source.index, 1);

        // 2) Put back the item on the destination.index
        boardCopy.splice(destination.index, 0, deleteToDo);
        return { ...allBoards, [source.droppableId]: boardCopy };
      });
    } else {
      // cross board movement
      setToDos((allBoards) => {
        const sourceBoardCopy = [...allBoards[source.droppableId]];
        const destinationBoardCopy = [...allBoards[destination.droppableId]];
        // 1) Delete item on source.index
        const [deleteToDo] = sourceBoardCopy.splice(source.index, 1);

        // 2) Put back the item on the destination.index
        destinationBoardCopy.splice(destination.index, 0, deleteToDo);
        return { ...allBoards, [source.droppableId]: sourceBoardCopy, [destination.droppableId]: destinationBoardCopy };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board toDos={toDos[boardId]} boardId={boardId} key={boardId} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
