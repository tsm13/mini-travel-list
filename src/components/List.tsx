import { Item } from "../interfaces/item";
import ListItem from "./ListItem";

export default function List({ list }: { list: Item[] }) {
  return (
    <ul className="h-64 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {list?.map((item) => (
        <ListItem item={item} key={item.itemName} />
      ))}
    </ul>
  );
}
