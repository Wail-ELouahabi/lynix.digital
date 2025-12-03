import { useState } from "react";

export default function PricingSection() {
  // ===== DEFAULT CURRENCY = USD =====
  const [currency, setCurrency] = useState("USD");

  // ===== PRICES IN ALL CURRENCIES =====
  const priceTable = {
    "Landing Page": { MAD: 2500, USD: 250, EUR: 238 },
    "E-Commerce Store": { MAD: 9500, USD: 950, EUR: 903 },
    "Starter Website": { MAD: 4500, USD: 450, EUR: 428 },
    "Web App / Dashboard": { MAD: 11500, USD: 1150, EUR: 1093 },
    "Custom System": { MAD: 15000, USD: 1500, EUR: 1425 },
    "Maintenance & Support": { MAD: 1500, USD: 150, EUR: 143 },
  };

  const symbol = { MAD: "", USD: "$", EUR: "€" };

  const plans = [
    {
      name: "Landing Page",
      tagline:
        "For new startups, local shops or services that need a simple online presence.",
      features: [
        "Single page (Home + Contact)",
        "Responsive design (mobile & desktop)",
        "Basic SEO setup so people can find you",
        "Contact form or WhatsApp button",
        "Delivery in ~3–5 days",
      ],
    },
    {
      name: "E-Commerce Store",
      popular: true,
      tagline:
        "For shops & brands that want to sell online in Morocco and abroad.",
      features: [
        "Product catalog, categories & search",
        "Cart, checkout & online payments",
        "Admin dashboard (orders & stock)",
        "Customer accounts & email notifications",
        "Performance & security optimization",
      ],
    },
    {
      name: "Starter Website",
      tagline:
        "For small businesses, clinics, salons and independent professionals.",
      features: [
        "Up to 5 pages (Home, Services, About, Contact…)",
        "Responsive design for phone, tablet & desktop",
        "Basic SEO setup (Google friendly)",
        "Contact form + WhatsApp integration",
        "Delivery in ~7–10 days",
      ],
    },
    {
      name: "Web App / Dashboard",
      tagline: "For businesses that need custom tools, reports and automation.",
      features: [
        "Custom UI adapted to your workflow",
        "Login, roles & permissions for your team",
        "Reports & analytics for better decisions",
        "REST APIs (Laravel / Node)",
        "Real-time or scheduled data updates",
      ],
    },
    {
      name: "Custom System",
      tagline:
        "For companies that need ERP, booking system or complex business logic.",
      features: [
        "Full analysis of your needs & processes",
        "Architecture & database design",
        "Integration with your tools (API, CRM, ERP…)",
        "Deployment, monitoring & optimization",
        "Long-term support options available",
      ],
    },
    {
      name: "Maintenance & Support",
      tagline:
        "For businesses that want peace of mind after their launch — we keep things running.",
      features: [
        "Security & performance monitoring",
        "Bug fixes & small feature updates",
        "Server & domain renewal assistance",
        "Backups & recovery help",
        "Priority support via WhatsApp / email",
      ],
    },
  ];

  return (
    <section id="project-pricing" className="max-w-6xl mx-auto px-4 py-16">
      {/* ==== TITLE CENTERED ==== */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Project <span className="text-green-400">Pricing</span>
        </h2>
        <p className="text-gray-300 mt-3 text-sm md:text-base max-w-2xl mx-auto">
          Smart packages designed for startups, local shops, clinics and small
          businesses in Morocco. Clear starting prices — we&apos;ll confirm a
          final quote after a quick call.
        </p>
      </div>

      {/* ===== CURRENCY SWITCHER ===== */}
      <div className="flex justify-end mb-6 gap-2">
        {["MAD", "USD", "EUR"].map((cur) => (
          <button
            key={cur}
            onClick={() => setCurrency(cur)}
            className={`px-4 py-1 rounded-full text-sm border 
              ${
                currency === cur
                  ? "bg-green-500 text-black"
                  : "bg-white/10 text-white border-white/20"
              }`}
          >
            {cur}
          </button>
        ))}
      </div>

      {/* ===== GRID OF CARDS ===== */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => {
          const price = priceTable[plan.name][currency];

          // format price label
          let priceLabel;
          if (currency === "MAD") {
            priceLabel = `${price.toLocaleString()} MAD`;
          } else {
            priceLabel = `${symbol[currency]}${price.toLocaleString()} ${currency}`;
          }

          return (
            <div
              key={plan.name}
              className={`relative rounded-2xl ${
                plan.popular ? "lg:scale-105" : ""
              }`}
            >
              {/* GLOW ONLY FOR MOST POPULAR */}
              {plan.popular && (
                <div className="pointer-events-none absolute -inset-3 rounded-3xl bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.55),transparent_60%)] opacity-80 blur-xl" />
              )}

              {/* CARD */}
              <div
                className={`relative z-10 bg-[#020617] border rounded-2xl p-5 shadow-lg
                  ${
                    plan.popular
                      ? "border-green-400/70 shadow-[0_0_45px_rgba(34,197,94,0.65)]"
                      : "border-white/10 hover:border-green-500/40"
                  }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-black text-xs font-semibold px-3 py-1 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.8)]">
                    Most Popular
                  </span>
                )}

                <h3 className="text-lg font-semibold text-white">
                  {plan.name}
                </h3>
                <p className="text-xs text-gray-300 mb-3">{plan.tagline}</p>

                <p className="text-2xl font-bold text-green-400">
                  From {priceLabel}
                </p>

                <ul className="space-y-1.5 text-xs text-gray-200 my-4">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-400 mr-2 mt-0.5">✔</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className="w-full mt-4 bg-white/10 hover:bg-white/20 py-2 rounded-xl text-xs text-white transition"
                  onClick={() =>
                    window.open(
                      `https://wa.me/212651189916?text=Salam, I'm interested in the ${plan.name} (${priceLabel})`,
                      "_blank"
                    )
                  }
                >
                  Get a Quote
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
