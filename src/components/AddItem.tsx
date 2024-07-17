import { useState } from "react";
import { useContent } from "../context/ContentContext";
import Button from "./Button";
import { useLocalStorageState } from "../hooks/useLocalStorage";

type Props = {};

export default function AddItem({}: Props) {
  const { dispatch, setList } = useContent();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.length < 1) return;
    const newItem = {
      object: inputValue,
      quantity: 1,
      isReady: false,
    };
    dispatch({ type: "addItem", payload: newItem });
    setInputValue("");
    setList((list) => [...list, newItem]);
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></input>
        <button className="bg-accent-500 hover:bg-accent-700 rounded-lg px-3 py-2">
          Add Item
        </button>
      </form>
    </div>
  );
}
