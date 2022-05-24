import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDosState } from "../atom";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const setToDos = useSetRecoilState(toDosState);
  const category = useRecoilValue(categoryState);

  const onSubmit = ({ toDo }: IForm) => {
    setToDos((oldTodos) => [{ text: toDo, category, id: Date.now() }, ...oldTodos]);
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("toDo", { required: "Please write a To Do" })} placeholder="Write a to do" />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
