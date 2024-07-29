export default function Box({
  title,
  children,
}: {
  title: string;
  children: React.ReactElement;
}) {
  return (
    <div className="bg-primary-200 rounded-md px-8 py-12 flex flex-col gap-4">
      <h2 className="self-start">{title}</h2>
      {children}
    </div>
  );
}
