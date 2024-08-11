import { RxHamburgerMenu } from "react-icons/rx";
import { IconContext } from "react-icons";
import Navigation from "./Navigation";
import { useState } from "react";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className="bg-slate-500 px-6 flex items-center justify-end md:justify-around border-b-[1px]">
      <div className="hidden md:flex md:flex-1 md:justify-center">
        <Navigation direction="horizontal" />
      </div>
      <IconContext.Provider
        value={{ color: "white", size: "2em", className: "md:hidden min-h-16" }}
      >
        <button onClick={() => setIsNavOpen(!isNavOpen)}>
          <RxHamburgerMenu />
        </button>
      </IconContext.Provider>
    </header>
  );
}

// md:place-self-start md:row-start-2 md:col-start-2 md:col-span-4 col-span-2
