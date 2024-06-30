import React, { useEffect } from "react";
import Head from "next/head";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

const Dashboard: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/accounts");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#070707] text-white bg-pattern">
      <Head>
        <title>XEBIT Gaming Dashboard</title>
        <meta name="description" content="XEBIT Gaming member dashboard" />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center font-horizon">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#1a1a1a] p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">
              Welcome, {session.user?.name}!
            </h2>
            <p className="mb-4">
              Here's your XEBIT Gaming dashboard. Manage your profile and access
              team resources.
            </p>
            <Link
              href="/profile"
              className="bg-[#ff1616] text-white px-4 py-2 rounded inline-block hover:bg-opacity-80 transition-colors"
            >
              Edit Profile
            </Link>
          </div>

          <div className="bg-[#1a1a1a] p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Team Resources</h2>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-[#ff1616] hover:underline">
                  Team Schedule
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#ff1616] hover:underline">
                  Strategy Documents
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#ff1616] hover:underline">
                  VOD Reviews
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-[#1a1a1a] p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Recent Announcements</h2>
          <ul className="space-y-4">
            <li>
              <h3 className="text-xl font-bold">Upcoming Tournament</h3>
              <p>
                We're participating in the VALORANT Champions Tour next month.
                Check the team schedule for practice times.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-bold">New Team Member</h3>
              <p>
                Please welcome XEPlayer5 to our roster! They'll be joining us
                for upcoming matches.
              </p>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
