interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  dispatchType?: string;
}

export default function Button({ children, onClick }: Props) {
  return (
    <div className="self-center">
      <button
        className="bg-accent-500 hover:bg-accent-700 rounded-lg px-6 py-4"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}
