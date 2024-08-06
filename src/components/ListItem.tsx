import { useContent } from "../context/ListContext";
import { ListActionType } from "../enums/listActionType";
import { Item } from "../interfaces/item";
import SmallButton from "./SmallButton";

export default function ListItem({ item }: { item: Item }) {
  const { setList, list, dispatch } = useContent();

  const removeItem = (itemToRemove: Item) => {
    setList(list.filter((item) => item.itemName !== itemToRemove.itemName));
  };

  const updateItemQuantity = (item: Item, op: number) => {
    const filteredItem: Item = list.filter(
      (listItem) => listItem.itemName === item.itemName
    )[0];

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

    setList((list: Item[]) => [
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
    <li className="flex justify-between py-2.5 px-1 hover:bg-slate-400">
      <div className="flex grow " onClick={handleMoveItem}>
        <span>{item.itemName}</span>
      </div>

      <div className="flex justify-between gap-2">
        {item.isReady === false && (
          <>
            <SmallButton onClickFn={handleIncreaseQuantity}>+</SmallButton>
            <span>{item.quantity}</span>
            <SmallButton onClickFn={handleDecreaseQuantity}>-</SmallButton>
          </>
        )}
        <SmallButton type="del" onClickFn={handleRemoveItem}>
          &times;
        </SmallButton>
      </div>
    </li>
  );
}
