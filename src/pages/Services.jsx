// src/pages/Services.jsx
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { services } from "../data/services";

function useReveal(options = { threshold: 0.2 }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShow(true);
        obs.disconnect();
      }
    }, options);

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, show };
}

export default function Services() {
  const hero = useReveal({ threshold: 0.35 });
  const build = useReveal({ threshold: 0.2 });
  const work = useReveal({ threshold: 0.2 });
  const tech = useReveal({ threshold: 0.2 });

  return (
    <main className="max-w-6xl mx-auto px-4 py-16 space-y-16">
      {/* Hero */}
      <section ref={hero.ref} className="text-center max-w-3xl mx-auto">
        <span
          className={`reveal ${hero.show ? "show" : ""} inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-300 uppercase tracking-wide`}
        >
          Services
        </span>

        <h1
          className={`reveal d-100 ${
            hero.show ? "show" : ""
          } mt-4 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white`}
        >
          Medical Websites & Dashboards
          <span className="block text-green-400">Built Fast, Built Clean</span>
        </h1>

        <p
          className={`reveal d-200 ${
            hero.show ? "show" : ""
          } mt-4 text-sm md:text-base text-gray-300`}
        >
          We help doctors and clinics launch modern medical websites and dashboard
          UIs (appointments, patients, stats) with clean design and fast delivery.
        </p>

        <div
          className={`reveal d-300 ${
            hero.show ? "show" : ""
          } mt-6 flex flex-wrap justify-center gap-3`}
        >
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full bg-green-500 px-5 py-2 text-sm font-semibold text-black hover:bg-green-600 transition-colors"
          >
            Get a Quote
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10 transition"
          >
            View Pricing
          </Link>
        </div>
      </section>

      {/* What We Build */}
      <section ref={build.ref} className="space-y-6">
        <h2
          className={`reveal ${build.show ? "show" : ""} text-xl md:text-2xl font-semibold text-white`}
        >
          What We Build
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, idx) => {
            const isPopular = s.title.includes("Dashboard UI") || s.title.includes("Full Medical Solution");
            return (
              <div
                key={s.title}
                className={`reveal ${
                  build.show ? "show" : ""
                } ${idx === 1 ? "d-100" : idx === 2 ? "d-200" : idx === 3 ? "d-300" : ""} rounded-2xl border ${
                  isPopular ? "border-green-500/60" : "border-white/10"
                } ${
                  isPopular
                    ? "bg-gradient-to-b from-green-500/10 to-transparent shadow-xl shadow-green-900/50"
                    : "bg-[#020617] shadow-lg shadow-black/40"
                } p-6`}
              >
                {isPopular && (
                  <div className="inline-flex mb-2 rounded-full bg-green-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-green-400">
                    Most Popular
                  </div>
                )}

                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span className="text-xl">{s.icon}</span>
                  <span>{s.title}</span>
                </h3>

                <p className="mt-2 text-sm text-gray-300">{s.description}</p>

                <ul className="mt-4 space-y-1 text-sm text-gray-300">
                  {s.features.map((f) => (
                    <li key={f}>• {f}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* How We Work */}
      <section ref={work.ref} className="space-y-6">
        <h2
          className={`reveal ${work.show ? "show" : ""} text-xl md:text-2xl font-semibold text-white`}
        >
          How We Work
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div
            className={`reveal ${work.show ? "show" : ""} rounded-2xl border border-white/10 bg-[#020617] p-6`}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Step 1
            </p>
            <h3 className="mt-1 text-base font-semibold text-white">
              Requirements & Content
            </h3>
            <p className="mt-3 text-sm text-gray-300">
              You tell us your clinic details (services, address, phone/WhatsApp),
              and what you want (website or dashboard UI).
            </p>
          </div>

          <div
            className={`reveal d-100 ${work.show ? "show" : ""} rounded-2xl border border-white/10 bg-[#020617] p-6`}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Step 2
            </p>
            <h3 className="mt-1 text-base font-semibold text-white">
              Design & Build
            </h3>
            <p className="mt-3 text-sm text-gray-300">
              We build your modern UI using React + Tailwind, with clean sections,
              strong CTAs, and a professional medical style.
            </p>
          </div>

          <div
            className={`reveal d-200 ${work.show ? "show" : ""} rounded-2xl border border-white/10 bg-[#020617] p-6`}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Step 3
            </p>
            <h3 className="mt-1 text-base font-semibold text-white">
              Delivery & Support
            </h3>
            <p className="mt-3 text-sm text-gray-300">
              We deliver and deploy. If you later need backend integration, we can
              connect the dashboard to your system.
            </p>
          </div>
        </div>
      </section>

      {/* Technologies + CTA */}
      <section ref={tech.ref} className="space-y-6">
        <h2
          className={`reveal ${tech.show ? "show" : ""} text-xl md:text-2xl font-semibold text-white`}
        >
          Technologies We Use
        </h2>

        <div
          className={`reveal d-100 ${
            tech.show ? "show" : ""
          } rounded-2xl border border-white/10 bg-[#020617] p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4`}
        >
          <div className="flex flex-wrap gap-2">
            {["React.js", "Tailwind CSS", "React Router", "Vercel Deploy", "SEO Structure", "UI Components"].map(
              (t, idx) => (
                <span
                  key={t}
                  className={`reveal ${tech.show ? "show" : ""} ${
                    idx === 0
                      ? ""
                      : idx === 1
                      ? "d-100"
                      : idx === 2
                      ? "d-200"
                      : idx === 3
                      ? "d-300"
                      : idx === 4
                      ? "d-400"
                      : "d-500"
                  } rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-200`}
                >
                  {t}
                </span>
              )
            )}
          </div>

          <div className="text-sm text-gray-300 md:text-right">
            <p>Need a clinic website or dashboard?</p>
            <p>Tell us what you need and we&apos;ll send a clear estimate.</p>
            <Link
              to="/contact"
              className="mt-3 inline-flex items-center justify-center rounded-full bg-green-500 px-5 py-2 text-sm font-semibold text-black hover:bg-green-600 transition-colors"
            >
              Discuss a Project
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
