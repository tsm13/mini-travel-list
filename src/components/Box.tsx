import { Item } from "../interfaces/item";

export default function Box({ title, children }: { list: Item[] }) {
  return (
    <div className="bg-primary-200 rounded-md px-8 py-12">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
