import React from "react";
import Head from "next/head";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const managementTeam: TeamMember[] = [
  {
    name: "Alex Johnson",
    role: "CEO",
    image: "/images/management/alex-johnson.jpg",
    bio: "Alex founded XEBIT Gaming with a vision to create a world-class esports organization. With 10 years of experience in the gaming industry, he leads the team towards new heights.",
  },
  {
    name: "Sarah Lee",
    role: "Head Coach",
    image: "/images/management/sarah-lee.jpg",
    bio: "Sarah is a former professional VALORANT player who now applies her extensive knowledge to coaching our team. Her strategic insights have been crucial to our success.",
  },
  {
    name: "Mike Chen",
    role: "Operations Manager",
    image: "/images/management/mike-chen.jpg",
    bio: "Mike ensures that everything runs smoothly behind the scenes. From logistics to player support, he's the backbone of our organization.",
  },
  // Add more team members as needed
];

const Management: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070707] text-white bg-pattern">
      <Head>
        <title>XEBIT Gaming Management Team</title>
        <meta
          name="description"
          content="Meet the management team behind XEBIT Gaming"
        />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center font-horizon">
          Management Team
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {managementTeam.map((member, index) => (
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
                <p>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Management;
