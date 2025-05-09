import { ShoppingCart } from "lucide-react";
import { memo } from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <nav
      className="flex w-full h-12 justify-between px-2 
    border-b-2 border-accent"
    >
      <img alt="Sierra Apollo" src="/logoLandscape.png"></img>
      <button className="bg-none border-none cursor-pointer">
        <NavLink to={"/cart"} className="border-none bg-none">
        <ShoppingCart className="text-secondary h-full" />
        </NavLink>
      </button>
    </nav>
  );
}

export default memo(Header);
