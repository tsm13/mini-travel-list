import "./App.css";
import Box from "./components/Box";
import List from "./components/List";
import AddItem from "./components/AddItem";
import { useContent } from "./context/ContentContext";
import Button from "./components/Button";

function App() {
  const { listToOrganize, listReady, dispatch, setList } = useContent();

  const handleToggleAllReady = () => {
    dispatch({ type: "toggleAllReady" });
    setList((list) =>
      list.map((listItem) => {
        return { ...listItem, isReady: true };
      })
    );
  };

  const handleResetAllReady = () => {
    dispatch({ type: "resetAllReady" });
    setList((list) =>
      list.map((listItem) => {
        return { ...listItem, isReady: false };
      })
    );
  };

  const handleClearList = () => {
    dispatch({ type: "clearList" });
    setList((list) => list.slice(0, 0));
  };

  return (
    <div className="grid grid-flow-col gap-4">
      <div>
        <AddItem />
        <Box title="Organize">
          <List list={listToOrganize} />
        </Box>
      </div>
      <Button onClick={handleToggleAllReady}>Toggle All Ready</Button>
      <Button onClick={handleResetAllReady}>Reset All Ready</Button>
      <Box title="Ready">
        <List list={listReady} />
      </Box>
      <Button onClick={handleClearList}>Clear list</Button>
    </div>
  );
}

export default App;
