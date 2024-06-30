import React from "react";
import Head from "next/head";
import Link from "next/link";

interface Tournament {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
  status: "upcoming" | "ongoing" | "completed";
}

const tournaments: Tournament[] = [
  {
    id: 1,
    name: "VALORANT Champions Tour 2024",
    date: "August 1-15, 2024",
    location: "Los Angeles, California",
    description:
      "The biggest VALORANT tournament of the year. XEBIT Gaming is ready to compete against the world's best teams.",
    status: "upcoming",
  },
  {
    id: 2,
    name: "XEBIT Invitational",
    date: "September 5-7, 2024",
    location: "Online",
    description:
      "Our very own tournament, inviting top teams from around the world to compete in a high-stakes online event.",
    status: "upcoming",
  },
  {
    id: 3,
    name: "Regional Qualifiers",
    date: "July 10-12, 2024",
    location: "New York City",
    description:
      "The crucial qualifier tournament that will determine our path to the Champions Tour. Every match counts!",
    status: "upcoming",
  },
  {
    id: 4,
    name: "Spring Showdown 2024",
    date: "April 15-20, 2024",
    location: "Paris, France",
    description:
      "A major international tournament where we secured a top 3 finish, showcasing our skills on the global stage.",
    status: "completed",
  },
];

const Tournaments: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070707] text-white bg-pattern">
      <Head>
        <title>XEBIT Gaming Tournaments</title>
        <meta
          name="description"
          content="Upcoming and past tournaments for XEBIT Gaming"
        />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center font-horizon">
          Tournaments
        </h1>

        <div className="space-y-8">
          {tournaments.map((tournament) => (
            <div key={tournament.id} className="bg-[#1a1a1a] p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-2">{tournament.name}</h2>
              <p className="text-[#ff1616] mb-2">{tournament.date}</p>
              <p className="mb-2">{tournament.location}</p>
              <p className="mb-4">{tournament.description}</p>
              <div className="flex justify-between items-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    tournament.status === "upcoming"
                      ? "bg-green-500"
                      : tournament.status === "ongoing"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {tournament.status.charAt(0).toUpperCase() +
                    tournament.status.slice(1)}
                </span>
                <Link
                  href={`/tournaments/${tournament.id}`}
                  className="text-[#ff1616] hover:underline"
                >
                  More Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Tournaments;
