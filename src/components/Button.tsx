interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  size:
    | "small"
    | "medium"
    | "large"
    | "smallBlack"
    | "smallRed"
    | "textLanguage";
}

export default function Button({ children, onClick, size }: Props) {
  const base =
    "text-base bg-accent-600 hover:bg-accent-500 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 disabled:cursor-not-allowed rounded-lg focus:bg-accent-500 focus:outline-none focus:ring focus:ring-accent-600 focus:ring-offset-1";

  const baseSmall =
    " text-slate-300 rounded-full w-6 h-6 flex place-content-center border border-slate-300 active:translate-y-0.5 transition-transform duration-400";

  const style = {
    small: base + " px-2 py-1.5 text-xs font-bold",
    medium: base + " py-2.5 px-4 place-self-center text-sm sm:text-base",
    large: base + " py-3 px-5 text-sm sm:text-base",
    smallBlack: baseSmall + " font-normal bg-slate-800",
    smallRed:
      baseSmall +
      " text-slate-950 text-sm bg-red-500 active:bg-red-600 font-bold",
    textLanguage: " hover:text-accent-400",
  };

  return (
    <button className={`${style[size]}`} onClick={onClick}>
      {children}
    </button>
  );
}
