import { useMemo, useState } from "react";

export default function PricingSection() {
  // ===== DEFAULT CURRENCY = USD =====
  const [currency, setCurrency] = useState("USD");

  // ✅ WHATSAPP NUMBER (بدون +)
  const WHATSAPP_NUMBER = "212651189916";

  // ✅ PROMO CODES (غير لهد جوج plans)
  // type: percent => نسبة / fixed => خصم ثابت بنفس العملة المختارة
  const PROMOS = {
    EXPM10: { type: "percent", value: 10, plans: ["E-Commerce Store"] },
    MPXCM15: { type: "percent", value: 15, plans: ["E-Commerce Store"] },
    WMSOM200: { type: "fixed", value: 200, plans: ["E-Commerce Store"] },

    // ===== STARTER WEBSITE =====
    STKW10: { type: "percent", value: 10, plans: ["Starter Website"] },
    LYX20: { type: "percent", value: 20, plans: ["Starter Website"] },
    LYNIX100: { type: "fixed", value: 100, plans: ["Starter Website"] },
  };

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
    if (cur === "MAD") return `${amount.toLocaleString()} MAD`;
    return `${symbol[cur]}${amount.toLocaleString()} ${cur}`;
  }

  function applyPromo(base, code) {
    if (!code?.trim()) return { ok: false, final: base, promo: null, discount: 0 };

    const cleaned = code.trim().toUpperCase();
    const promo = PROMOS[cleaned];
    if (!promo) return { ok: false, final: base, promo: null, discount: 0 };

    let discount = 0;
    if (promo.type === "percent") discount = (base * promo.value) / 100;
    if (promo.type === "fixed") discount = promo.value;

    const final = Math.max(0, Math.round((base - discount) * 100) / 100);
    return { ok: true, final, promo: { code: cleaned, ...promo }, discount };
  }

  const promoRes = useMemo(() => {
    if (!promoOpen) return null;
    return applyPromo(basePrice, promoCode);
  }, [promoOpen, basePrice, promoCode]);

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

  // ✅ NEW: save WhatsApp click as lead (for Dashboard table)
  function saveWhatsAppLead({ planName, priceLabel, promoCodeUsed, finalLabel }) {
    try {
      const key = "lynix_whatsapp_leads";
      const existing = JSON.parse(localStorage.getItem(key) || "[]");

      const lead = {
        id: `lead_${Date.now()}`, // unique
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
    } catch {
      // ignore
    }
  }

  function goWhatsAppWithPromo() {
    const finalPrice = promoRes?.final ?? basePrice;
    const finalLabel = formatPriceLabel(finalPrice, currency);

    const usedPromo = promoRes?.ok ? promoRes.promo.code : promoCode.trim() ? promoCode.trim() : "";

    const text = `
Salam 👋
I'm interested in: ${selectedPlanName}

Price: ${basePriceLabel}
${
  promoRes?.ok
    ? `Promo: ${promoRes.promo.code} → New price: ${finalLabel}`
    : promoCode.trim()
      ? `Promo tried: ${promoCode.trim()} (invalid)`
      : "Promo: -"
}
`.trim();

    // ✅ save lead
    saveWhatsAppLead({
      planName: selectedPlanName,
      priceLabel: basePriceLabel,
      promoCodeUsed: promoRes?.ok ? promoRes.promo.code : usedPromo ? usedPromo : "—",
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

          let priceLabel;
          if (currency === "MAD") priceLabel = `${price.toLocaleString()} MAD`;
          else priceLabel = `${symbol[currency]}${price.toLocaleString()} ${currency}`;

          const isPromoPlan =
            plan.name === "E-Commerce Store" || plan.name === "Starter Website";

          return (
            <div
              key={plan.name}
              className={`relative rounded-2xl ${plan.popular ? "lg:scale-105" : ""}`}
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

                {/* ✅ PROMO BADGE (icon inside the card, fixed) */}
                {isPromoPlan && (
                  <span className="absolute top-3 right-3 inline-flex items-center gap-2 text-[11px] px-3 py-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 text-emerald-200">
                    <span className="text-xs">🏷️</span>
                    Promo
                  </span>
                )}

                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <p className="text-xs text-gray-300 mb-3">{plan.tagline}</p>

                <p className="text-2xl font-bold text-green-400">From {priceLabel}</p>

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

                    // ✅ save lead also for normal plans
                    saveWhatsAppLead({
                      planName: plan.name,
                      priceLabel,
                      promoCodeUsed: "—",
                      finalLabel: priceLabel,
                    });

                    window.open(
                      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                        `Salam, I'm interested in the ${plan.name} (${priceLabel})`
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

      {/* ============================
          ✅ PROMO MODAL
         ============================ */}
      {promoOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closePromoModal}
          />

          {/* modal */}
          <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#020617] p-5 shadow-[0_0_60px_rgba(0,0,0,0.6)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-green-300/80">
                  Get a Quote
                </p>
                <h3 className="text-xl font-semibold text-white mt-1">
                  {selectedPlanName}
                </h3>

                <p className="text-sm text-gray-300 mt-1">
                  Price:{" "}
                  <span className="text-green-400 font-semibold">
                    {basePriceLabel}
                  </span>
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
                  className={`mt-1 w-full rounded-xl bg-white/5 border px-3 py-2 text-sm text-white outline-none ${
                    promoTouched && promoCode.trim() && !promoRes?.ok
                      ? "border-red-500/60 focus:border-red-400"
                      : "border-white/10 focus:border-green-400/60"
                  }`}
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  onBlur={() => setPromoTouched(true)}
                  placeholder="NEWCLIENT"
                />

                <div className="mt-2 text-xs">
                  {!promoCode.trim() ? (
                    <span className="text-gray-400">promo code .</span>
                  ) : promoRes?.ok ? (
                    <span className="text-green-300">
                      ✅ Promo : {promoRes.promo.code} (
                      {promoRes.promo.type === "percent"
                        ? `-${promoRes.promo.value}%`
                        : `-${promoRes.promo.value} ${currency}`}
                      )
                    </span>
                  ) : (
                    <span className="text-red-400">❌ Promo .</span>
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
