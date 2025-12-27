import { useEffect, useRef, useState } from "react";

function useReveal(options = { threshold: 0.2 }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShow(true);
        obs.disconnect(); // once
      }
    }, options);

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, show };
}

export default function AboutFounder() {
  const { ref, show } = useReveal({ threshold: 0.25 });

  return (
    <section className="max-w-4xl mx-auto px-4 py-2 -mt-4">
      <div
        ref={ref}
        className="relative bg-[#020617]/70 backdrop-blur-xl border border-white/10 rounded-2xl px-8 md:px-10 py-7 shadow-xl"
      >
        {/* subtle glow */}
        <div className="pointer-events-none absolute -top-48 -right-48 w-96 h-96 rounded-full bg-green-500/5 blur-3xl" />

        <div className="relative text-center max-w-2xl mx-auto">
          {/* SMALL LINE */}
          <p className={`reveal ${show ? "show" : ""} text-[11px] uppercase tracking-[0.35em] text-gray-400 mb-1`}>
            Founder
          </p>

          {/* NAME */}
          <h2 className={`reveal d-100 ${show ? "show" : ""} text-3xl md:text-4xl font-bold text-white mb-2`}>
            Wail <span className="text-green-400">Elouahabi</span>
          </h2>

          {/* DESCRIPTION */}
          <p className={`reveal d-200 ${show ? "show" : ""} text-gray-300 text-sm md:text-base leading-relaxed`}>
            I build modern digital solutions for{" "}
            <span className="text-green-300">
              startups, clinics, local shops and brands
            </span>{" "}
            — including e-commerce stores, landing pages, dashboards and desktop
            software.
          </p>

          <p className={`reveal d-300 ${show ? "show" : ""} mt-2 text-gray-300 text-sm md:text-base leading-relaxed`}>
            My focus is simple:{" "}
            <span className="text-green-300">
              clean UI, clean code, reliable delivery
            </span>{" "}
            and strong communication.
          </p>

          {/* CTA BUTTONS */}
          <div className={`reveal d-400 ${show ? "show" : ""} mt-5 flex flex-col sm:flex-row justify-center gap-3`}>
            {/* WhatsApp Contact */}
            <a
              href="https://wa.me/212651189916?text=Hello%20I%20am%20interested%20in%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3"
            >
              Contact
            </a>

            <a
              href="/services"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold px-6 py-3"
            >
              View Services
            </a>
          </div>

          {/* EMAIL */}
          <a
            href="mailto:wailelouahabi999@gmail.com"
            className={`reveal d-400 ${show ? "show" : ""} mt-3 inline-block text-sm text-gray-300 hover:text-white underline underline-offset-4`}
          >
            wailelouahabi999@gmail.com
          </a>

          {/* QUOTE */}
          <p className={`reveal d-400 ${show ? "show" : ""} mt-4 text-xs text-gray-400 italic`}>
            “Every project is a chance to build something useful, simple & ready
            to scale.”
          </p>
        </div>
      </div>
    </section>
  );
}
