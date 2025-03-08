// src/pages/CookiesPolicy.tsx

import React from "react";

function CookiesPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">Cookies Policy</h1>

      {/* Introduction */}
      <p className="mb-4">
        Welcome to the <strong>COOKIES POLICY</strong> of the website of the entity{" "}
        <strong>BRAIN REPO S.L.</strong> (registered with CIF B09634809), where we will explain in clear and simple language all the necessary details so that you can maintain control over cookies based on your personal decisions.
      </p>

      {/* What Are Cookies */}
      <h2 className="text-2xl font-semibold mb-4">What Are Cookies and What Do We Use Them For?</h2>
      <p className="mb-4">
        A cookie is a small file of information that is stored on your computer, smartphone, or tablet each time you visit our website.
      </p>
      <p className="mb-4">
        In principle, a cookie is harmless – it does not contain viruses, trojans, worms, etc. that could damage your device – but it can have an impact on your right to personal data protection, since it collects certain information about you (such as browsing habits, identity, preferences, etc.).
      </p>
      <p className="mb-4">
        Therefore, based on applicable regulations (including the LSSI and current personal data protection laws), the activation of certain types of cookies requires your prior authorization.
      </p>
      <p className="mb-4">
        Before proceeding, here is some additional information to help you make better-informed decisions:
      </p>

      {/* Types of Cookies (General Explanation) */}
      <ol className="list-decimal list-inside mb-4 space-y-2">
        <li>
          <strong>Cookies can be of various types depending on their purpose:</strong>
          <ul className="list-disc list-inside ml-6">
            <li>
              <strong>Technical Cookies:</strong> These are necessary for our website to function. They do not require your authorization and are the only ones activated by default.
            </li>
            <li>
              <strong>Other Cookies:</strong> These are used to improve our website, personalize it based on your preferences, or display advertising tailored to your searches, tastes, and interests. You can accept all these cookies by clicking the ACCEPT button, or configure/reject them by accessing the COOKIES SETTINGS section.
            </li>
          </ul>
        </li>
        <li>
          <strong>Some cookies are our own (first-party cookies) and others belong to external companies that provide services for our website (third-party cookies, for example, cookies from providers like Google).</strong> It is important for you to know that some of these external providers may be located outside of Spain.
          <br />
          Globally, not all countries offer the same level of data protection—some regions, such as the European Union, are considered safer for your data. Our policy is to use reliable providers that, regardless of their location, have adopted appropriate guarantees to protect your personal information.
          <br />
          You can review the privacy and data protection policies of each of these external providers to make an informed decision about enabling third-party cookies.
        </li>
        <li>
          <strong>Finally, depending on how long they remain active, cookies can be of two types:</strong>
          <ul className="list-disc list-inside ml-6">
            <li>
              <strong>Session Cookies:</strong> These expire automatically when you end your session on your computer, smartphone, or tablet. They are usually used to retain necessary information while you receive a service on a single occasion.
            </li>
            <li>
              <strong>Persistent Cookies:</strong> These remain stored on your device for a certain period, ranging from a few minutes to several years.
            </li>
          </ul>
        </li>
      </ol>

      {/* Specific Types of Cookies Used on Our Website */}
      <h2 className="text-2xl font-semibold mb-4">What Types of Cookies Can We Use on Our Website?</h2>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>
          <strong>Technical Cookies:</strong> These cookies are strictly necessary for our website to function and for you to navigate it. They allow us, for example, to identify you, grant access to restricted parts of the website if needed, or remember options or services you have previously selected (such as your privacy preferences). They are activated by default, and no authorization is needed.
          <br />
          You can block or be notified about these cookies through your browser settings, though doing so may affect the proper functioning of our website.
        </li>
        <li>
          <strong>Analysis Cookies:</strong> These cookies help us study how users navigate our website (for example, which sections are most visited, which services are most used, and whether they function correctly).
          <br />
          The statistical information gathered helps us improve both the website and its services. These cookies are not intended for advertising purposes; they simply help enhance our website’s overall performance. You can enable or disable these cookies by selecting the corresponding option—they are disabled by default.
        </li>
        <li>
          <strong>Functionality and Personalization Cookies:</strong> These cookies allow us to remember your preferences so that we can personalize general features of our website each time you visit (for example, the language in which information is displayed, your favorite sections, your browser type, etc.).
          <br />
          Although not used for advertising, enabling these cookies enhances website functionality and personalization based on your preferences, contributing to a better, more user-friendly experience. You can enable or disable these cookies via the corresponding option; they are disabled by default.
        </li>
        <li>
          <strong>Advertising Cookies:</strong> These cookies allow us to manage advertising spaces on our website based on criteria such as the displayed content or ad frequency.
          <br />
          For example, if you have seen the same ad multiple times without interacting with it, it will not be shown again. In summary, enabling these cookies makes the advertising on our website more useful, varied, and less repetitive.
          <br />
          You can enable or disable these cookies by selecting the appropriate option; they are disabled by default.
        </li>
        <li>
          <strong>Behavioral Advertising Cookies:</strong> These cookies collect information based on your browsing habits and behavior, allowing us to display advertising content that better matches your tastes and interests.
          <br />
          For instance, if your recent searches were related to suspense literature, you might see ads for suspense books. Enabling these cookies ensures that the advertising you see is tailored exclusively to your interests.
          <br />
          You can enable or disable these cookies via the corresponding option; they are disabled by default.
        </li>
      </ul>

      {/* Table of Currently Used Cookies */}
      <h2 className="text-2xl font-semibold mb-4">What Types of Cookies Are Currently Used on Our Website?</h2>
      <p className="mb-4">
        Below is a summary of the cookies currently used on our website along with their purpose and the conditions under which they are stored:
      </p>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2 text-left">Cookie Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Purpose</th>
              <th className="border border-gray-200 px-4 py-2 text-left">When and How It Is Stored</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Google Analytics</td>
              <td className="border border-gray-200 px-4 py-2">
                To perform website usage statistics, we use cookies to understand the recurrence of our visitors and identify which content is most interesting. This helps us concentrate our efforts on improving the most visited areas and making it easier for users to find what they need. Information from your visit may be used for anonymous statistical evaluations, to ensure continuity of service, or to improve our website. For more details, please refer to the privacy policy at{" "}
                <a
                  href="https://www.google.com/intl/es/policies/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  this link
                </a>
                .<br />
                <strong>Owner:</strong> Google Inc.
              </td>
              <td className="border border-gray-200 px-4 py-2">When accessing the page</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Facebook</td>
              <td className="border border-gray-200 px-4 py-2">
                To perform website usage statistics, we use cookies to understand the recurrence of our visitors and identify which content is most interesting. This helps us concentrate our efforts on improving the most visited areas and making it easier for users to find what they need. Information from your visit may be used for anonymous statistical evaluations, to ensure continuity of service, or to improve our website. For more details, please refer to the privacy policy at{" "}
                <a
                  href="https://www.facebook.com/privacy/explanation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  this link
                </a>
                .<br />
                <strong>Owner:</strong> Facebook, Inc.
              </td>
              <td className="border border-gray-200 px-4 py-2">When accessing the page</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* What Can You Do with Cookies */}
      <h2 className="text-2xl font-semibold mb-4">What Can You Do with Cookies?</h2>
      <p className="mb-4">
        When you first access our website, a window appears informing you that cookies can be of various types:
      </p>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>
          Technical cookies are necessary for our website to function, do not require your authorization, and are the only ones activated by default.
        </li>
        <li>
          Other cookies are used to improve our website, personalize it based on your preferences, or display advertising tailored to your searches, tastes, and personal interests. You can accept all these cookies by clicking the ACCEPT button or configure/reject them by accessing the COOKIES SETTINGS section.
        </li>
      </ul>
      <p className="mb-4">
        Once you have enabled any type of cookies, you can disable them at any time simply by unchecking the corresponding option in the COOKIES SETTINGS section of our website. It will always be as easy to enable our own cookies as it is to disable them.
      </p>
      <p className="mb-4">
        Also, remember that you can block or be notified about cookies through your browser settings; however, this may affect the proper functioning of certain features of our website, especially those related to necessary technical cookies.
      </p>
      <p className="mb-4">
        Finally, if you enable third-party cookies (from external companies that provide services for our website) and later wish to disable them, you can do so in two ways: by using your browser’s cookie deactivation tools or through the deactivation systems provided by those external providers.
      </p>
      <p className="mb-4">
        To make it easier for you, below are links to cookie deactivation guidelines for common browsers:
      </p>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>Google Chrome</li>
        <li>Mozilla Firefox</li>
        <li>Internet Explorer</li>
        <li>Safari</li>
        <li>Safari for iOS (iPhone and iPad)</li>
        <li>Google Chrome for Android</li>
        <li>Google Chrome for iPhone and iPad</li>
      </ul>
      <p className="mb-4">
        We also provide links to the deactivation systems provided by each of the external providers for their cookies:
      </p>
      <p>
        <a
          href="https://www.google.com/intl/es/policies/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          https://www.google.com/intl/es/policies/privacy
        </a>
      </p>
    </div>
  );
}

export default CookiesPolicy;
