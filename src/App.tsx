import "./App.css";
import Box from "./components/Box";
import List from "./components/List";
import AddItem from "./components/AddItem";
import { useContent } from "./context/ContentContext";
import ToggleButton from "./components/ToggleButton";
import { useLocalStorageState } from "./hooks/useLocalStorage";

function App() {
  const { list, listA, listB } = useContent();

  return (
    <div className="grid grid-flow-col gap-4">
      <div>
        <AddItem />
        <Box title="Organize">
          <List list={list} />
        </Box>
      </div>
      <ToggleButton />
      <Box title="Ready">
        <List list={listB} />
      </Box>
    </div>
  );
}

export default App;
