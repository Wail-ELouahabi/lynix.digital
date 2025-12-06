// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { projectSales } from "../data/projectSales";

function isSameMonth(dateA, dateB) {
  return (
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getFullYear() === dateB.getFullYear()
  );
}

// Revenue ديال هاد الشهر بالمغربية (MAD)
function getThisMonthRevenueMad(sales) {
  const now = new Date();
  return sales
    .filter((s) => isSameMonth(new Date(s.deliveredAt), now))
    .reduce((sum, s) => sum + (Number(s.priceMad) || 0), 0);
}

// عدد المشاريع ديال هاد الشهر
function getThisMonthProjectsCount(sales) {
  const now = new Date();
  return sales.filter((s) => isSameMonth(new Date(s.deliveredAt), now)).length;
}

// عدد المشاريع حسب الPlan
function getCountByPlan(planName) {
  return projectSales.filter((s) => s.planName === planName).length;
}

/**
 * آخر X شهور:
 * - label: smiyt chhar (Jul, Aug, Sep…)
 * - count: ch7al men project
 * - revenueMad: ch7al men MAD dakhal f dak chhar
 */
function getLastMonthsData(months = 6) {
  const now = new Date();
  const result = [];

  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleString("en-US", { month: "short" }); // Jul, Aug...

    const monthlySales = projectSales.filter((s) => {
      const sd = new Date(s.deliveredAt);
      return (
        sd.getMonth() === d.getMonth() &&
        sd.getFullYear() === d.getFullYear()
      );
    });

    const monthlyRevenue = monthlySales.reduce(
      (sum, s) => sum + (Number(s.priceMad) || 0),
      0
    );

    result.push({
      label,
      count: monthlySales.length,
      revenueMad: monthlyRevenue,
    });
  }

  return result;
}

export default function Dashboard() {
  const [authorized, setAuthorized] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const SECRET_CODE = "4279"; // تقدر تبدل الكود هنا

  // ====== ACCESS GATE (code صغير باش غير انت تشوف الDashboard) ======
  useEffect(() => {
    const ok = localStorage.getItem("lynix_dashboard_ok") === "1";
    if (ok) setAuthorized(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === SECRET_CODE) {
      setAuthorized(true);
      localStorage.setItem("lynix_dashboard_ok", "1");
      setError("");
    } else {
      setError("Access code incorrect.");
    }
  };

  // ===== REAL ANALYTICS FROM PROJECT SALES =====
  const revenueThisMonthMad = getThisMonthRevenueMad(projectSales);
  const projectsThisMonth = getThisMonthProjectsCount(projectSales);
  const totalProjects = projectSales.length;

  const landingCount = getCountByPlan("Landing Page");
  const ecommerceCount = getCountByPlan("E-Commerce Store"); // ila bghiti t-affichi hadchi zed card
  const webAppCount = getCountByPlan("Web App / Dashboard");

  const monthlyData = getLastMonthsData(6); // آخر 6 شهور

  /* =============== ACCESS GATE UI =============== */
  if (!authorized) {
    return (
      <section className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
        <div className="max-w-sm w-full bg-slate-900/90 border border-slate-700 rounded-2xl p-6 shadow-[0_0_40px_rgba(15,23,42,0.8)]">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/80 mb-3">
            lynix.digital / internal
          </p>
          <h1 className="text-xl font-semibold mb-2">
            Private <span className="text-emerald-400">Dashboard</span>
          </h1>
          <p className="text-sm text-slate-300 mb-4">
            Enter your access code to view analytics.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              placeholder="Access code"
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-black text-sm font-medium py-2.5 rounded-xl shadow-lg shadow-emerald-500/40 transition"
            >
              Unlock
            </button>
          </form>

          <p className="mt-3 text-[11px] text-slate-500">
            This area is private. Only you should know the access code.
          </p>
        </div>
      </section>
    );
  }

  /* =============== REAL DASHBOARD UI =============== */
  return (
    <section className="bg-slate-950 text-white min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <p className="uppercase tracking-[0.25em] text-xs text-emerald-300/70 mb-3">
          lynix.digital / dashboard
        </p>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-2">
          Project <span className="text-green-400">Analytics</span>
        </h1>

        <p className="text-slate-300 max-w-xl mb-10">
          Real numbers based on projects you&apos;ve actually delivered.
        </p>

        {/* TOP STATS CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Revenue this month */}
          <div className="rounded-2xl bg-slate-900/80 border border-emerald-400/25 shadow-[0_0_40px_rgba(16,185,129,0.35)] p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wide text-emerald-200/80">
                Revenue
              </span>
              <span className="text-xs text-emerald-300/80 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                This month
              </span>
            </div>
            <p className="text-3xl font-semibold">
              {revenueThisMonthMad.toLocaleString("fr-FR")} MAD
            </p>
            <p className="text-xs text-emerald-300/90">
              {projectsThisMonth} projects delivered this month
            </p>
          </div>

          {/* Total Projects */}
          <div className="rounded-2xl bg-slate-900/70 border border-slate-700/80 p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wide text-slate-300/90">
                Total Projects
              </span>
              <span className="text-xs text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-full">
                All time
              </span>
            </div>
            <p className="text-3xl font-semibold text-slate-50">
              {totalProjects}
            </p>
            <p className="text-xs text-slate-400">
              Projects recorded in <code>projectSales.js</code>
            </p>
          </div>

          {/* Landing Pages */}
          <div className="rounded-2xl bg-slate-900/70 border border-slate-700/80 p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wide text-slate-300/90">
                Landing Pages
              </span>
              <span className="text-lg">📄</span>
            </div>
            <p className="text-3xl font-semibold text-slate-50">
              {landingCount}
            </p>
            <p className="text-xs text-slate-400">
              Using the Landing Page plan
            </p>
          </div>

          {/* Web Apps / Dashboards */}
          <div className="rounded-2xl bg-slate-900/70 border border-slate-700/80 p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wide text-slate-300/90">
                Web Apps / Dashboards
              </span>
              <span className="text-lg">📊</span>
            </div>
            <p className="text-3xl font-semibold text-slate-50">
              {webAppCount}
            </p>
            <p className="text-xs text-slate-400">
              Using the Web App / Dashboard plan
            </p>
          </div>

          {/* Ila bghiti card khassa b "E-Commerce Store" تقدر تزيد هادي: */}
          {false && (
            <div className="rounded-2xl bg-slate-900/70 border border-slate-700/80 p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wide text-slate-300/90">
                  E-Commerce Stores
                </span>
                <span className="text-lg">🛒</span>
              </div>
              <p className="text-3xl font-semibold text-slate-50">
                {ecommerceCount}
              </p>
              <p className="text-xs text-slate-400">
                Using the E-Commerce Store plan
              </p>
            </div>
          )}
        </section>

        {/* Monthly chart: projects + revenue per month */}
        <div className="mt-12 rounded-2xl bg-slate-900/70 border border-slate-800 p-6">
          <p className="text-sm uppercase text-slate-300 mb-3 tracking-wide">
            Monthly Delivery
          </p>
          <p className="text-lg font-semibold text-slate-100 mb-6">
            Projects &amp; revenue per month
          </p>

          <div className="flex items-end gap-4 h-48">
            {monthlyData.map((m) => (
              <div
                key={m.label}
                className="flex flex-col items-center flex-1 gap-1"
              >
                {/* Bar height = projects count + small base height باش تبان حتى إلا كان 0 */}
                <div
                  className="w-full bg-gradient-to-t from-emerald-500/40 to-emerald-300/80 rounded-xl transition-all"
                  style={{ height: `${10 + m.count * 18}px` }}
                />
                {/* Month name */}
                <span className="text-xs text-slate-400 mt-1">{m.label}</span>
                {/* Project count */}
                <span className="text-[11px] text-slate-500">
                  {m.count} proj
                </span>
                {/* Revenue MAD */}
                <span className="text-[11px] text-emerald-300">
                  {m.revenueMad
                    ? `${m.revenueMad.toLocaleString("fr-FR")} MAD`
                    : "0 MAD"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
