import type { Metadata } from "next";
import Link from "next/link";
import PageHeading from "@/components/ui/PageHeading";
import LegalProse, {
  LegalIntroNote,
  LegalNum,
  LegalContactCard,
} from "@/components/legal/LegalProse";

export const metadata: Metadata = {
  title: "Privacy Policy | V12 Automobil",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <nav className="pt-10 text-center font-serif text-xs text-muted">
        <Link href="/" className="transition-colors hover:text-rosso">
          Home
        </Link>
        <span className="mx-2 opacity-50">/</span>
        <span className="text-bianco">Privacy Policy</span>
      </nav>

      <PageHeading eyebrow="Legal" title="Privacy Policy" />

      <LegalProse>
        <LegalIntroNote>
          Welcome to the V12 Automobil website privacy notice. V12 Automobil
          respects your privacy and is committed to protecting your personal
          data. This notice explains how we look after your personal data
          when you visit our website, and tells you about your privacy
          rights and how the law protects you.
        </LegalIntroNote>

        <h2>
          <LegalNum>1</LegalNum>Important information and who we are
        </h2>

        <h3>Purpose of this privacy notice</h3>
        <p>
          This privacy notice aims to give you information on how V12
          Automobil collects and processes your personal data through your
          use of this website, including any data you may provide through
          this website when you sign up to a newsletter or purchase a
          service. This website is not intended for children and we do not
          knowingly collect data relating to children. It is important that
          you read this privacy notice together with any other privacy
          notice or fair processing notice we may provide on specific
          occasions when we are collecting or processing personal data about
          you so that you are fully aware of how and why we are using your
          data. This privacy notice supplements the other notices and is not
          intended to override them.
        </p>

        <h3>Controller</h3>
        <p>
          V12 Automobil is the controller and responsible for your personal
          data (collectively referred to as &apos;Company&apos;,
          &apos;we&apos;, &apos;us&apos; or &apos;our&apos; in this privacy
          notice). We have appointed a data privacy manager who is
          responsible for overseeing questions in relation to this privacy
          notice. If you have any questions about this privacy notice,
          including any requests to exercise your legal rights, please
          contact the data privacy manager using the details set out below.
        </p>

        <h3>Contact details</h3>
        <LegalContactCard>
          <p>
            <strong>Full name of legal entity:</strong> V12 Automobil
          </p>
          <p>
            <strong>Data privacy manager:</strong> Josh Apps
          </p>
          <p>
            <strong>Email address:</strong> info@v12automobil.co.uk
          </p>
          <p>
            <strong>Postal address:</strong> Thomas House, 84 Eccleston
            Square, Pimlico, London, SW1V 1PX
          </p>
          <p>
            <strong>Telephone number:</strong> 0330 133 5108
          </p>
        </LegalContactCard>
        <p>
          You have the right to make a complaint at any time to the
          Information Commissioner&apos;s Office (ICO), the UK supervisory
          authority for data protection issues (www.ico.org.uk). We would,
          however, appreciate the chance to deal with your concerns before
          you approach the ICO so please contact us in the first instance.
          It is important that the personal data we hold about you is
          accurate and current. Please keep us informed if your personal
          data changes during your relationship with us.
        </p>

        <h3>Third-party links</h3>
        <p>
          This website may include links to third-party websites, plug-ins
          and applications. Clicking on those links or enabling those
          connections may allow third parties to collect or share data about
          you. We do not control these third-party websites and are not
          responsible for their privacy statements. When you leave our
          website, we encourage you to read the privacy notice of every
          website you visit.
        </p>

        <h2>
          <LegalNum>2</LegalNum>The data we collect about you
        </h2>
        <p>
          Personal data, or personal information, means any information
          about an individual from which that person can be identified. It
          does not include data where the identity has been removed
          (anonymous data). We may collect, use, store and transfer
          different kinds of personal data about you which we have grouped
          together as follows:
        </p>
        <ul>
          <li>
            <strong>Identity Data</strong> includes first name, maiden name,
            last name, username or similar identifier, marital status,
            title, date of birth and gender.
          </li>
          <li>
            <strong>Contact Data</strong> includes billing address, delivery
            address, email address and telephone numbers.
          </li>
          <li>
            <strong>Financial Data</strong> includes bank account and
            payment card details.
          </li>
          <li>
            <strong>Transaction Data</strong> includes details about
            payments to and from you and other details of products and
            services you have purchased from us.
          </li>
          <li>
            <strong>Technical Data</strong> includes internet protocol (IP)
            address, your login data, browser type and version, time zone
            setting and location, browser plug-in types and versions,
            operating system and platform and other technology on the
            devices you use to access this website.
          </li>
          <li>
            <strong>Profile Data</strong> includes your username and
            password, purchases or orders made by you, your interests,
            preferences, feedback and survey responses.
          </li>
          <li>
            <strong>Usage Data</strong> includes information about how you
            use our website, products and services.
          </li>
          <li>
            <strong>Marketing and Communications Data</strong> includes your
            preferences in receiving marketing from us and our third parties
            and your communication preferences.
          </li>
        </ul>
        <p>
          We also collect, use and share Aggregated Data such as statistical
          or demographic data for any purpose. Aggregated Data may be
          derived from your personal data but is not considered personal
          data in law as this data does not directly or indirectly reveal
          your identity. However, if we combine or connect Aggregated Data
          with your personal data so that it can directly or indirectly
          identify you, we treat the combined data as personal data which
          will be used in accordance with this privacy notice. We do not
          collect any Special Categories of Personal Data about you (this
          includes details about your race or ethnicity, religious or
          philosophical beliefs, sex life, sexual orientation, political
          opinions, trade union membership, information about your health
          and genetic and biometric data). Nor do we collect any information
          about criminal convictions and offences.
        </p>

        <h3>If you fail to provide personal data</h3>
        <p>
          Where we need to collect personal data by law, or under the terms
          of a contract we have with you and you fail to provide that data
          when requested, we may not be able to perform the contract we have
          or are trying to enter into with you (for example, to provide you
          with services). In this case, we may have to cancel a service you
          have with us but we will notify you if this is the case at the
          time.
        </p>

        <h2>
          <LegalNum>3</LegalNum>How is your personal data collected?
        </h2>
        <p>We use different methods to collect data from and about you including through:</p>
        <ul>
          <li>
            <strong>Direct interactions.</strong> You may give us your
            Identity, Contact and Financial Data by filling in forms or by
            corresponding with us by post, phone, email or otherwise. This
            includes personal data you provide when you apply for our
            services, make an enquiry, create an account on our website,
            subscribe to our service or publications, request marketing to
            be sent to you, enter a competition, promotion or survey, or
            give us some feedback.
          </li>
          <li>
            <strong>Automated technologies or interactions.</strong> As you
            interact with our website, we may automatically collect
            Technical Data about your equipment, browsing actions and
            patterns. We collect this personal data by using cookies,
            server logs and other similar technologies. We may also receive
            Technical Data about you if you visit other websites employing
            our cookies. Please see our{" "}
            <Link href="/cookie-policy">cookie policy</Link> for further
            details.
          </li>
          <li>
            <strong>Third parties or publicly available sources.</strong> We
            may receive Technical Data from analytics providers, advertising
            networks and search information providers; Contact, Financial
            and Transaction Data from providers of technical, payment and
            delivery services; and Identity and Contact Data from data
            brokers, aggregators or publicly available sources.
          </li>
        </ul>

        <h2>
          <LegalNum>4</LegalNum>How we use your personal data
        </h2>
        <p>
          We will only use your personal data when the law allows us to.
          Most commonly, we will use your personal data where we need to
          perform a contract we are about to enter into or have entered into
          with you, where it is necessary for our legitimate interests (or
          those of a third party) and your interests and fundamental rights
          do not override those interests, or where we need to comply with a
          legal or regulatory obligation. Generally we do not rely on
          consent as a legal basis for processing your personal data other
          than in relation to sending third party direct marketing
          communications to you via email or text message. You have the
          right to withdraw consent to marketing at any time by contacting
          us.
        </p>
        <p>
          We have set out below the purposes for which we plan to use your
          personal data, and which legal bases we rely on to do so. Note
          that we may process your personal data for more than one lawful
          ground depending on the specific purpose for which we are using
          your data.
        </p>

        <h3>To register you as a new user</h3>
        <p>
          Type of data: Identity, Contact. Lawful basis: Performance of a
          contract with you.
        </p>

        <h3>To process and deliver your enquiry, request or order</h3>
        <p>
          Including managing payments, fees and charges, collecting and
          recovering money owed to us, and managing financial applications.
          Type of data: Identity, Contact, Financial, Transaction, Marketing
          and Communications. Lawful basis: Performance of a contract with
          you; necessary for our legitimate interests (to recover debts due
          to us).
        </p>

        <h3>To manage our relationship with you</h3>
        <p>
          Including notifying you about changes to our terms or privacy
          policy, and asking you to leave a review or take a survey. Type of
          data: Identity, Contact, Profile, Marketing and Communications.
          Lawful basis: Performance of a contract with you; necessary to
          comply with a legal obligation; necessary for our legitimate
          interests (to keep our records updated and to study how customers
          use our services).
        </p>

        <h3>To enable you to partake in a prize draw, competition or survey</h3>
        <p>
          Type of data: Identity, Contact, Profile, Usage, Marketing and
          Communications. Lawful basis: Performance of a contract with you;
          necessary for our legitimate interests (to study how customers use
          our services, to develop them and grow our business).
        </p>

        <h3>To administer and protect our business and this website</h3>
        <p>
          Including troubleshooting, data analysis, testing, system
          maintenance, support, reporting and hosting of data. Type of data:
          Identity, Contact, Technical. Lawful basis: Necessary for our
          legitimate interests (running our business, IT services, network
          security, fraud prevention); necessary to comply with a legal
          obligation.
        </p>

        <h3>To deliver relevant website content and advertisements</h3>
        <p>
          And to measure or understand the effectiveness of the advertising
          we serve to you. Type of data: Identity, Contact, Profile, Usage,
          Marketing and Communications, Technical. Lawful basis: Necessary
          for our legitimate interests (to study how customers use our
          services, develop them, grow our business and inform our marketing
          strategy).
        </p>

        <h3>
          To use data analytics to improve our website, services, marketing
          and customer relationships
        </h3>
        <p>
          Type of data: Technical, Usage. Lawful basis: Necessary for our
          legitimate interests (to define customer types, keep our website
          relevant and inform our marketing strategy).
        </p>

        <h3>
          To make suggestions and recommendations to you about services that
          may interest you
        </h3>
        <p>
          Type of data: Identity, Contact, Technical, Usage, Profile. Lawful
          basis: Necessary for our legitimate interests (to develop our
          services and grow our business).
        </p>

        <h3>Marketing</h3>
        <p>
          We strive to provide you with choices regarding certain personal
          data uses, particularly around marketing and advertising. We may
          use your Identity, Contact, Technical, Usage and Profile Data to
          form a view on what we think you may want or need, or what may be
          of interest to you — this is how we decide which products,
          services and offers may be relevant for you. You will receive
          marketing communications from us if you have requested information
          from us or purchased services from us and you have not opted out
          of receiving that marketing.
        </p>

        <h3>Opting out</h3>
        <p>
          You can ask us or third parties to stop sending you marketing
          messages at any time by logging into the website and adjusting
          your marketing preferences, by following the opt-out links on any
          marketing message sent to you, or by contacting us directly. Where
          you opt out of receiving marketing messages, this will not apply
          to personal data provided to us as a result of a service purchase,
          service experience or other transactions.
        </p>

        <h3>Cookies</h3>
        <p>
          You can set your browser to refuse all or some browser cookies, or
          to alert you when websites set or access cookies. If you disable
          or refuse cookies, please note that some parts of this website may
          become inaccessible or not function properly. For more information
          about the cookies we use, please see our{" "}
          <Link href="/cookie-policy">cookie policy</Link>.
        </p>

        <h3>Change of purpose</h3>
        <p>
          We will only use your personal data for the purposes for which we
          collected it, unless we reasonably consider that we need to use it
          for another reason that is compatible with the original purpose.
          If we need to use your personal data for an unrelated purpose, we
          will notify you and explain the legal basis which allows us to do
          so. Please note that we may process your personal data without
          your knowledge or consent, in compliance with the above rules,
          where this is required or permitted by law.
        </p>

        <h2>
          <LegalNum>5</LegalNum>Disclosures of your personal data
        </h2>
        <p>
          We may have to share your personal data with external third
          parties who provide finance, website, IT and system administration
          services; professional advisers including lawyers, bankers,
          auditors and insurers; and HM Revenue &amp; Customs, regulators and
          other authorities based in the United Kingdom who require
          reporting of processing activities in certain circumstances. We
          may also share data with third parties to whom we may choose to
          sell, transfer, or merge parts of our business or our assets.
        </p>
        <p>
          If a change happens to our business, the new owners may use your
          personal data in the same way as set out in this privacy notice.
          We require all third parties to respect the security of your
          personal data and to treat it in accordance with the law, and we
          do not allow third-party service providers to use your personal
          data for their own purposes.
        </p>

        <h2>
          <LegalNum>6</LegalNum>International transfers
        </h2>
        <p>
          We do not transfer your personal data outside the European
          Economic Area (EEA).
        </p>

        <h2>
          <LegalNum>7</LegalNum>Data security
        </h2>
        <p>
          We have put in place appropriate security measures to prevent your
          personal data from being accidentally lost, used or accessed in an
          unauthorised way, altered or disclosed. In addition, we limit
          access to your personal data to those employees, agents,
          contractors and other third parties who have a business need to
          know, and they are subject to a duty of confidentiality. We have
          put in place procedures to deal with any suspected personal data
          breach and will notify you and any applicable regulator of a
          breach where we are legally required to do so.
        </p>

        <h2>
          <LegalNum>8</LegalNum>Data retention
        </h2>
        <p>
          We will only retain your personal data for as long as necessary to
          fulfil the purposes we collected it for, including for the
          purposes of satisfying any legal, accounting, or reporting
          requirements. To determine the appropriate retention period, we
          consider the amount, nature, and sensitivity of the personal data,
          the potential risk of harm from unauthorised use or disclosure,
          the purposes for which we process it, and the applicable legal
          requirements.
        </p>

        <h2>
          <LegalNum>9</LegalNum>Your legal rights
        </h2>
        <p>
          Under certain circumstances, you have rights under data protection
          laws in relation to your personal data, including the right to:
        </p>
        <ul>
          <li>Request access to your personal data.</li>
          <li>Request correction of your personal data.</li>
          <li>Request erasure of your personal data.</li>
          <li>Object to processing of your personal data.</li>
          <li>Request restriction of processing your personal data.</li>
          <li>Request transfer of your personal data.</li>
          <li>
            Withdraw consent at any time where we rely on consent to process
            your data.
          </li>
        </ul>
        <p>
          If you wish to exercise any of the rights set out above, please
          contact us. You will not usually have to pay a fee to access your
          personal data or exercise your other rights, although we may
          charge a reasonable fee, or refuse to comply, if your request is
          clearly unfounded, repetitive or excessive. We may need to request
          specific information from you to confirm your identity as a
          security measure, and we may contact you for further information
          to speed up our response. We try to respond to all legitimate
          requests within one month; occasionally it may take longer if your
          request is particularly complex, in which case we will notify you
          and keep you updated.
        </p>

        <h2>
          <LegalNum>10</LegalNum>Glossary
        </h2>
        <h3>Lawful basis</h3>
        <p>
          <strong>Legitimate Interest</strong> means the interest of our
          business in conducting and managing our business to enable us to
          give you the best service and the best and most secure experience.
          We make sure we consider and balance any potential impact on you
          before we process your personal data for our legitimate interests.{" "}
          <strong>Performance of Contract</strong> means processing your
          data where it is necessary for the performance of a contract to
          which you are a party, or to take steps at your request before
          entering into such a contract.{" "}
          <strong>Comply with a legal or regulatory obligation</strong>{" "}
          means processing your personal data where it is necessary for
          compliance with a legal or regulatory obligation that we are
          subject to.
        </p>

        <h3>Your legal rights, in detail</h3>
        <p>
          <strong>Request access</strong> to your personal data (a &apos;data
          subject access request&apos;) — to receive a copy of the personal
          data we hold about you and check that we are lawfully processing
          it.
        </p>
        <p>
          <strong>Request correction</strong> of the personal data that we
          hold about you, so that any incomplete or inaccurate data is
          corrected.
        </p>
        <p>
          <strong>Request erasure</strong> of your personal data where there
          is no good reason for us continuing to process it, including where
          you have successfully exercised your right to object, or where we
          are required to erase data to comply with local law.
        </p>
        <p>
          <strong>Object to processing</strong> of your personal data where
          we are relying on a legitimate interest and there is something
          about your particular situation which makes you want to object, or
          where we are processing your data for direct marketing purposes.
        </p>
        <p>
          <strong>Request restriction of processing</strong> of your
          personal data — for example while we establish its accuracy, or
          while you need us to hold it to establish, exercise or defend
          legal claims.
        </p>
        <p>
          <strong>Request the transfer</strong> of your personal data to you
          or to a third party, in a structured, commonly used,
          machine-readable format.
        </p>
        <p>
          <strong>Withdraw consent at any time</strong> where we are relying
          on consent to process your personal data, without affecting the
          lawfulness of processing carried out before you withdraw it.
        </p>

        <hr />
        <p className="text-sm text-muted/70">
          This page reflects the Privacy Policy published by V12 Automobil
          at v12automobil.co.uk, adapted here for style consistency. If you
          have any questions, please contact us at info@v12automobil.co.uk.
        </p>
      </LegalProse>
    </>
  );
}
