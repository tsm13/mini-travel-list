import Navigation from "./Navigation";
import Hamburger from "./ui/Hamburger";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useEffect } from "react";

export default function Header({
  isNavOpen,
  onSetIsNavOpen,
}: {
  isNavOpen: boolean;
  onSetIsNavOpen: (isNavOpen: boolean) => void;
}) {
  const isMediumScreen = useMediaQuery("(min-width: 900px)");

  useEffect(() => {
    if (isMediumScreen) onSetIsNavOpen(false);
  }, [isMediumScreen, onSetIsNavOpen]);

  return (
    <header className="md:justify-around md:static md:z-0 bg-slate-500 text-slate-100 sticky z-10 px-6 flex items-center justify-between border-b-[1px] top-0 ">
      <h1 className="text-2xl font-bold uppercase">Mini Travel List</h1>
      <Navigation isNavOpen={isNavOpen} setIsNavOpen={onSetIsNavOpen} />
      <button onClick={() => onSetIsNavOpen(!isNavOpen)}>
        <Hamburger isNavOpen={isNavOpen} />
      </button>
    </header>
  );
}
