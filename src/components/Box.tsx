import AddItem from "./AddItem";
import Handle from "./ui/suitcase/Handle";
import Lower from "./ui/suitcase/Lower";
import Upper from "./ui/suitcase/Upper";
import Wheel from "./ui/suitcase/Wheel";
import TotalItemsReady from "./TotalItemsReady";

export default function Box({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="col-span-2 sm:col-span-3 flex flex-col relative box">
      <Handle title={title} />
      <div className="bg-slate-600 rounded-xl px-4 py-4 min-h-[500px] w-[330px] grid overflow-x-hidden">
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
