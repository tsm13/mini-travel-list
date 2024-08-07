import Box from "./components/Box";
import List from "./components/List";
import { useContent } from "./context/ListContext";
import Button from "./components/Button";
import { ListActionType } from "./enums/listActionType";
import { Item } from "./interfaces/item";
import { useState } from "react";

function App() {
  const { listToOrganize, listReady, dispatch, list, setList } = useContent();

  const handleToggleAllReady = () => {
    dispatch({ type: ListActionType.TOGGLE_READY });
    setList((list: Item[]) =>
      list.map((listItem) => {
        return { ...listItem, isReady: true };
      })
    );
  };

  const handleResetAllReady = () => {
    dispatch({ type: ListActionType.RESET_READY });
    setList((list: Item[]) =>
      list.map((listItem) => {
        return { ...listItem, isReady: false };
      })
    );
  };

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

  const [file, setFile] = useState();
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <main className="grid h-full">
      <div className="py-8 grid grid-cols-2 md:grid-cols-6  gap-x-16 gap-y-12">
        <Box title="Organize">
          <List list={listToOrganize} />
          <Button onClick={handleToggleAllReady} size="medium">
            Toggle All Ready
          </Button>
        </Box>
        <Box title="Ready">
          <List list={listReady} />
          <Button onClick={handleResetAllReady} size="medium">
            Reset All Ready
          </Button>
        </Box>
        {/* /// this outer div */}
        <div className="md:place-self-start md:row-start-2 md:col-start-2 md:col-span-4 col-span-2">
          <Button onClick={handleClearList} size="large">
            Clear list
          </Button>
          <Button onClick={handleExportToJSON} size="large">
            Export list
          </Button>

          <form className="flex" onSubmit={handleImportJSON}>
            <input type="file" accept=".json" onChange={handleChange} />
            <Button size="large">Import list</Button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default App;
