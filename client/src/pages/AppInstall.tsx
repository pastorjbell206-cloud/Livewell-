/**
 * /app: "Get LiveWell on your phone or computer" (James, 2026-11-18: "have
 * a way for people to download this onto their computer or download on
 * their phones").
 *
 * What it is, said plainly on the page: the same site, opened from an icon,
 * free, nothing from an app store, and it needs a connection. The site keeps
 * its self-destroying service worker (vite.config.ts) so a new deploy always
 * shows; browsers offer to install it from the web manifest alone
 * (docs/work/elite/app.md has what was tested).
 *
 * 1. The page top. Where the browser can install in one step (Chrome, Edge
 *    and Android, the beforeinstallprompt event caught in main.tsx), one
 *    Install button. Opened from the icon already, it says so.
 * 2. Three plain steps with a small drawing, for iPhone or iPad, Android,
 *    Mac and Windows, as tabs: the reader's own device first, the others
 *    one tap away.
 * 3. What it is, in four short facts, and what changes when it is opened
 *    from the icon (the app bar, components/AppBar.tsx).
 */
import { useRef, useState, type KeyboardEvent } from "react";
import { Link } from "wouter";
import { AppWindow, BadgeCheck, Globe, ListOrdered, Store, Wifi } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import PageHead from "@/components/art/PageHead";
import SectionHead from "@/components/art/SectionHead";
import PlateFrame from "@/components/art/PlateFrame";
import { PlateSvg } from "@/components/art/PlateSvg";
import { guessDevice, isInstalled, promptInstall, useInstallPrompt, type Device } from "@/lib/install";
import { DEVICES, DEVICE_DRAWINGS } from "./app/devices";
import "./app/app-install.css";

interface Steps {
  name: string;
  steps: string[];
  note?: string;
}

const HOW: Record<Device, Steps> = {
  iphone: {
    name: "iPhone or iPad",
    steps: [
      "Open LiveWell in Safari and tap the Share button: the square with an arrow pointing up.",
      "Scroll down the list and tap Add to Home Screen.",
      "Tap Add. LiveWell's icon sits with your other apps.",
    ],
    note: "Opened from the icon, LiveWell keeps its own My Library, apart from the one in Safari.",
  },
  android: {
    name: "Android",
    steps: [
      "Open LiveWell in Chrome and tap the menu: the three dots at the top right.",
      "Tap Install app, or Add to Home screen.",
      "Tap Install. LiveWell's icon sits with your other apps.",
    ],
    note: "Other browsers on Android have the same choice in their own menu.",
  },
  mac: {
    name: "Mac",
    steps: [
      "Open LiveWell in Safari, then open the File menu at the top of the screen.",
      "Choose Add to Dock, then click Add.",
      "LiveWell sits in your Dock and opens in its own window.",
    ],
    note: "Add to Dock needs macOS Sonoma or later. In Chrome or Edge on a Mac, follow the Windows steps.",
  },
  windows: {
    name: "Windows",
    steps: [
      "Open LiveWell in Edge or Chrome.",
      "Click the install button at the right end of the address bar. If there is none, open the browser's menu and choose the install option.",
      "Click Install. LiveWell opens in its own window, and you can pin it to the taskbar.",
    ],
  },
};

const ORDER: Device[] = ["iphone", "android", "mac", "windows"];

const FACTS = [
  { icon: Globe, name: "The same LiveWell", line: "It opens this site from an icon, in a window of its own." },
  { icon: BadgeCheck, name: "Free", line: "No cost, no account, nothing to sign up for." },
  { icon: Store, name: "Not from an app store", line: "Nothing to download or update. New pages show the next time you open it." },
  { icon: Wifi, name: "Needs a connection", line: "Like the site in a browser, it needs the internet to open pages." },
];

/** The one Install button, where the browser offers one; a line once it has been used. */
function InstallButton() {
  const canPrompt = useInstallPrompt();
  const [result, setResult] = useState<"" | "added" | "not-now">("");
  return (
    <div className="ai-install">
      {canPrompt && result === "" && (
        <button type="button" className="btn" onClick={async () => setResult((await promptInstall()) ? "added" : "not-now")}>
          <AppWindow size={20} strokeWidth={1.75} aria-hidden="true" />
          Install LiveWell
        </button>
      )}
      <p className="ai-install__status" role="status">
        {result === "added" && "Installed. Open LiveWell from its icon."}
        {result === "not-now" && "Not installed. The steps below work any time."}
      </p>
    </div>
  );
}

/** The four devices as tabs, the reader's own first chosen; each with its drawing and three steps. */
function DeviceSteps() {
  const [device, setDevice] = useState<Device>(() => guessDevice());
  const tabs = useRef<Record<Device, HTMLButtonElement | null>>({ iphone: null, android: null, mac: null, windows: null });

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const i = ORDER.indexOf(device);
    let next: Device | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = ORDER[(i + 1) % ORDER.length];
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = ORDER[(i - 1 + ORDER.length) % ORDER.length];
    else if (e.key === "Home") next = ORDER[0];
    else if (e.key === "End") next = ORDER[ORDER.length - 1];
    if (!next) return;
    e.preventDefault();
    setDevice(next);
    tabs.current[next]?.focus();
  };

  const how = HOW[device];
  return (
    <div className="ai-devices">
      <div className="ai-tabs" role="tablist" aria-label="Your device">
        {ORDER.map((d) => (
          <button
            key={d}
            ref={(el) => {
              tabs.current[d] = el;
            }}
            type="button"
            role="tab"
            id={`ai-tab-${d}`}
            aria-selected={device === d}
            aria-controls="ai-panel"
            tabIndex={device === d ? 0 : -1}
            className="ai-tab"
            onClick={() => setDevice(d)}
            onKeyDown={onKey}
          >
            {HOW[d].name}
          </button>
        ))}
      </div>
      <div className="ai-panel" role="tabpanel" id="ai-panel" aria-labelledby={`ai-tab-${device}`} tabIndex={0}>
        <PlateFrame className="ai-panel__art" ratio="4 / 3">
          <PlateSvg drawing={DEVICE_DRAWINGS[device]} />
        </PlateFrame>
        <div className="ai-panel__words">
          <ol className="ai-steps">
            {how.steps.map((s, i) => (
              <li key={i} className="ai-step">
                <span className="ai-step__n" aria-hidden="true">
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
          {how.note && <p className="ai-note">{how.note}</p>}
        </div>
      </div>
    </div>
  );
}

export default function AppInstall() {
  const [installed] = useState(() => isInstalled());

  return (
    <Layout>
      <SEOMeta
        title="Get LiveWell on Your Phone or Computer"
        description="Put LiveWell on your phone or computer and open it from an icon. The same site, free, with nothing to download from an app store."
        url="https://www.livewellbyjamesbell.co/app"
      />

      <PageHead
        door="Phone and computer"
        title="Get LiveWell on your phone or computer"
        line={
          installed
            ? "You are reading LiveWell from its icon now. To add it to another device, follow its steps below."
            : "Open LiveWell from an icon, like an app. It is the same site, and it is free."
        }
        art={<PlateSvg drawing={DEVICES} decorative />}
        action={installed ? undefined : <InstallButton />}
      />

      {/* THE STEPS, for the reader's own device first. */}
      <section className="home-sec home-sec--warm ai-sec" aria-labelledby="ai-steps-title">
        <div className="home-wrap">
          <SectionHead icon={ListOrdered} label="Three steps" title="Add it from your browser." id="ai-steps-title" />
          <DeviceSteps />
        </div>
      </section>

      {/* WHAT IT IS, honestly. */}
      <section className="home-sec ai-sec" aria-labelledby="ai-facts-title">
        <div className="home-wrap">
          <SectionHead icon={BadgeCheck} label="What it is" title="The same site, a tap away." id="ai-facts-title" />
          <ul className="ai-facts">
            {FACTS.map(({ icon: Icon, name, line }) => (
              <li key={name} className="ai-fact">
                <span className="ai-fact__icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.75} />
                </span>
                <span>
                  <span className="ai-fact__name">{name}</span>
                  <span className="ai-fact__line">{line}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="ai-more">
            On a phone, LiveWell opened from its icon has a bar at the foot of the screen with Home, the Bible, tonight's devotion, Search
            and My Library, and a Back button at the top. To take it off, remove the icon as you would any app.
          </p>
          <p className="ai-more">
            Looking for something to read first? <Link href="/explore">See everything on LiveWell</Link>.
          </p>
        </div>
      </section>
    </Layout>
  );
}
