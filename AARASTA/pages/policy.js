import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-[3rem] max-[500px]:mx-[1rem] w-auto break-words py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <h2 className="text-2xl font-bold mb-4">COOKIES POLICY</h2>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">What sort of information do we collect?</h3>
        <p className="mb-4">
          When you visit our website, we may store information in your local storage, such as the details you provide while
          placing your order, including your name, address, contact number, and email address. This information is stored
          locally on your device and can be accessed by the website during subsequent visits.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">What do we use your information for?</h3>
        <ul className="list-disc list-inside mb-4">
          <li>
            The information stored in your local storage helps us provide a personalized experience and remember your
            preferences on our website.
          </li>
          <li>
            We may use the stored information to improve our website&apos;s functionality and enhance the user experience.
          </li>
          <li>
            The information stored locally allows us to process your orders more efficiently and respond to your queries
            and needs in a more customer-centric manner.
          </li>
          <li>
            We do not share or transfer the information stored in your local storage to any third party without your total
            consent.
          </li>
          <li>
            We may use the data stored in your local storage to send you periodic and personalized emails, respond to your
            queries and concerns, or address any other questions.
          </li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold mb-4">How do we protect your information?</h2>

      <p className="mb-4">
        The information stored in your local storage is kept secure and is only accessible by our website. We take measures
        to protect this information and ensure its confidentiality.
      </p>

      <p className="mb-8">
        No user data stored in the local storage is shared with any third party for any reason or purpose.
      </p>

      <h2 className="text-2xl font-bold mb-4">Do we disclose any information to outside parties?</h2>

      <p className="mb-4">
        We do not share, sell, or trade any user information stored in the local storage with any third party or agency.
        The information stored locally is strictly used for the purposes mentioned in this Privacy Policy.
      </p>

      <p className="mb-4">
        We may release your information when we believe it is appropriate to comply with the law, enforce our site
        policies, or protect rights, safety, or property.
      </p>

      <h2 className="text-2xl font-bold mb-4">Your Consent</h2>

      <p className="mb-8">
        By using our website and allowing us to store information in your local storage, you agree to the terms mentioned
        in this Privacy Policy.
      </p>

      <p className="mb-4">
        We always handle your information stored in the local storage with your total consent.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
