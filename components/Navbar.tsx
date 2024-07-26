import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
const handleLogout = () => {
  localStorage.removeItem("emailVerified");
  signOut();
};
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Teams", href: "/teams" },
    { name: "Content", href: "/content" },
    { name: "Contact", href: "/contact" },
    { name: "Shop", href: "/shop" },
  ];

  return (
    <nav className="fixed left-0 top-0 h-full z-50">
      <div className="bg-background bg-opacity-90 h-full p-4 flex flex-col justify-center">
        <div className="mb-8">
          <Link href="/">
            <h1 className="text-4xl font-bold mb-2 font-horizon">XEBIT</h1>
          </Link>
        </div>
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href}>
                <span
                  className={`text-white hover:text-primary transition-colors duration-200 ${
                    router.pathname === item.href ? "text-primary" : ""
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
          <li>
            {session ? (
              <div>
                <Link href="/dashboard">
                  <span className="text-white hover:text-primary transition-colors duration-200">
                    Dashboard
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-primary transition-colors duration-200 ml-4"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/accounts">
                <span className="text-white hover:text-primary transition-colors duration-200">
                  Login/Register
                </span>
              </Link>
            )}
          </li>
        </ul>
        <div className="mt-8">
          <input
            type="text"
            placeholder="Search players..."
            className="bg-white bg-opacity-10 text-white placeholder-gray-400 px-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
