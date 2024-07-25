import { Item } from "../interfaces/item";
import ListItem from "./ListItem";

export default function List({ list }: { list: Item[] }) {
  return (
    <ul>
      {list?.map((item) => (
        <ListItem item={item} key={item.itemName} />
      ))}
    </ul>
  );
}
