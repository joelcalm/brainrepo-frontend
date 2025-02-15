// src/pages/LegalNotice.tsx

import React from "react";

function LegalNotice() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">Legal Notice and Terms of Use</h1>

      {/* Section 1 */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          1. Information in Compliance with Law 34/2002
        </h2>
        <p className="mb-4">
          In compliance with the provisions of Article 10 of Law 34/2002, of July 11,
          on Information Society Services and Electronic Commerce (hereinafter, LSSI-CE),
          we hereby explicitly, precisely, and unequivocally inform both the service recipients
          and the competent authorities of the following aspects related to the provider of
          information society services:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>
            <strong>Our business name:</strong> BRAIN REPO S.L.
          </li>
          <li>
            <strong>Main activity:</strong> Educational SaaS
          </li>
          <li>
            <strong>Address for notifications:</strong> Carrer Godua, Girona 17800
          </li>
          <li>
            <strong>Contact email:</strong> <a href="mailto:help@brainrepo.es" className="text-primary hover:underline">help@brainrepo.es</a>
          </li>
          <li>
            <strong>Website (URL):</strong> <a href="https://brainrepo.es/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">brainrepo.es</a>
          </li>
        </ul>
        <p>
          We are at your disposal, so please do not hesitate to contact us.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">2. Intellectual Property</h2>
        <p className="mb-4">
          The source code, graphic designs, images, photographs, sounds, animations,
          software, texts, as well as the information and content contained on this website,
          are protected by Spanish intellectual and industrial property laws in favor of
          BRAIN REPO S.L. It is not permitted to reproduce and/or publish, in whole or in part,
          this website, its computer processing, distribution, dissemination, modification,
          transformation, or decompilation, or to exercise any other rights legally granted to
          its owner without prior written permission from BRAIN REPO S.L.
        </p>
        <p className="mb-4">
          The user may use the material appearing on this website solely for personal and
          private use. Any use for commercial purposes or to engage in unlawful activities is
          strictly prohibited. All intellectual property rights are expressly reserved by BRAIN REPO S.L.
        </p>
        <p>
          BRAIN REPO S.L. will ensure compliance with the aforementioned conditions and the proper
          use of the content presented on its websites, exercising all civil and criminal actions
          available in the event of infringement or non-compliance by the user.
        </p>
      </section>

      {/* Section 3 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">3. Miscellaneous</h2>
        <p className="mb-4">
          BRAIN REPO S.L. may modify, without prior notice, the information contained on its website,
          as well as its configuration and presentation.
        </p>
        <p className="mb-4">
          BRAIN REPO S.L. commits, through this medium, to NOT ENGAGE IN MISLEADING ADVERTISING. In this
          regard, any formal or numerical errors found throughout the content of the various sections of
          the BRAIN REPO S.L. website—produced as a consequence of incomplete or defective maintenance and/or
          updating—will not be considered misleading advertising. BRAIN REPO S.L. is committed to correcting
          such errors as soon as they are identified.
        </p>
        <p className="mb-4">
          BRAIN REPO S.L. is not responsible for any breach of applicable regulations that the user might commit
          when accessing this website and/or using the information contained herein.
        </p>
        <p className="mb-4">
          BRAIN REPO S.L. shall not be held liable for any damages or losses, regardless of their nature,
          arising from the use of the information, content, links, or hypertext included on this website, as well
          as from the programs incorporated herein. The links and hypertext that allow the user to access services
          offered by third parties through this website are not under the control of BRAIN REPO S.L. and the entity
          is not responsible for the content contained in them or for any effects that may derive from that content.
        </p>
        <p>
          In summary, the user is solely responsible for the use made of the services, content, links, and hypertext
          included on this website.
        </p>
      </section>
    </div>
  );
}

export default LegalNotice;
