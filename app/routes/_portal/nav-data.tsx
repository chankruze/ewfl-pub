import { Compass, Home, Recycle, Wallet } from "lucide-react";
import type { BottomNavItemProps } from "./bottom-nav-item";
import type { NavItemProps } from "./nav-item";

type NavLinkType = NavItemProps & BottomNavItemProps;

export const navLinks: NavLinkType[] = [
  {
    to: ".",
    label: "Home",
    icon: Home,
  },
  {
    to: "recycle",
    label: "Recycle",
    icon: Recycle,
  },
  {
    to: "explore",
    label: "Explore",
    icon: Compass,
  },
  {
    to: "wallet",
    label: "Wallet",
    icon: Wallet,
  },
];
