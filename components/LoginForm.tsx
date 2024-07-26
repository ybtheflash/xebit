import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Modal from "../components/Modal";
import RegisterForm from "../components/RegisterForm";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [error, setError] = useState("");
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const errorMessage = router.query.error;
    if (errorMessage === "Too Many Requests") {
      setError("Too many login attempts, please try again later.");
      setShowModal(true);
    }
  }, [router.query]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (result?.error) {
        setError("Invalid username or password");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleSecretKeySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_URL}/auth/verify-secret-key`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ secretKey }),
        }
      );

      if (response.ok) {
        setShowRegisterForm(true);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Invalid secret key");
      }
    } catch (error) {
      console.error("Error verifying secret key:", error);
      setError("Error verifying secret key. Please try again.");
    }
  };

  // If user is already logged in, redirect to dashboard
  React.useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  if (showRegisterForm) {
    return <RegisterForm />;
  }

  return (
    <div>
      <form onSubmit={handleLogin} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label htmlFor="username" className="block mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-black"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-black"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md"
        >
          Log In
        </button>
      </form>
      {showModal && (
        <Modal
          title="Rate Limit Exceeded"
          message={error}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default LoginForm;
