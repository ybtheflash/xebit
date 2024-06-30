import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FaTwitch, FaYoutube, FaTwitter, FaInstagram } from "react-icons/fa";

interface Creator {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  socialLinks: {
    twitch?: string;
    youtube?: string;
    twitter?: string;
    instagram?: string;
  };
}

const creators: Creator[] = [
  {
    id: 1,
    name: "XEStreamer1",
    role: "Variety Streamer",
    image: "/images/creators/xestreamer1.jpg",
    bio: "Known for high-energy VALORANT streams and community interaction.",
    socialLinks: {
      twitch: "https://twitch.tv/xestreamer1",
      youtube: "https://youtube.com/xestreamer1",
      twitter: "https://twitter.com/xestreamer1",
      instagram: "https://instagram.com/xestreamer1",
    },
  },
  {
    id: 2,
    name: "XEContent2",
    role: "Video Creator",
    image: "/images/creators/xecontent2.jpg",
    bio: "Produces in-depth VALORANT strategy guides and gameplay analysis videos.",
    socialLinks: {
      youtube: "https://youtube.com/xecontent2",
      twitter: "https://twitter.com/xecontent2",
    },
  },
  {
    id: 3,
    name: "XEInfluencer3",
    role: "Social Media Influencer",
    image: "/images/creators/xeinfluencer3.jpg",
    bio: "Shares daily VALORANT tips, tricks, and behind-the-scenes content.",
    socialLinks: {
      instagram: "https://instagram.com/xeinfluencer3",
      twitter: "https://twitter.com/xeinfluencer3",
    },
  },
  // Add more creators as needed
];

const Creators: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070707] text-white bg-pattern">
      <Head>
        <title>XEBIT Gaming Creators</title>
        <meta
          name="description"
          content="Meet the content creators of XEBIT Gaming"
        />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center font-horizon">
          Our Creators
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {creators.map((creator) => (
            <div
              key={creator.id}
              className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                src={creator.image}
                alt={creator.name}
                width={400}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2">{creator.name}</h2>
                <h3 className="text-[#ff1616] mb-4">{creator.role}</h3>
                <p className="mb-4">{creator.bio}</p>
                <div className="flex space-x-4">
                  {creator.socialLinks.twitch && (
                    <Link
                      href={creator.socialLinks.twitch}
                      className="text-[#6441a5] hover:text-opacity-80"
                    >
                      <FaTwitch size={24} />
                    </Link>
                  )}
                  {creator.socialLinks.youtube && (
                    <Link
                      href={creator.socialLinks.youtube}
                      className="text-[#ff0000] hover:text-opacity-80"
                    >
                      <FaYoutube size={24} />
                    </Link>
                  )}
                  {creator.socialLinks.twitter && (
                    <Link
                      href={creator.socialLinks.twitter}
                      className="text-[#1da1f2] hover:text-opacity-80"
                    >
                      <FaTwitter size={24} />
                    </Link>
                  )}
                  {creator.socialLinks.instagram && (
                    <Link
                      href={creator.socialLinks.instagram}
                      className="text-[#e1306c] hover:text-opacity-80"
                    >
                      <FaInstagram size={24} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Creators;
