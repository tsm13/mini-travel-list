import { useContent } from "../context/ListContext";

export default function TotalItemsReady() {
  const { listReady, t } = useContent();
  const numReadyItems = listReady.length;
  return (
    <div className="text-xl font-medium text-center">
      <span className="text-accent-400 font-bold">{numReadyItems}</span>{" "}
      {numReadyItems === 1
        ? t("listFunctions.itemsReady_one", { count: 1 })
        : t("listFunctions.itemsReady_other", { count: 0 })}
    </div>
  );
}
