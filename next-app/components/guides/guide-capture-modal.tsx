"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type GuideCaptureModalProps = {
  guideSlug: string;
  buttonLabel: string;
  title: string;
  description: string;
  onSuccess?: () => void;
  autoOpen?: boolean;
  dismissible?: boolean;
  submitLabel?: string;
};

type DeliveredAsset = {
  name: string;
  format: string;
  downloadHref: string;
  downloadLabel: string;
  successCopy: string;
};

function isDeliveredAsset(value: unknown): value is DeliveredAsset {
  if (!value || typeof value !== "object") return false;
  const asset = value as Record<string, unknown>;
  return (
    typeof asset.name === "string" &&
    typeof asset.format === "string" &&
    typeof asset.downloadHref === "string" &&
    asset.downloadHref.startsWith("/downloads/") &&
    typeof asset.downloadLabel === "string" &&
    typeof asset.successCopy === "string"
  );
}

export function GuideCaptureModal({
  guideSlug,
  buttonLabel,
  title,
  description,
  onSuccess,
  autoOpen = false,
  dismissible = true,
  submitLabel,
}: GuideCaptureModalProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [deliveredAsset, setDeliveredAsset] = useState<DeliveredAsset | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const closeOnBackdrop = (event: MouseEvent) => {
      if (dismissible && event.target === dialog) dialog.close();
    };
    const preventDismissal = (event: Event) => {
      if (!dismissible) event.preventDefault();
    };
    const keepFocusInside = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialog.open) return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("hidden"));
      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const returnFocus = () => triggerRef.current?.focus();
    dialog.addEventListener("click", closeOnBackdrop);
    dialog.addEventListener("keydown", keepFocusInside);
    dialog.addEventListener("cancel", preventDismissal);
    dialog.addEventListener("close", returnFocus);
    return () => {
      dialog.removeEventListener("click", closeOnBackdrop);
      dialog.removeEventListener("keydown", keepFocusInside);
      dialog.removeEventListener("cancel", preventDismissal);
      dialog.removeEventListener("close", returnFocus);
    };
  }, [dismissible]);

  const open = () => {
    setStatus("idle");
    setMessage("");
    setDeliveredAsset(null);
    dialogRef.current?.showModal();
    emailRef.current?.focus();
  };

  useEffect(() => {
    if (autoOpen && !dialogRef.current?.open) open();
  }, [autoOpen]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    try {
      const response = await fetch("/api/guide-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          website: form.get("website"),
          guideSlug,
          source: window.location.pathname,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Unable to send the guide right now. Please try again.");
      if (!isDeliveredAsset(result.deliverable)) {
        throw new Error("The email was accepted, but its download details are missing. Please try again.");
      }
      const asset = result.deliverable;
      setDeliveredAsset(asset);
      setStatus("success");
      setMessage(asset.successCopy);
      onSuccess?.();
      formElement.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send the guide right now.");
    }
  };

  return (
    <>
      <button id={`guide-capture-trigger-${guideSlug}`} ref={triggerRef} type="button" onClick={open}>{buttonLabel}</button>
      <dialog className="guide-capture" ref={dialogRef} aria-labelledby={`guide-capture-title-${guideSlug}`}>
        {dismissible && (
          <button className="guide-capture__close" type="button" aria-label="Close" onClick={() => dialogRef.current?.close()}>Close</button>
        )}
        <div className="guide-capture__content">
          {!dismissible && (
            <div className="guide-capture__lock" aria-hidden="true">
              <svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
            </div>
          )}
          {!dismissible && <p className="article-label">Immediate access</p>}
          <h2 id={`guide-capture-title-${guideSlug}`}>{title}</h2>
          <p>{description}{!dismissible ? " The full guide will open here immediately." : ""}</p>
          {status === "success" && deliveredAsset ? (
            <div className="guide-capture__success" role="status">
              <strong>{message}</strong>
              <button type="button" onClick={() => dialogRef.current?.close()}>Continue reading</button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <label htmlFor={`guide-email-${guideSlug}`}>Email address</label>
              <input ref={emailRef} id={`guide-email-${guideSlug}`} name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
              <input className="guide-capture__honeypot" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending..." : (submitLabel ?? buttonLabel)}</button>
              <small>You will also receive practical Shift & Lead emails. Unsubscribe at any time.</small>
              {message && <p className="guide-capture__error" role="alert">{message}</p>}
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
