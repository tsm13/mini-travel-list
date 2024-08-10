import { useState } from "react";
import { useContent } from "../context/ListContext";
import { ListActionType } from "../enums/listActionType";
import Button from "./Button";
import { Item } from "../interfaces/item";

export default function Navigation() {
  const { dispatch, list, setList } = useContent();
  const [file, setFile] = useState();

  const handleClearList = () => {
    dispatch({ type: ListActionType.CLEAR_LIST });
    setList((list: Item[]) => list.slice(0, 0));
  };

  const handleExportToJSON = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(list)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "list.json";

    link.click();
  };

  async function parseJsonFile(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = (event) => resolve(JSON.parse(event.target.result));
      fileReader.onerror = (error) => reject(error);
      fileReader.readAsText(file);
    });
  }

  const handleImportJSON = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);

    const object = await parseJsonFile(file);
    setList(object);

    dispatch({ type: ListActionType.IMPORT_LIST, payload: object });
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <ul className="flex uppercase justify-center items-center font-semibold text-lg gap-8">
      <li className="hover:text-accent-400">
        <form
          className="flex items-center py-4 gap-4 font-base"
          onSubmit={handleImportJSON}
        >
          <input
            type="file"
            accept=".json"
            onChange={handleChange}
            className="text-base font-normal"
          />
          <button type="submit" className="uppercase">
            Import list
          </button>
        </form>
      </li>

      <li
        role="button"
        onClick={handleExportToJSON}
        className="hover:text-accent-400"
      >
        Export list
      </li>

      <li
        role="button"
        onClick={handleClearList}
        className="hover:text-accent-400"
      >
        Clear list
      </li>
    </ul>
  );
}
