import React, { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";

import { Session } from "next-auth";

// Add this type declaration
declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}
const Profile: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState("/images/default-avatar.png");
  const [error, setError] = useState("");

  const fetchUserProfile = useCallback(async () => {
    if (!session) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_URL}/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      if (response.ok) {
        const userData = await response.json();
        setName(userData.name || "");
        setBio(userData.bio || "");
        setRole(userData.role || "");
        setAvatar(userData.avatar || "/images/default-avatar.png");
      } else {
        throw new Error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setError("Failed to load user profile. Please try again.");
    }
  }, [session]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/accounts");
    }
    if (session?.user) {
      setName(session.user.name || "");
      fetchUserProfile();
    }
  }, [status, router, session, fetchUserProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!session) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_URL}/users/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: JSON.stringify({ name, bio, role, avatar }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();
      console.log("Profile updated:", updatedUser);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#070707] text-white bg-pattern">
      <Head>
        <title>XEBIT Gaming Profile</title>
        <meta name="description" content="Edit your XEBIT Gaming profile" />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center font-horizon">
          Your Profile
        </h1>

        <div className="max-w-2xl mx-auto bg-[#1a1a1a] p-8 rounded-lg">
          <div className="flex items-center justify-center mb-8">
            <Image
              src={avatar}
              alt="Profile Avatar"
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-[#070707] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff1616]"
              />
            </div>
            <div>
              <label htmlFor="bio" className="block mb-1">
                Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-[#070707] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff1616]"
              ></textarea>
            </div>
            <div>
              <label htmlFor="role" className="block mb-1">
                Role
              </label>
              <input
                type="text"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 bg-[#070707] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff1616]"
              />
            </div>
            <div>
              <label htmlFor="avatar" className="block mb-1">
                Avatar URL
              </label>
              <input
                type="text"
                id="avatar"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full px-3 py-2 bg-[#070707] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff1616]"
              />
            </div>
            <button
              type="submit"
              className="bg-[#ff1616] text-white px-6 py-2 rounded-md hover:bg-opacity-80 transition-colors"
            >
              Update Profile
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Profile;
