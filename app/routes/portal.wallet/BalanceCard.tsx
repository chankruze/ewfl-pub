import { Link } from "@remix-run/react";
import type { FC } from "react";

type BalanceCardProps = {
  label: string;
  link: string;
  currency: string;
  balance: number;
};

export const BalanceCard: FC<BalanceCardProps> = ({
  label,
  link,
  balance,
  currency,
}) => {
  return (
    <Link to={`transactions/${link}`}>
      <div className="flex min-w-[200px] flex-col gap-1 rounded-3xl bg-white p-4 shadow-md dark:bg-zinc-950">
        <p className="font-outfit font-medium capitalize text-zinc-500 dark:text-zinc-400">
          {label}
        </p>
        <p className="space-x-1 font-outfit text-2xl font-bold sm:text-3xl">
          <span>{balance}</span>
        </p>
        <p className="text-end text-sm text-zinc-400 dark:text-zinc-500">
          {currency}
        </p>
      </div>
    </Link>
  );
};
