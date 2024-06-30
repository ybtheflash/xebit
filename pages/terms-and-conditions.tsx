import React from "react";
import Head from "next/head";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070707] text-white bg-pattern">
      <Head>
        <title>XEBIT Gaming - Terms and Conditions</title>
        <meta
          name="description"
          content="Terms and Conditions for XEBIT Gaming"
        />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center font-horizon">
          Terms and Conditions
        </h1>

        <div className="prose prose-invert max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using the XEBIT Gaming website, you agree to comply
            with and be bound by these Terms and Conditions.
          </p>

          <h2>2. Use of Website</h2>
          <p>
            You agree to use this website for lawful purposes only and in a
            manner that does not infringe upon the rights of others.
          </p>

          <h2>3. Intellectual Property</h2>
          <p>
            All content on this website, including but not limited to text,
            graphics, logos, and images, is the property of XEBIT Gaming and
            protected by copyright laws.
          </p>

          <h2>4. User Accounts</h2>
          <p>
            If you create an account on our website, you are responsible for
            maintaining the confidentiality of your account information and for
            all activities that occur under your account.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            XEBIT Gaming shall not be liable for any direct, indirect,
            incidental, consequential, or punitive damages arising out of your
            access to, or use of, the website.
          </p>

          <h2>6. Modifications</h2>
          <p>
            We reserve the right to modify these Terms and Conditions at any
            time. Your continued use of the website after any changes indicates
            your acceptance of the modified terms.
          </p>

          <h2>7. Governing Law</h2>
          <p>
            These Terms and Conditions shall be governed by and construed in
            accordance with the laws of [Your Jurisdiction], without regard to
            its conflict of law provisions.
          </p>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditions;
