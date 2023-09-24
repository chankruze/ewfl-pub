import type { MetaFunction } from "@remix-run/node";
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

const fakeBlogData = [
  {
    id: 1,
    title: "Lorem Ipsum Blog 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Lorem Ipsum Blog 2",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Lorem Ipsum Blog 2",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Lorem Ipsum Blog 2",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Lorem Ipsum Blog 2",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Lorem Ipsum Blog 2",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Lorem Ipsum Blog 2",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Lorem Ipsum Blog 2",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Lorem Ipsum Blog 2",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Lorem Ipsum Blog 2",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Lorem Ipsum Blog 2",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Lorem Ipsum Blog 2",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://via.placeholder.com/150",
  },
  // Add more blog data as needed
];

export default function PortalHome() {
  return (
    <div className="h-full w-full p-6 lg:p-8 space-y-8">
      {/* First Div with Horizontal Scroll */}
      <div className="space-y-4">
        <h1 className="sm:text-xl text-green-600 font-bold font-roboto-mono flex items-center gap-2">
          <Brain />
          <span>Knowledge Base</span>
        </h1>
        <div className="w-full scrollbar-thin overflow-x-auto flex gap-4">
          {fakeBlogData.map((blog) => (
            <div
              key={blog.id}
              className="w-32 sm:w-48 flex-shrink-0 rounded-xl overflow-hidden"
            >
              <img
                src={`https://picsum.photos/seed/${Math.random()}/200`}
                alt={blog.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h1 className="sm:text-xl text-blue-600 font-bold font-roboto-mono flex items-center gap-2">
          <Rocket />
          <span>Trending Topics</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fakeBlogData.map((blog) => (
            <div key={blog.id} className="bg-accent rounded-xl overflow-hidden">
              <img
                src={`https://picsum.photos/seed/${Math.random()}/150/200`}
                alt={blog.title}
                className="w-full h-32 object-cover"
                loading="lazy"
              />
              <div className="p-4 space-y-2">
                <p className="text-lg font-medium">{blog.title}</p>
                <p className="text-gray-600 line-clamp-2">{blog.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
