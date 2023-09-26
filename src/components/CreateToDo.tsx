import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { toDoState } from '../atoms';

interface IForm {
  [key: string]: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);

  const { register, handleSubmit, setValue, formState } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    // console.log('add to do', data.toDo);
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: 'TO_DO' },
      ...oldToDos,
    ]);
    setValue('toDo', '');
  };

  const ERROR = formState.errors.toDo;
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register('toDo', {
          required: 'To do is required!',
          // minLength: {
          //   value: 10,
          //   message: 'To do should be longer',
          // },
        })}
        placeholder='Write a to do'
      />
      <button>Add</button>
      <span>{ERROR?.message}</span>
    </form>
  );
}

export default CreateToDo;
