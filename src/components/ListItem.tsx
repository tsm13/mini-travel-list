import { useContent } from "../context/ContentContext";
import { Item } from "../interfaces/item";

export default function ListItem({ item }: { item: Item }) {
  const { setList, list, dispatch } = useContent();

  const updateItemQuantity = (item: Item, op: number) => {
    const filteredItem = list
      .filter((listItem) => listItem.itemName === item.itemName)
      .at(0);

    if (filteredItem.quantity === 1 && op === -1) {
      return setList(list.filter((item) => item !== filteredItem));
    }

    setList(
      list.map((listItem) =>
        listItem.itemName === filteredItem.itemName
          ? { ...listItem, quantity: listItem.quantity + op }
          : listItem
      )
    );
  };

  const handleIncreaseQuantity = () => {
    dispatch({
      type: "changeItemQuantity",
      payload: {
        ...item,
        //quantity: item.quantity++
        quantity: 1,
      },
    });
    updateItemQuantity(item, 1);
  };

  const handleDecreaseQuantity = () => {
    dispatch({
      type: "changeItemQuantity",
      payload: {
        ...item,
        // quantity: item.quantity > 0 && item.quantity--,
        quantity: -1,
      },
    });

    updateItemQuantity(item, -1);
  };

  const handleMoveItem = () => {
    dispatch({ type: "moveItem", payload: item });

    const movedItem = list
      .filter((itemToBeMoved) => itemToBeMoved.itemName === item.itemName)
      .map((item) => {
        return {
          ...item,
          isReady: !item.isReady,
        };
      });

    setList((list) => [
      ...list.filter((listItem) => {
        return listItem.itemName !== item.itemName;
      }),
      ...movedItem,
    ]);
  };

  if (item.quantity <= 0) return;

  return (
    <li className="flex justify-between hover:bg-primary-50">
      <div className="flex justify-between" onClick={handleMoveItem}>
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
