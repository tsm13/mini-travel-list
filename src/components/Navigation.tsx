import { ChangeEvent, FormEvent, useState } from "react";
import {
  FaFileDownload,
  FaFileUpload,
  FaGithub,
  FaTrashAlt,
} from "react-icons/fa";
import { useContent } from "../context/ListContext";
import { ListActionType } from "../enums/listActionType";
import { Item } from "../interfaces/item";
import Button from "./Button";
import brFlag from "../images/br-flag.png";
import ukFlag from "../images/uk-flag.png";

export default function Navigation({
  isNavOpen,
  setIsNavOpen,
}: {
  isNavOpen: boolean;
  setIsNavOpen: (isNavOpen: boolean) => void;
}) {
  const { dispatch, list, setList, t, i18n } = useContent();
  const [file, setFile] = useState<File>();

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

    const dateNow = new Date()
      .toISOString()
      .replace("T", "_")
      .replaceAll(":", "-")
      .slice(5, 19);
    link.download = `${dateNow}.json`;

    link.click();
    setIsNavOpen(false);
  };

  async function parseJsonFile(file: File): Promise<Item[]> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        if (!event.target) return;
        resolve(JSON.parse(event.target.result as string));
      };
      fileReader.onerror = (error) => reject(error);
      fileReader.readAsText(file);
    });
  }

  const handleImportJSON = async (e: FormEvent<HTMLFormElement>) => {
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
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  const changeLanguage = () => {
    i18n.language !== "pt-BR"
      ? i18n.changeLanguage("pt-BR")
      : i18n.changeLanguage("en");
  };

  return (
    <>
      <ul
        className={`md:flex md:flex-1 md:justify-center md:gap-8 md:items-center text-lg uppercase font-semibold gap-6 ${
          isNavOpen
            ? "bg-slate-500 flex flex-col h-auto w-full absolute z-10 left-0 top-16 border-b-[1px] pb-8 pt-4 px-6"
            : "hidden"
        }`}
      >
        <li className="md:ml-auto hover:text-accent-400">
          <form
            className="md:py-4 md:flex-row md:gap-6 md:w-full flex flex-col gap-4"
            onSubmit={(e) => handleImportJSON(e)}
          >
            <input
              type="file"
              accept=".json"
              onChange={handleChange}
              className="text-base font-normal max-w-[200px]"
            />
            <button type="submit" className="uppercase">
              <span className="flex items-center gap-2">
                <FaFileDownload /> {t("headerOptions.load")}
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
            <FaFileUpload /> {t("headerOptions.export")}
          </span>
        </li>

        <li
          role="button"
          onClick={handleClearList}
          className="md:pb-0 pb-4 hover:text-accent-400"
        >
          <span className="flex items-center gap-2">
            <FaTrashAlt />
            {t("headerOptions.clear")}
          </span>
        </li>

        <li className="md:ml-auto md:gap-1 md:text-sm flex flex-col items-start gap-4 font-semibold normal-case">
          <Button size="textLanguage" onClick={changeLanguage}>
            <img
              src={i18n.language !== "pt-BR" ? brFlag : ukFlag}
              alt="Country Flag"
              className="md:w-[14px] md:h-[14px] w-4 h-4 inline-block mr-2"
            />
            {t("headerOptions.changeLanguage")}
          </Button>

          <a href="https://github.com/tsm13/mini-travel-list">
            <div className="flex items-center gap-2">
              <FaGithub />
              <span className="hover:text-accent-400">
                {t("headerOptions.github")}
              </span>
            </div>
          </a>
        </li>
      </ul>
    </>
  );
}
