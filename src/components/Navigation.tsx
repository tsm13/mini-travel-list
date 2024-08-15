import { ChangeEvent, useState } from "react";
import { FaFileDownload, FaFileUpload, FaTrashAlt } from "react-icons/fa";
import { useContent } from "../context/ListContext";
import { ListActionType } from "../enums/listActionType";
import { Item } from "../interfaces/item";

export default function Navigation({
  isNavOpen,
  setIsNavOpen,
}: {
  isNavOpen: boolean;
  setIsNavOpen: (isNavOpen: boolean) => void;
}) {
  const { dispatch, list, setList } = useContent();
  const [file, setFile] = useState();

  const handleClearList = () => {
    dispatch({ type: ListActionType.CLEAR_LIST });
    setList((list: Item[]) => list.slice(0, 0));
    setIsNavOpen(false);
  };

  const handleExportToJSON = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(list)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "list.json";

    link.click();
    setIsNavOpen(false);
  };

  async function parseJsonFile(file: File) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        if (!event.target) return;
        resolve(JSON.parse(event.target.result) as string);
      };
      fileReader.onerror = (error) => reject(error);
      fileReader.readAsText(file);
    });
  }

  const handleImportJSON = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);

    const object = await parseJsonFile(file);
    setList(object);

    dispatch({ type: ListActionType.IMPORT_LIST, payload: object });
    setIsNavOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0]);
  };

  return (
    <ul
      className={`md:flex md:flex-1 md:justify-center md:gap-8 md:items-center text-lg uppercase font-semibold gap-6 ${
        isNavOpen
          ? "bg-slate-500 flex flex-col h-auto w-full absolute z-10 left-0 top-16 border-b-[1px] pb-6 pt-4 px-6"
          : "hidden"
      }`}
    >
      <li className="hover:text-accent-400">
        <form
          className="md:py-4 md:flex-row md:gap-6 md:w-full flex flex-row-reverse justify-end items-center font-base gap-4 flex-wrap"
          onSubmit={handleImportJSON}
        >
          <input
            type="file"
            accept=".json"
            onChange={handleChange}
            className="text-base font-normal max-w-[200px]"
          />
          <button type="submit" className="uppercase">
            <span className="flex items-center gap-2">
              <FaFileDownload /> Load List
            </span>
          </button>
        </form>
      </li>

      <li
        role="button"
        onClick={handleExportToJSON}
        className="hover:text-accent-400"
      >
        <span className="flex items-center gap-2">
          <FaFileUpload /> Export list
        </span>
      </li>

      <li
        role="button"
        onClick={handleClearList}
        className="hover:text-accent-400"
      >
        <span className="flex items-center gap-2">
          <FaTrashAlt />
          Clear list
        </span>
      </li>
    </ul>
  );
}
