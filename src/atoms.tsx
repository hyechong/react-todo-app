import { atom, selector } from 'recoil';
// atom은 단순히 배열을 준다. selector는 atom의 output을 변형시킨다.
export interface IToDo {
  text: string;
  id: number;
  category: 'TO_DO' | 'DOING' | 'DONE';
}

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    //get function을 이용하면 selector의 내부로 atom을 가지고 올 수 있다
    const toDos = get(toDoState);
    return [
      toDos.filter((toDo) => toDo.category === 'TO_DO'),
      toDos.filter((toDo) => toDo.category === 'DOING'),
      toDos.filter((toDo) => toDo.category === 'DONE'),
    ];
  },
});
