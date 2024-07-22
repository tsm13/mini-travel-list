import "./App.css";
import Box from "./components/Box";
import List from "./components/List";
import AddItem from "./components/AddItem";
import { useContent } from "./context/ContentContext";
import ToggleButton from "./components/ToggleButton";
import Button from "./components/Button";

function App() {
  const { list, dispatch } = useContent();
  console.log(list);
  const toOrganizeList = list.filter((item) => !item.isReady);
  const readyList = list.filter((item) => item.isReady);

  return (
    <div className="grid grid-flow-col gap-4">
      <div>
        <AddItem />
        <Box title="Organize">
          <List list={toOrganizeList} />
        </Box>
      </div>
      <Button onClick={() => dispatch({ type: "toggleAll" })}>
        Toggle All Ready
      </Button>
      <Button onClick={() => dispatch({ type: "reset" })}>
        Reset All Ready
      </Button>
      <Box title="Ready">
        <List list={readyList} />
      </Box>
    </div>
  );
}

export default App;
