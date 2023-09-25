import { Link } from "@remix-run/react";
import type { LucideIcon } from "lucide-react";
import type { FC } from "react";

type WalletActionLinkProps = {
  label: string;
  icon: LucideIcon;
  to: string;
};

export const WalletActionLink: FC<WalletActionLinkProps> = ({
  label,
  icon: Icon,
  to,
}) => {
  return (
    <Link to={to}>
      <div className="flex items-center gap-1 rounded-3xl bg-blue-600 px-6 py-3 font-outfit text-white">
        {Icon ? <Icon className="h-6 w-6" /> : null}
        <p className="capitalize hidden sm:block">{label}</p>
      </div>
    </Link>
  );
};
