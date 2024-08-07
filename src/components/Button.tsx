interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  size: "small" | "medium" | "large";
}

export default function Button({ children, onClick, size }: Props) {
  const base =
    "inline-block text-base bg-accent-600 hover:bg-accent-700  font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 focus:bg-accent-700 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";

  // add:
  // className="bg-accent-600 hover:bg-accent-700 rounded-lg px-3 text-sm

  const style = {
    small: base + " px-2 py-2 text-xs",
    medium: base + "",
    large:
      base +
      " w-full md:place-self-start md:row-start-2 md:col-start-2 md:col-span-4 col-span-2",
    round: size + " px-2.5 py-1 md:px-3.5 md:py-2 text-sm",
  };

  return (
    <button
      // className="bg-accent-600 hover:bg-accent-700 rounded-lg px-6 py-2 text-base "
      className={`place-self-center inline-block text-base bg-accent-600 hover:bg-accent-500 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 focus:bg-accent-500 focus:outline-none focus:ring focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed ${style[size]}`}
      // className={styles[type]}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
