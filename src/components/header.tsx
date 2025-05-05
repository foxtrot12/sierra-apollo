import { ShoppingCartIcon } from "lucide-react";
import { memo } from "react";

function Header() {
  return (
    <nav
      className="flex w-full h-12 justify-between px-2 
    border-b-2 border-accent"
    >
      <img alt="Sierra Apollo" src="/logoLandscape.png"></img>
      <button className="bg-none border-none cursor-pointer">
        <ShoppingCartIcon className="text-secondary h-full" />
      </button>
    </nav>
  );
}

export default memo(Header);
