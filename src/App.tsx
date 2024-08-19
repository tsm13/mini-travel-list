import { useState } from "react";
import Box from "./components/Box";
import Button from "./components/Button";
import Header from "./components/Header";
import List from "./components/List";
import { useContent } from "./context/ListContext";
import { ListActionType } from "./enums/listActionType";
import { Item } from "./interfaces/item";

function App() {
  const { listToOrganize, listReady, dispatch, setList, t } = useContent();
  const [isNavOpen, setIsNavOpen] = useState(false);

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

  return (
    <>
      <Header isNavOpen={isNavOpen} onSetIsNavOpen={setIsNavOpen} />
      <main
        className={`sm:px-8 text-slate-100 grid place-content-center text-sm ${
          isNavOpen && "blur-sm"
        }`}
      >
        <div className="sm:grid-cols-6 py-8 grid grid-cols-2 gap-x-16 gap-y-12">
          <Box title="Organize">
            <List list={listToOrganize} />
            <Button onClick={handleToggleAllReady} size="medium">
              {t("listFunctions.toggleReady")}
            </Button>
          </Box>
          <Box title="Ready">
            <List list={listReady} />
            <Button onClick={handleResetAllReady} size="medium">
              {t("listFunctions.resetReady")}
            </Button>
          </Box>
        </div>
      </main>
      {isNavOpen && (
        <div
          className="backdrop"
          onClick={() => setIsNavOpen(!isNavOpen)}
        ></div>
      )}
    </>
  );
}

export default App;
