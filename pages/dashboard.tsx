import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useSession, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

const Dashboard: React.FC = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    console.log("Session:", session);
    console.log("Is Verified:", isVerified);
    console.log("Email Verified Status:", session?.user?.email_verified);

    const storedVerification = localStorage.getItem("emailVerified");
    let emailVerifiedStorage = false;

    if (storedVerification) {
      const parsedStorage = JSON.parse(storedVerification);
      emailVerifiedStorage =
        parsedStorage.email === session?.user?.email && parsedStorage.verified;
    }

    if (status === "unauthenticated") {
      router.push("/accounts");
    } else if (status === "authenticated") {
      if (session?.user?.email_verified || emailVerifiedStorage) {
        setIsVerified(true);
        setShowVerificationModal(false);
        // Update local storage if verified in session
        if (session?.user?.email_verified) {
          localStorage.setItem(
            "emailVerified",
            JSON.stringify({
              email: session.user.email,
              verified: true,
            })
          );
        }
      } else {
        setIsVerified(false);
        setShowVerificationModal(true);
      }
    }
    return () => {
      // Cleanup function
      setShowVerificationModal(false);
      setIsVerified(false);
    };
  }, [status, router, session]);

  console.log("Access Token:", session?.accessToken);

  const handleSendOtp = async () => {
    try {
      console.log("Token being sent:", session?.accessToken); // For debugging
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_URL}/users/send-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send OTP");
      }

      alert("OTP sent to your email. Valid for 5 minutes.");
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_URL}/users/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify({ otp }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid OTP");
      }

      if (response.ok) {
        console.log("OTP verified successfully");

        // Set local storage item
        localStorage.setItem(
          "emailVerified",
          JSON.stringify({
            email: session?.user?.email,
            verified: true,
          })
        );

        // Update local state
        setIsVerified(true);
        setShowVerificationModal(false);

        // Update the session
        await update({
          ...session,
          user: {
            ...session?.user,
            email_verified: true,
          },
        });

        alert("Email verified successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError(error.message || "Failed to verify OTP. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("emailVerified");
    signOut();
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
        <title>XEBIT Gaming Dashboard</title>
        <meta name="description" content="XEBIT Gaming member dashboard" />
      </Head>
      {showVerificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
            <p className="mb-4">Please verify your email to continue.</p>
            <button
              onClick={handleSendOtp}
              className="bg-[#ff1616] text-white px-2 py-1 rounded-md mr-2"
            >
              <p className="text-sm">Send OTP</p>
            </button>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-3 py-2 bg-[#070707] rounded-md mt-4"
            />
            <button
              onClick={handleVerifyOtp}
              className="bg-[#ff1616] text-white px-4 py-2 rounded-md mt-4"
            >
              Verify
            </button>
            <button
              onClick={handleLogout}
              className="bg-gray-500 text-white px-4 py-2 rounded-md mt-4 ml-2"
            >
              Sign Out
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
      )}

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
              Here&apos;s your XEBIT Gaming dashboard. Manage your profile and
              access team resources.
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
                We&apos;re participating in the VALORANT Champions Tour next
                month. Check the team schedule for practice times.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-bold">New Team Member</h3>
              <p>
                Please welcome XEPlayer5 to our roster! They&apos;ll be joining
                us for upcoming matches.
              </p>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
