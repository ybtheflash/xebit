import React from "react";
import Head from "next/head";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070707] text-white bg-pattern">
      <Head>
        <title>XEBIT Gaming - Privacy Policy</title>
        <meta name="description" content="Privacy Policy for XEBIT Gaming" />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center font-horizon">
          Privacy Policy
        </h1>

        <div className="prose prose-invert max-w-none">
          <h2>1. Information We Collect</h2>
          <p>
            We collect personal information that you provide to us, such as your
            name, email address, and any other information you choose to provide
            when creating an account or contacting us.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect to provide and improve our
            services, communicate with you, and ensure the security of our
            website.
          </p>

          <h2>3. Information Sharing and Disclosure</h2>
          <p>
            We do not sell or rent your personal information to third parties.
            We may share your information with service providers who assist us
            in operating our website and conducting our business.
          </p>

          <h2>4. Data Security</h2>
          <p>
            We implement reasonable security measures to protect your personal
            information from unauthorized access, alteration, disclosure, or
            destruction.
          </p>

          <h2>5. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your
            experience on our website. You can set your browser to refuse all or
            some browser cookies, or to alert you when websites set or access
            cookies.
          </p>

          <h2>6. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal
            information. You may also have the right to restrict or object to
            certain processing of your data.
          </p>

          <h2>7. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at privacy@xebitgaming.com.
          </p>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
