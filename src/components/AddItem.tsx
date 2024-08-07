import { FormEvent, useState } from "react";
import { useContent } from "../context/ListContext";
import { ListActionType } from "../enums/listActionType";
import { Item } from "../interfaces/item";
import Button from "./Button";

export default function AddItem() {
  const { dispatch, setList } = useContent();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.length < 1) return;
    const newItem = {
      itemName: inputValue,
      quantity: 1,
      isReady: false,
    };
    dispatch({ type: ListActionType.ADD_ITEM, payload: newItem });
    setList((list: Item[]) => [...list, newItem]);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="rounded bg-slate-700 px-2 h-7"
          placeholder="Enter item name here"
        ></input>
        <Button size="small">Add</Button>
      </div>
    </form>
  );
}
