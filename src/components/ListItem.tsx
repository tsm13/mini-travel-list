import { useContent } from "../context/ListContext";
import { ListActionType } from "../enums/listActionType";
import { Item } from "../interfaces/item";

export default function ListItem({ item }: { item: Item }) {
  const { setList, list, dispatch } = useContent();

  const removeItem = (itemToRemove: Item) => {
    setList(list.filter((item) => item.itemName !== itemToRemove.itemName));
  };

  const updateItemQuantity = (item: Item, op: number) => {
    const filteredItem: Item = list
      .filter((listItem) => listItem.itemName === item.itemName)
      .at(0);

    if (filteredItem.quantity === 1 && op === -1) {
      return removeItem(filteredItem);
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
      type: ListActionType.CHANGE_QUANTITY,
      payload: {
        ...item,
        quantity: 1,
      },
    });
    updateItemQuantity(item, 1);
  };

  const handleDecreaseQuantity = () => {
    dispatch({
      type: ListActionType.CHANGE_QUANTITY,
      payload: {
        ...item,
        quantity: -1,
      },
    });
    updateItemQuantity(item, -1);
  };

  const handleMoveItem = () => {
    dispatch({ type: ListActionType.MOVE_ITEM, payload: item });

    const moveItem = list
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
      ...moveItem,
    ]);
  };

  const handleRemoveItem = () => {
    dispatch({ type: ListActionType.REMOVE_ITEM, payload: item });
    removeItem(item);
  };

  if (item.quantity <= 0) return;

  return (
    <li className="flex justify-between hover:bg-primary-50">
      <div className="flex grow justify-between" onClick={handleMoveItem}>
        <span>{item.itemName}</span>
        <span>{item.quantity}</span>
      </div>
      {item.isReady === false && (
        <>
          <button onClick={handleIncreaseQuantity}>+</button>
          <button onClick={handleDecreaseQuantity}>-</button>
          <button onClick={handleRemoveItem}>&times;</button>
        </>
      )}
    </li>
  );
}
