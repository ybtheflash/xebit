import React, { useState, useEffect, useCallback, useRef } from "react";
import Head from "next/head";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";

const Profile: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [realname, setRealname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [userTags, setUserTags] = useState<string[]>([]);
  const [userSocials, setUserSocials] = useState<string[]>([]);
  const [alias, setAlias] = useState("");
  const [profileLink, setProfileLink] = useState("");
  const [biodata, setBio] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const [redirectCountdown, setRedirectCountdown] = useState(5);
  const [avatarURL, setAvatar] = useState("/images/gekko_buddies.jpg");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          setAvatar(data.data.url);
          // Optionally, you can call handleSubmit here to update the profile immediately
          // await handleSubmit(new Event('submit') as React.FormEvent<HTMLFormElement>);
        } else {
          throw new Error("Failed to upload image");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        setError("Failed to upload image. Please try again.");
      }
    }
  };

  const fetchUserProfile = useCallback(async () => {
    if (!session) return;

    try {
      setIsLoading(true);
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
        setRealname(userData.realname || "");
        setUsername(userData.username || "");
        setEmail(userData.email || "");
        setRole(userData.role || "");
        setUserTags(userData.userTags || []);
        setUserSocials(userData.userSocials || []);
        setAlias(userData.alias || "");
        setProfileLink(userData.profileLink || "");
        setBio(userData.biodata || "");
        setAvatar(userData.avatarURL || "");
        setIsEmailVerified(userData.email_verified);

        if (!userData.email_verified) {
          let count = 5;
          const intervalId = setInterval(() => {
            count--;
            setRedirectCountdown(count);
            if (count === 0) {
              clearInterval(intervalId);
              signOut();
            }
          }, 1000);
        }
      } else {
        throw new Error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setError("Failed to load user profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/accounts");
    }
    if (session?.user) {
      fetchUserProfile();
    }
  }, [status, router, session, fetchUserProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!session) return;

    try {
      const profileData = {
        realname,
        username,
        email,
        role,
        userTags,
        userSocials,
        alias,
        profileLink,
        biodata,
        avatarURL,
      };

      // Remove any Appwrite-specific fields
      Object.keys(profileData).forEach((key) => {
        if (key.startsWith("$")) {
          delete profileData[key];
        }
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_URL}/users/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: JSON.stringify(profileData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
    }
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && userTags.length < 3) {
      const newTag = e.currentTarget.value.trim();
      if (newTag && !userTags.includes(newTag)) {
        setUserTags([...userTags, newTag]);
        e.currentTarget.value = "";
      }
    }
  };

  const handleSocialInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && userSocials.length < 5) {
      const newSocial = e.currentTarget.value.trim();
      if (newSocial && !userSocials.includes(newSocial)) {
        setUserSocials([...userSocials, newSocial]);
        e.currentTarget.value = "";
      }
    }
  };

  if (status === "loading" || isLoading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  if (!isEmailVerified) {
    return (
      <div className="min-h-screen bg-[#070707] text-white bg-pattern flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">
            Email is not verified. Signing out in {redirectCountdown} seconds.
          </p>
          <p>Please verify your email to access your profile.</p>
        </div>
      </div>
    );
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
          <div className="flex items-center justify-center mb-8 relative">
            <div
              className="relative group cursor-pointer"
              onClick={handleAvatarClick}
            >
              <Image
                src={avatarURL}
                alt="Profile Avatar"
                width={150}
                height={150}
                className="rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white">Upload Photo ↑</span>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="realname" className="block mb-1">
                Name
              </label>
              <input
                type="text"
                id="realname"
                value={realname}
                onChange={(e) => setRealname(e.target.value)}
                placeholder="Enter your real name"
                className="w-full px-3 py-2 bg-[#070707] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff1616]"
              />
            </div>
            <div>
              <label htmlFor="username" className="block mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-3 py-2 bg-[#070707] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff1616]"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-[#070707] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff1616]"
              />
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
                placeholder="Enter your role"
                className="w-full px-3 py-2 bg-[#070707] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff1616]"
              />
            </div>
            <div>
              <label htmlFor="userTags" className="block mb-1">
                User Tags (Max 3)
              </label>
              <input
                type="text"
                id="userTags"
                onKeyDown={handleTagInput}
                placeholder="Enter a tag and press Enter"
                className="w-full px-3 py-2 bg-[#070707] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff1616]"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {userTags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-[#ff1616] px-2 py-1 rounded text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="userSocials" className="block mb-1">
                Social Media Links (Max 5)
              </label>
              <input
                type="text"
                id="userSocials"
                onKeyDown={handleSocialInput}
                placeholder="Enter a social media link and press Enter"
                className="w-full px-3 py-2 bg-[#070707] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff1616]"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {userSocials.map((social, index) => (
                  <span
                    key={index}
                    className="bg-[#ff1616] px-2 py-1 rounded text-sm"
                  >
                    {social}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="alias" className="block mb-1">
                In-Game Name
              </label>
              <input
                type="text"
                id="alias"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                placeholder="Enter your in-game name"
                className="w-full px-3 py-2 bg-[#070707] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff1616]"
              />
            </div>
            <div>
              <label htmlFor="profileLink" className="block mb-1">
                Bio Link
              </label>
              <input
                type="text"
                id="profileLink"
                value={profileLink}
                onChange={(e) => setProfileLink(e.target.value)}
                placeholder="Enter your biodata link"
                className="w-full px-3 py-2 bg-[#070707] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff1616]"
              />
            </div>
            <div>
              <label htmlFor="biodata" className="block mb-1">
                Bio
              </label>
              <textarea
                id="biodata"
                value={biodata}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Enter your biodata"
                rows={3}
                className="w-full px-3 py-2 bg-[#070707] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff1616]"
              ></textarea>
            </div>
            <p
              className={`text-sm ${
                isEmailVerified ? "text-green-500" : "text-red-500"
              }`}
            >
              Account Status: {isEmailVerified ? "Verified" : "Unverified"}
            </p>
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
