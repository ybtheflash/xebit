import React from "react";
import Head from "next/head";
import Image from "next/image";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070707] text-white bg-pattern">
      <Head>
        <title>About XEBIT Gaming</title>
        <meta
          name="description"
          content="Learn about XEBIT Gaming - Professional VALORANT team"
        />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center font-horizon">
          About XEBIT Gaming
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <Image
              src="/images/team-photo.jpg"
              alt="XEBIT Gaming Team"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div>
            <p className="mb-4">
              XEBIT Gaming is a professional esports organization founded in
              2023, specializing in VALORANT. Our team is dedicated to pushing
              the boundaries of competitive gaming and entertaining fans
              worldwide.
            </p>
            <p className="mb-4">
              With our motto "Whiff Like A Pro," we embrace both the highs and
              lows of competitive gaming, always striving to improve and have
              fun along the way.
            </p>
            <p>
              Our team consists of talented players, dedicated coaches, and
              supportive staff, all working together to make XEBIT Gaming a
              household name in the esports industry.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p>At XEBIT Gaming, our mission is to:</p>
          <ul className="list-disc list-inside mt-2 space-y-2">
            <li>Compete at the highest level of VALORANT esports</li>
            <li>Foster a supportive and inclusive gaming community</li>
            <li>
              Entertain and inspire fans through our content and performances
            </li>
            <li>Develop the next generation of esports talent</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default About;
