import React, { useState } from "react";
import Head from "next/head";

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here (e.g., send to an API)
    console.log("Form submitted:", { name, email, message });
    // Reset form fields
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white bg-pattern">
      <Head>
        <title>Contact XEBIT Gaming</title>
        <meta name="description" content="Get in touch with XEBIT Gaming" />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center font-horizon">
          Contact Us
        </h1>

        <div className="max-w-2xl mx-auto">
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
                required
                className="w-full px-3 py-2 bg-[#1a1a1a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff1616]"
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
                required
                className="w-full px-3 py-2 bg-[#1a1a1a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff1616]"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="w-full px-3 py-2 bg-[#1a1a1a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff1616]"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#ff1616] text-white px-6 py-2 rounded-md hover:bg-opacity-80 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Other Ways to Reach Us</h2>
          <p>Email: contact@xebitgaming.com</p>
          <p>Twitter: @XEBITGaming</p>
          <p>Discord: discord.gg/xebit</p>
        </div>
      </main>
    </div>
  );
};

export default Contact;
