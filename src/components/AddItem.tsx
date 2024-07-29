import { useState } from "react";
import { useContent } from "../context/ListContext";

export default function AddItem() {
  const { dispatch, setList } = useContent();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.length < 1) return;
    const newItem = {
      itemName: inputValue,
      quantity: 1,
      isReady: false,
    };
    dispatch({ type: "addItem", payload: newItem });
    setList((list) => [...list, newItem]);
    setInputValue("");
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          ></input>
          <button className="bg-accent-500 hover:bg-accent-700 rounded-lg px-3 py-2 text-sm">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
