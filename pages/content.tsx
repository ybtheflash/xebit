import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

interface ContentItem {
  id: number;
  title: string;
  type: "video" | "article" | "stream";
  thumbnail: string;
  description: string;
  link: string;
}

const contentItems: ContentItem[] = [
  {
    id: 1,
    title: "XEBIT Gaming Best Moments 2024",
    type: "video",
    thumbnail: "/images/content/best-moments-2024.jpg",
    description:
      "Relive the most exciting plays and clutch moments from our 2024 season.",
    link: "https://www.youtube.com/watch?v=xebitgaming2024",
  },
  {
    id: 2,
    title: "Pro Tips: Mastering Valorant's Newest Agent",
    type: "article",
    thumbnail: "/images/content/new-agent-guide.jpg",
    description:
      "Our in-depth guide to dominating with Valorant's latest addition to the roster.",
    link: "/blog/mastering-new-agent",
  },
  {
    id: 3,
    title: "Live Now: XEBIT vs Rivals Showmatch",
    type: "stream",
    thumbnail: "/images/content/live-stream-thumbnail.jpg",
    description:
      "Tune in to watch XEBIT take on our rivals in an exciting showmatch!",
    link: "https://www.twitch.tv/xebitgaming",
  },
  {
    id: 4,
    title: "Behind the Scenes: A Day in the Life of XEBIT",
    type: "video",
    thumbnail: "/images/content/behind-the-scenes.jpg",
    description:
      "Get an exclusive look at our daily training routine and team dynamics.",
    link: "https://www.youtube.com/watch?v=xebitgaming-bts",
  },
  {
    id: 5,
    title: "Strategy Breakdown: Winning on Split",
    type: "article",
    thumbnail: "/images/content/split-strategy.jpg",
    description:
      "Our detailed analysis of successful strategies for the Split map in Valorant.",
    link: "/blog/split-strategy-breakdown",
  },
];

const Content: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070707] text-white bg-pattern">
      <Head>
        <title>XEBIT Gaming Content</title>
        <meta
          name="description"
          content="Videos, articles, and streams from XEBIT Gaming"
        />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center font-horizon">
          Content
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contentItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                src={item.thumbnail}
                alt={item.title}
                width={400}
                height={225}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                <p className="text-[#ff1616] mb-2">
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </p>
                <p className="mb-4">{item.description}</p>
                <Link
                  href={item.link}
                  className="bg-[#ff1616] text-white px-4 py-2 rounded inline-block hover:bg-opacity-80 transition-colors"
                >
                  {item.type === "video"
                    ? "Watch Now"
                    : item.type === "article"
                    ? "Read More"
                    : "Tune In"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Content;
