import React, { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  BookOpen,
  CalendarDays,
  Feather,
  Heart,
  Mail,
  Moon,
  PenLine,
  Sparkles,
  Vault,
} from "lucide-react";

const shellStyle: React.CSSProperties = {
  boxSizing: "border-box",
  paddingTop: "var(--safe-area-inset-top)",
  minHeight: "100vh",
  background: "var(--paper)",
};

const NAV = [
  { label: "Overview", href: "#overview" },
  { label: "Value", href: "#value" },
  { label: "2.1 Sign In", href: "#getting-started" },
  { label: "2.2 Dashboard", href: "#dashboard" },
  { label: "2.3 Writing", href: "#writing" },
  { label: "2.4 Reading", href: "#reading" },
  { label: "2.5 Timeline", href: "#timeline" },
  { label: "2.6 Profile", href: "#profile" },
  { label: "3.1 Frontend", href: "#frontend" },
  { label: "3.2 Backend", href: "#backend" },
  { label: "3.3 Mood Engine", href: "#mood-engine" },
  { label: "3.4 Images", href: "#images" },
  { label: "3.5 Notifications", href: "#notifications" },
];

const MOODS = [
  { pill: "All", hex: "#64748B", label: "Neutral Slate (#64748B)", tone: "Default feed state" },
  { pill: "Happy", hex: "#F59E0B", label: "Warm Amber (#F59E0B)", tone: "Joy, celebration, achievement" },
  { pill: "Calm", hex: "#10B981", label: "Soft Emerald (#10B981)", tone: "Peace, relaxation, clarity" },
  { pill: "Excited", hex: "#F43F5E", label: "Vibrant Coral (#F43F5E)", tone: "Energy, motivation, enthusiasm" },
  { pill: "Grateful", hex: "#8B5CF6", label: "Deep Violet (#8B5CF6)", tone: "Appreciation, mindfulness" },
  { pill: "Thoughtful", hex: "#6366F1", label: "Indigo (#6366F1)", tone: "Reflection, deep work, introspection" },
  { pill: "Sad", hex: "#0EA5E9", label: "Muted Ocean (#0EA5E9)", tone: "Melancholy, processing emotions" },
  { pill: "Stressed", hex: "#E11D48", label: "Crimson (#E11D48)", tone: "High tension, venting, pressure release" },
];

const VALUES = [
  { icon: Feather, title: "Expressive Storytelling & Customization", text: "Rich typography, flexible layout structures, ink options, and photo collage attachments." },
  { icon: Sparkles, title: "Adaptive Mood-Reactive Engine", text: "Dynamic UI palettes that react in real time to the emotional tone of your entries." },
  { icon: CalendarDays, title: "Timeline & Calendar Mapping", text: "Chronological archives and visual monthly grids with mood-tinted day indicators." },
  { icon: BookOpen, title: "Reflection Analytics", text: "Comprehensive breakdown of writing habits, streak tracking, mood distributions, and frequent tags." },
  { icon: Vault, title: "Isolated Cloud Vault", text: "End-to-end user isolation powered by Firebase Cloud Firestore, local biometric authentication, and client-side image optimization." },
];

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#5B21B6]">{children}</p>;
}
function SectionHead({ kicker, title, intro }: { kicker: string; title: string; intro?: string }) {
  return (
    <div className="mb-6">
      <Kicker>{kicker}</Kicker>
      <h2 className="font-serif-display mt-2 text-[clamp(1.75rem,5vw,2.5rem)] font-semibold leading-[1.08] tracking-tight">{title}</h2>
      {intro && <p className="mt-3 max-w-[72ch] text-[15px] leading-7 text-[var(--muted)]">{intro}</p>}
    </div>
  );
}
function Bullet({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <li className="flex gap-3 py-3">
      <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-[#5B21B6]" aria-hidden="true" />
      <div className="min-w-0 text-[15px] leading-7"><strong className="font-semibold">{title}</strong>{children ? <span className="text-[var(--muted)]"> {children}</span> : null}</div>
    </li>
  );
}
function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-[22px] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] sm:p-6">{children}</div>;
}

const FIRESTORE_TREE = `users/{uid}  [User Profile Document]
├── displayName: String
├── email: String
├── birthDate: String
├── occupation: String
├── bio: String
├── photoBase64: String
├── notificationSettings: Map
└── securitySettings: Map

users/{uid}/memories/{memoryId}  [Subcollection - Isolated Entries]
├── title: String
├── content: String
├── mood: String
├── category: String
├── layoutStyle: String
├── fontStyle: String
├── textColorKey: String
├── tags: Array<String>
├── photosBase64: Array<String>
├── isFavorite: Boolean
├── date: Timestamp
├── createdAt: Timestamp
└── updatedAt: Timestamp

feedbacks/{feedbackId}  [Global Feedback Submissions]
app_ratings/{ratingId}  [User Rating Submissions]`;

const SECURITY_RULES = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      match /memories/{memoryId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
    match /feedbacks/{documentId} {
      allow create: if request.auth != null;
    }
    match /app_ratings/{documentId} {
      allow create: if request.auth != null;
    }
  }
}`;

export default function App() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const backToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div data-safe-area-inset-root style={shellStyle} className="overflow-x-clip text-[var(--ink)]">
      {/* Sticky floating capsule navigation */}
      <header data-safe-area-sticky-top style={{ top: "var(--safe-area-inset-top)" }} className="sticky z-40 px-3 pt-3 sm:px-5 sm:pt-4">
        <nav aria-label="Guide navigation" className="mx-auto flex max-w-[1080px] items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] py-2 pl-3 pr-2 shadow-[var(--shadow)]">
          <a href="#top" className="flex flex-none items-center gap-2 rounded-full py-1 pr-2" aria-label="Momently guide home">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#5B21B6] text-white"><BookOpen size={17} /></span>
            <span className="font-serif-display text-[19px] font-semibold leading-none">Momently</span>
          </a>
          <div className="nav-scroll flex flex-1 flex-nowrap items-center gap-1 overflow-x-auto whitespace-nowrap py-1">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="flex-none rounded-full px-2.5 py-1.5 text-[13px] font-medium text-[var(--muted)] transition hover:bg-[var(--plum-soft)] hover:text-[var(--ink)]">{item.label}</a>
            ))}
          </div>
          <a href="#contact" className="flex-none rounded-full bg-[#5B21B6] px-3.5 py-2 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#4C1D95]">Contact Us</a>
        </nav>
      </header>

      <main id="top" className="mx-auto w-full max-w-[900px] px-4 pb-16 sm:px-6">
        {/* Hero */}
        <section className="pt-9 text-center sm:pt-12">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-xs font-semibold text-[var(--muted)]"><Sparkles size={14} className="text-[#5B21B6]" /> A private journal · A personal cloud vault</div>
          <h1 className="font-serif-display mx-auto mt-5 max-w-[820px] text-[clamp(2.35rem,7vw,4.25rem)] font-semibold leading-[0.98] tracking-tight">Momently App Guide: How to Use &amp; How It Works</h1>
          <p className="mx-auto mt-5 max-w-[680px] text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">A calm companion for daily micro-journaling — expressive pages, mood-aware colour, and a private archive that grows with you.</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a href="#getting-started" className="rounded-full bg-[#5B21B6] px-5 py-3 text-sm font-semibold text-white shadow-sm">Start with Sign In</a>
            <a href="#frontend" className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold">See how it works</a>
          </div>
          <div className="mx-auto mt-8 grid max-w-[720px] grid-cols-3 divide-x divide-[var(--line)] rounded-2xl border border-[var(--line)] bg-[var(--surface)] py-4 text-center">
            <div><p className="font-serif-display text-xl font-semibold sm:text-2xl">7 moods</p><p className="mt-1 text-[11px] uppercase tracking-wider text-[var(--muted)]">Reactive palettes</p></div>
            <div><p className="font-serif-display text-xl font-semibold sm:text-2xl">4 layouts</p><p className="mt-1 text-[11px] uppercase tracking-wider text-[var(--muted)]">Classic → Polaroid</p></div>
            <div><p className="font-serif-display text-xl font-semibold sm:text-2xl">6 photos</p><p className="mt-1 text-[11px] uppercase tracking-wider text-[var(--muted)]">Per memory</p></div>
          </div>
        </section>

        {/* Overview */}
        <section id="overview" className="scroll-mt-28 pt-14">
          <SectionHead kicker="Overview" title="A journal that listens to the day." />
          <Card><p className="text-[16px] leading-8">Momently is a private, mood-reactive digital journal and photo diary built natively with Flutter and Firebase. Designed to serve as a personal cloud vault, Momently transforms daily micro-journaling into an immersive aesthetic experience.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Private by design", "Mood-reactive", "Photo diary", "Cloud vault"].map((t) => <span key={t} className="rounded-full bg-[var(--plum-soft)] px-3 py-1.5 text-xs font-semibold text-[#5B21B6]">{t}</span>)}
            </div>
          </Card>
        </section>

        {/* Value */}
        <section id="value" className="scroll-mt-28 pt-14">
          <SectionHead kicker="Core Value Proposition" title="Five reasons Momently feels different." />
          <div className="grid gap-4 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <article key={v.title} className={`rounded-[22px] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] ${i === 4 ? "sm:col-span-2" : ""}`}>
                <div className="flex items-start gap-3"><span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-[var(--plum-soft)] text-[#5B21B6]"><v.icon size={19} /></span><div><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">0{i + 1}</p><h3 className="font-serif-display mt-1 text-xl font-semibold leading-snug">{v.title}</h3></div></div>
                <p className="mt-3 text-[15px] leading-7 text-[var(--muted)]">{v.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* PART 1 */}
        <div className="mt-16 overflow-hidden rounded-[26px] bg-[#1F2937] px-6 py-8 text-center text-white sm:py-10">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#C4B5FD]">Part 1</p>
          <h2 className="font-serif-display mt-2 text-[clamp(1.9rem,5vw,2.8rem)] font-semibold leading-tight">How to Use Momently</h2>
          <p className="mx-auto mt-2 max-w-[560px] text-sm leading-6 text-[#D1D5DB]">The everyday guide — from your first sign-in to reading, editing, and reflecting on your memories.</p>
        </div>

        {/* 2.1 */}
        <section id="getting-started" className="scroll-mt-28 pt-14">
          <SectionHead kicker="2.1 · Getting Started & Signing In" title="Choose how you want to arrive." intro="Momently provides flexible authentication options to suit user preferences, including quick demo access for evaluation." />
          <Card><ul className="divide-y divide-[var(--line)]">
            <Bullet title="Email & Password Login:" >Enter your registered email address and password on the Sign In screen, then tap Sign In.</Bullet>
            <Bullet title="Google Sign-In:" >Tap Continue with Google for one-tap OAuth authentication. First-time users are guided through a lightweight profile set-up (full name, birth date, occupation, and bio).</Bullet>
            <Bullet title="New Account Registration:" >Tap Sign Up on the authentication landing page, enter your credentials, complete your profile details, and establish your journal vault.</Bullet>
            <Bullet title="Demo Reviewer Mode (No Verification Required):" >Tap Use Demo Account (or enter demo@momently.app / Demo@1234) and tap Sign In to immediately explore pre-populated journal data without requiring email verification.</Bullet>
            <Bullet title="Password Recovery:" >If you forget your password, tap Forgot Password? on the sign-in screen to receive an automated reset link via email.</Bullet>
          </ul></Card>
          <p className="mt-3 rounded-2xl border border-dashed border-[var(--line)] bg-[var(--paper-2)] px-4 py-3 text-sm leading-6 text-[var(--muted)]"><strong className="text-[var(--ink)]">Demo tip:</strong> Demo Reviewer Mode is the fastest way to evaluate Momently — no verification step stands between you and the journal.</p>
        </section>

        {/* 2.2 */}
        <section id="dashboard" className="scroll-mt-28 pt-14">
          <SectionHead kicker="2.2 · Navigating the Home Dashboard" title="Your day, at a glance." intro="The Home Dashboard serves as your central command center, updating dynamically based on your journaling activity." />
          <Card><ul className="divide-y divide-[var(--line)]">
            <Bullet title="Top Greeting Capsule:" >Displays a personalized greeting (adapting to morning, afternoon, or evening), your profile avatar, and a quick Saved heart toggle to instantly filter for favorited entries.</Bullet>
            <Bullet title="Mood-Reactive Hero Banner:" >Highlights total saved memories, your active daily journaling streak, monthly entry counts, and a direct + New Entry quick action button.</Bullet>
            <Bullet title="Search & Mood Filter Strip:" >Real-time search across recent memories (today and yesterday) by keyword or #tags. Filter the feed using mood pills:</Bullet>
          </ul></Card>
          <div className="table-wrap mt-4 overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow)]">
            <table className="w-full border-collapse text-left text-sm">
              <thead><tr className="bg-[var(--paper-2)]"><th className="px-4 py-3 font-semibold">Mood Pill</th><th className="px-4 py-3 font-semibold">Primary Aesthetic Accent</th><th className="px-4 py-3 font-semibold">Emotional Tone Target</th></tr></thead>
              <tbody>{MOODS.map((m) => <tr key={m.pill} className="border-t border-[var(--line)]"><td className="px-4 py-3 font-semibold">{m.pill}</td><td className="px-4 py-3"><span className="inline-flex items-center gap-2"><span className="dot" style={{ background: m.hex, color: m.hex }} /><span>{m.label}</span></span></td><td className="px-4 py-3 text-[var(--muted)]">{m.tone}</td></tr>)}</tbody>
            </table>
          </div>
        </section>

        {/* 2.3 */}
        <section id="writing" className="scroll-mt-28 pt-14">
          <SectionHead kicker="2.3 · Writing & Customizing a Memory" title="Six steps from a feeling to a finished page." />
          <ol className="space-y-4">
            {[
              { t: "Initiate Entry", d: "Tap + New Entry from the Hero Banner or navigate to the Write tab on the bottom capsule bar." },
              { t: "Date & Category Selection", d: "Set the entry date and assign a category (Personal, Travel, Work & Study, Milestones, Gratitude, Health & Fitness)." },
              { t: "Select Current Mood", d: "Tap a mood emoji pill. The screen's background gradient, accents, and borders will update immediately to reflect the chosen mood." },
              { t: "Choose Layout Structure", d: "Classic: Clean standard card layout with balanced margins. Magazine: Featured left mood accent bar paired with an uppercase category kicker. Minimal: Distraction-free, translucent card frame highlighting body text. Polaroid: Styled framed card featuring a monospace date stamp at the base." },
              { t: "Set Typography & Ink Color", d: "Select from 4 font families (Modern, Serif, Typewriter, Handwritten) and pair with 6 ink options (Auto, Mood, Ink/Charcoal, Navy, Sage, Plum)." },
              { t: "Attach Media & Tags", d: "Upload up to 6 photos from your device gallery and append up to 8 #tags. Tap Save to commit the entry to your vault." },
            ].map((s, i) => (
              <li key={s.t} className="flex gap-4 rounded-[22px] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]">
                <span className="step-num grid h-11 w-11 flex-none place-items-center rounded-full bg-[#5B21B6] text-lg font-semibold text-white">{i + 1}</span>
                <div><h3 className="font-serif-display text-lg font-semibold">{s.t}</h3><p className="mt-1 text-[15px] leading-7 text-[var(--muted)]">{s.d}</p></div>
              </li>
            ))}
          </ol>
        </section>

        {/* 2.4 */}
        <section id="reading" className="scroll-mt-28 pt-14">
          <SectionHead kicker="2.4 · Reading, Editing & Managing Memories" title="Revisit a memory, gently." />
          <Card><ul className="divide-y divide-[var(--line)]">
            <Bullet title="Memory Reader:" >Tap any entry card across the Home, Timeline, or Favorites views to slide up the full-screen bottom sheet reader.</Bullet>
            <Bullet title="Interactive Photo Viewer:" >Tap any image within an entry's adaptive photo collage to open a full-screen gallery supporting pinch-to-zoom and horizontal swiping.</Bullet>
            <Bullet title="Management Controls:" >Use the top bar action icons inside the Memory Reader:</Bullet>
          </ul>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[{ icon: Heart, l: "Heart Icon", d: "Toggle favorite status." }, { icon: PenLine, l: "Pencil Icon", d: "Re-open the entry in the Write editor with existing data populated." }, { icon: Moon, l: "Trash Icon", d: "Permanently delete the document from Firestore and cloud storage." }].map((a) => <div key={a.l} className="rounded-2xl bg-[var(--paper-2)] p-4"><a.icon size={19} className="text-[#5B21B6]" /><p className="mt-2 font-semibold">{a.l}</p><p className="mt-1 text-sm leading-6 text-[var(--muted)]">{a.d}</p></div>)}
          </div></Card>
        </section>

        {/* 2.5 */}
        <section id="timeline" className="scroll-mt-28 pt-14">
          <SectionHead kicker="2.5 · Exploring Timeline, Calendar & Insights" title="See the shape of your months." />
          <Card><ul className="divide-y divide-[var(--line)]">
            <Bullet title="Timeline Screen:" >Browse your complete journal archive chronologically grouped by date. Filter entries using top month pills, jump to specific calendar dates, or toggle the Favorites switch.</Bullet>
            <Bullet title="Memory Calendar:" >A full-month calendar grid mapping entries to specific days using mood emojis and subtle background tinting. Tapping any calendar day displays all memories recorded on that date.</Bullet>
            <Bullet title="Reflection Insights:" >Analytics dashboard providing data visualizations across 7D, 30D, and All Time windows:</Bullet>
          </ul>
          <ul className="mt-4 space-y-2 pl-1 text-[15px] leading-7 text-[var(--muted)]">
            <li>• Total memory count and total/average word metrics.</li>
            <li>• Activity bar charts visualizing journaling frequency by day of the week.</li>
            <li>• Mood breakdown progress bars displaying emotional distribution.</li>
            <li>• Category distribution tables and top used #tags.</li>
          </ul></Card>
        </section>

        {/* 2.6 */}
        <section id="profile" className="scroll-mt-28 pt-14">
          <SectionHead kicker="2.6 · Profile, Preferences & Support" title="Make Momently yours — and keep it safe." />
          <Card><ul className="divide-y divide-[var(--line)]">
            <Bullet title="Edit Profile:" >Update your avatar image, display name, birth date, primary occupation, and personal bio/motto.</Bullet>
            <Bullet title="Appearance:" >Seamlessly toggle between Light Mode and Dark Mode via the top navigation bar or under profile settings.</Bullet>
            <Bullet title="Notifications:" >Daily Reminders: Configure a custom daily journaling alarm time. Weekly Digests: Toggle Sunday summary notifications. Milestone Alerts: Receive celebratory push notifications upon reaching 1, 10, 50, and 100 entries.</Bullet>
            <Bullet title="Privacy & Security:" >Request automated password reset emails, toggle biometric app lock (FaceID / Fingerprint / Device PIN), or trigger full account data deletion.</Bullet>
            <Bullet title="Support & Legal:" >Access Help Center FAQs, submit feedback or star ratings directly to the database, review Terms & Privacy Policies, and check app build versions.</Bullet>
          </ul></Card>
        </section>

        {/* PART 2 */}
        <div className="mt-16 overflow-hidden rounded-[26px] bg-[#5B21B6] px-6 py-8 text-center text-white sm:py-10">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#DDD6FE]">Part 2</p>
          <h2 className="font-serif-display mt-2 text-[clamp(1.9rem,5vw,2.8rem)] font-semibold leading-tight">How Momently Works</h2>
          <p className="mx-auto mt-2 max-w-[560px] text-sm leading-6 text-[#EDE9FE]">Technical architecture &amp; workflow — the quiet machinery behind the calm interface.</p>
        </div>

        {/* 3.1 */}
        <section id="frontend" className="scroll-mt-28 pt-14">
          <SectionHead kicker="3.1 · Frontend Architecture (Flutter & Dart)" title="One codebase, three calm layers." intro="Momently is built as a single-codebase cross-platform application using modern Flutter architectural patterns." />
          <div className="space-y-2">
            {[
              { label: "FLUTTER UI LAYER", items: ["Material Theming", "AnimatedBackgroundWidget", "Capsule Nav Bar"] },
              { label: "STATE MANAGEMENT LAYER", items: ["AuthProvider (Auth Status, User Profile)", "ThemeProvider (ThemeMode, Light/Dark Sync)"] },
              { label: "DATA & STORAGE LAYER", items: ["Firebase Auth", "Cloud Firestore", "Local Auth / SharedPreferences"] },
            ].map((layer, idx) => (
              <React.Fragment key={layer.label}>
                {idx > 0 && <div className="flex justify-center py-1 text-[#5B21B6]" aria-hidden="true"><ArrowDown size={20} /></div>}
                <div className="rounded-[22px] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5B21B6]">{layer.label}</p>
                  <div className="mt-3 flex flex-wrap gap-2">{layer.items.map((it) => <span key={it} className="rounded-full border border-[var(--line)] bg-[var(--paper-2)] px-3 py-1.5 text-sm">{it}</span>)}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
          <Card><div><ul className="divide-y divide-[var(--line)]">
            <Bullet title="UI Components:" >Utilizes Material 3 design systems, custom animations via AnimatedBackgroundWidget, and floating capsule navigation bars.</Bullet>
            <Bullet title="State Management:" >Powered by Provider. AuthProvider handles user authentication states, profile loading, and authorization guards. ThemeProvider manages theme persistence (ThemeMode.light vs ThemeMode.dark) across app restarts.</Bullet>
          </ul></div></Card>
        </section>

        {/* 3.2 */}
        <section id="backend" className="scroll-mt-28 pt-14">
          <SectionHead kicker="3.2 · Backend & Cloud Storage (Firebase)" title="Isolated by design, synced everywhere." intro="Momently uses Firebase backend infrastructure for data isolation and cross-device sync." />
          <h3 className="font-serif-display mb-3 text-xl font-semibold">Cloud Firestore Data Structure</h3>
          <pre className="overflow-x-auto rounded-[18px] bg-[#181826] p-5 text-[13px] leading-6 text-[#F3EFE8]"><code>{FIRESTORE_TREE}</code></pre>
          <h3 className="font-serif-display mb-3 mt-8 text-xl font-semibold">Security &amp; Access Control</h3>
          <p className="mb-4 text-[15px] leading-7 text-[var(--muted)]">Strict Firestore Security Rules govern the database to enforce complete privacy:</p>
          <pre className="overflow-x-auto rounded-[18px] bg-[#181826] p-5 text-[13px] leading-6 text-[#F3EFE8]"><code>{SECURITY_RULES}</code></pre>
        </section>

        {/* 3.3 */}
        <section id="mood-engine" className="scroll-mt-28 pt-14">
          <SectionHead kicker="3.3 · Mood-Reactive Styling Engine" title="Colour that follows feeling." intro="The core visual feature of Momently is its mood-reactive dynamic engine. Every entry retains styling properties (layoutStyle, fontStyle, textColorKey, mood) inside Firestore, allowing disparate components to render identical typography and color accents." />
          <div className="table-wrap overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow)]">
            <table className="compact w-full border-collapse text-left text-sm">
              <thead><tr className="bg-[var(--paper-2)]"><th className="px-4 py-3 font-semibold">Parameter</th><th className="px-4 py-3 font-semibold">Handled Values</th><th className="px-4 py-3 font-semibold">Engine Resolution Mechanism</th></tr></thead>
              <tbody>
                <tr className="border-t border-[var(--line)]"><td className="px-4 py-3 font-semibold">Mood Accent</td><td className="px-4 py-3">Happy, Calm, Excited, Grateful, Thoughtful, Sad, Stressed</td><td className="px-4 py-3 text-[var(--muted)]">Maps through _colorForMood(mood, isDark) to generate dynamic gradients, card borders, and chart colors.</td></tr>
                <tr className="border-t border-[var(--line)]"><td className="px-4 py-3 font-semibold">Layout</td><td className="px-4 py-3">Classic, Magazine, Minimal, Polaroid</td><td className="px-4 py-3 text-[var(--muted)]">Alters container padding, border radii, structural accent bars, and date stamp positioning.</td></tr>
                <tr className="border-t border-[var(--line)]"><td className="px-4 py-3 font-semibold">Typography</td><td className="px-4 py-3">Modern, Serif, Typewriter, Handwritten</td><td className="px-4 py-3 text-[var(--muted)]">Injects configured Google Fonts (Inter, Playfair Display, Fira Code, Caveat).</td></tr>
                <tr className="border-t border-[var(--line)]"><td className="px-4 py-3 font-semibold">Ink Color</td><td className="px-4 py-3">Auto, Mood, Ink/Charcoal, Navy, Sage, Plum</td><td className="px-4 py-3 text-[var(--muted)]">Resolves body text color dynamically depending on dark mode contrast requirements.</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 3.4 */}
        <section id="images" className="scroll-mt-28 pt-14">
          <SectionHead kicker="3.4 · Image Processing & Adaptive Collages" title="Small files, beautiful collages." intro="To optimize database read/write speeds and maintain rapid offline caching, Momently utilizes an on-device image processing pipeline:" />
          <div className="space-y-2">
            {["Gallery / Camera Image Selection", "Device Resize & Compression — Max 720×720 @ 60% quality for entries · Max 250×250 for user profile avatars", "Base64 Encoding & String Format", "Firestore Document Storage (< 1MB Limit)"].map((step, i, arr) => (
              <React.Fragment key={step}>
                <div className="flex items-center gap-3 rounded-[18px] border border-[var(--line)] bg-[var(--surface)] px-4 py-3.5 text-[15px] font-medium shadow-sm"><span className="font-serif-display grid h-8 w-8 flex-none place-items-center rounded-full bg-[var(--plum-soft)] font-semibold text-[#5B21B6]">{i + 1}</span><span>{step}</span></div>
                {i < arr.length - 1 && <div className="flex justify-center py-0.5 text-[#5B21B6]" aria-hidden="true"><ArrowDown size={18} /></div>}
              </React.Fragment>
            ))}
          </div>
          <h3 className="font-serif-display mb-3 mt-8 text-xl font-semibold">Adaptive Layout Logic</h3>
          <Card><ul className="divide-y divide-[var(--line)]">
            <Bullet title="1 Photo:" >Single full-width responsive banner card.</Bullet>
            <Bullet title="2 Photos:" >Equal 50/50 vertical side-by-side split grid.</Bullet>
            <Bullet title="3+ Photos:" >Asymmetric magazine layout (large primary image left, secondary stacked images right) with an automatic +N overflow badge overlay on the final thumbnail.</Bullet>
          </ul></Card>
        </section>

        {/* 3.5 */}
        <section id="notifications" className="scroll-mt-28 pt-14">
          <SectionHead kicker="3.5 · Local Notifications — Scheduled & Instant Notifications" title="Gentle nudges, right on time." intro="Momently integrates flutter_local_notifications to manage scheduled reminders and milestone triggers locally on the user's device:" />
          <div className="table-wrap overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow)]">
            <table className="w-full border-collapse text-left text-sm">
              <thead><tr className="bg-[var(--paper-2)]"><th className="px-4 py-3 font-semibold">Notification Channel</th><th className="px-4 py-3 font-semibold">ID</th><th className="px-4 py-3 font-semibold">Trigger Schedule / Logic</th></tr></thead>
              <tbody>
                <tr className="border-t border-[var(--line)]"><td className="px-4 py-3 font-semibold">Daily Reminder</td><td className="px-4 py-3">1001</td><td className="px-4 py-3 text-[var(--muted)]">Recurring alarm scheduled daily at user-defined time (default: 20:00).</td></tr>
                <tr className="border-t border-[var(--line)]"><td className="px-4 py-3 font-semibold">Weekly Digest</td><td className="px-4 py-3">1002</td><td className="px-4 py-3 text-[var(--muted)]">Weekly recurring alarm scheduled every Sunday evening.</td></tr>
                <tr className="border-t border-[var(--line)]"><td className="px-4 py-3 font-semibold">Milestone Celebration</td><td className="px-4 py-3">Instant</td><td className="px-4 py-3 text-[var(--muted)]">Triggers immediately when total saved Firestore memory count hits 1, 10, 50, or 100.</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Contact / Footer */}
        <footer id="contact" className="mt-16 scroll-mt-28 rounded-[26px] border border-[var(--line)] bg-[var(--surface)] px-6 py-8 text-center shadow-[var(--shadow)]">
          <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-[#5B21B6] text-white"><Mail size={19} /></span>
          <h2 className="font-serif-display mt-3 text-2xl font-semibold">Questions about Momently?</h2>
          <p className="mx-auto mt-2 max-w-[520px] text-sm leading-6 text-[var(--muted)]">Use the Help Center and feedback options inside the app to reach support, share a star rating, or review the Terms &amp; Privacy Policies.</p>
          <p className="mt-6 border-t border-[var(--line)] pt-5 text-sm text-[var(--muted)]">© 2026 Momently. Your words stay yours.</p>
        </footer>
      </main>

      {showTop && (
        <button type="button" onClick={backToTop} aria-label="Back to top" className="fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full bg-[#E11D48] text-white shadow-lg transition hover:bg-[#BE123C] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#E11D48]">
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
