import ListItem from "./ListItem";

export default function List({ list }: Props) {
  return (
    <ul>
      {list.map((item) => (
        <ListItem item={item} key={item.itemName} />
      ))}
    </ul>
  );
}
