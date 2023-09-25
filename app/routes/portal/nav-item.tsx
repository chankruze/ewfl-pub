import { NavLink } from "@remix-run/react";
import type { LucideIcon } from "lucide-react";
import { cn } from "~/lib/utils";

export type NavItemProps = {
  to: string;
  label: string;
  icon: LucideIcon;
};

export const NavItem = ({ to, label, icon: Icon }: NavItemProps) => {
  return (
    <li className="flex">
      <NavLink
        to={to}
        className={({ isActive, isPending }) =>
          cn(
            "flex flex-1 items-center gap-1.5 rounded-2xl px-4 py-3 font-poppins transition-all duration-300",
            {
              "bg-yellow-400/10 text-yellow-400": isActive,
              "hover:bg-accent/5": !isActive,
              "bg-red-400/10 text-red-400": isPending,
            }
          )
        }
      >
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
        <span>{label}</span>
      </NavLink>
    </li>
  );
};
