import Box from "./components/Box";
import List from "./components/List";
import { useContent } from "./context/ListContext";
import Button from "./components/Button";
import { ListActionType } from "./enums/listActionType";
import { Item } from "./interfaces/item";

function App() {
  const { listToOrganize, listReady, dispatch, setList } = useContent();

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

  return (
    <main className="grid h-full">
      <div className="py-8 grid grid-cols-2 md:grid-cols-6  gap-x-16 gap-y-12">
        <Box title="Organize">
          <List list={listToOrganize} />
          <Button onClick={handleToggleAllReady} type="medium">
            Toggle All Ready
          </Button>
        </Box>

        <Box title="Ready">
          <List list={listReady} />
          <Button onClick={handleResetAllReady} type="medium">
            Reset All Ready
          </Button>
        </Box>

        <Button onClick={handleClearList} type="large">
          Clear list
        </Button>
      </div>
    </main>
  );
}

export default App;
