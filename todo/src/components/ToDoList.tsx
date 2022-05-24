import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector } from "../atom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => setCategory(event.currentTarget.value as any);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

// ----------------------------------------

// interface IForm {
//   toDo: string;
//   extraError?: string;
// }

// function ToDoList() {
//   const {
//     register,
//     watch,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm<IForm>({
//     defaultValues: {}, // 기본값 지정
//   });

//   const onSubmit = (data: IForm) => {
//     // NOTE: 비밀번호, 비밀번호 확인 같은 경우 (포커스 이동까지)
//     // if (data.password !== data.passwordConfirm) {
//     //   setError("toDo", { message: "비밀번호가 같지 않습니다." }, { shouldFocus: true });
//     // }
//     // NOTE: 서버에서 에러가 발생한 경우 특정 input이 아닌 전체 form에 대한 에러 설정하는 방법
//     setError("extraError", { message: "서버에서 에러가 발생했습니다." });
//   };

//   return (
//     <div>
//       <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onSubmit)}>
//         <input
//           {...register("toDo", {
//             required: "ToDo is required.",
//             minLength: { value: 10, message: "ToDo is too short." },
//             pattern: {
//               value: /^[A-Za-z0-9._%+-]+@naver.com$/, // 네이버 이메일만 가능하도록
//               message: "Only naver.com emails allowed",
//             },
//             validate: {
//               noExample: (value) => (value.includes("example") ? "no example allowed" : true), // example을 포함한다면 "type: validate" error 발생 (문자열을 반환하면 에러 메시지)
//               noTest: (value) => (value.includes("test") ? "no test allowed" : true), // 여러 validate를 적어줄 수도 있다.
//               noDuplicate: async (value) => true, // 서버에 요청을 보내는 검증을 적어줄 수 있다.
//             },
//           })}
//           placeholder="Write a to do"
//         />
//         <span>{errors?.toDo?.message}</span>
//         <button>Add</button>
//         <span>{errors?.extraError?.message}</span>
//       </form>
//     </div>
//   );
// }

export default ToDoList;
