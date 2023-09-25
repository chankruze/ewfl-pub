import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Brain, Rocket } from "lucide-react";
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

export const loader = async (args: LoaderFunctionArgs) => {
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=electronics&apiKey=0b94ad22e35b496d8b39b93ca709adb5`
  );

  const { articles } = await response.json();

  return json({ articles });
};

export default function PortalHome() {
  const { articles } = useLoaderData<typeof loader>();

  return (
    <div className="h-full w-full p-6 lg:p-8 space-y-8">
      {/* First Div with Horizontal Scroll */}
      <div className="space-y-4">
        <h1 className="sm:text-xl text-green-600 font-bold flex items-center gap-2">
          <Brain />
          <span>Knowledge Base</span>
        </h1>
        <div className="w-full scrollbar-thin overflow-x-auto flex gap-4">
          {articles.map((article, _idx) => (
            <div
              key={`article-${_idx}`}
              className="w-32 sm:w-48 flex-shrink-0 rounded-xl overflow-hidden"
            >
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h1 className="sm:text-xl text-blue-600 font-bold flex items-center gap-2">
          <Rocket />
          <span>Trending Topics</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {articles.map((article, _idx) => (
            <Link target="_blank" to={article.url} key={`article-${_idx}`}>
              <div className="bg-accent rounded-xl h-full overflow-hidden">
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-4 space-y-2">
                  <p className="text-lg font-medium line-clamp-2">
                    {article.description}
                  </p>
                  <p className="text-gray-600 line-clamp-4">
                    {article.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
