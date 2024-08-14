import Navigation from "./Navigation";
import Hamburger from "./HamburgerButton";

export default function Header({
  isNavOpen,
  onSetIsNavOpen,
}: {
  isNavOpen: boolean;
  onSetIsNavOpen: (isNavOpen: boolean) => void;
}) {
  return (
    <header className="md:justify-around md:static md:z-0 bg-slate-500 sticky z-10 px-6 flex items-center justify-between border-b-[1px] top-0">
      <h1 className="text-2xl font-bold uppercase">Travel List</h1>
      <Navigation
        direction={isNavOpen ? "vertical" : "horizontal"}
        setIsNavOpen={onSetIsNavOpen}
      />
      <button onClick={() => onSetIsNavOpen(!isNavOpen)}>
        <Hamburger isNavOpen={isNavOpen} />
      </button>
    </header>
  );
}
