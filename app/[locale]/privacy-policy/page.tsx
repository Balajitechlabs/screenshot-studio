import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/landing/Navigation";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Screenshot Studio. What stays on your device, what is sent to our server, how ads and analytics use cookies, and how to opt out.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

const CONTACT_EMAIL = "kartik.labhshetwar@gmail.com";

const linkClassName =
  "text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground/60";

const INTER =
  "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2
        className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
        style={{ fontFamily: INTER }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClassName}
    >
      {children}
    </Link>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-muted px-1.5 py-0.5 text-[13px]">
      {children}
    </code>
  );
}

const THIRD_PARTY_COOKIES = [
  {
    name: "Google AdSense",
    purpose:
      "Serving ads, limiting how often you see the same ad, measuring ad performance, fraud prevention, and (only where you allow it) ad personalization.",
    policy: "https://policies.google.com/technologies/ads",
  },
  {
    name: "Google Analytics",
    purpose:
      "Counting visits and page views and understanding which pages are useful. Sets _ga cookies.",
    policy: "https://policies.google.com/privacy",
  },
  {
    name: "PostHog",
    purpose:
      "Product analytics for feature usage. Stores a first-party identifier so repeat visits are recognized.",
    policy: "https://posthog.com/privacy",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navigation />

      <main className="mx-auto max-w-3xl flex-1 px-6 pb-16 pt-28 sm:pb-24">
        <h1
          className="mb-2 text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl"
          style={{ fontFamily: INTER }}
        >
          Privacy Policy
        </h1>
        <p className="mb-12 text-sm text-muted-foreground">
          Last updated: September 27, 2026
        </p>

        <div className="max-w-none space-y-8">
          <Section title="Overview">
            <p className="mb-3 leading-relaxed text-muted-foreground">
              Screenshot Studio (screenshot-studio.com) is a free, open-source,
              browser-based image editor operated by Kartik Labhshetwar. There
              is no account, no signup, and no login, so we never ask you for a
              name, an email address, or payment details to use the editor.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Editing, compositing, and preview rendering happen on your device
              in the browser canvas. A few features do send data off your
              device, and the site is funded by advertising and measured with
              analytics. Each of these is described below. We do not sell your
              personal information.
            </p>
          </Section>

          <Section title="What Stays On Your Device">
            <p className="mb-3 leading-relaxed text-muted-foreground">
              Images you import from your device are read in the browser and are
              never uploaded to us for editing. The editor also stores your work
              in your own browser:
            </p>
            <ul className="list-inside list-disc space-y-2 text-muted-foreground">
              <li>
                <strong className="text-foreground">Drafts:</strong> your
                in-progress canvas is autosaved to IndexedDB and deleted
                automatically after 7 days.
              </li>
              <li>
                <strong className="text-foreground">Images:</strong> imported
                images under 500KB are kept in local storage so a reload does
                not lose them. Larger images are held in memory only.
              </li>
              <li>
                <strong className="text-foreground">Preferences:</strong> aspect
                ratio, export settings, custom presets, theme, and recent
                exports.
              </li>
              <li>
                <strong className="text-foreground">Image tools:</strong> the
                compress, convert, resize, crop, rotate, and background removal
                tools process files in your browser tab and write the result
                straight to your downloads. Re-encoding also drops embedded
                EXIF metadata such as camera details and GPS location.
              </li>
            </ul>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              None of this reaches our servers. Clearing site data in your
              browser removes all of it.
            </p>
          </Section>

          <Section title="What Leaves Your Device">
            <ul className="list-inside list-disc space-y-3 text-muted-foreground">
              <li>
                <strong className="text-foreground">Export compression:</strong>{" "}
                when you export, the rendered image is sent to our{" "}
                <Code>/api/export</Code> endpoint, recompressed in memory with
                Sharp, and returned to you. It is not written to disk, not
                stored, and not logged. Images above 4MB, and any failure or
                timeout, fall back to compression inside your browser.
              </li>
              <li>
                <strong className="text-foreground">
                  Capturing a screenshot from a URL:
                </strong>{" "}
                the address you enter is sent to{" "}
                <ExternalLink href="https://microlink.io">Microlink</ExternalLink>
                , which loads that page and captures it. The resulting image is
                cached in Cloudflare R2, and our database stores the normalized
                URL, a hash of it, the device and color-scheme options, and the
                storage key so repeat captures are fast. Only public web pages
                you explicitly submit are captured.
              </li>
              <li>
                <strong className="text-foreground">Importing a tweet:</strong>{" "}
                the numeric post id is sent to X&apos;s public syndication API to
                fetch the post content that gets rendered on your canvas.
              </li>
              <li>
                <strong className="text-foreground">
                  Removing a background:
                </strong>{" "}
                the image is processed entirely in your browser and is never
                uploaded. The first time you use it, your browser downloads the
                AI model files directly from{" "}
                <ExternalLink href="https://huggingface.co">
                  Hugging Face
                </ExternalLink>
                , which receives a standard file request (including your IP
                address) but no image data. The model is then cached in your
                browser.
              </li>
              <li>
                <strong className="text-foreground">Remote images:</strong>{" "}
                images referenced by URL are fetched through our image proxy,
                which is restricted to an allowlist of hosts.
              </li>
            </ul>
          </Section>

          <Section id="advertising" title="Advertising">
            <p className="mb-3 leading-relaxed text-muted-foreground">
              Screenshot Studio is free because it shows ads served by Google
              AdSense on content pages such as guides, comparisons, and tool
              pages. The images you edit are never shared with Google or any
              ad partner.
            </p>
            <ul className="list-inside list-disc space-y-3 text-muted-foreground">
              <li>
                Third-party vendors, including Google, use cookies to serve ads
                based on your prior visits to this website or other websites.
              </li>
              <li>
                Google&apos;s use of advertising cookies enables it and its
                partners to serve ads to you based on your visit to this site
                and/or other sites on the Internet.
              </li>
              <li>
                You may opt out of personalized advertising by visiting{" "}
                <ExternalLink href="https://www.google.com/settings/ads">
                  Google Ads Settings
                </ExternalLink>{" "}
                or{" "}
                <ExternalLink href="https://myadcenter.google.com">
                  My Ad Center
                </ExternalLink>
                . You can also opt out of some third-party vendors&apos; use of
                cookies for personalized advertising at{" "}
                <ExternalLink href="https://optout.aboutads.info">
                  aboutads.info
                </ExternalLink>{" "}
                (US) or{" "}
                <ExternalLink href="https://www.youronlinechoices.eu">
                  youronlinechoices.eu
                </ExternalLink>{" "}
                (EU).
              </li>
              <li>
                Google may also work with other certified ad vendors when
                serving ads here. The list of these vendors is available in{" "}
                <ExternalLink href="https://support.google.com/admanager/answer/9012903">
                  Google&apos;s ad technology providers list
                </ExternalLink>
                .
              </li>
              <li>
                Learn more about{" "}
                <ExternalLink href="https://policies.google.com/technologies/partner-sites">
                  how Google uses information from sites or apps that use its
                  services
                </ExternalLink>
                .
              </li>
            </ul>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              If you opt out, you will still see ads, but they will not be
              personalized based on your browsing.
            </p>
          </Section>

          <Section title="Analytics">
            <p className="mb-3 leading-relaxed text-muted-foreground">
              We use analytics to learn which pages and features are useful and
              to find bugs. We look at aggregate numbers, not at individuals.
            </p>
            <ul className="list-inside list-disc space-y-3 text-muted-foreground">
              <li>
                <strong className="text-foreground">Google Analytics:</strong>{" "}
                page views, referring sites, approximate location (country or
                city), and device and browser type. You can install the{" "}
                <ExternalLink href="https://tools.google.com/dlpage/gaoptout">
                  Google Analytics opt-out browser add-on
                </ExternalLink>
                .
              </li>
              <li>
                <strong className="text-foreground">PostHog:</strong> feature
                usage events, such as which editor controls are used and whether
                an export succeeded. Events never contain your images.
              </li>
              <li>
                <strong className="text-foreground">clicks.page:</strong> page
                view and link-click counts. It receives the page address,
                referrer, and standard request data such as your IP address and
                browser user agent.
              </li>
            </ul>
          </Section>

          <Section title="Hosting and Security">
            <ul className="list-inside list-disc space-y-3 text-muted-foreground">
              <li>
                <strong className="text-foreground">
                  Hosting and network:
                </strong>{" "}
                the site runs on Vercel behind Cloudflare. Both keep standard
                request logs, which include IP addresses, for security and
                reliability.
              </li>
              <li>
                <strong className="text-foreground">Rate limiting:</strong> the
                screenshot API keeps your IP address in server memory for up to
                60 seconds to enforce its per-minute limit. It is not written to
                a database.
              </li>
            </ul>
          </Section>

          <Section id="cookies" title="Cookies">
            <p className="mb-3 leading-relaxed text-muted-foreground">
              We set one functional cookie ourselves,{" "}
              <Code>screenshot-studio-store-active</Code>, and only when you
              have an App Store screenshot project open, so the page can restore
              it on your next visit. It holds the value 1 and no identifier.
            </p>
            <p className="mb-3 leading-relaxed text-muted-foreground">
              The following third parties may set cookies or similar
              identifiers when you visit the site:
            </p>
            <ul className="list-inside list-disc space-y-3 text-muted-foreground">
              {THIRD_PARTY_COOKIES.map((vendor) => (
                <li key={vendor.name}>
                  <strong className="text-foreground">{vendor.name}:</strong>{" "}
                  {vendor.purpose}{" "}
                  <ExternalLink href={vendor.policy}>Policy</ExternalLink>.
                </li>
              ))}
            </ul>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              You can block or delete cookies in your browser settings. The
              editor and image tools keep working without them.
            </p>
          </Section>

          <Section title="Consent in the EEA, UK, and Switzerland">
            <p className="leading-relaxed text-muted-foreground">
              If you visit from the European Economic Area, the United Kingdom,
              or Switzerland, a consent message from a Google-certified consent
              management platform asks for your choice before personalized ads
              and non-essential cookies are used. If you decline, Google may
              still show non-personalized ads, which use cookies only for
              frequency capping, aggregated reporting, and fraud prevention. You
              can change your choice at any time from the privacy link shown on
              the page.
            </p>
          </Section>

          <Section title="Legal Bases">
            <p className="leading-relaxed text-muted-foreground">
              Where data protection laws such as the GDPR apply, we process data
              on these bases: your consent for personalized advertising and
              non-essential cookies; our legitimate interest in keeping the site
              secure, reliable, and improving it, for request logs, rate
              limiting, and aggregate analytics; and performance of the service
              you ask for, when you use URL capture, tweet import, or export
              compression.
            </p>
          </Section>

          <Section title="Data Retention">
            <ul className="list-inside list-disc space-y-2 text-muted-foreground">
              <li>
                Images you edit: never stored on our servers. Export compression
                happens in memory and is discarded immediately.
              </li>
              <li>
                Cached URL screenshots: kept so repeat captures are fast, and
                removed on request for pages you control.
              </li>
              <li>
                Rate-limit entries: up to 60 seconds in memory.
              </li>
              <li>
                Analytics and advertising data: retained by each provider under
                its own policy and retention settings.
              </li>
            </ul>
          </Section>

          <Section title="Your Rights">
            <p className="mb-3 leading-relaxed text-muted-foreground">
              Depending on where you live, you may have the right to access,
              correct, delete, or port your personal data, to object to or
              restrict processing, and to withdraw consent at any time. Because
              we do not run accounts, we usually hold nothing that identifies
              you directly, but we will help with any request we can act on.
            </p>
            <p className="mb-3 leading-relaxed text-muted-foreground">
              California and other US state residents: we do not sell personal
              information for money. Personalized advertising by Google may be
              considered &quot;sharing&quot; under some state laws; you can opt
              out using the advertising links above or by emailing us.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              To make a request, email{" "}
              <Link href={`mailto:${CONTACT_EMAIL}`} className={linkClassName}>
                {CONTACT_EMAIL}
              </Link>
              . You also have the right to complain to your local data
              protection authority.
            </p>
          </Section>

          <Section title="Your Choices">
            <ul className="list-inside list-disc space-y-2 text-muted-foreground">
              <li>
                Clear site data in your browser to remove every draft, image,
                and preference stored locally.
              </li>
              <li>
                Opt out of personalized ads with Google Ads Settings, and block
                cookies or use a content blocker. The editor works without
                analytics and without ads.
              </li>
              <li>
                Skip URL capture and tweet import if you do not want those
                requests made. Importing images from your device never leaves
                the browser.
              </li>
              <li>
                Email us to have a cached screenshot of a page you control
                removed.
              </li>
            </ul>
          </Section>

          <Section title="Children">
            <p className="leading-relaxed text-muted-foreground">
              Screenshot Studio is not directed at children under 13 (or under
              16 in the EEA and UK), and we do not knowingly collect information
              from them. Ads on this site are not intended for children.
            </p>
          </Section>

          <Section title="Open Source">
            <p className="leading-relaxed text-muted-foreground">
              Screenshot Studio is open source. Every claim on this page about
              how the editor handles your images can be checked against the{" "}
              <ExternalLink href="https://github.com/opennookorg/screenshot-studio">
                source code on GitHub
              </ExternalLink>
              .
            </p>
          </Section>

          <Section title="Changes">
            <p className="leading-relaxed text-muted-foreground">
              We update this policy when the site changes, for example when we
              add or remove a third-party service. Changes are reflected on this
              page with an updated date.
            </p>
          </Section>

          <Section title="Contact">
            <p className="leading-relaxed text-muted-foreground">
              Questions about this policy or your data: email{" "}
              <Link href={`mailto:${CONTACT_EMAIL}`} className={linkClassName}>
                {CONTACT_EMAIL}
              </Link>{" "}
              or use our{" "}
              <Link href="/contact" className={linkClassName}>
                contact page
              </Link>
              .
            </p>
          </Section>
        </div>
      </main>

      <Footer brandName="Screenshot Studio" />
    </div>
  );
}
