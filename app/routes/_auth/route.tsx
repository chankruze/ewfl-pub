import { Outlet } from "@remix-run/react";

export default function auth() {
  return (
    <div className="h-full w-full grid place-content-center">
      <Outlet />
    </div>
  );
}
