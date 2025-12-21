// src/pages/Dashboard.jsx
import { useState, useEffect, useMemo } from "react";
import { projectSales } from "../data/projectSales";

function isSameMonth(dateA, dateB) {
  return (
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getFullYear() === dateB.getFullYear()
  );
}

function getThisMonthRevenueMad(allProjects) {
  const now = new Date();
  return allProjects
    .filter((s) => s.type !== "lead")
    .filter((s) => s.deliveredAt && isSameMonth(new Date(s.deliveredAt), now))
    .reduce((sum, s) => sum + (Number(s.priceMad) || 0), 0);
}

function getThisMonthProjectsCount(allProjects) {
  const now = new Date();
  return allProjects
    .filter((s) => s.type !== "lead")
    .filter((s) => s.deliveredAt && isSameMonth(new Date(s.deliveredAt), now))
    .length;
}

function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("fr-FR");
}

function getLastMonthsData(allProjects, months = 6) {
  const now = new Date();
  const result = [];

  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleString("en-US", { month: "short" });

    const monthlySales = allProjects
      .filter((p) => p.type !== "lead")
      .filter((p) => p.deliveredAt)
      .filter((p) => {
        const sd = new Date(p.deliveredAt);
        return (
          sd.getMonth() === d.getMonth() && sd.getFullYear() === d.getFullYear()
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

  const SECRET_CODE = "4279";

  const [projectsOpen, setProjectsOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const [projectStatusMap, setProjectStatusMap] = useState({});
  const [deletedIds, setDeletedIds] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("lynix_project_status_map");
    if (saved) {
      try {
        setProjectStatusMap(JSON.parse(saved));
      } catch {
        setProjectStatusMap({});
      }
    }

    const del = localStorage.getItem("lynix_deleted_project_ids");
    if (del) {
      try {
        const arr = JSON.parse(del);
        setDeletedIds(Array.isArray(arr) ? arr : []);
      } catch {
        setDeletedIds([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "lynix_project_status_map",
      JSON.stringify(projectStatusMap)
    );
  }, [projectStatusMap]);

  useEffect(() => {
    localStorage.setItem("lynix_deleted_project_ids", JSON.stringify(deletedIds));
  }, [deletedIds]);

  function setStatus(id, status) {
    setProjectStatusMap((prev) => ({ ...prev, [id]: status }));
  }

  function openWhatsApp(project) {
    const YOUR_WA = "212651189916";

    const priceLine =
      project.priceLabel ||
      (project.priceMad
        ? `${Number(project.priceMad || 0).toLocaleString("fr-FR")} MAD`
        : project.price || "—");

    const text = `
Salam 👋
Type: ${project.type === "lead" ? "Lead" : "Sale"}
Project: ${project.planName}
Client: ${project.client}
Price: ${priceLine}
Promo: ${project.promoCode || "—"}
Status: ${project.status}
Created: ${project.createdAt ? formatDate(project.createdAt) : "—"}
Delivered: ${project.deliveredAt ? formatDate(project.deliveredAt) : "—"}
`.trim();

    window.open(
      `https://wa.me/${YOUR_WA}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  }

  function deleteRow(project) {
    const ok = window.confirm("Delete this row?");
    if (!ok) return;

    setProjectStatusMap((prev) => {
      const copy = { ...prev };
      delete copy[project.id];
      return copy;
    });

    setDeletedIds((prev) => Array.from(new Set([...prev, project.id])));

    if (project.type === "lead") {
      try {
        const arr = JSON.parse(
          localStorage.getItem("lynix_whatsapp_leads") || "[]"
        );
        const next = Array.isArray(arr)
          ? arr.filter((x) => x.id !== project.id)
          : [];
        localStorage.setItem("lynix_whatsapp_leads", JSON.stringify(next));
      } catch {}
    }
  }

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

  const whatsappLeads = useMemo(() => {
    try {
      const arr = JSON.parse(
        localStorage.getItem("lynix_whatsapp_leads") || "[]"
      );
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  }, [projectsOpen]);

  const allProjects = useMemo(() => {
    const sales = projectSales.map((p) => ({
      ...p,
      type: "sale",
      createdAt: p.createdAt || p.deliveredAt || null,
      promoCode: p.promoCode || "—",
      priceLabel: p.priceLabel || (p.priceMad ? `${p.priceMad} MAD` : ""),
      status: projectStatusMap[p.id] || "delivered",
    }));

    const leads = whatsappLeads.map((l) => ({
      ...l,
      type: "lead",
      status: projectStatusMap[l.id] || l.status || "pending",
      promoCode: l.promoCode || "—",
    }));

    return [...leads, ...sales]
      .filter((p) => !deletedIds.includes(p.id))
      .sort((a, b) => {
        const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return db - da;
      });
  }, [projectStatusMap, whatsappLeads, deletedIds]);

  const revenueThisMonthMad = getThisMonthRevenueMad(allProjects);
  const projectsThisMonth = getThisMonthProjectsCount(allProjects);

  const totalProjectsAll = allProjects.length;

  const deliveredCount = allProjects.filter((p) => p.status === "delivered").length;
  const pendingCount = allProjects.filter((p) => p.status === "pending").length;
  const canceledCount = allProjects.filter((p) => p.status === "canceled").length;

  // ✅ NEW: Conversion Rate (delivered / total)
  const conversionRate = useMemo(() => {
    if (!totalProjectsAll) return 0;
    return Math.round((deliveredCount / totalProjectsAll) * 100);
  }, [deliveredCount, totalProjectsAll]);

  const filteredProjects = useMemo(() => {
    if (filter === "all") return allProjects;
    return allProjects.filter((p) => p.status === filter);
  }, [allProjects, filter]);

  const monthlyData = useMemo(() => {
    return getLastMonthsData(allProjects, 6);
  }, [allProjects]);

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

  return (
    <section className="bg-slate-950 text-white min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="uppercase tracking-[0.25em] text-xs text-emerald-300/70 mb-3">
          lynix.digital / dashboard
        </p>

        <h1 className="text-4xl font-bold mb-2">
          Project <span className="text-green-400">Analytics</span>
        </h1>

        <p className="text-slate-300 max-w-xl mb-10">
          Real numbers based on projects you&apos;ve actually delivered.
        </p>

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
          <button
            type="button"
            onClick={() => {
              setFilter("all");
              setProjectsOpen(true);
            }}
            className="text-left rounded-2xl bg-slate-900/70 border border-slate-700/80 p-4 flex flex-col gap-3 hover:border-emerald-400/40 hover:bg-slate-900/80 transition"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wide text-slate-300/90">
                Total Projects
              </span>
              <span className="text-xs text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-full">
                All time
              </span>
            </div>
            <p className="text-3xl font-semibold text-slate-50">
              {totalProjectsAll}
            </p>
            <p className="text-xs text-slate-400">
              Click to view projects + leads
            </p>
          </button>

          {/* ✅ بدل WhatsApp Leads: Conversion Rate */}
          <div className="rounded-2xl bg-slate-900/70 border border-slate-700/80 p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wide text-slate-300/90">
                Conversion Rate
              </span>
              <span className="text-xs text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-full">
                All time
              </span>
            </div>
            <p className="text-3xl font-semibold text-slate-50">
              {conversionRate}%
            </p>
            <p className="text-xs text-slate-400">
              Delivered / Total projects
            </p>
          </div>

          {/* Pending clickable */}
          <button
            type="button"
            onClick={() => {
              setFilter("pending");
              setProjectsOpen(true);
            }}
            className="text-left rounded-2xl bg-slate-900/70 border border-slate-700/80 p-4 flex flex-col gap-3 hover:border-yellow-500/30 hover:bg-slate-900/80 transition"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wide text-slate-300/90">
                Pending
              </span>
              <span className="text-xs text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-full">
                Now
              </span>
            </div>
            <p className="text-3xl font-semibold text-slate-50">{pendingCount}</p>
            <p className="text-xs text-slate-400">Click to view pending list</p>
          </button>
        </section>

        {/* Monthly chart */}
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
                <div
                  className="w-full bg-gradient-to-t from-emerald-500/40 to-emerald-300/80 rounded-xl transition-all"
                  style={{ height: `${10 + m.count * 18}px` }}
                />
                <span className="text-xs text-slate-400 mt-1">{m.label}</span>
                <span className="text-[11px] text-slate-500">{m.count} proj</span>
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

      {/* MODAL */}
      {projectsOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-3 sm:px-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setProjectsOpen(false)}
          />

          <div className="relative w-full max-w-6xl rounded-2xl border border-white/10 bg-slate-950 shadow-[0_0_80px_rgba(0,0,0,0.65)] overflow-hidden">
            <div className="sticky top-0 z-20 bg-slate-950/95 backdrop-blur border-b border-white/10 p-4 sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-emerald-300/80">
                    Projects
                  </p>
                  <h3 className="text-xl font-semibold text-white mt-1">
                    Total Projects Table
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Leads are saved when users click “Get a Quote”
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    All projects:{" "}
                    <span className="text-slate-200 font-semibold">
                      {totalProjectsAll}
                    </span>
                  </p>
                </div>

                <button
                  onClick={() => setProjectsOpen(false)}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10 transition"
                >
                  Close
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-3 py-1.5 rounded-full text-xs border transition ${
                    filter === "all"
                      ? "bg-white/10 border-white/20 text-white"
                      : "bg-transparent border-white/10 text-slate-300 hover:bg-white/5"
                  }`}
                >
                  All ({totalProjectsAll})
                </button>

                <button
                  onClick={() => setFilter("delivered")}
                  className={`px-3 py-1.5 rounded-full text-xs border transition ${
                    filter === "delivered"
                      ? "bg-emerald-500/15 border-emerald-500/25 text-emerald-100"
                      : "bg-transparent border-white/10 text-slate-300 hover:bg-white/5"
                  }`}
                >
                  Delivered ({deliveredCount})
                </button>

                <button
                  onClick={() => setFilter("pending")}
                  className={`px-3 py-1.5 rounded-full text-xs border transition ${
                    filter === "pending"
                      ? "bg-yellow-500/10 border-yellow-500/25 text-yellow-100"
                      : "bg-transparent border-white/10 text-slate-300 hover:bg-white/5"
                  }`}
                >
                  Pending ({pendingCount})
                </button>

                <button
                  onClick={() => setFilter("canceled")}
                  className={`px-3 py-1.5 rounded-full text-xs border transition ${
                    filter === "canceled"
                      ? "bg-red-500/10 border-red-500/25 text-red-100"
                      : "bg-transparent border-white/10 text-slate-300 hover:bg-white/5"
                  }`}
                >
                  Canceled ({canceledCount})
                </button>
              </div>
            </div>

            <div className="p-3 sm:p-5">
              <div className="rounded-xl border border-white/10 bg-slate-950">
                <div className="overflow-x-auto">
                  <div className="max-h-[70vh] overflow-y-auto">
                    <table className="min-w-[1040px] w-full text-sm">
                      <thead className="sticky top-0 z-10 bg-slate-900/90 backdrop-blur">
                        <tr className="text-left text-xs uppercase tracking-wide text-slate-300">
                          <th className="p-3">#</th>
                          <th className="p-3">Type</th>
                          <th className="p-3">Client</th>
                          <th className="p-3">Plan</th>
                          <th className="p-3">Price</th>
                          <th className="p-3">Promo</th>
                          <th className="p-3">Created</th>
                          <th className="p-3">Delivered</th>
                          <th className="p-3">Status</th>
                          <th className="p-3">Actions</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-white/10">
                        {filteredProjects.map((p, idx) => {
                          const isLead = p.type === "lead";

                          const priceCell =
                            p.finalLabel ||
                            p.priceLabel ||
                            (p.priceMad
                              ? `${Number(p.priceMad).toLocaleString("fr-FR")} MAD`
                              : p.price || "—");

                          return (
                            <tr key={p.id} className="text-slate-200">
                              <td className="p-3 text-slate-400">{idx + 1}</td>

                              <td className="p-3">
                                {isLead ? (
                                  <span className="text-yellow-200 bg-yellow-500/10 border border-yellow-500/20 px-2 py-1 rounded-full text-xs">
                                    Lead
                                  </span>
                                ) : (
                                  <span className="text-emerald-200 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-full text-xs">
                                    Sale
                                  </span>
                                )}
                              </td>

                              <td className="p-3 font-medium">{p.client}</td>
                              <td className="p-3">{p.planName}</td>

                              <td className="p-3">{priceCell}</td>

                              <td className="p-3">
                                {p.promoCode && p.promoCode !== "—" ? (
                                  <span className="inline-flex items-center gap-2">
                                    <span>🏷️</span>
                                    <span className="text-slate-100">{p.promoCode}</span>
                                  </span>
                                ) : (
                                  "—"
                                )}
                              </td>

                              <td className="p-3 text-slate-300">
                                {p.createdAt ? formatDate(p.createdAt) : "—"}
                              </td>

                              <td className="p-3 text-slate-300">
                                {p.deliveredAt ? formatDate(p.deliveredAt) : "—"}
                              </td>

                              <td className="p-3">
                                {p.status === "delivered" && (
                                  <span className="text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-full text-xs">
                                    Delivered
                                  </span>
                                )}
                                {p.status === "pending" && (
                                  <span className="text-yellow-200 bg-yellow-500/10 border border-yellow-500/20 px-2 py-1 rounded-full text-xs">
                                    Pending
                                  </span>
                                )}
                                {p.status === "canceled" && (
                                  <span className="text-red-300 bg-red-500/10 border border-red-500/20 px-2 py-1 rounded-full text-xs">
                                    Canceled
                                  </span>
                                )}
                              </td>

                              <td className="p-3">
                                <div className="flex flex-wrap gap-2 items-center">
                                  <button
                                    onClick={() => openWhatsApp(p)}
                                    className="px-3 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 hover:bg-white/10 transition"
                                  >
                                    WhatsApp
                                  </button>

                                  <button
                                    onClick={() => setStatus(p.id, "delivered")}
                                    className="px-3 py-1.5 rounded-lg text-xs bg-emerald-500/15 border border-emerald-500/25 text-emerald-200 hover:bg-emerald-500/25 transition"
                                  >
                                    Deliver
                                  </button>

                                  <button
                                    onClick={() => setStatus(p.id, "pending")}
                                    className="px-3 py-1.5 rounded-lg text-xs bg-yellow-500/10 border border-yellow-500/25 text-yellow-100 hover:bg-yellow-500/20 transition"
                                  >
                                    Pending
                                  </button>

                                  <button
                                    onClick={() => setStatus(p.id, "canceled")}
                                    className="px-3 py-1.5 rounded-lg text-xs bg-red-500/10 border border-red-500/25 text-red-200 hover:bg-red-500/20 transition"
                                  >
                                    Cancel
                                  </button>

                                  <button
                                    title="Delete row"
                                    onClick={() => deleteRow(p)}
                                    className="px-2.5 py-1.5 rounded-lg text-xs bg-red-500/5 border border-red-500/20 text-red-200 hover:bg-red-500/15 transition"
                                  >
                                    🗑️
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}

                        {filteredProjects.length === 0 && (
                          <tr>
                            <td className="p-4 text-slate-400" colSpan={10}>
                              No projects found for this filter.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-[11px] text-slate-500">
                Note: Deleted rows are hidden via localStorage.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
