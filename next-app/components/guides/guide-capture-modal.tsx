"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type GuideCaptureModalProps = {
  guideSlug: string;
  buttonLabel: string;
  title: string;
  description: string;
  downloadHref: string;
};

export function GuideCaptureModal({ guideSlug, buttonLabel, title, description, downloadHref }: GuideCaptureModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const closeOnBackdrop = (event: MouseEvent) => {
      if (event.target === dialog) dialog.close();
    };
    dialog.addEventListener("click", closeOnBackdrop);
    return () => dialog.removeEventListener("click", closeOnBackdrop);
  }, []);

  const open = () => {
    setStatus("idle");
    setMessage("");
    dialogRef.current?.showModal();
  };

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
      setStatus("success");
      setMessage("Your 1-page PDF is ready. We have also sent the reference to your inbox.");
      formElement.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send the guide right now.");
    }
  };

  return (
    <>
      <button type="button" onClick={open}>{buttonLabel}</button>
      <dialog className="guide-capture" ref={dialogRef} aria-labelledby="guide-capture-title">
        <button className="guide-capture__close" type="button" aria-label="Close" onClick={() => dialogRef.current?.close()}>Close</button>
        <div className="guide-capture__content">
          <h2 id="guide-capture-title">{title}</h2>
          <p>{description}</p>
          {status === "success" ? (
            <div className="guide-capture__success" role="status">
              <strong>{message}</strong>
              <a href={downloadHref} download>Download the PDF</a>
              <button type="button" onClick={() => dialogRef.current?.close()}>Continue reading</button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <label htmlFor={`guide-email-${guideSlug}`}>Email address</label>
              <input id={`guide-email-${guideSlug}`} name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
              <input className="guide-capture__honeypot" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending..." : buttonLabel}</button>
              <small>You will also receive practical Shift & Lead emails. Unsubscribe at any time.</small>
              {message && <p className="guide-capture__error" role="alert">{message}</p>}
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
