import { Link } from "@remix-run/react";
import { NoDataSvg } from "./no-data-svg";

export const NoTickets = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <NoDataSvg height="36" width="36" />
      <p className="text-gray-600 text-lg">You don't have any tickets yet.</p>
      <Link
        to="/facilities"
        className="capitalize  bg-yellow-500 text-white duration-200 transition-all hover:bg-yellow-600 font-medium py-2 px-4 rounded"
      >
        see facilities nearby
      </Link>
    </div>
  );
};
