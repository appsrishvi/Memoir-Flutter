import React, { useEffect, useState } from "react";
import { BookOpenText, ShieldCheck, Lock, Mail, ArrowUp, Check } from "lucide-react";

const sections = [
  { id: "introduction", num: "01", label: "Introduction & Scope" },
  { id: "collect", num: "02", label: "Information We Collect" },
  { id: "use", num: "03", label: "How We Use Your Information" },
  { id: "permissions", num: "04", label: "Device Permissions" },
  { id: "third-party", num: "05", label: "Third-Party Services" },
  { id: "security", num: "06", label: "Data Security & Isolation" },
  { id: "retention", num: "07", label: "Retention & Deletion" },
  { id: "children", num: "08", label: "Children's Privacy" },
  { id: "changes", num: "09", label: "Changes to This Policy" },
  { id: "contact", num: "10", label: "Contact Us" },
];

const tableRows = [
  {
    category: "Account & Profile",
    items: "Name, email address, date of birth, occupation, bio/motto, profile picture",
    purpose: "User authentication, profile personalization, and account management.",
    storage: "Encrypted Firebase Authentication & Cloud Firestore database.",
  },
  {
    category: "User-Generated Journal Content",
    items: "Diary titles, story text, mood selections, categories, custom styling preferences (layout, font, ink color), tags, dates, favorite flags, attached photos (up to 6 per entry)",
    purpose: "Core application functionality: rendering your personal timeline, private vault, and journal entries.",
    storage: "Encrypted Cloud Firestore database (users/{uid}/memories). Attached photos stored as compressed Base64 data within user documents.",
  },
  {
    category: "App Preferences & Local Security",
    items: "Theme mode (Light/Dark), notification schedules, App Lock status (fingerprint/PIN enabled)",
    purpose: "Retaining user preference settings and enforcing local app access security.",
    storage: "Local device storage via SharedPreferences / NSUserDefaults.",
  },
  {
    category: "Feedback & Support Ratings",
    items: "Star ratings, written reviews, feedback categories, platform metadata (Android/iOS), user email and name",
    purpose: "Customer support resolution, feature optimization, and app quality improvements.",
    storage: "Secure support backend and database. Voluntary submission only.",
  },
];

function SectionHeading({ num, title }: { num: string; title: string }) {
  return (
    <div className="mb-5 flex items-start gap-3 sm:gap-4">
      <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--sage-soft)] text-[13px] font-bold text-[var(--sage)]">{num}</span>
      <h2 className="font-serif-display text-[clamp(1.55rem,5vw,2.15rem)] font-semibold leading-[1.12] tracking-[-0.02em]">{title}</h2>
    </div>
  );
}

function Bullet({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-3 leading-[1.75] text-[var(--ink-soft)]">
      <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" aria-hidden="true" />
      <span><strong className="font-semibold text-[var(--ink)]">{title}: </strong>{children}</span>
    </li>
  );
}

export default function App() {
  const [active, setActive] = useState("introduction");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 700);
      const ids = sections.map((s) => s.id);
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 180) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div data-safe-area-inset-root style={{ boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)", minHeight: "100vh", background: "var(--paper)" }}>
      {/* Sticky header — one single line: logo + all links + Contact Us */}
      <header data-safe-area-sticky-top className="sticky z-30 px-3 pt-3 sm:px-4" style={{ top: "var(--safe-area-inset-top)" }}>
        <div className="mx-auto max-w-[1080px]">
          <div className="flex min-h-[68px] flex-nowrap items-center justify-between gap-2 overflow-hidden rounded-[999px] border border-[var(--line)] bg-[var(--surface)]/90 px-2 py-2 shadow-[0_10px_30px_rgba(31,41,55,0.12)] backdrop-blur-md sm:px-3">
            <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="flex shrink-0 flex-nowrap items-center gap-2.5 whitespace-nowrap" aria-label="Memoir — back to top">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--plum)] text-white"><BookOpenText className="h-5 w-5" /></span>
              <span className="leading-none">
                <span className="font-serif-display block text-[22px] font-semibold tracking-tight">Memoir</span>
                <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">Privacy Policy</span>
              </span>
            </a>
            <nav className="mx-1 flex min-w-0 flex-1 flex-nowrap items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }} aria-label="Policy sections">
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} onClick={(e) => { e.preventDefault(); go(s.id); }} className={`nav-link shrink-0 whitespace-nowrap rounded-full px-2 py-2 text-[12px] font-semibold sm:px-2.5 sm:text-[12.5px] ${active === s.id ? "bg-[var(--plum-soft)] text-[var(--plum)]" : "text-[var(--ink-soft)]"}`}>{s.label}</a>
              ))}
            </nav>
            <a href="#contact" onClick={(e) => { e.preventDefault(); go("contact"); }} className="shrink-0 whitespace-nowrap rounded-full bg-[#5B21B6] px-3 py-2.5 text-[12px] font-semibold text-white shadow-[0_6px_16px_rgba(91,33,182,0.30)] transition hover:bg-[#4C1D95] sm:px-4 sm:text-[13px]">Contact us</a>
          </div>
        </div>
      </header>

      <main id="top" className="mx-auto w-full max-w-[860px] px-4 pb-16 sm:px-6">
        {/* Hero */}
        <section className="pt-10 text-center sm:pt-14">
          <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--sage)]">
            <ShieldCheck className="h-4 w-4" /> Your words stay yours
          </div>
          <h1 className="font-serif-display mx-auto max-w-[720px] text-[clamp(2.4rem,8vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.035em]">Privacy Policy<br /><span className="italic text-[var(--plum)]">— Memoir</span></h1>
          <p className="mx-auto mt-5 max-w-[620px] text-[15px] font-medium leading-relaxed text-[var(--ink-soft)] sm:text-base">
            Effective Date: November 13, 2026 <span className="mx-1 text-[var(--muted)]">|</span> Last Updated: November 13, 2026
          </p>
          <p className="mx-auto mt-4 max-w-[620px] text-[15px] leading-relaxed text-[var(--muted)]">A clear account of what Memoir collects, why it is needed, and the control you keep over your private journal.</p>
        </section>

        {/* Table of contents */}
        <nav aria-label="Table of contents" className="policy-card no-print mt-10 p-4 sm:p-6">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Contents</p>
              <h2 className="font-serif-display mt-1 text-[24px] font-semibold">Find a section</h2>
            </div>
            <span className="text-[13px] text-[var(--muted)]">10 sections · About 6 minutes</span>
          </div>
          <div className="grid gap-1.5 sm:grid-cols-2">
            {sections.map((s) => (
              <button key={s.id} type="button" onClick={() => go(s.id)} className={`toc-link flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-left ${active === s.id ? "bg-[var(--plum-soft)] text-[var(--plum)]" : "text-[var(--ink-soft)]"}`}>
                <span className="w-6 shrink-0 text-[12px] font-bold text-[var(--muted)]">{s.num}</span>
                <span className="text-[14px] font-semibold leading-snug">{s.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="mt-6 space-y-5 sm:space-y-6">
          {/* 1 */}
          <section id="introduction" className="policy-card scroll-mt-24 p-5 sm:p-8">
            <SectionHeading num="01" title="Introduction & Scope" />
            <div className="space-y-4 leading-[1.8] text-[var(--ink-soft)]">
              <p>Memoir (“we,” “our,” or “us”) deeply respects your personal privacy and is committed to protecting your private reflections, personal journal entries, and account security. This Privacy Policy outlines the types of information we collect, how it is processed and secured, and the choices you have regarding your personal data.</p>
              <p>This policy applies to the Memoir mobile application (available on Android and iOS platforms) and its associated cloud infrastructure and services. By using Memoir, you agree to the collection and use of information in accordance with this policy.</p>
            </div>
          </section>

          {/* 2 */}
          <section id="collect" className="policy-card scroll-mt-24 p-5 sm:p-8">
            <SectionHeading num="02" title="Information We Collect" />
            <p className="mb-5 leading-[1.8] text-[var(--ink-soft)]">We collect information to provide, personalize, and secure your journaling experience. The table below details the categories of data processed by Memoir:</p>
            <div className="table-wrap rounded-2xl border border-[var(--line)]">
              <table className="policy-table">
                <thead><tr><th scope="col">Data Category</th><th scope="col">Specific Data Items</th><th scope="col">Purpose of Collection</th><th scope="col">Storage Location</th></tr></thead>
                <tbody>
                  {tableRows.map((row) => (
                    <tr key={row.category}>
                      <td data-label="Data Category" className="font-semibold text-[var(--ink)]">{row.category}</td>
                      <td data-label="Specific Data Items" className="text-[var(--ink-soft)]">{row.items}</td>
                      <td data-label="Purpose of Collection" className="text-[var(--ink-soft)]">{row.purpose}</td>
                      <td data-label="Storage Location" className="text-[var(--ink-soft)]">{row.storage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 3 */}
          <section id="use" className="policy-card scroll-mt-24 p-5 sm:p-8">
            <SectionHeading num="03" title="How We Use Your Information" />
            <p className="mb-5 leading-[1.8] text-[var(--ink-soft)]">We process your data strictly to deliver and improve the Memoir experience. Specifically, we use your information to:</p>
            <ul className="space-y-4">
              <Bullet title="Account Authentication & Sync">Authenticate your identity and securely synchronize your private journal vault across your connected devices.</Bullet>
              <Bullet title="Personalized Features & Analytics">Render customized mood-reactive themes, custom story layouts, interactive timelines, calendar views, and personal reflection statistics (including word counts, mood trends, and category breakdowns).</Bullet>
              <Bullet title="Local Notifications">Deliver voluntary local journaling reminders, weekly summary digests, and milestone achievement alerts directly to your device.</Bullet>
              <Bullet title="Customer Support">Respond to inquiries, troubleshoot technical issues, and evaluate app enhancements submitted through the in-app support forms.</Bullet>
            </ul>
            <div className="mt-7 rounded-2xl border border-[var(--line)] bg-[var(--sage-soft)]/70 p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-2.5">
                <Lock className="h-5 w-5 text-[var(--sage)]" />
                <h3 className="font-serif-display text-[20px] font-semibold">Strict Data Use Guarantees</h3>
              </div>
              <ul className="space-y-4">
                <Bullet title="No Monetization or Selling">We do not sell, rent, trade, or otherwise monetize your personal data or private journal entries under any circumstances.</Bullet>
                <Bullet title="No Third-Party Advertising">Your private journal content is never shared with third parties for marketing or targeted advertising purposes.</Bullet>
                <Bullet title="No AI Model Training">Your personal journal entries and photos are never used to train public or commercial artificial intelligence (AI) or machine learning models.</Bullet>
              </ul>
            </div>
          </section>

          {/* 4 */}
          <section id="permissions" className="policy-card scroll-mt-24 p-5 sm:p-8">
            <SectionHeading num="04" title="Device Permissions We Request" />
            <p className="mb-5 leading-[1.8] text-[var(--ink-soft)]">To provide optional features, Memoir requests access to specific device capabilities. You can grant or revoke these permissions at any time through your operating system settings.</p>
            <ul className="space-y-4">
              <Bullet title="Photos / Media / Gallery & Camera">Required only when you explicitly select a photo to attach to a memory or set as your profile picture. Images are compressed locally on your device prior to encrypted synchronization.</Bullet>
              <Bullet title="Notifications">Used strictly to deliver scheduled daily journaling reminders, weekly reflection digests, and milestone alerts configured in your in-app Preferences.</Bullet>
              <Bullet title="Biometric / Device Credentials (Fingerprint, Face Unlock, Device PIN)">Used locally on your device via system-level authentication APIs when you enable App Lock. Biometric data is processed entirely by your device’s hardware and is never transmitted off-device or stored on our servers.</Bullet>
              <Bullet title="Internet & Network Access">Required to perform secure authentication and synchronize your journal entries with Cloud Firestore.</Bullet>
            </ul>
          </section>

          {/* 5 */}
          <section id="third-party" className="policy-card scroll-mt-24 p-5 sm:p-8">
            <SectionHeading num="05" title="Third-Party Services & Infrastructure" />
            <p className="mb-5 leading-[1.8] text-[var(--ink-soft)]">Memoir utilizes trusted cloud infrastructure providers to host and secure application data. All third-party services comply with strict data protection standards:</p>
            <ul className="space-y-4">
              <Bullet title="Firebase Authentication (Google LLC)">Handles secure identity management, including email/password sign-in, Google OAuth integration, and password recovery communications.</Bullet>
              <Bullet title="Cloud Firestore (Google LLC)">Provides cloud database storage for user profiles and journal entries. All data is encrypted in transit and at rest, governed by granular security rules isolating data to individual accounts (users/{`{uid}`}/memories).</Bullet>
              <Bullet title="Google Sign-In">Provided as an optional identity provider for seamless account creation and sign-in.</Bullet>
            </ul>
          </section>

          {/* 6 */}
          <section id="security" className="policy-card scroll-mt-24 p-5 sm:p-8">
            <SectionHeading num="06" title="Data Security & User Isolation" />
            <p className="mb-5 leading-[1.8] text-[var(--ink-soft)]">We implement rigorous technical and organizational security measures to protect your data:</p>
            <ul className="space-y-4">
              <Bullet title="Encryption in Transit & at Rest">All communication between the Memoir app and cloud servers occurs via secure, encrypted HTTPS/TLS connections. Data stored within Cloud Firestore is encrypted at rest using industry-standard AES-256 encryption.</Bullet>
              <Bullet title="Strict User Data Isolation">Database security is enforced using server-side Cloud Firestore Security Rules. Read and write access is strictly limited to the authenticated account owner corresponding to that unique User ID (request.auth.uid == userId). No other user can access or view your private entries.</Bullet>
            </ul>
          </section>

          {/* 7 */}
          <section id="retention" className="policy-card scroll-mt-24 p-5 sm:p-8">
            <SectionHeading num="07" title="Data Retention & Account Deletion Rights" />
            <p className="mb-5 leading-[1.8] text-[var(--ink-soft)]">You retain full control over your personal data at all times:</p>
            <ul className="space-y-4">
              <Bullet title="Data Retention">Your journal entries and media remain stored in your private cloud vault for as long as your account remains active.</Bullet>
              <Bullet title="Content Deletion">You may edit or permanently delete individual journal entries at any time directly within the application interface.</Bullet>
              <Bullet title="Account & Full Data Deletion">You have the right to request full account and data erasure. You can permanently delete your account and all associated journal data instantly by navigating inside the app to: Profile → Preferences → Privacy & Security → Delete Account & Data. Alternatively, you may submit a manual deletion request by emailing <a className="mail-link rounded px-1 font-semibold text-[var(--plum)] underline decoration-[var(--plum)]/40 underline-offset-4" href="mailto:privacy@memoir.app">privacy@memoir.app</a>. Upon account deletion, all account records, journal entries, and attached files are permanently purged from our active databases and backup systems.</Bullet>
            </ul>
          </section>

          {/* 8 */}
          <section id="children" className="policy-card scroll-mt-24 p-5 sm:p-8">
            <SectionHeading num="08" title="Children's Privacy" />
            <p className="leading-[1.8] text-[var(--ink-soft)]">Memoir is not directed toward, nor intended for use by, children under the age of 13 (or the relevant legal age of digital consent in your jurisdiction). We do not knowingly collect or solicit personal information from children. If we become aware that a child under 13 has provided us with personal data, we will immediately delete such information from our servers.</p>
          </section>

          {/* 9 */}
          <section id="changes" className="policy-card scroll-mt-24 p-5 sm:p-8">
            <SectionHeading num="09" title="Changes to This Privacy Policy" />
            <p className="leading-[1.8] text-[var(--ink-soft)]">We may update this Privacy Policy periodically to reflect changes in our services, legal requirements, or privacy practices. Material updates will be notified by updating the “Last Updated” date at the top of this policy and publishing the revised policy within the application and on our public hosted policy page.</p>
          </section>

          {/* 10 */}
          <section id="contact" className="policy-card scroll-mt-24 p-5 sm:p-8">
            <SectionHeading num="10" title="Contact Us" />
            <p className="mb-6 leading-[1.8] text-[var(--ink-soft)]">If you have questions, feedback, or requests regarding this Privacy Policy or your personal data, please contact us at:</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: "Privacy Inquiries & Data Deletion", email: "privacy@memoir.app" },
                { label: "General Technical Support", email: "support@memoir.app" },
                { label: "Legal & Regulatory Inquiries", email: "legal@memoir.app" },
              ].map((c) => (
                <a key={c.email} href={`mailto:${c.email}`} className="mail-link group rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4">
                  <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--plum-soft)] text-[var(--plum)]"><Mail className="h-4 w-4" /></span>
                  <span className="block text-[14px] font-semibold leading-snug text-[var(--ink)]">{c.label}</span>
                  <span className="mt-2 block break-all text-[13px] font-medium text-[var(--plum)] underline decoration-[var(--plum)]/30 underline-offset-4">{c.email}</span>
                </a>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-2 rounded-xl bg-[var(--sage-soft)]/70 px-4 py-3 text-[13px] leading-relaxed text-[var(--ink-soft)]">
              <Check className="h-4 w-4 shrink-0 text-[var(--sage)]" /> Privacy and deletion requests go directly to the Memoir team — no form or account action is required to reach us by email.
            </div>
          </section>
        </div>

        <footer className="mt-10 border-t border-[var(--line)] pt-7 text-center">
          <p className="font-serif-display text-[20px] font-semibold">Memoir</p>
          <p className="mt-2 text-sm text-[var(--muted)]">© 2026 Memoir. Your words stay yours.</p>
          <p className="mt-1 text-xs text-[var(--muted)]">Effective Date: November 13, 2026 | Last Updated: November 13, 2026</p>
        </footer>
      </main>

      {showTop && (
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="no-print fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#E11D48] text-white shadow-[0_10px_24px_rgba(225,29,72,0.35)] transition hover:-translate-y-0.5 hover:bg-[#BE123C]" aria-label="Back to top">
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
