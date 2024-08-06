import AddItem from "./AddItem";
import Handle from "./layout/Handle";
import Lower from "./layout/Lower";
import Upper from "./layout/Upper";
import Wheel from "./layout/Wheel";
import TotalItemsReady from "./TotalItemsReady";

export default function Box({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="col-span-2 md:col-span-3 flex flex-col">
      <Handle title={title} />
      <div className="bg-slate-600 rounded-xl px-6 py-4 min-h-[500px] max-w-[340px] grid overflow-x-hidden">
        <div className="flex flex-col gap-4">
          <Upper>
            {title === "Organize" ? <AddItem /> : <TotalItemsReady />}
          </Upper>
          <Lower>{children}</Lower>
        </div>
      </div>
      <div className="flex px-5 justify-between">
        <Wheel />
        <Wheel />
      </div>
    </div>
  );
}
