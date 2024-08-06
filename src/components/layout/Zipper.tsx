export default function Zipper({ side }: { side: string }) {
  return (
    <div
      className={`bg-slate-800 w-full h-3 rounded-full flex justify-${side}`}
    >
      <span className="bg-slate-300 rounded-full w-8 h-3 block"></span>
    </div>
  );
}
