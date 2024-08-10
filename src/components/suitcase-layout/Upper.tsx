import Zipper from "./Zipper";

export default function Upper({ children }: { children: React.ReactElement }) {
  return (
    <div className="bg-slate-500 rounded-lg px-4 py-4 flex flex-col gap-4">
      <Zipper side="start" />
      <span className="">{children}</span>
    </div>
  );
}
