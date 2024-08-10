import { useState } from "react";
import { useContent } from "../context/ListContext";
import { ListActionType } from "../enums/listActionType";
import { Item } from "../interfaces/item";
import Button from "./Button";

export default function Header() {
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
    <header className="bg-slate-500 flex items-center min-h-20 justify-around flex-wrap">
      <form className="flex" onSubmit={handleImportJSON}>
        <input type="file" accept=".json" onChange={handleChange} />
        <Button size="large">Import list</Button>
      </form>

      <Button onClick={handleExportToJSON} size="large">
        Export list
      </Button>

      <Button onClick={handleClearList} size="large">
        Clear list
      </Button>
    </header>
  );
}

// md:place-self-start md:row-start-2 md:col-start-2 md:col-span-4 col-span-2
