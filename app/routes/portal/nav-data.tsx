import { Factory, Home, Recycle, Wallet } from "lucide-react";
import type { BottomNavItemProps } from "./bottom-nav-item";
import type { NavItemProps } from "./nav-item";

type NavLinkType = NavItemProps & BottomNavItemProps;

export const navLinks: NavLinkType[] = [
  {
    to: ".",
    label: "Portal",
    icon: Home,
  },
  {
    to: "facilities",
    label: "Facilities",
    icon: Factory,
  },
  {
    to: "tickets",
    label: "Tickets",
    icon: Recycle,
  },
  {
    to: "wallet",
    label: "Wallet",
    icon: Wallet,
  },
];
