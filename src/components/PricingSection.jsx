// src/components/PricingSection.jsx
import { useMemo, useState } from "react";

export default function PricingSection() {
  const [currency, setCurrency] = useState("USD");
  const WHATSAPP_NUMBER = "212651189916";

  // ✅ PROMO CODES (hidden from UI, still works)
  const PROMOS = {
    // Dashboard UI promos
    MED10: { type: "percent", value: 10, plans: ["Medical Dashboard UI"] },
    CLINIC15: { type: "percent", value: 15, plans: ["Medical Dashboard UI"] },

    // Full solution promos
    FULL100: { type: "fixed", value: 100, plans: ["Full Medical Solution"] },
    FULL10: { type: "percent", value: 10, plans: ["Full Medical Solution"] },

    // Website promos
    WEB50: { type: "fixed", value: 50, plans: ["Medical Website"] },
  };

  // ✅ PRICES
  const priceTable = {
    "Medical Website": { MAD: 8500, USD: 850, EUR: 800 },
    "Medical Dashboard UI": { MAD: 12000, USD: 1100, EUR: 1030 },
    "Full Medical Solution": { MAD: 17500, USD: 1700, EUR: 1600 },
    "Website Redesign & UI Upgrade": { MAD: 9000, USD: 800, EUR: 750 },
    "Maintenance & Support": { MAD: 1500, USD: 150, EUR: 140 },
  };

  const symbol = { MAD: "", USD: "$", EUR: "€" };

  const plans = [
    {
      name: "Medical Website",
      tagline: "Professional online presence for doctors and clinics.",
      features: [
        "Up to 5 pages (Home, About, Services, Contact, Appointment)",
        "Mobile-first responsive design",
        "WhatsApp button + contact form",
        "SEO-friendly structure (Google-ready)",
        "Delivery in ~3–5 days",
      ],
    },
    {
      name: "Medical Dashboard UI",
      popular: true,
      tagline: "Clinic dashboard UI for appointments, patients & stats (UI only).",
      features: [
        "Login interface + role-ready structure",
        "Appointments table + calendar UI",
        "Patients list + details UI",
        "Stats cards + charts (mock data)",
        "Ready for backend integration later",
        "Delivery in ~5–7 days",
      ],
    },
    {
      name: "Full Medical Solution",
      tagline: "Complete solution: website + dashboard UI.",
      features: [
        "Medical website + dashboard UI",
        "Unified design system (same style & colors)",
        "Optimized UX for clinics & patients",
        "Scalable component structure",
        "Delivery in ~7–10 days",
      ],
    },
    {
      name: "Website Redesign & UI Upgrade",
      tagline: "Modernize an existing clinic website (fast delivery).",
      features: [
        "Modern redesign + better layout",
        "Fix responsiveness issues",
        "Improve speed & UX",
        "Better CTA placement",
        "Delivery in ~2–3 days",
      ],
    },
    {
      name: "Maintenance & Support",
      tagline: "Monthly support to keep your system secure and updated.",
      features: [
        "Bug fixes & small updates",
        "Performance & security monitoring",
        "Content updates if needed",
        "Priority WhatsApp support",
        "Monthly plan (cancel anytime)",
      ],
    },
  ];

  // ============================
  // ✅ PROMO MODAL STATE
  // ============================
  const [promoOpen, setPromoOpen] = useState(false);
  const [selectedPlanName, setSelectedPlanName] = useState("");
  const [basePrice, setBasePrice] = useState(0);
  const [basePriceLabel, setBasePriceLabel] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoTouched, setPromoTouched] = useState(false);

  function formatPriceLabel(amount, cur) {
    if (cur === "MAD") return `${amount.toLocaleString("fr-FR")} MAD`;
    return `${symbol[cur]}${amount.toLocaleString("fr-FR")} ${cur}`;
  }

  function applyPromo(base, code, planName) {
    if (!code?.trim()) return { ok: false, final: base, promo: null, discount: 0 };

    const cleaned = code.trim().toUpperCase();
    const promo = PROMOS[cleaned];
    if (!promo) return { ok: false, final: base, promo: null, discount: 0 };

    // promo allowed only for this plan
    if (promo.plans && !promo.plans.includes(planName)) {
      return { ok: false, final: base, promo: null, discount: 0 };
    }

    let discount = 0;
    if (promo.type === "percent") discount = (base * promo.value) / 100;
    if (promo.type === "fixed") discount = promo.value;

    const final = Math.max(0, Math.round((base - discount) * 100) / 100);
    return { ok: true, final, promo: { code: cleaned, ...promo }, discount };
  }

  const promoRes = useMemo(() => {
    if (!promoOpen) return null;
    return applyPromo(basePrice, promoCode, selectedPlanName);
  }, [promoOpen, basePrice, promoCode, selectedPlanName]);

  function openPromoModal(planName, base, label) {
    setSelectedPlanName(planName);
    setBasePrice(base);
    setBasePriceLabel(label);
    setPromoOpen(true);
    setPromoCode("");
    setPromoTouched(false);
  }

  function closePromoModal() {
    setPromoOpen(false);
    setSelectedPlanName("");
    setBasePrice(0);
    setBasePriceLabel("");
    setPromoCode("");
    setPromoTouched(false);
  }

  // ✅ Save WhatsApp click as lead (Dashboard)
  function saveWhatsAppLead({ planName, priceLabel, promoCodeUsed, finalLabel }) {
    try {
      const key = "lynix_whatsapp_leads";
      const existing = JSON.parse(localStorage.getItem(key) || "[]");

      const lead = {
        id: `lead_${Date.now()}`,
        type: "lead",
        client: "WhatsApp Lead",
        planName,
        priceLabel,
        promoCode: promoCodeUsed || "—",
        createdAt: new Date().toISOString(),
        deliveredAt: null,
        status: "pending",
        finalLabel: finalLabel || priceLabel,
      };

      localStorage.setItem(key, JSON.stringify([lead, ...existing]));
    } catch {}
  }

  function goWhatsAppWithPromo() {
    const triedPromo = promoCode.trim().toUpperCase();

    const finalPrice = promoRes?.final ?? basePrice;
    const finalLabel = formatPriceLabel(finalPrice, currency);

    const text = `
Hello 👋
I'm interested in: ${selectedPlanName}

Base price: ${basePriceLabel}
${
  promoRes?.ok
    ? `Promo applied: ${promoRes.promo.code}\nFinal price: ${finalLabel}`
    : triedPromo
    ? `Promo code entered: ${triedPromo} (not valid)`
    : "Promo code: -"
}
`.trim();

    // save lead
    saveWhatsAppLead({
      planName: selectedPlanName,
      priceLabel: basePriceLabel,
      promoCodeUsed: promoRes?.ok ? promoRes.promo.code : triedPromo ? triedPromo : "—",
      finalLabel: promoRes?.ok ? finalLabel : basePriceLabel,
    });

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
    closePromoModal();
  }

  return (
    <section id="project-pricing" className="max-w-6xl mx-auto px-4 py-16">
      {/* TITLE */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Project <span className="text-green-400">Pricing</span>
        </h2>
        <p className="text-gray-300 mt-3 text-sm md:text-base max-w-2xl mx-auto">
          Clear packages designed for doctors, clinics and medical centers.
        </p>
      </div>

      {/* CURRENCY */}
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

      {/* GRID */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => {
          const price = priceTable?.[plan.name]?.[currency] ?? 0;

          const priceLabel =
            currency === "MAD"
              ? `${price.toLocaleString("fr-FR")} MAD`
              : `${symbol[currency]}${price.toLocaleString("fr-FR")} ${currency}`;

          const isPromoPlan = ["Medical Website", "Medical Dashboard UI", "Full Medical Solution"].includes(
            plan.name
          );

          const isMaintenance = plan.name === "Maintenance & Support";

          return (
            <div
              key={plan.name}
              className={`relative rounded-2xl ${
                plan.popular ? "lg:scale-105" : ""
              } ${isMaintenance ? "lg:col-start-3" : ""}`}
            >
              {plan.popular && (
                <div className="pointer-events-none absolute -inset-3 rounded-3xl bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.55),transparent_60%)] opacity-80 blur-xl" />
              )}

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

                {isMaintenance && (
                  <span className="absolute top-3 right-3 inline-flex items-center gap-2 text-[11px] px-3 py-1 rounded-full border border-sky-500/25 bg-sky-500/10 text-sky-200">
                    <span className="text-xs">🛡️</span>
                    Monthly
                  </span>
                )}

                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <p className="text-xs text-gray-300 mb-3">{plan.tagline}</p>

                <p className="text-2xl font-bold text-green-400">
                  From {priceLabel}{" "}
                  {isMaintenance && <span className="text-xs text-gray-400">/ month</span>}
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
                  onClick={() => {
                    if (isPromoPlan) {
                      openPromoModal(plan.name, price, priceLabel);
                      return;
                    }

                    saveWhatsAppLead({
                      planName: plan.name,
                      priceLabel,
                      promoCodeUsed: "—",
                      finalLabel: priceLabel,
                    });

                    window.open(
                      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                        `Hello 👋 I'm interested in: ${plan.name}\nPrice: ${priceLabel}`
                      )}`,
                      "_blank"
                    );
                  }}
                >
                  Get a Quote
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* PROMO MODAL (NO CODE LIST, ONLY INPUT) */}
      {promoOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closePromoModal} />

          <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#020617] p-5 shadow-[0_0_60px_rgba(0,0,0,0.6)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-green-300/80">
                  Get a Quote
                </p>
                <h3 className="text-xl font-semibold text-white mt-1">{selectedPlanName}</h3>

                <p className="text-sm text-gray-300 mt-1">
                  Price:{" "}
                  <span className="text-green-400 font-semibold">{basePriceLabel}</span>
                  {promoRes?.ok && (
                    <>
                      {" "}
                      →{" "}
                      <span className="text-green-400 font-semibold">
                        {formatPriceLabel(promoRes.final, currency)}
                      </span>
                    </>
                  )}
                </p>
              </div>

              <button
                onClick={closePromoModal}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10 transition"
              >
                Close
              </button>
            </div>

            <div className="mt-5 grid gap-3">
              <div>
                <label className="text-xs text-gray-300">Promo code (optional)</label>
                <input
                  className={`mt-1 w-full rounded-xl bg-white/5 border px-3 py-2 text-sm text-white outline-none placeholder:text-slate-400 ${
                    promoTouched && promoCode.trim() && !promoRes?.ok
                      ? "border-red-500/60 focus:border-red-400"
                      : "border-white/10 focus:border-green-400/60"
                  }`}
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  onBlur={() => setPromoTouched(true)}
                  placeholder="Enter promo code (if you have one)"
                />

                <div className="mt-2 text-xs">
                  {!promoCode.trim() ? (
                    <span className="text-gray-400">
                      If you have a promo code, enter it here.
                    </span>
                  ) : promoRes?.ok ? (
                    <span className="text-green-300">
                      ✅ Promo applied ({promoRes.promo.code})
                    </span>
                  ) : (
                    <span className="text-red-400">
                      ❌ Promo code is not valid.
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={goWhatsAppWithPromo}
                className="mt-1 w-full bg-green-500 hover:bg-green-600 text-black py-2.5 rounded-xl text-sm font-semibold transition"
              >
                Continue to WhatsApp
              </button>

              <p className="text-[11px] text-gray-500">
                * We’ll confirm the final quote after a quick call.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
