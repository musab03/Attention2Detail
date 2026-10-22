"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  business,
  jobTypes,
  jobs,
  photos,
  reviews,
  services,
  steps,
  ticker,
  type Photo,
} from "@/lib/content";

const postcodePattern =
  /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

type FormState = {
  name: string;
  phone: string;
  postcode: string;
  job: string;
  note: string;
};

const emptyForm: FormState = {
  name: "",
  phone: "",
  postcode: "",
  job: "",
  note: "",
};

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceIndex, setServiceIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [openPhoto, setOpenPhoto] = useState<Photo | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [sent, setSent] = useState<FormState | null>(null);

  const service = services[serviceIndex];
  const review = reviews[reviewIndex];

  useEffect(() => {
    if (!openPhoto) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenPhoto(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openPhoto]);

  function closeMenu() {
    setMenuOpen(false);
  }

  function validate(values: FormState) {
    const next: Partial<FormState> = {};
    if (!values.name.trim()) next.name = "Put your name.";
    const digits = values.phone.replace(/\D/g, "");
    if (digits.length < 10) next.phone = "Need a phone number he can ring.";
    if (!postcodePattern.test(values.postcode.trim())) {
      next.postcode = "Need a UK postcode, like NN6 0RU.";
    }
    if (!values.job) next.job = "Pick the job.";
    if (!values.note.trim()) next.note = "Say what the car needs.";
    return next;
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next = validate(form);
    setErrors(next);
    if (Object.keys(next).length) {
      setSent(null);
      return;
    }
    setSent(form);
  }

  const mailto = sent
    ? `mailto:${business.email}?subject=${encodeURIComponent(
        `Quote — ${sent.job}`,
      )}&body=${encodeURIComponent(
        [
          `Name: ${sent.name.trim()}`,
          `Phone: ${sent.phone.trim()}`,
          `Postcode: ${sent.postcode.trim().toUpperCase()}`,
          `Job: ${sent.job}`,
          "",
          sent.note.trim(),
        ].join("\n"),
      )}`
    : "";

  return (
    <>
      <header className="sticky top-0 z-40 border-b-2 border-[var(--ink)] bg-[var(--sheet)]">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
          <a href="#top" className="flex min-w-0 items-center gap-3" onClick={closeMenu}>
            <Mark />
            <span className="font-display truncate text-sm font-extrabold tracking-tight uppercase sm:text-base">
              Attention 2 Detail
            </span>
          </a>
          <nav className="ml-auto hidden items-center gap-6 text-sm font-semibold uppercase tracking-wide lg:flex">
            <a href="#services">Services</a>
            <a href="#work">Jobs</a>
            <a href="#reviews">Reviews</a>
            <a href="#quote">Quote</a>
          </nav>
          <a
            href={`tel:${business.phoneTel}`}
            className="ml-auto shrink-0 bg-[var(--accent)] px-2 py-2 text-xs font-bold whitespace-nowrap text-white sm:px-3 sm:text-sm lg:ml-0"
          >
            {business.phoneDisplay}
          </a>
          <button
            type="button"
            className="shrink-0 border-2 border-[var(--ink)] px-3 py-2 text-sm font-bold uppercase lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
        {menuOpen ? (
          <nav
            id="site-menu"
            className="flex flex-col border-t-2 border-[var(--ink)] bg-[var(--sheet)] px-4 py-2 text-lg font-semibold uppercase lg:hidden"
          >
            {[
              ["#services", "Services"],
              ["#work", "Jobs"],
              ["#reviews", "Reviews"],
              ["#quote", "Quote"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="border-b border-[var(--line)] py-3"
                onClick={closeMenu}
              >
                {label}
              </a>
            ))}
          </nav>
        ) : null}
      </header>

      <main id="top">
        <section className="mx-auto grid max-w-6xl items-end gap-10 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
              {business.slogan} · Overstone
            </p>
            <h1 className="font-display mt-4 text-[clamp(4.4rem,13vw,8.4rem)] leading-[0.82] font-extrabold tracking-[-0.045em]">
              <span className="overflow-hidden">
                <span className="rise">I come</span>
              </span>
              <span className="overflow-hidden">
                <span className="rise rise-2">to the</span>
              </span>
              <span className="overflow-hidden">
                <span className="rise rise-3">
                  <span className="outline-word">car</span>.
                </span>
              </span>
            </h1>
            <div className="mt-5 h-2 w-24 bg-[var(--accent)]" />
            <p className="mt-6 max-w-xl text-xl leading-snug text-[var(--muted)]">
              Mark, from {business.address}. Full valets, machine polish, paint
              prep and ceramic. He drives the red Ford. If you see it, the
              number is on the back window.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`tel:${business.phoneTel}`}
                className="bg-[var(--ink)] px-5 py-3 text-base font-bold text-white"
              >
                Call {business.phoneDisplay}
              </a>
              <a
                href="#quote"
                className="border-2 border-[var(--ink)] px-5 py-3 text-base font-bold"
              >
                Ask for a quote
              </a>
            </div>
          </div>
          <div className="relative">
            <figure className="group overflow-hidden border-2 border-[var(--ink)] bg-[var(--ink)]">
              <img
                src={photos.van.src}
                alt={photos.van.alt}
                className="photo-zoom aspect-[4/5] w-full object-cover sm:aspect-[5/4]"
              />
            </figure>
            <figure className="group absolute -bottom-6 -left-2 w-[46%] border-2 border-[var(--ink)] bg-white sm:-left-8">
              <img
                src={photos.discovery.src}
                alt={photos.discovery.alt}
                className="photo-zoom aspect-[4/3] w-full object-cover"
              />
            </figure>
            <p className="mt-10 max-w-sm text-sm leading-snug text-[var(--muted)]">
              {photos.van.caption} Small photo: {photos.discovery.caption}
            </p>
          </div>
        </section>

        <div className="ticker overflow-hidden border-y-2 border-[var(--ink)] bg-[var(--sheet)]">
          <div className="ticker-track py-3">
            {[0, 1].map((copy) => (
              <p
                key={copy}
                className="flex shrink-0 items-center text-sm font-bold tracking-wide uppercase"
                aria-hidden={copy === 1}
              >
                {ticker.map((item) => (
                  <span key={`${copy}-${item}`} className="flex items-center">
                    <span className="px-4">{item}</span>
                    <span className="text-[var(--accent)]" aria-hidden>
                      /
                    </span>
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>

        <section id="services" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
            The work
          </p>
          <h2 className="font-display mt-2 max-w-3xl text-5xl leading-[0.9] font-extrabold tracking-tight sm:text-7xl">
            What he actually does.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-[var(--muted)]">
            Taken from the jobs he posts. Where a service has no photo of that
            car, it says so, and the picture is the closest real job.
          </p>
          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_1.05fr]">
            <div className="border-t-2 border-[var(--ink)]">
              {services.map((item, index) => {
                const active = index === serviceIndex;
                return (
                  <button
                    key={item.number}
                    type="button"
                    onClick={() => setServiceIndex(index)}
                    onMouseEnter={() => setServiceIndex(index)}
                    onFocus={() => setServiceIndex(index)}
                    className={`block w-full border-b-2 border-[var(--ink)] px-1 py-4 text-left ${
                      active ? "bg-[var(--sheet)]" : ""
                    }`}
                    aria-pressed={active}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-display text-2xl font-extrabold text-[var(--accent)]">
                        {item.number}
                      </span>
                      <span className="font-display text-3xl leading-none font-extrabold tracking-tight sm:text-4xl">
                        {item.title}
                      </span>
                    </span>
                    {active ? (
                      <span className="mt-3 block max-w-xl text-base leading-snug text-[var(--muted)]">
                        {item.body}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
            <figure className="lg:sticky lg:top-24">
              <div className="group overflow-hidden border-2 border-[var(--ink)]">
                <img
                  src={service.photo.src}
                  alt={service.photo.alt}
                  className="photo-zoom aspect-[4/3] w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 text-base leading-snug">
                <span className="font-bold">{service.photo.job}. </span>
                {service.missing}
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="work" className="border-t-2 border-[var(--ink)] bg-[var(--sheet)] py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
              Photos
            </p>
            <h2 className="font-display mt-2 text-5xl leading-[0.9] font-extrabold tracking-tight sm:text-7xl">
              Finished cars.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-[var(--muted)]">
              Ferrari Roma, the Defender 90, the Porsche 718 Spyder and the
              Audi R8 are on his Facebook. Those posts didn’t come down as
              stills, so they aren’t faked here. Drag compares two cars that
              are already finished. There isn’t a dirty “before” of the same
              car.
            </p>
            <Compare
              left={photos.discovery}
              right={photos.mercedes}
            />
            <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
              {jobs.map((photo) => (
                <button
                  key={photo.src}
                  type="button"
                  className="photo-link w-[78%] shrink-0 snap-start text-left sm:w-[46%] lg:w-[32%]"
                  onClick={() => setOpenPhoto(photo)}
                >
                  <span className="group block overflow-hidden border-2 border-[var(--ink)]">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="photo-zoom aspect-[4/3] w-full object-cover"
                    />
                  </span>
                  <span className="mt-2 block text-sm font-bold uppercase tracking-wide">
                    {photo.job}
                  </span>
                  <span className="mt-1 block text-sm leading-snug text-[var(--muted)]">
                    {photo.caption}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="reviews" className="bg-[var(--dark)] py-16 text-[var(--sheet)]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
              {business.recommendation}
            </p>
            <h2 className="font-display mt-2 text-5xl leading-[0.9] font-extrabold tracking-tight sm:text-7xl">
              {business.reviewCount} reviews.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-[#c8ccd1]">
              Facebook says {business.recommendation.toLowerCase()} (
              {business.reviewCount} reviews). Roy’s line is from that page.
              The rest are Google, copied as written.
            </p>
            <blockquote className="mt-10 max-w-4xl">
              <p className="font-display text-3xl leading-[1.15] font-bold tracking-tight sm:text-5xl">
                “{review.quote}”
              </p>
              <footer className="mt-6 text-base font-semibold">
                {review.name}
                <span className="text-[#c8ccd1]">
                  {" "}
                  · {review.date} · {review.source}
                </span>
              </footer>
            </blockquote>
            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                className="border-2 border-[var(--sheet)] px-4 py-2 text-sm font-bold uppercase"
                onClick={() =>
                  setReviewIndex((index) =>
                    index === 0 ? reviews.length - 1 : index - 1,
                  )
                }
              >
                Previous
              </button>
              <button
                type="button"
                className="bg-[var(--accent)] px-4 py-2 text-sm font-bold text-white uppercase"
                onClick={() =>
                  setReviewIndex((index) => (index + 1) % reviews.length)
                }
              >
                Next
              </button>
              <span className="text-sm font-semibold text-[#c8ccd1]">
                {reviewIndex + 1} / {reviews.length}
              </span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
            Booking
          </p>
          <h2 className="font-display mt-2 text-5xl leading-[0.9] font-extrabold tracking-tight sm:text-7xl">
            How a job starts.
          </h2>
          <ol className="mt-10 grid gap-px border-2 border-[var(--ink)] bg-[var(--ink)] sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <li key={step.number} className="bg-[var(--paper)] p-5">
                <span className="font-display text-3xl font-extrabold text-[var(--accent)]">
                  {step.number}
                </span>
                <h3 className="font-display mt-3 text-2xl font-extrabold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-base leading-snug text-[var(--muted)]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section id="quote" className="border-t-2 border-[var(--ink)] bg-[var(--sheet)] py-16">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
                Quote
              </p>
              <h2 className="font-display mt-2 text-5xl leading-[0.9] font-extrabold tracking-tight sm:text-6xl">
                Tell him the job.
              </h2>
              <p className="mt-4 text-lg text-[var(--muted)]">
                This doesn’t book it. It writes the note, then opens a mail to{" "}
                {business.email}.
              </p>
            </div>
            <form onSubmit={onSubmit} noValidate className="grid gap-4">
              <Field
                label="Name"
                error={errors.name}
                value={form.name}
                onChange={(name) =>
                  setForm((current) => ({ ...current, name }))
                }
                autoComplete="name"
              />
              <Field
                label="Phone"
                error={errors.phone}
                value={form.phone}
                onChange={(phone) =>
                  setForm((current) => ({ ...current, phone }))
                }
                autoComplete="tel"
                inputMode="tel"
              />
              <Field
                label="Postcode"
                error={errors.postcode}
                value={form.postcode}
                onChange={(postcode) =>
                  setForm((current) => ({ ...current, postcode }))
                }
                autoComplete="postal-code"
              />
              <label className="grid gap-1 text-sm font-bold uppercase tracking-wide">
                Job type
                <select
                  value={form.job}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      job: event.target.value,
                    }))
                  }
                  className="border-2 border-[var(--ink)] bg-white px-3 py-3 text-base font-semibold normal-case"
                >
                  <option value="">Pick one</option>
                  {jobTypes.map((job) => (
                    <option key={job} value={job}>
                      {job}
                    </option>
                  ))}
                </select>
                {errors.job ? (
                  <span className="text-sm font-semibold normal-case text-[var(--accent)]">
                    {errors.job}
                  </span>
                ) : null}
              </label>
              <label className="grid gap-1 text-sm font-bold uppercase tracking-wide">
                Note
                <textarea
                  value={form.note}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      note: event.target.value,
                    }))
                  }
                  rows={4}
                  className="border-2 border-[var(--ink)] bg-white px-3 py-3 text-base font-semibold normal-case"
                />
                {errors.note ? (
                  <span className="text-sm font-semibold normal-case text-[var(--accent)]">
                    {errors.note}
                  </span>
                ) : null}
              </label>
              <button
                type="submit"
                className="justify-self-start bg-[var(--accent)] px-5 py-3 text-base font-bold text-white"
              >
                Write the quote
              </button>
              {sent ? (
                <div className="border-2 border-[var(--ink)] bg-white p-4">
                  <p className="text-sm font-bold uppercase tracking-wide">
                    Your note
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-lg">{sent.note}</p>
                  <p className="mt-3 text-sm text-[var(--muted)]">
                    {sent.name.trim()} · {sent.phone.trim()} ·{" "}
                    {sent.postcode.trim().toUpperCase()} · {sent.job}
                  </p>
                  <a
                    href={mailto}
                    className="mt-4 inline-block bg-[var(--ink)] px-4 py-3 text-sm font-bold text-white"
                  >
                    Email this to {business.email}
                  </a>
                </div>
              ) : null}
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-[var(--ink)] bg-[var(--sheet)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2">
          <div>
            <p className="font-display text-3xl font-extrabold tracking-tight">
              {business.name}
            </p>
            <p className="mt-2 text-lg">{business.slogan}</p>
          </div>
          <address className="text-base leading-relaxed not-italic">
            <p>{business.address}</p>
            <p className="mt-2">
              Phone{" "}
              <a className="font-bold" href={`tel:${business.phoneTel}`}>
                {business.phoneDisplay}
              </a>
            </p>
            <p>
              WhatsApp{" "}
              <a className="font-bold" href={business.whatsapp}>
                {business.phoneDisplay}
              </a>
            </p>
            <p className="text-sm text-[var(--muted)]">
              One number. It’s on the van and on the posts.
            </p>
            <p className="mt-2">
              <a className="font-bold" href={`mailto:${business.email}`}>
                {business.email}
              </a>
            </p>
            <p className="mt-2">
              <a className="font-bold underline" href={business.facebook}>
                Facebook
              </a>
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Listed hours: {business.hours}.
            </p>
          </address>
        </div>
      </footer>

      {openPhoto ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--ink)]/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={openPhoto.job}
          onClick={() => setOpenPhoto(null)}
        >
          <figure
            className="max-h-full w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={openPhoto.src}
              alt={openPhoto.alt}
              className="max-h-[75vh] w-full border-2 border-white object-contain"
            />
            <figcaption className="mt-3 text-white">
              <span className="font-bold">{openPhoto.job}. </span>
              {openPhoto.caption}
            </figcaption>
            <button
              type="button"
              className="mt-4 border-2 border-white px-4 py-2 text-sm font-bold text-white uppercase"
              onClick={() => setOpenPhoto(null)}
            >
              Close
            </button>
          </figure>
        </div>
      ) : null}
    </>
  );
}

function Mark() {
  return (
    <svg
      viewBox="0 0 48 32"
      aria-hidden
      className="h-8 w-12 shrink-0"
    >
      <rect width="48" height="32" fill="#d01218" />
      <path
        d="M6 21h4l2-5h16l3 3h7c2 0 4 1.2 4 3.2V23H6v-2zm8-6 2.2-4.2c.4-.7 1.1-1.2 1.9-1.2h8.2c.8 0 1.6.4 2 1.1L30.6 15H14z"
        fill="#f7f8f9"
      />
      <circle cx="16" cy="23" r="2.2" fill="#141414" />
      <circle cx="34" cy="23" r="2.2" fill="#141414" />
    </svg>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  autoComplete,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
  inputMode?: "tel" | "text";
}) {
  const id = useId();
  return (
    <label htmlFor={id} className="grid gap-1 text-sm font-bold uppercase tracking-wide">
      {label}
      <input
        id={id}
        value={value}
        autoComplete={autoComplete}
        inputMode={inputMode}
        onChange={(event) => onChange(event.target.value)}
        className="border-2 border-[var(--ink)] bg-white px-3 py-3 text-base font-semibold normal-case"
        aria-invalid={Boolean(error)}
      />
      {error ? (
        <span className="text-sm font-semibold normal-case text-[var(--accent)]">
          {error}
        </span>
      ) : null}
    </label>
  );
}

function Compare({ left, right }: { left: Photo; right: Photo }) {
  const [position, setPosition] = useState(56);
  const frame = useRef<HTMLDivElement>(null);

  function setFromClientX(clientX: number) {
    const bounds = frame.current?.getBoundingClientRect();
    if (!bounds) return;
    const next = ((clientX - bounds.left) / bounds.width) * 100;
    setPosition(Math.min(92, Math.max(8, next)));
  }

  return (
    <div className="mt-8">
      <div
        ref={frame}
        className="relative aspect-[16/10] cursor-ew-resize touch-none overflow-hidden border-2 border-[var(--ink)] select-none"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          setFromClientX(event.clientX);
        }}
        onPointerMove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            setFromClientX(event.clientX);
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setFromClientX(event.clientX);
        }}
      >
        <img
          src={right.src}
          alt={right.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <img
          src={left.src}
          alt={left.alt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        />
        <div
          className="absolute top-0 bottom-0 w-1 bg-[var(--accent)]"
          style={{ left: `${position}%` }}
        />
        <button
          type="button"
          role="slider"
          aria-label="Drag between the Discovery Sport and the black Mercedes"
          aria-valuemin={8}
          aria-valuemax={92}
          aria-valuenow={Math.round(position)}
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData("text/plain", "compare");
            event.dataTransfer.effectAllowed = "move";
          }}
          className="absolute top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center bg-[var(--accent)] text-lg font-bold text-white"
          style={{ left: `${position}%` }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              setPosition((value) => Math.max(8, value - 4));
            }
            if (event.key === "ArrowRight") {
              setPosition((value) => Math.min(92, value + 4));
            }
          }}
        >
          ↔
        </button>
        <span className="absolute top-3 left-3 bg-[var(--ink)] px-2 py-1 text-xs font-bold text-white uppercase">
          {left.job}
        </span>
        <span className="absolute top-3 right-3 bg-[var(--ink)] px-2 py-1 text-xs font-bold text-white uppercase">
          {right.job}
        </span>
      </div>
      <p className="mt-3 max-w-3xl text-sm leading-snug text-[var(--muted)]">
        Left: {left.caption} Right: {right.caption}
      </p>
    </div>
  );
}
