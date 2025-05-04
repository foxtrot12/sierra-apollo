import { MenuIcon } from "lucide-react";
import { memo } from "react";

function Header() {
  return (
    <nav className="flex w-full h-12 justify-between px-1.5 border-b-2 border-accent">
      <img alt="Sierra Apollo" src="/logoLandscape.png"></img>
      <button className="bg-none border-none cursor-pointer">
        <MenuIcon className="text-accent h-full" />
      </button>
    </nav>
  );
}

export default memo(Header);
