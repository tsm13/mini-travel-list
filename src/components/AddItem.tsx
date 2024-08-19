import { FormEvent, useState } from "react";
import { useContent } from "../context/ListContext";
import { ListActionType } from "../enums/listActionType";
import { Item } from "../interfaces/item";
import Button from "./Button";

export default function AddItem() {
  const { dispatch, setList, t } = useContent();
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
      <div className="flex justify-between gap-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="rounded bg-slate-700 px-3 h-8 flex-1 focus:outline-none focus:ring focus:ring-accent-600 focus:ring-offset-1"
          placeholder={t("listFunctions.enter")}
        ></input>
        <Button size="small">{t("listFunctions.add")}</Button>
      </div>
    </form>
  );
}
