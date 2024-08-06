export default function SmallButton({
  children,
  onClickFn,
  type,
}: {
  children: string;
  onClickFn: () => void;
  type?: string;
}) {
  return (
    <button
      className={`rounded-full flex py-0.5 px-2 ${
        type === "del" ? "bg-red-500 hover:bg-red-700" : ""
      }`}
      onClick={onClickFn}
    >
      {children}
    </button>
  );
}
