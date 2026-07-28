import type { Metadata } from "next";
import Link from "next/link";
import PageHeading from "@/components/ui/PageHeading";
import LegalProse, {
  LegalIntroNote,
  LegalNum,
  LegalContactCard,
} from "@/components/legal/LegalProse";

export const metadata: Metadata = {
  title: "Cookie Policy | V12 Automobil",
};

export default function CookiePolicyPage() {
  return (
    <>
      <nav className="pt-10 text-center font-serif text-xs text-muted">
        <Link href="/" className="transition-colors hover:text-rosso">
          Home
        </Link>
        <span className="mx-2 opacity-50">/</span>
        <span className="text-bianco">Cookie Policy</span>
      </nav>

      <PageHeading eyebrow="Legal" title="Cookie Policy" />

      <LegalProse>
        <LegalIntroNote>
          This Cookie Policy explains what cookies are, how V12 Automobil
          uses them on this website, the choices you have, and how to manage
          your cookie preferences.
        </LegalIntroNote>

        <h2>
          <LegalNum>1</LegalNum>What are cookies?
        </h2>
        <p>
          Cookies are small text files that are placed on your computer or
          mobile device when you visit a website. They are widely used to
          make websites work, or work more efficiently, as well as to
          provide information to the owners of the site. Cookies allow a
          website to recognise a user&apos;s device and remember information
          about their visit, such as preferences and actions taken on the
          site.
        </p>

        <h2>
          <LegalNum>2</LegalNum>How we use cookies
        </h2>
        <p>
          We use cookies for a number of reasons: to help the website
          function properly, to make it more secure, to remember your
          preferences between visits, to understand how visitors interact
          with our pages, and to help us provide relevant content and
          advertising. Some cookies are necessary for technical reasons for
          our website to operate, and we refer to these as
          &quot;essential&quot; or &quot;strictly necessary&quot; cookies.
          Other cookies enable us to track and target the interests of our
          users to enhance the experience on our website.
        </p>

        <h2>
          <LegalNum>3</LegalNum>Types of cookies we use
        </h2>
        <table>
          <tbody>
            <tr>
              <th>Category</th>
              <th>Purpose</th>
              <th>Can be disabled?</th>
            </tr>
            <tr>
              <td>
                <strong>Strictly necessary</strong>
              </td>
              <td>
                Required for the website to function — for example,
                remembering items in an enquiry form, enabling secure areas,
                or balancing load across our servers. Without these, parts
                of the site will not work as intended.
              </td>
              <td>No</td>
            </tr>
            <tr>
              <td>
                <strong>Performance &amp; analytics</strong>
              </td>
              <td>
                Collect information about how visitors use our website, such
                as which pages are visited most often, so we can measure and
                improve site performance. All information these cookies
                collect is aggregated and anonymous.
              </td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>
                <strong>Functionality</strong>
              </td>
              <td>
                Allow the website to remember choices you make (such as your
                region, or saved vehicle searches) and provide enhanced,
                more personal features.
              </td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>
                <strong>Targeting &amp; advertising</strong>
              </td>
              <td>
                Used to deliver adverts more relevant to you and your
                interests, limit the number of times you see an advert, and
                measure the effectiveness of advertising campaigns. They are
                usually placed by advertising networks with our permission.
              </td>
              <td>Yes</td>
            </tr>
          </tbody>
        </table>

        <h2>
          <LegalNum>4</LegalNum>Third-party cookies
        </h2>
        <p>
          In addition to our own cookies, we may also use various
          third-party cookies to report usage statistics of the website, and
          to help us serve relevant adverts. These may include cookies from
          analytics providers, social media platforms, and advertising
          networks. We do not control the setting of these cookies, so
          please check the relevant third party&apos;s website for more
          information about their cookies and how to manage them.
        </p>

        <h2>
          <LegalNum>5</LegalNum>Managing and disabling cookies
        </h2>
        <p>
          You can set your browser to refuse all or some browser cookies, or
          to alert you when websites set or access cookies. Most web
          browsers allow some control of most cookies through the browser
          settings. To find out more about cookies, including how to see
          what cookies have been set, visit www.aboutcookies.org or
          www.allaboutcookies.org.
        </p>
        <p>
          If you disable or refuse cookies, please note that some parts of
          this website may become inaccessible or not function properly.
          Disabling a cookie or category of cookies does not delete the
          cookie from your browser — you will need to do this yourself from
          within your browser.
        </p>

        <h2>
          <LegalNum>6</LegalNum>Changes to this cookie policy
        </h2>
        <p>
          We may update this cookie policy from time to time in order to
          reflect, for example, changes to the cookies we use or for other
          operational, legal or regulatory reasons. Please re-visit this
          page regularly to stay informed about our use of cookies.
        </p>

        <h2>
          <LegalNum>7</LegalNum>Contact us
        </h2>
        <p>
          If you have any questions about our use of cookies, please get in
          touch using the details below.
        </p>
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

        <hr />
        <p className="text-sm text-muted/70">
          This page sets out a standard cookie policy structure for V12
          Automobil, styled to match this site. If you&apos;d like this
          replaced with the exact cookie list and durations currently in use
          on v12automobil.co.uk, send over that copy and it can be swapped
          in directly.
        </p>
      </LegalProse>
    </>
  );
}
