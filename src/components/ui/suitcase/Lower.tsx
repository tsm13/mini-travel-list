import Zipper from "./Zipper";

export default function Lower({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-500 rounded-lg px-4 py-4 flex flex-col gap-6">
      <Zipper side="end" />
      {children}
    </div>
  );
}
