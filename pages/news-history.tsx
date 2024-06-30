import React from "react";
import Head from "next/head";
import Link from "next/link";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  summary: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "XEBIT Gaming Wins Major Tournament",
    date: "2024-06-15",
    summary:
      "Our team secured first place in the VALORANT Champions Tour 2024.",
  },
  {
    id: 2,
    title: "New Player Joins XEBIT Gaming",
    date: "2024-05-20",
    summary: "We're excited to welcome XEPlayer5 to our roster!",
  },
  {
    id: 3,
    title: "XEBIT Gaming Launches Academy Team",
    date: "2024-04-10",
    summary: "Introducing our new academy team to nurture upcoming talent.",
  },
  // Add more news items as needed
];

const NewsHistory: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070707] text-white bg-pattern">
      <Head>
        <title>XEBIT Gaming News & History</title>
        <meta
          name="description"
          content="Latest news and history of XEBIT Gaming"
        />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center font-horizon">
          News & History
        </h1>

        <div className="space-y-8">
          {newsItems.map((item) => (
            <div key={item.id} className="bg-[#1a1a1a] p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
              <p className="text-[#ff1616] mb-4">{item.date}</p>
              <p className="mb-4">{item.summary}</p>
              <Link
                href={`/news/${item.id}`}
                className="text-[#ff1616] hover:underline"
              >
                Read more
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default NewsHistory;
