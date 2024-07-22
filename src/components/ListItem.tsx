import { useContent } from "../context/ContentContext";
import { useLocalStorageState } from "../hooks/useLocalStorage";

type Props = {};

export default function ListItem({ item }: Props) {
  const { list, setList } = useContent();

  const handleIncreaseQuantity = () => {
    dispatch({
      type: "changeItemQuantity",
      payload: { ...item, quantity: item.quantity++ },
    });
    updateItem(item);
  };

  const handleDecreaseQuantity = () => {
    dispatch({
      type: "changeItemQuantity",
      payload: {
        ...item,
        quantity: item.quantity > 0 && item.quantity--,
      },
    });
    updateItem(item);
    if (item.quantity <= 0) removeItem(item);
  };

  const updateItem = (item) => {
    const items = JSON.parse(localStorage.getItem("list"));
    const updatedList = items.map((listItem) => {
      listItem.quantity = item.quantity;
      return listItem;
    });
    setList(updatedList);
    console.log(list);
  };

  const removeItem = (item) => {
    const items = JSON.parse(localStorage.getItem("list"));
    const filteredList = items.filter(
      (listItem) => listItem.object !== item.object
    );
    setList(filteredList);
  };

  const { dispatch } = useContent();
  if (item.quantity <= 0) return;
  return (
    <li className="flex justify-between hover:bg-primary-50">
      <div
        className="flex justify-between"
        onClick={() => dispatch({ type: "moveItem", payload: item })}
      >
        <span>{item.itemName}</span>
        <span>{item.quantity}</span>
      </div>
      {item.isReady === false && (
        <>
          <button onClick={handleIncreaseQuantity}>+</button>
          <button onClick={handleDecreaseQuantity}>-</button>
        </>
      )}
    </li>
  );
}
