import { useContent } from "../context/ContentContext";

type Props = {};

export default function ListItem({ item }: Props) {
  const { dispatch } = useContent();
  if (item.quantity <= 0) return;
  return (
    <li className="flex justify-between hover:bg-primary-50">
      <div
        className="flex justify-between"
        onClick={() => dispatch({ type: "moveItem", payload: item })}
      >
        <span>{item.object}</span>
        <span>{item.quantity}</span>
      </div>
      {item.isReady === false && (
        <>
          <button
            onClick={() =>
              dispatch({
                type: "changeItemQuantity",
                payload: { ...item, quantity: item.quantity++ },
              })
            }
          >
            +
          </button>
          <button
            onClick={() =>
              dispatch({
                type: "changeItemQuantity",
                payload: {
                  ...item,
                  quantity: item.quantity > 0 && item.quantity--,
                },
              })
            }
          >
            -
          </button>
        </>
      )}
    </li>
  );
}
