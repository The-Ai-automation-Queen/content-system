"use client";

import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { GuideCaptureModal } from "@/components/guides/guide-capture-modal";

type GuideAccessContextValue = {
  guideSlug: string;
  unlocked: boolean;
  ready: boolean;
  unlock: () => void;
};

type CaptureButtonProps = {
  guideSlug: string;
  buttonLabel: string;
  title: string;
  description: string;
  downloadHref?: string;
};

const GuideAccessContext = createContext<GuideAccessContextValue | null>(null);

const guideGateCopy = {
  triggerLabel: "Send me the guide",
  title: "Unlock this guide",
  description: "Enter your email for immediate access. We will also send the guide to your inbox so you can find it later.",
  submitLabel: "Unlock the guide",
} as const;

function useGuideAccess() {
  const value = useContext(GuideAccessContext);
  if (!value) throw new Error("Guide access components must be inside GuideAccessProvider.");
  return value;
}

export function GuideAccessProvider({ guideSlug, children }: { guideSlug: string; children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);
  const storageKey = `shift-lead-guide-unlocked:${guideSlug}`;

  useEffect(() => {
    const localReviewHost = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";
    const localReviewRequested = new URLSearchParams(window.location.search).get("review") === "1";
    setUnlocked(
      (localReviewHost && localReviewRequested) ||
      window.localStorage.getItem(storageKey) === "true",
    );
    setReady(true);
  }, [storageKey]);

  const unlock = () => {
    window.localStorage.setItem(storageKey, "true");
    setUnlocked(true);
  };

  return (
    <GuideAccessContext.Provider value={{ guideSlug, unlocked, ready, unlock }}>
      {children}
    </GuideAccessContext.Provider>
  );
}

export function GuideAccessCaptureButton(props: CaptureButtonProps) {
  const { ready, unlocked, unlock } = useGuideAccess();
  return (
    <GuideCaptureModal
      guideSlug={props.guideSlug}
      buttonLabel={guideGateCopy.triggerLabel}
      title={guideGateCopy.title}
      description={guideGateCopy.description}
      submitLabel={guideGateCopy.submitLabel}
      onSuccess={unlock}
      autoOpen={ready && !unlocked}
      dismissible={unlocked}
    />
  );
}

export function ProtectedGuideContent({
  children,
}: {
  children: ReactNode;
}) {
  const { guideSlug, unlocked } = useGuideAccess();

  if (unlocked) return <>{children}</>;

  const openCapture = () => {
    document.getElementById(`guide-capture-trigger-${guideSlug}`)?.click();
  };

  return (
    <section className="guide-access-gate" aria-labelledby={`guide-access-title-${guideSlug}`}>
      <p className="article-label">Get the full guide</p>
      <h2 id={`guide-access-title-${guideSlug}`}>Enter your email to continue</h2>
      <p>{guideGateCopy.description}</p>
      <button type="button" onClick={openCapture}>{guideGateCopy.submitLabel}</button>
      <small>The complete guide unlocks here after the form is submitted.</small>
    </section>
  );
}
