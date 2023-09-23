import { ClerkApp, ClerkErrorBoundary } from "@clerk/remix";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import { cssBundleHref } from "@remix-run/css-bundle";
import { type LinksFunction, type LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import stylesheet from "~/globals.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@800;900&family=Outfit:wght@400;500;600;700;900&family=Poppins:ital,wght@0,200;0,400;0,500;0,700;1,100&family=Roboto+Mono&family=Roboto:wght@400;500;700;900&display=swap",
  },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = (args: LoaderFunctionArgs) => rootAuthLoader(args);

const RootErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <html>
        <head>
          <title>Oops!</title>
          <Meta />
          <Links />
        </head>
        <body className="h-full w-full grid place-content-center">
          <h1 className="font-bold text-3xl text-red-500">
            {error.status} - {error.statusText}
          </h1>
          <p>{error.data}</p>
          <Scripts />
        </body>
      </html>
    );
  } else if (error instanceof Error) {
    return (
      <div className="h-full w-full">
        <h1 className="font-bold text-3xl text-red-500">Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
};

const App = () => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export const ErrorBoundary = ClerkErrorBoundary(RootErrorBoundary);

export default ClerkApp(App);
