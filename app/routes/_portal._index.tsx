import type { MetaFunction } from "@remix-run/node";
import { SITE_DESCRIPTION, SITE_TITLE } from "~/consts";

export const meta: MetaFunction = () => {
  return [
    { title: `Home / ${SITE_TITLE}` },
    {
      property: "og:title",
      content: `Home / ${SITE_TITLE}`,
    },
    { name: "description", content: SITE_DESCRIPTION },
  ];
};

export default function PortalHome() {
  return <div>PortalHome</div>;
}
