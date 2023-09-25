import { getAuth } from "@clerk/remix/ssr.server";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { PiggyBank, Upload } from "lucide-react";
import { SITE_DESCRIPTION, SITE_TITLE } from "~/consts";
import { getWalletByUserId } from "~/controllers/wallet.server";
import { BalanceCard } from "./BalanceCard";
import { WalletActionLink } from "./wallet-action-link";

export const meta: MetaFunction = () => {
  return [
    { title: `Wallet / ${SITE_TITLE}` },
    {
      property: "og:title",
      content: `Wallet / ${SITE_TITLE}`,
    },
    { name: "description", content: SITE_DESCRIPTION },
  ];
};

export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);

  if (!userId) return redirect("/sign-in");

  const _wallet = await getWalletByUserId(userId);

  console.log({ _wallet });

  if (_wallet) {
    const total = _wallet.earned + _wallet.referred - _wallet.withdrawn;

    return json({
      ..._wallet,
      total: total.toFixed(2),
    });
  }

  return json({
    error: "Unable to fetch wallet details",
  });
};

export default function WalletLayout() {
  const wallet = useLoaderData<typeof loader>();

  return (
    <div className="mx-auto grid place-items-center gap-4 overflow-x-hidden p-[5vw] sm:py-6">
      {/* total balance */}
      <div className="w-full space-y-1 text-center">
        <p className="font-outfit text-lg font-medium capitalize text-zinc-500 dark:text-zinc-400 sm:text-xl">
          Net Balance
        </p>
        <h1 className="font-outfit text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
          <span>{wallet.total}</span>
        </h1>
        <h2 className="text-xl text-zinc-500 dark:text-zinc-400 sm:text-2xl">
          {wallet.currency}
        </h2>
      </div>
      {/* balance distributions */}
      <div className="flex w-full gap-2 overflow-x-auto pb-3 sm:justify-center">
        {/* deposits card */}
        <BalanceCard
          label="Earned"
          link="earned"
          balance={wallet.earned.toFixed(2)}
          currency={wallet.currency}
        />
        {/* referral card */}
        <BalanceCard
          label="Referrals"
          link="referrals"
          balance={wallet.referred.toFixed(2)}
          currency={wallet.currency}
        />
        {/* withdrawn card */}
        <BalanceCard
          label="Withdrawn"
          link="withdrawal"
          balance={wallet.withdrawn.toFixed(2)}
          currency={wallet.currency}
        />
      </div>
      {/* actions */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <WalletActionLink label="Withdraw" icon={Upload} to="withdraw" />
        <WalletActionLink
          label="Transactions"
          icon={PiggyBank}
          to="transactions"
        />
      </div>
      <Outlet />
    </div>
  );
}
