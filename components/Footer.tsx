import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-background text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about">Who We Are</Link>
              </li>
              <li>
                <a
                  href="https://drive.google.com/your-brand-toolkit-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Brand Toolkit
                </a>
              </li>
              <li>
                <Link href="/management">Management Team</Link>
              </li>
              <li>
                <Link href="/tournaments">Tournaments</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/teams">Teams</Link>
              </li>
              <li>
                <Link href="/creators">Creators</Link>
              </li>
              <li>
                <Link href="/news-history">News & History</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Content</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/content">Videos</Link>
              </li>
              <li>
                <Link href="/content">Articles</Link>
              </li>
              <li>
                <Link href="/content">Streams</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-and-conditions">Terms and Conditions</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 XEBIT Gaming. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
