import type { MetaFunction } from "@remix-run/node";
import { APP_DESCRIPTION, APP_TITLE } from "~/consts";

export const meta: MetaFunction = () => {
  return [
    { title: APP_TITLE },
    { name: "description", content: APP_DESCRIPTION },
  ];
};

export default function Index() {
  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold underline">Hello from {APP_TITLE}</h1>
    </main>
  );
}
