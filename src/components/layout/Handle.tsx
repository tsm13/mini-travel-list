export default function Handle({ title }: { title: string }) {
  return (
    <div className="flex px-8 justify-between items-center">
      <span className="w-4 h-16 bg-slate-400"></span>
      <h2 className="text-2xl font-bold">{title}</h2>
      <span className="w-4 h-16 bg-slate-400"></span>
    </div>
  );
}
