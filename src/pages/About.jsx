import { useEffect, useRef, useState } from "react";
import AboutFounder from "../components/AboutFounder";

function useReveal(options = { threshold: 0.2 }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShow(true);
        obs.disconnect(); // reveal once
      }
    }, options);

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, show };
}

export default function About() {
  const hero = useReveal({ threshold: 0.3 });
  const blocks = useReveal({ threshold: 0.2 });
  const tech = useReveal({ threshold: 0.2 });
  const why = useReveal({ threshold: 0.2 });

  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      {/* Hero / Intro */}
      <section ref={hero.ref} className="text-center mb-12">
        <h1
          className={`reveal ${hero.show ? "show" : ""} text-3xl md:text-4xl font-bold mb-3`}
        >
          About <span className="text-green-400">Us</span>
        </h1>

        <p
          className={`reveal d-150 ${hero.show ? "show" : ""} text-gray-300 text-sm md:text-base max-w-3xl mx-auto leading-relaxed`}
        >
          lynix.digital is a full-stack development studio building{" "}
          <span className="text-green-300">modern websites</span>,{" "}
          <span className="text-green-300">e-commerce platforms</span>,{" "}
          <span className="text-green-300">web apps</span>, and{" "}
          <span className="text-green-300">desktop software</span> for
          businesses and individuals. We take care of everything from idea,
          design and development to deployment and support.
        </p>
      </section>

      {/* 2 columns: Who we are / What we do */}
      <section ref={blocks.ref} className="grid md:grid-cols-2 gap-8 mb-12">
        <div
          className={`reveal ${blocks.show ? "show" : ""} bg-[#020617] border border-white/10 rounded-2xl p-6`}
        >
          <h2 className="text-xl font-semibold mb-3 text-green-400">
            Who We Are
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            We are a small, focused team of full-stack developers passionate
            about clean code, performance and user experience. Our goal is to
            help you launch reliable digital products without stress, with clear
            communication and transparent timelines.
          </p>
        </div>

        <div
          className={`reveal d-150 ${blocks.show ? "show" : ""} bg-[#020617] border border-white/10 rounded-2xl p-6`}
        >
          <h2 className="text-xl font-semibold mb-3 text-green-400">
            What We Do
          </h2>
          <ul className="text-sm text-gray-300 space-y-2 list-disc list-inside">
            <li>Business websites & landing pages</li>
            <li>E-commerce stores with admin dashboards</li>
            <li>Custom web applications & SaaS dashboards</li>
            <li>Desktop apps for Windows (management, billing, POS…)</li>
            <li>API development, integrations & basic IT services</li>
          </ul>
        </div>
      </section>

      {/* Tech stack / tools */}
      <section ref={tech.ref} className="mb-12">
        <h2
          className={`reveal ${tech.show ? "show" : ""} text-xl font-semibold mb-4 text-center`}
        >
          Technologies We <span className="text-green-400">Love</span>
        </h2>

        <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm">
          {[
            "React.js",
            "Tailwind CSS",
            "Laravel / PHP",
            "Node.js APIs",
            "MySQL / SQL",
            "REST APIs",
            "Git & GitHub",
            "Deployment & Hosting",
          ].map((item, idx) => (
            <div
              key={item}
              className={`reveal ${tech.show ? "show" : ""} ${
                idx % 4 === 0
                  ? "d-0"
                  : idx % 4 === 1
                  ? "d-100"
                  : idx % 4 === 2
                  ? "d-200"
                  : "d-300"
              } bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-center text-gray-200`}
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section ref={why.ref} className="mb-6">
        <h2
          className={`reveal ${why.show ? "show" : ""} text-xl font-semibold mb-4 text-center`}
        >
          Why Clients <span className="text-green-400">Work With Us</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div
            className={`reveal ${why.show ? "show" : ""} bg-[#020617] border border-white/10 rounded-2xl p-5`}
          >
            <h3 className="font-semibold mb-2">Full-Stack Mindset</h3>
            <p className="text-gray-300">
              We understand both frontend and backend, so we design solutions
              that are fast, secure and easy to maintain.
            </p>
          </div>

          <div
            className={`reveal d-150 ${why.show ? "show" : ""} bg-[#020617] border border-white/10 rounded-2xl p-5`}
          >
            <h3 className="font-semibold mb-2">Clean UI & UX</h3>
            <p className="text-gray-300">
              Modern, responsive interfaces that look professional on desktop,
              tablet and mobile.
            </p>
          </div>

          <div
            className={`reveal d-300 ${why.show ? "show" : ""} bg-[#020617] border border-white/10 rounded-2xl p-5`}
          >
            <h3 className="font-semibold mb-2">Flexible Collaboration</h3>
            <p className="text-gray-300">
              We can join your existing project, build from scratch, or help you
              refactor and improve what you already have.
            </p>
          </div>
        </div>
      </section>

      {/* 👤 Founder section */}
      <AboutFounder />
    </main>
  );
}
