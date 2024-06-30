import React from "react";
import Head from "next/head";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  description: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "XEPlayer1",
    role: "Duelist",
    image: "/images/players/xeplayer1.jpg",
    description: "Known for aggressive plays and clutch moments.",
  },
  {
    name: "XEPlayer2",
    role: "Controller",
    image: "/images/players/xeplayer2.jpg",
    description: "Master of map control and team strategies.",
  },
  {
    name: "XEPlayer3",
    role: "Sentinel",
    image: "/images/players/xeplayer3.jpg",
    description: "Defensive specialist with unmatched game sense.",
  },
  {
    name: "XEPlayer4",
    role: "Initiator",
    image: "/images/players/xeplayer4.jpg",
    description: "Information gatherer and team playmaker.",
  },
  {
    name: "XEPlayer5",
    role: "Flex",
    image: "/images/players/xeplayer5.jpg",
    description: "Versatile player adapting to team needs.",
  },
];

const Teams: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070707] text-white bg-pattern">
      <Head>
        <title>XEBIT Gaming Teams</title>
        <meta
          name="description"
          content="Meet the XEBIT Gaming VALORANT team"
        />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center font-horizon">
          Our Team
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                src={member.image}
                alt={member.name}
                width={400}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2">{member.name}</h2>
                <h3 className="text-[#ff1616] mb-4">{member.role}</h3>
                <p>{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Teams;
