import React, { useState } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const AccountsPage: React.FC = () => {
  const [showSecretKeyModal, setShowSecretKeyModal] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  const [error, setError] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    router.push("/dashboard");
    return null;
  }

  const handleSecretKeySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      console.log(
        "Sending request to:",
        `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_URL}/auth/verify-secret-key`
      );
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_URL}/auth/verify-secret-key`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ secretKey }),
        }
      );

      console.log("Response status:", response.status);

      if (response.ok) {
        setShowSecretKeyModal(false);
        setShowRegisterForm(true);
      } else {
        const errorData = await response.json();
        console.error("Secret key verification failed:", errorData);
        setError(errorData.message || "Invalid secret key");
      }
    } catch (error) {
      console.error("Error verifying secret key:", error);
      setError("Error verifying secret key. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white bg-pattern">
      <Head>
        <title>Account - XEBIT Gaming</title>
        <meta
          name="description"
          content="Log in or register for your XEBIT Gaming account"
        />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center font-horizon">
          <a className="text-[#ff1616]">Insider</a> Account
        </h1>

        <div className="max-w-md mx-auto">
          {!showRegisterForm ? (
            <>
              <h2 className="text-2xl font-bold mb-4">Log In</h2>
              <LoginForm />
              <div className="mt-4">
                <button
                  onClick={() => setShowSecretKeyModal(true)}
                  className="text-[#ff1616] hover:underline"
                >
                  <p>
                    <a className="text-[white]">Register Here</a> &#40;Insiders
                    Only&#41;
                  </p>
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">Register</h2>
              <RegisterForm />
              <button
                onClick={() => setShowRegisterForm(false)}
                className="mt-4 text-[#ff1616] hover:underline"
              >
                Back to Login
              </button>
            </>
          )}
        </div>
      </main>

      {showSecretKeyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#1a1a1a] p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Enter Secret Key</h2>
            <form onSubmit={handleSecretKeySubmit} className="space-y-4">
              {error && <p className="text-red-500">{error}</p>}
              <div>
                <label htmlFor="secretKey" className="block mb-1">
                  Secret Key
                </label>
                <input
                  type="password"
                  id="secretKey"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  className="w-full px-3 py-2 bg-[#070707] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff1616] text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#ff1616] text-white py-2 rounded-md hover:bg-opacity-80 transition-colors"
              >
                Verify Secret Key
              </button>
              <button
                onClick={() => setShowSecretKeyModal(false)}
                className="w-full bg-[#333] text-white py-2 rounded-md hover:bg-opacity-80 transition-colors mt-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountsPage;
