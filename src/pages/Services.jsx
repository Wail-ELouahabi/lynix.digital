// src/pages/Services.jsx
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

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
          Digital Services Tailored
          <span className="block text-green-400">To Your Business</span>
        </h1>

        <p
          className={`reveal d-200 ${
            hero.show ? "show" : ""
          } mt-4 text-sm md:text-base text-gray-300`}
        >
          We design and build modern websites, e-commerce stores, dashboards and
          custom software for startups, local shops, clinics and growing companies
          — with a focus on clean UI, performance and clear communication.
        </p>
      </section>

      {/* What We Build */}
      <section ref={build.ref} className="space-y-6">
        <h2
          className={`reveal ${build.show ? "show" : ""} text-xl md:text-2xl font-semibold text-white`}
        >
          What We Build
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Websites & Landing Pages */}
          <div
            className={`reveal ${build.show ? "show" : ""} rounded-2xl border border-white/10 bg-[#020617] p-6 shadow-lg shadow-black/40`}
          >
            <h3 className="text-lg font-semibold text-white">
              Websites & Landing Pages
            </h3>
            <p className="mt-2 text-sm text-gray-300">
              Fast, modern websites that look great on mobile and desktop — perfect for
              startups, local shops, clinics and independent professionals.
            </p>
            <ul className="mt-4 space-y-1 text-sm text-gray-300">
              <li>• One-page landing sites or full multi-page websites</li>
              <li>• Copy structure &amp; basic SEO so people can find you</li>
              <li>• Contact forms and WhatsApp integration for quick contact</li>
              <li>• Hosting &amp; domain setup assistance if needed</li>
            </ul>
          </div>

          {/* E-Commerce Stores */}
          <div
            className={`reveal d-100 ${
              build.show ? "show" : ""
            } rounded-2xl border border-green-500/60 bg-gradient-to-b from-green-500/10 to-transparent p-6 shadow-xl shadow-green-900/50`}
          >
            <div className="inline-flex mb-2 rounded-full bg-green-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-green-400">
              Most Popular
            </div>
            <h3 className="text-lg font-semibold text-white">E-Commerce Stores</h3>
            <p className="mt-2 text-sm text-gray-300">
              Online stores ready to sell in Morocco and abroad, with secure payments
              and a clean admin dashboard for managing products and orders.
            </p>
            <ul className="mt-4 space-y-1 text-sm text-gray-300">
              <li>• Product catalog, categories &amp; search</li>
              <li>• Cart, checkout &amp; online payments integration</li>
              <li>• Admin dashboard for orders, stock &amp; offers</li>
              <li>• Customer accounts, email / WhatsApp notifications</li>
            </ul>
          </div>

          {/* Web Apps & Dashboards */}
          <div
            className={`reveal d-200 ${
              build.show ? "show" : ""
            } rounded-2xl border border-white/10 bg-[#020617] p-6 shadow-lg shadow-black/40`}
          >
            <h3 className="text-lg font-semibold text-white">
              Web Apps &amp; Dashboards
            </h3>
            <p className="mt-2 text-sm text-gray-300">
              Internal tools, reporting dashboards and SaaS applications that automate
              your work and give you a clear view on your business.
            </p>
            <ul className="mt-4 space-y-1 text-sm text-gray-300">
              <li>• Authentication, roles &amp; permissions for your team</li>
              <li>• KPIs, reports &amp; analytics based on your data</li>
              <li>• Real-time or scheduled data updates via APIs</li>
              <li>• Multi-tenant / multi-branch setups if needed</li>
            </ul>
          </div>

          {/* Systems, Desktop Apps & IT Services */}
          <div
            className={`reveal d-300 ${
              build.show ? "show" : ""
            } rounded-2xl border border-white/10 bg-[#020617] p-6 shadow-lg shadow-black/40`}
          >
            <h3 className="text-lg font-semibold text-white">
              Systems, Desktop Apps &amp; IT Services
            </h3>
            <p className="mt-2 text-sm text-gray-300">
              Complete solutions for business operations: ERP modules, booking systems,
              POS / inventory, and technical maintenance.
            </p>
            <ul className="mt-4 space-y-1 text-sm text-gray-300">
              <li>• Custom business logic (ERP, booking, inventory…)</li>
              <li>• Windows desktop tools connected to your database</li>
              <li>• Server setup, monitoring, backups &amp; security</li>
              <li>• Long-term support plans for serious businesses</li>
            </ul>
          </div>
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
          {/* Step 1 */}
          <div
            className={`reveal ${work.show ? "show" : ""} rounded-2xl border border-white/10 bg-[#020617] p-6`}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Step 1
            </p>
            <h3 className="mt-1 text-base font-semibold text-white">
              Call &amp; Requirements
            </h3>
            <p className="mt-3 text-sm text-gray-300">
              We discuss your idea, target customers, budget and deadlines, then choose
              the right solution and technologies together.
            </p>
          </div>

          {/* Step 2 */}
          <div
            className={`reveal d-100 ${
              work.show ? "show" : ""
            } rounded-2xl border border-white/10 bg-[#020617] p-6`}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Step 2
            </p>
            <h3 className="mt-1 text-base font-semibold text-white">
              Design &amp; Development
            </h3>
            <p className="mt-3 text-sm text-gray-300">
              We design the UX/UI, build the frontend and backend, connect payments /
              APIs and prepare an admin space that is easy to use.
            </p>
          </div>

          {/* Step 3 */}
          <div
            className={`reveal d-200 ${
              work.show ? "show" : ""
            } rounded-2xl border border-white/10 bg-[#020617] p-6`}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Step 3
            </p>
            <h3 className="mt-1 text-base font-semibold text-white">
              Launch &amp; Support
            </h3>
            <p className="mt-3 text-sm text-gray-300">
              We deploy your project, track performance and bugs, and can stay with you
              on a monthly plan for new features, security &amp; maintenance.
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
            {[
              "React.js",
              "Tailwind CSS",
              "Laravel / PHP",
              "REST APIs",
              "MySQL / SQL",
              "Node.js",
            ].map((t, idx) => (
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
            ))}
          </div>

          <div className="text-sm text-gray-300 md:text-right">
            <p>Have a project in mind?</p>
            <p>
              Tell us a bit about your idea and we&apos;ll send you a clear plan
              and estimate.
            </p>
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
