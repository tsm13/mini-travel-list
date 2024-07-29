import "./App.css";
import Box from "./components/Box";
import List from "./components/List";
import AddItem from "./components/AddItem";
import { useContent } from "./context/ListContext";
import Button from "./components/Button";
import { ListActionType } from "./enums/listActionType";

function App() {
  const { listToOrganize, listReady, dispatch, setList } = useContent();

  const handleToggleAllReady = () => {
    dispatch({ type: ListActionType.TOGGLE_READY });
    setList((list) =>
      list.map((listItem) => {
        return { ...listItem, isReady: true };
      })
    );
  };

  const handleResetAllReady = () => {
    dispatch({ type: ListActionType.RESET_READY });
    setList((list) =>
      list.map((listItem) => {
        return { ...listItem, isReady: false };
      })
    );
  };

  const handleClearList = () => {
    dispatch({ type: ListActionKind.CLEAR_LIST });
    setList((list) => list.slice(0, 0));
  };

  return (
    <div className="grid grid-flow-col gap-4">
      <div>
        <Box title="Organize">
          <AddItem />
          <List list={listToOrganize} />
          <Button onClick={handleToggleAllReady}>Toggle All Ready</Button>
        </Box>
      </div>

      <Box title="Ready">
        <List list={listReady} />
        <Button onClick={handleResetAllReady}>Reset All Ready</Button>
      </Box>
      <Button onClick={handleClearList}>Clear list</Button>
    </div>
  );
}

export default App;
