import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

// You'll need to create these components
import NewsItem from "../components/NewsItem";
import SocialCounter from "../components/SocialCounter";

const Home: React.FC = () => {
  const [newsItems, setNewsItems] = useState([
    {
      id: 1,
      title: "XEBIT Wins Major Tournament",
      date: "2024-06-15",
      image: "/images/news1.jpg",
    },
    {
      id: 2,
      title: "New Player Joins XEBIT",
      date: "2024-06-10",
      image: "/images/news2.jpg",
    },
    {
      id: 3,
      title: "XEBIT Announces Valorant Academy Team",
      date: "2024-06-05",
      image: "/images/news3.jpg",
    },
  ]);

  return (
    <div className="min-h-screen bg-[#070707] text-white bg-pattern">
      <Head>
        <title>XEBIT Gaming - Whiff Like A Pro</title>
        <meta
          name="description"
          content="XEBIT Gaming - Professional VALORANT team"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <Image
            src="/images/XE.gif"
            alt="XEBIT Logo"
            width={200}
            height={200}
            className="mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold mb-2 font-horizon">XEBIT</h1>
          <p className="text-xl mb-4 font-mistrully">Whiff Like A Pro</p>
          <div className="flex justify-center space-x-4">
            <SocialCounter platform="youtube" />
            <SocialCounter platform="instagram" />
            <SocialCounter platform="twitter" />
            <Link
              href="https://discord.gg/xebit"
              className="bg-[#7289DA] text-white px-4 py-2 rounded"
            >
              Join our Discord
            </Link>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsItems.map((item) => (
              <NewsItem key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">
            Upcoming Tournaments
          </h2>
          <div className="bg-[#1a1a1a] p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">
              VALORANT Champions Tour 2024
            </h3>
            <p className="mb-2">Date: August 1-15, 2024</p>
            <p className="mb-4">Location: Los Angeles, California</p>
            <Link
              href="/tournaments"
              className="bg-[#ff1616] text-white px-4 py-2 rounded inline-block hover:bg-opacity-80 transition-colors"
            >
              View Details
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
