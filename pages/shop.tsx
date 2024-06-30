import React from "react";
import Head from "next/head";
import Image from "next/image";

const Shop: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070707] text-white bg-pattern">
      <Head>
        <title>XEBIT Gaming Shop</title>
        <meta
          name="description"
          content="Official merchandise for XEBIT Gaming"
        />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center font-horizon">
          XEBIT Gaming Shop
        </h1>

        <div className="flex flex-col items-center justify-center space-y-8">
          <Image
            src="/images/coming-soon.jpg"
            alt="Coming Soon"
            width={600}
            height={400}
            className="rounded-lg"
          />

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Coming Soon!</h2>
            <p className="text-xl">
              We're working hard to bring you the best XEBIT Gaming merchandise.
              <br />
              Stay tuned for updates!
            </p>
          </div>

          <div className="bg-[#1a1a1a] p-6 rounded-lg max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Get Notified</h3>
            <p className="mb-4">
              Sign up to be the first to know when our shop launches:
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-3 py-2 bg-[#070707] rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#ff1616]"
              />
              <button
                type="submit"
                className="bg-[#ff1616] text-white px-4 py-2 rounded-r-md hover:bg-opacity-80 transition-colors"
              >
                Notify Me
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Shop;
