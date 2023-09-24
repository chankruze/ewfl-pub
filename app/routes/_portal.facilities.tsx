import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { Frown } from "lucide-react";

export default function FacilitiesLayout() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="p-4 grid place-items-center space-y-3">
        <Frown className="w-24 h-24 text-red-500" />
        <h1 className="text-3xl font-bold">
          {error.status} - {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className="p-4 grid place-items-center space-y-3">
        <Frown className="w-24 h-24 text-red-500" />
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p>{error.message}</p>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
