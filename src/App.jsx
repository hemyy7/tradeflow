import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import tradeflowFullLogo from "./assets/tradeflow-logo-new.png";
import iconLogo from "./assets/tradeflow-icon-logo.png";
import {
  Activity,
  BarChart3,
  BookOpen,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  CloudUpload,
  LayoutDashboard,
  Link2,
  LogOut,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Upload,
  X,
} from "lucide-react";
import { supabase } from "./supabase";

const normalizeBetaEmail = (email) =>
  String(email ?? "")
    .normalize("NFKC")
    .trim()
    .toLowerCase();

const ALLOWED_BETA_EMAILS = [
  "hemishsagar07@gmail.com",
  "hemyscales02@gmail.com",
].map(normalizeBetaEmail);

/* ──────────────────────────────────────────────────────────
   AUTH
────────────────────────────────────────────────────────── */
function AuthScreen() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isSignupMode = mode === "signup";

  const handleSubmit = async () => {
    if (isSignupMode) return;

    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (isSignupMode) return;
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080600] p-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-20%] top-[-10%] h-[600px] w-[600px] rounded-full bg-[#f59e0b]/8 blur-[160px]" />
        <div className="absolute right-[-15%] bottom-[-10%] h-[500px] w-[500px] rounded-full bg-[#d97706]/6 blur-[140px]" />
        <div className="absolute left-[30%] top-[20%] h-[400px] w-[400px] rounded-full bg-[#fbbf24]/5 blur-[120px]" />
      </div>

      <div className="animate-fadeUp relative w-full max-w-[420px]">
        <div className="mb-10 text-center">
          <div className="mb-4 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-[28px] bg-[#f59e0b]/18 blur-[28px]" />
              <img
                src={tradeflowFullLogo}
                alt="TradeFlow"
                className="relative h-16 w-auto object-contain"
              />
            </div>
          </div>

        </div>

        <div className="relative">
          <div className="absolute -inset-[1px] rounded-[28px] bg-[linear-gradient(135deg,rgba(251,191,36,0.22),rgba(251,191,36,0.05),rgba(255,255,255,0.04))]" />
          <div className="absolute -inset-8 rounded-[36px] bg-[#f59e0b]/6 blur-3xl" />

          <div className="relative rounded-[28px] border border-white/6 bg-[linear-gradient(135deg,rgba(13,10,2,0.99),rgba(10,8,2,0.98))] p-8 backdrop-blur-3xl">
            <div className="hud-divider absolute inset-x-0 top-0 rounded-t-[28px]" />

            <div className="mb-7 flex rounded-[14px] border border-white/7 bg-white/[0.03] p-1">
              {["login", "signup"].map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMode(m);
                    setError("");
                  }}
                  className={`flex-1 rounded-[10px] py-2.5 text-[13px] font-semibold tracking-wide transition-all duration-300 ${
                    mode === m
                      ? "bg-[linear-gradient(135deg,rgba(251,191,36,0.20),rgba(251,191,36,0.07))] text-white shadow-[0_0_16px_rgba(251,191,36,0.12)]"
                      : "text-white/34 hover:text-white/58"
                  }`}
                >
                  {m === "login" ? "Log In" : "Sign Up"}
                </button>
              ))}
            </div>

            {isSignupMode ? (
              <div className="rounded-[20px] border border-white/7 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] px-5 py-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-300/52">
                  Private Beta
                </div>
                <div className="mt-3 text-[22px] font-semibold leading-tight tracking-[-0.03em] text-white/92">
                  TradeFlow is currently in private beta — access is invite-only.
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-white/42">
                  If you’ve been given access, use Log In with your existing account.
                </p>

                <button
                  onClick={() => {
                    setMode("login");
                    setError("");
                  }}
                  className="mt-5 rounded-[12px] border border-amber-400/16 bg-white/[0.03] px-4 py-2.5 text-[12px] font-semibold text-amber-100/88 transition-all duration-200 hover:border-amber-300/24 hover:bg-white/[0.05]"
                >
                  Back to Log In
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="hud-label">Email</div>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full rounded-[14px] border border-white/8 bg-white/[0.03] px-4 py-3.5 text-[14px] text-white placeholder:text-white/18 outline-none transition-all duration-200 focus:border-[#fbbf24]/30 focus:bg-white/[0.05]"
                  />
                </div>

                <div className="space-y-2">
                  <div className="hud-label">Password</div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full rounded-[14px] border border-white/8 bg-white/[0.03] px-4 py-3.5 text-[14px] text-white placeholder:text-white/18 outline-none transition-all duration-200 focus:border-[#fbbf24]/30 focus:bg-white/[0.05]"
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="mt-4 rounded-[12px] border border-red-400/16 bg-red-500/8 px-4 py-3 text-[12px] font-medium text-red-300">
                {error}
              </div>
            )}

            {!isSignupMode && (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="group relative mt-6 w-full overflow-hidden rounded-[14px] border border-[#fbbf24]/20 bg-[linear-gradient(135deg,#d97706,#b45309)] py-3.5 text-[14px] font-bold text-white shadow-[0_0_28px_rgba(251,191,36,0.30)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_38px_rgba(251,191,36,0.44)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative">{loading ? "Please wait..." : "Log In"}</span>
              </button>
            )}

            <div className="mt-5 text-center text-[12px] text-white/26">
              {isSignupMode ? "Already have access? " : "Invite only? "}
              <button
                onClick={() => {
                  setMode(isSignupMode ? "login" : "signup");
                  setError("");
                }}
                className="text-[#fcd34d] transition-colors duration-200 hover:text-[#fde68a]"
              >
                {isSignupMode ? "Log in" : "View private beta"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RestrictedAccessScreen({ email }) {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080600] p-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-20%] top-[-10%] h-[600px] w-[600px] rounded-full bg-[#f59e0b]/8 blur-[160px]" />
        <div className="absolute right-[-15%] bottom-[-10%] h-[500px] w-[500px] rounded-full bg-[#d97706]/6 blur-[140px]" />
        <div className="absolute left-[30%] top-[20%] h-[400px] w-[400px] rounded-full bg-[#fbbf24]/5 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-[460px]">
        <div className="relative">
          <div className="absolute -inset-[1px] rounded-[28px] bg-[linear-gradient(135deg,rgba(251,191,36,0.22),rgba(251,191,36,0.05),rgba(255,255,255,0.04))]" />
          <div className="absolute -inset-8 rounded-[36px] bg-[#f59e0b]/6 blur-3xl" />

          <div className="relative rounded-[28px] border border-white/6 bg-[linear-gradient(135deg,rgba(13,10,2,0.99),rgba(10,8,2,0.98))] p-8 backdrop-blur-3xl">
            <div className="hud-divider absolute inset-x-0 top-0 rounded-t-[28px]" />

            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-300/52">
              Private Beta
            </div>

            <div className="mt-4 text-[30px] font-semibold leading-[1.05] tracking-[-0.04em] text-white/94">
              TradeFlow is currently in private beta.
            </div>

            <p className="mt-4 text-[15px] leading-relaxed text-white/50">
              Your account has not been approved yet.
            </p>

            <p className="mt-2 text-[13px] leading-relaxed text-white/38">
              If you believe this is a mistake, contact the person who invited you.
            </p>

            {email ? (
              <div className="mt-6 rounded-[16px] border border-white/7 bg-white/[0.03] px-4 py-3 text-[12px] font-medium text-white/42">
                Signed in as <span className="text-amber-100/88">{email}</span>
              </div>
            ) : null}

            <button
              onClick={handleSignOut}
              className="mt-6 rounded-[14px] border border-amber-400/16 bg-white/[0.03] px-4 py-3 text-[13px] font-semibold text-amber-100/88 transition-all duration-200 hover:border-amber-300/24 hover:bg-white/[0.05]"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   HELPERS
────────────────────────────────────────────────────────── */
const today = () => new Date().toISOString().split("T")[0];

const defaultTradeForm = {
  date: today(),
  pair: "NQ",
  setup: "",
  entryReason: "",
  entryTrigger: "",
  targetPlan: "",
  confluences: [],
  direction: "Long",
  pnl: "",
  notes: "",
  screenshot: "",
  entry: "",
  stopLoss: "",
  takeProfit: "",
  exitPrice: "",
  entryTime: "",
  exitTime: "",
  size: "",
  riskAmount: "",
  session: "NY Open",
  account: "",
  executionGrade: "A",
};

const defaultJournalForm = {
  date: today(),
  followedPlan: "",
  confidence: 5,
  lesson: "",
};

const TF_META_PREFIX = "[[TF_META]]";

const safeNumber = (value) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
};

const hasPriceValue = (value) => value !== null && value !== undefined && value !== "" && Number.isFinite(Number(value));

const roundTo = (value, places = 2) => {
  if (!Number.isFinite(value)) return 0;
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
};

const formatMoney = (value) => {
  const amount = safeNumber(value);
  return `${amount >= 0 ? "+" : "-"}$${Math.abs(amount).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })}`;
};

const formatWholeMoney = (value) => {
  const amount = Math.round(safeNumber(value));
  return `${amount >= 0 ? "+" : "-"}$${Math.abs(amount).toLocaleString()}`;
};

const formatAxisMoney = (value) => {
  const amount = Math.round(safeNumber(value));
  const sign = amount >= 0 ? "+" : "-";
  return `${sign}$${Math.abs(amount).toLocaleString()}`;
};

const getTooltipValueTone = (value, neutralTone = "gold") => {
  const amount = safeNumber(value);

  if (amount > 0) {
    return {
      className: "text-emerald-300",
      style: {
        textShadow: "0 0 8px rgba(74,222,128,0.15)",
      },
    };
  }

  if (amount < 0) {
    return {
      className: "text-red-300",
      style: {
        textShadow: "0 0 8px rgba(248,113,113,0.12)",
      },
    };
  }

  if (neutralTone === "soft") {
    return {
      className: "text-amber-100",
      style: {},
    };
  }

  return {
    className: "text-[#fcd34d]",
    style: {
      textShadow: "0 0 10px rgba(251,191,36,0.14)",
    },
  };
};

const getTooltipValuePulse = (value, { subtle = false, neutralTone = "gold" } = {}) => {
  const amount = safeNumber(value);

  if (amount > 0) {
    return {
      animate: {
        textShadow: subtle
          ? [
              "0 0 8px rgba(74,222,128,0.15)",
              "0 0 10px rgba(74,222,128,0.19)",
              "0 0 8px rgba(74,222,128,0.15)",
            ]
          : [
              "0 0 8px rgba(74,222,128,0.15)",
              "0 0 11px rgba(74,222,128,0.2)",
              "0 0 8px rgba(74,222,128,0.15)",
            ],
        filter: subtle
          ? ["brightness(1)", "brightness(1.03)", "brightness(1)"]
          : ["brightness(1)", "brightness(1.05)", "brightness(1)"],
      },
    };
  }

  if (amount < 0) {
    return {
      animate: {
        textShadow: subtle
          ? [
              "0 0 8px rgba(248,113,113,0.12)",
              "0 0 9px rgba(248,113,113,0.15)",
              "0 0 8px rgba(248,113,113,0.12)",
            ]
          : [
              "0 0 8px rgba(248,113,113,0.12)",
              "0 0 10px rgba(248,113,113,0.16)",
              "0 0 8px rgba(248,113,113,0.12)",
            ],
        filter: subtle
          ? ["brightness(1)", "brightness(1.02)", "brightness(1)"]
          : ["brightness(1)", "brightness(1.04)", "brightness(1)"],
      },
    };
  }

  if (neutralTone === "soft") {
    return {
      animate: {
        filter: subtle
          ? ["brightness(1)", "brightness(1.015)", "brightness(1)"]
          : ["brightness(1)", "brightness(1.025)", "brightness(1)"],
      },
    };
  }

  return {
    animate: {
      textShadow: subtle
        ? [
            "0 0 10px rgba(251,191,36,0.14)",
            "0 0 12px rgba(251,191,36,0.18)",
            "0 0 10px rgba(251,191,36,0.14)",
          ]
        : [
            "0 0 10px rgba(251,191,36,0.14)",
            "0 0 13px rgba(251,191,36,0.2)",
            "0 0 10px rgba(251,191,36,0.14)",
          ],
      filter: subtle
        ? ["brightness(1)", "brightness(1.025)", "brightness(1)"]
        : ["brightness(1)", "brightness(1.05)", "brightness(1)"],
    },
  };
};

const formatProfitFactor = (value) => {
  if (value === null || value === undefined) return "—";
  if (!Number.isFinite(value)) return "∞";
  return value.toFixed(2);
};

const formatInsightProfitFactor = (value) => {
  if (value === null || value === undefined) return "—";
  if (!Number.isFinite(value)) return "High";
  return value.toFixed(2);
};

const resultTone = (value) => {
  if (value > 0) return "text-emerald-300";
  if (value < 0) return "text-red-300";
  return "text-white/60";
};

const badgeTone = (result) => {
  if (result === "Win") return "border-emerald-400/20 bg-emerald-500/10 text-emerald-300";
  if (result === "Loss") return "border-red-400/20 bg-red-500/10 text-red-300";
  return "border-white/8 bg-white/[0.04] text-white/54";
};

const gradeTone = (grade) => {
  if (grade === "A") return "border-emerald-400/20 bg-emerald-500/10 text-emerald-300";
  if (grade === "B") return "border-sky-400/20 bg-sky-500/10 text-sky-300";
  if (grade === "C") return "border-amber-400/20 bg-amber-500/10 text-amber-300";
  return "border-red-400/20 bg-red-500/10 text-red-300";
};

const inferResultFromPnl = (pnl) => {
  const value = safeNumber(pnl);
  if (value > 0) return "Win";
  if (value < 0) return "Loss";
  return "BE";
};

const getTradeResultLabel = (trade) => inferResultFromPnl(trade?.pnl);

const getWinRateFromCounts = (wins, losses) => {
  const decisiveTrades = wins + losses;
  return decisiveTrades ? (wins / decisiveTrades) * 100 : 0;
};

const ANALYTICS_MIN_TOTAL_TRADES = 3;
const ANALYTICS_MIN_CATEGORY_TRADES = 2;

const hasProfitableData = (items, minCategoryTrades = ANALYTICS_MIN_CATEGORY_TRADES) =>
  items.some((item) => safeNumber(item.trades) >= minCategoryTrades && safeNumber(item.pnl) > 0);

const getAnalyticsTrustState = (
  items,
  { minTotalTrades = ANALYTICS_MIN_TOTAL_TRADES, minCategoryTrades = ANALYTICS_MIN_CATEGORY_TRADES } = {}
) => {
  const normalizedItems = items.filter((item) => safeNumber(item.trades) > 0);
  const totalTrades = normalizedItems.reduce((sum, item) => sum + safeNumber(item.trades), 0);
  const reliableItems = normalizedItems.filter((item) => safeNumber(item.trades) >= minCategoryTrades);
  const profitableReliableItems = reliableItems.filter((item) => safeNumber(item.pnl) > 0);
  const losingReliableItems = reliableItems.filter((item) => safeNumber(item.pnl) < 0);
  const hasEnoughData = totalTrades >= minTotalTrades && reliableItems.length > 0;
  const hasCredibleBest = hasEnoughData && hasProfitableData(reliableItems, minCategoryTrades);

  return {
    totalTrades,
    normalizedItems,
    reliableItems,
    profitableReliableItems,
    losingReliableItems,
    hasEnoughData,
    hasCredibleBest,
    status: !normalizedItems.length ? "empty" : !hasEnoughData ? "early" : hasCredibleBest ? "ready" : "no_profitable",
  };
};

const getBestPositiveCategory = (items, options = {}) => {
  const trust = getAnalyticsTrustState(items, options);
  if (!trust.hasCredibleBest) return null;

  return (
    [...trust.profitableReliableItems].sort(
      (a, b) => safeNumber(b.pnl) - safeNumber(a.pnl) || safeNumber(b.trades) - safeNumber(a.trades)
    )[0] ?? null
  );
};

const getHighestWinRatePositiveCategory = (items, options = {}) => {
  const trust = getAnalyticsTrustState(items, options);
  if (!trust.hasCredibleBest) return null;

  return (
    [...trust.profitableReliableItems].sort((a, b) => {
      if (safeNumber(b.winRate) !== safeNumber(a.winRate)) return safeNumber(b.winRate) - safeNumber(a.winRate);
      if (safeNumber(b.trades) !== safeNumber(a.trades)) return safeNumber(b.trades) - safeNumber(a.trades);
      return safeNumber(b.pnl) - safeNumber(a.pnl);
    })[0] ?? null
  );
};

const getAnalyticsInsightCopy = (kind, status) => {
  const copy = {
    setup: {
      empty: {
        title: "No setup analytics yet.",
        body: "Add setup categories to trades to unlock setup analytics.",
      },
      early: {
        title: "No clear setup edge yet.",
        body: "Log more trades to identify which setups are actually profitable.",
      },
      no_profitable: {
        title: "No profitable setups yet.",
        body: "Keep journaling — this section will highlight what works once enough data is available.",
      },
    },
    trigger: {
      empty: {
        title: "No trigger edge yet.",
        body: "Add entry triggers to trades to unlock trigger analytics.",
      },
      early: {
        title: "No trigger edge yet.",
        body: "We need more trade data before ranking your entry triggers.",
      },
      no_profitable: {
        title: "No profitable triggers yet.",
        body: "Keep journaling — this section will highlight what works once enough data is available.",
      },
    },
    model: {
      empty: {
        title: "No model analytics yet.",
        body: "Add setup, trigger, and target to trades to unlock model analytics.",
      },
      early: {
        title: "No clear model edge yet.",
        body: "Log more fully structured trades before ranking your trade models.",
      },
      no_profitable: {
        title: "No profitable models yet.",
        body: "Keep journaling — this section will highlight what works once enough data is available.",
      },
    },
    session: {
      empty: {
        title: "No session data yet.",
        body: "Add a few more trades before we analyze your trading windows.",
      },
      early: {
        title: "Session performance is still forming.",
        body: "Trade a few more sessions before we identify your strongest window.",
      },
      no_profitable: {
        title: "No profitable session edge yet.",
        body: "Keep logging sessions — we’ll highlight your strongest window once it proves itself.",
      },
    },
    discipline: {
      empty: {
        title: "No execution grade data yet.",
        body: "Grade a few more trades before we compare execution quality.",
      },
      early: {
        title: "Discipline edge is still forming.",
        body: "We need more graded trades before we compare execution quality with confidence.",
      },
      no_profitable: {
        title: "No clear discipline edge yet.",
        body: "Keep grading trades — this section will surface stronger execution patterns once they’re proven.",
      },
    },
  };

  return copy[kind]?.[status] ?? { title: "Not enough data yet.", body: "Log more trades to unlock clearer insights." };
};

const getWorstNegativePerformer = (items) => {
  const losingItems = items.filter((item) => safeNumber(item.pnl) < 0);
  if (!losingItems.length) return null;
  return [...losingItems].sort((a, b) => safeNumber(a.pnl) - safeNumber(b.pnl))[0];
};

const calcPlannedRR = ({ entry, stopLoss, takeProfit, direction }) => {
  const e = Number(entry);
  const s = Number(stopLoss);
  const t = Number(takeProfit);
  if (![e, s, t].every(Number.isFinite)) return null;

  const risk = direction === "Long" ? e - s : s - e;
  const reward = direction === "Long" ? t - e : e - t;

  if (risk <= 0 || reward <= 0) return null;
  return roundTo(reward / risk, 2);
};

const calcRealizedR = ({ entry, stopLoss, exitPrice, direction }) => {
  const e = Number(entry);
  const s = Number(stopLoss);
  const x = Number(exitPrice);
  if (![e, s, x].every(Number.isFinite)) return null;

  const risk = direction === "Long" ? e - s : s - e;
  const realizedReward = direction === "Long" ? x - e : e - x;

  if (risk <= 0) return null;
  return roundTo(realizedReward / risk, 2);
};

const formatRMultiple = (value) =>
  value === null || value === undefined || !Number.isFinite(Number(value))
    ? "—"
    : `${Number(value).toFixed(2)}R`;

const stripMetaFromNotes = (notes = "") => {
  if (!notes.startsWith(TF_META_PREFIX)) return notes;
  const newlineIndex = notes.indexOf("\n");
  if (newlineIndex === -1) return "";
  return notes.slice(newlineIndex + 1);
};

const extractMetaFromNotes = (notes = "") => {
  if (!notes.startsWith(TF_META_PREFIX)) return {};
  const newlineIndex = notes.indexOf("\n");
  const jsonString =
    newlineIndex === -1 ? notes.replace(TF_META_PREFIX, "") : notes.slice(TF_META_PREFIX.length, newlineIndex);

  try {
    return JSON.parse(jsonString || "{}");
  } catch {
    return {};
  }
};

const buildStoredNotes = (plainNotes, meta) => {
  return `${TF_META_PREFIX}${JSON.stringify(meta)}\n${plainNotes || ""}`;
};

const hasStructuredTradeDetails = (tradeLike) =>
  [
    tradeLike.entryReason,
    tradeLike.entryTrigger,
    tradeLike.targetPlan,
    ...(Array.isArray(tradeLike.confluences) ? tradeLike.confluences : []),
  ].some((value) => value?.trim());

const deriveTradeSetup = (tradeLike) =>
  tradeLike.setup?.trim() || tradeLike.entryTrigger?.trim() || "Structured Trade";

const getTradePrimaryTitle = (trade) =>
  trade.entryTrigger?.trim() || trade.setup?.trim() || "Untitled trade";

const getTradeSupportLine = (trade) =>
  trade.entryReason?.trim() || "";

const getTradeTargetPlan = (trade) =>
  trade.targetPlan?.trim() || "";

const getTradeConfluences = (trade) => normalizeTradeConfluences(trade.confluences);

const getTradeDisplayedNote = (trade) =>
  trade.reviewNote?.trim() || trade.plainNotes?.trim() || "";

const GENERIC_IMPORT_TITLES = new Set([
  "Imported Trade",
  "Tradovate Trade",
  "Structured Trade",
  "Untitled trade",
]);

const isMeaningfulTradeLabel = (value) => {
  const label = String(value ?? "").trim();
  return Boolean(label) && !GENERIC_IMPORT_TITLES.has(label);
};

const SETUP_CATEGORIES = [
  "Continuation",
  "Reversal",
  "Breakout",
  "Trend Pullback",
  "Support & Resistance",
  "Range / Mean Reversion",
  "Other",
];

const ENTRY_TRIGGER_OPTIONS = [
  "1m iFVG",
  "5m FVG",
  "Breaker",
  "Order Block",
  "VWAP Reclaim",
  "Range High Break",
  "Range Low Break",
  "Retest",
  "Market Structure Shift",
  "Sweep + Reclaim",
];

const TARGET_TYPE_OPTIONS = [
  "Prior High",
  "Prior Low",
  "VWAP",
  "Session High",
  "Session Low",
  "Opposing FVG",
  "Liquidity Pool",
  "Range High",
  "Range Low",
  "Fixed R Multiple",
];

const CONFLUENCE_OPTIONS = [
  "HTF FVG",
  "SMT",
  "Liquidity Sweep",
  "Market Structure Shift",
  "Breaker",
  "Order Block",
  "VWAP",
  "Premium",
  "Discount",
  "Previous Day High",
  "Previous Day Low",
  "Session High",
  "Session Low",
  "Range High",
  "Range Low",
  "Volume Confirmation",
  "News Timing",
  "Trend Alignment",
];

const DEFAULT_CUSTOM_TRADE_OPTIONS = {
  entryTrigger: { custom: [], hiddenBuiltIns: [] },
  targetPlan: { custom: [], hiddenBuiltIns: [] },
  confluences: { custom: [], hiddenBuiltIns: [] },
};

const getCustomTradeOptionsStorageKey = (userId) => `tradeflow-custom-trade-options:${userId}`;

const sanitizeCustomOption = (value) =>
  String(value ?? "")
    .trim()
    .replace(/\s+/g, " ");

const mergeCustomTradeOptions = (builtInOptions, customOptions = []) => {
  const seen = new Set();

  return [...builtInOptions, ...customOptions]
    .map(sanitizeCustomOption)
    .filter(Boolean)
    .filter((option) => {
      const key = option.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
};

const getManagedTradeFieldBuiltInOptions = (field) => {
  if (field === "entryTrigger") return ENTRY_TRIGGER_OPTIONS;
  if (field === "targetPlan") return TARGET_TYPE_OPTIONS;
  if (field === "confluences") return CONFLUENCE_OPTIONS;
  return [];
};

const normalizeManagedTradeOptionStoreItem = (value) => {
  if (Array.isArray(value)) {
    return {
      custom: value.map(sanitizeCustomOption).filter(Boolean),
      hiddenBuiltIns: [],
    };
  }

  return {
    custom: Array.isArray(value?.custom) ? value.custom.map(sanitizeCustomOption).filter(Boolean) : [],
    hiddenBuiltIns: Array.isArray(value?.hiddenBuiltIns)
      ? value.hiddenBuiltIns.map(sanitizeCustomOption).filter(Boolean)
      : [],
  };
};

const normalizeTradeConfluences = (value) => {
  const rawValues = Array.isArray(value)
    ? value
    : typeof value === "string"
    ? value.split(",")
    : [];

  const seen = new Set();

  return rawValues
    .map(sanitizeCustomOption)
    .filter(Boolean)
    .filter((option) => {
      const normalized = option.toLowerCase();
      if (seen.has(normalized)) return false;
      seen.add(normalized);
      return true;
    })
    .slice(0, 10);
};

const normalizeStructuredOptionValue = (value) => sanitizeCustomOption(value).toLowerCase();

const resolveValidEntryTrigger = (value, allowedTriggerMap) => {
  const normalizedValue = normalizeStructuredOptionValue(value);
  if (!normalizedValue) return "";
  return allowedTriggerMap.get(normalizedValue) || "";
};

const resolveValidTargetType = (value, allowedTargetTypeMap) => {
  const normalizedValue = normalizeStructuredOptionValue(value);
  if (!normalizedValue) return "";
  return allowedTargetTypeMap.get(normalizedValue) || "";
};

const isValidSetupCategory = (value) =>
  SETUP_CATEGORIES.includes(String(value ?? "").trim());

const normalizeReviewSetupCategory = (value) => {
  const category = String(value ?? "").trim();
  return isValidSetupCategory(category) ? category : "";
};

const getResolvedSetupAnalyticsName = (trade) => {
  const reviewedSetupCategory = normalizeReviewSetupCategory(trade.reviewSetup);
  if (reviewedSetupCategory) return reviewedSetupCategory;

  const manualSetupCategory = normalizeReviewSetupCategory(trade.setupCategory);
  if (manualSetupCategory) return manualSetupCategory;

  const originalSetupCategory = normalizeReviewSetupCategory(trade.setup);
  if (originalSetupCategory) return originalSetupCategory;

  return "";
};

const buildModelLabel = ({ setupCategory, entryTrigger, targetType }) =>
  [setupCategory, entryTrigger, targetType].join(" • ");

const getImportSummaryTradeTitle = (trade) => {
  const primaryLabel = trade.entryTrigger?.trim() || trade.setup?.trim() || "";

  if (isMeaningfulTradeLabel(primaryLabel)) {
    return primaryLabel;
  }

  if (trade.pair && trade.direction) {
    return `${trade.pair} • ${trade.direction}`;
  }

  return trade.pair || trade.direction || "Imported trade";
};

const getImportSummarySourceText = (summary) => {
  if (summary?.sourceName && summary.sourceName !== "Generic CSV") {
    return `Imported from ${summary.sourceName} CSV`;
  }

  return "Latest imported batch";
};

const splitCsvLine = (line) => {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  values.push(current.trim());
  return values.map((value) => value.replace(/^"|"$/g, "").trim());
};

const parseCsvText = (text) => {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.replace(/^\uFEFF/, "").trim())
    .filter(Boolean);

  if (lines.length < 2) return [];

  const headers = splitCsvLine(lines[0]);

  return lines
    .slice(1)
    .map((line) => splitCsvLine(line))
    .filter((values) => values.some((value) => value !== ""))
    .map((values) =>
      headers.reduce((acc, header, index) => {
        acc[header] = values[index] ?? "";
        return acc;
      }, {})
    );
};

const normalizeHeaderKey = (value) =>
  String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

const detectImportFormat = (rows) => {
  if (!rows.length) {
    return { id: "unsupported", label: "Unsupported CSV format", sourceName: "Unknown" };
  }

  const headerKeys = Object.keys(rows[0]).map(normalizeHeaderKey);
  const hasAny = (keys) => keys.some((key) => headerKeys.includes(normalizeHeaderKey(key)));
  const tradovateInstrument = hasAny(["instrument", "symbol", "contract", "product"]);
  const tradovateSide = hasAny(["side", "b/s", "bs", "buysell", "action", "_action"]);
  const tradovateQty = hasAny(["qty", "quantity", "filledqty", "_qty"]);
  const tradovatePrice = hasAny(["price", "fillprice", "avgprice", "_price"]);
  const tradovateTime = hasAny(["timestamp", "date", "filltime", "executiontime", "time", "_timestamp", "_tradedate"]);
  const tradovateCommission = hasAny(["commission"]);

  if (tradovateInstrument && tradovateSide && tradovateQty && tradovatePrice && tradovateTime) {
    return { id: "tradovate", label: "Tradovate format recognized", sourceName: "Tradovate" };
  }

  const hasAll = (keys) => keys.every((key) => headerKeys.includes(normalizeHeaderKey(key)));

  if (hasAll(["instrument", "marketposition", "profitcurrency"])) {
    return { id: "ninjatrader", label: "NinjaTrader format recognized", sourceName: "NinjaTrader" };
  }

  if (hasAll(["symbol", "type", "profit"])) {
    return { id: "mt5", label: "MT5 format recognized", sourceName: "MT5" };
  }

  if (hasAll(["account", "instrument", "net pnl"]) || (tradovateInstrument && tradovateSide && tradovateQty && tradovatePrice && tradovateCommission)) {
    return { id: "tradovate", label: "Tradovate format recognized", sourceName: "Tradovate" };
  }

  if (hasAll(["symbol", "profit"]) || hasAll(["date", "symbol", "pnl"])) {
    return { id: "generic", label: "Generic CSV detected", sourceName: "Generic CSV" };
  }

  return { id: "generic", label: "Generic CSV detected", sourceName: "Generic CSV" };
};

const getRowValue = (row, keys) => {
  const normalizedEntries = Object.entries(row).map(([key, value]) => [normalizeHeaderKey(key), value]);

  for (const key of keys) {
    const match = normalizedEntries.find(([entryKey]) => entryKey === normalizeHeaderKey(key));
    if (match && String(match[1] ?? "").trim()) {
      return String(match[1]).trim();
    }
  }

  return "";
};

const normalizeImportedDate = (rawValue) => {
  if (!rawValue) return today();
  const parsed = new Date(rawValue);

  if (Number.isNaN(parsed.getTime())) {
    const dateOnly = rawValue.split(" ")[0];
    const fallback = new Date(dateOnly);
    if (Number.isNaN(fallback.getTime())) return today();
    return fallback.toISOString().split("T")[0];
  }

  return parsed.toISOString().split("T")[0];
};

const normalizeImportedDirection = (rawValue) => {
  const value = rawValue.toLowerCase();
  if (value.includes("sell") || value.includes("short")) return "Short";
  return "Long";
};

const normalizeImportedNumber = (rawValue) => {
  const cleaned = String(rawValue ?? "")
    .replace(/[$,\s]/g, "")
    .replace(/[()]/g, "");
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : 0;
};

const getFuturesPointValue = (symbol) => {
  const normalized = String(symbol ?? "").toUpperCase();

  if (normalized.startsWith("MNQ")) return 2;
  if (normalized.startsWith("NQ")) return 20;
  if (normalized.startsWith("MES")) return 5;
  if (normalized.startsWith("ES")) return 50;
  return 1;
};

const normalizeImportedTimestamp = (rawValue) => {
  if (!rawValue) return null;
  const parsed = new Date(rawValue);
  if (!Number.isNaN(parsed.getTime())) return parsed;

  const fallback = new Date(String(rawValue).replace(" ", "T"));
  if (!Number.isNaN(fallback.getTime())) return fallback;

  return null;
};

const buildTradeDuplicateSignature = (tradeLike) => {
  const parts = [
    tradeLike.date || "",
    (tradeLike.pair || "").toUpperCase(),
    safeNumber(tradeLike.pnl),
    tradeLike.direction || "",
    tradeLike.entry || "",
    tradeLike.exitPrice || "",
  ];

  return parts.join("|");
};

const createImportBatchId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `import-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

const withImportBatchMeta = (payload, batchMeta) => {
  const plainNotes = stripMetaFromNotes(payload.notes || "");
  const existingMeta = extractMetaFromNotes(payload.notes || "");

  return {
    ...payload,
    notes: buildStoredNotes(plainNotes, {
      ...existingMeta,
      importId: batchMeta.importId ?? "",
      source: batchMeta.source ?? batchMeta.importSource ?? "csv",
      importBatchId: batchMeta.importBatchId ?? "",
      importSource: "csv",
      importedAt: batchMeta.importedAt ?? "",
      originalFileName: batchMeta.originalFileName ?? "",
    }),
  };
};

function isImportedTrade(trade) {
  if (!trade || trade.isManual === true) return false;

  const title = trade.title || trade.setup || "";
  const noteBody = trade.plainNotes || stripMetaFromNotes(trade.notes || "") || trade.notes || "";
  const hasManualOverride = Boolean(trade.hasManualOverride);

  return (
    Boolean(trade.importSource) ||
    Boolean(trade.importBatchId) ||
    Boolean(trade.importId) ||
    Boolean(trade.source) ||
    title === "Imported Fill" ||
    (noteBody && noteBody.includes("Imported from")) ||
    (safeNumber(trade.pnl) === 0 && !hasManualOverride && trade.isManual !== true)
  );
}

const isLegacyTradovatePlaceholderTrade = (trade) => {
  if (!trade || trade.isManual === true) return false;

  const title = trade.title || trade.setup || "";
  const noteBody = trade.plainNotes || stripMetaFromNotes(trade.notes || "") || trade.notes || "";

  return (
    title === "Imported Fill" &&
    safeNumber(trade.pnl) === 0 &&
    noteBody.includes("Imported from Tradovate fills")
  );
};

const getImportedTradeIds = (trades) => trades.filter(isImportedTrade).map((trade) => trade.id);

const formatImportSourceName = (source) => {
  if (source === "tradovate") return "Tradovate";
  if (source === "ninjatrader") return "NinjaTrader";
  if (source === "mt5") return "MT5";
  return "CSV Sync";
};

const formatPercentage = (value) => `${Math.round(safeNumber(value))}%`;

const getTradeNewestTimestamp = (trade) => {
  const createdAt = new Date(trade?.created_at || "").getTime();
  if (Number.isFinite(createdAt)) return createdAt;

  const updatedAt = new Date(trade?.updated_at || "").getTime();
  if (Number.isFinite(updatedAt)) return updatedAt;

  const tradeDate = new Date(`${trade?.date || today()}T23:59:59`).getTime();
  if (Number.isFinite(tradeDate)) return tradeDate;

  return 0;
};

const compareTradesNewestFirst = (a, b) => {
  const dateDiff = new Date(`${b.date || today()}T00:00:00`) - new Date(`${a.date || today()}T00:00:00`);
  if (dateDiff !== 0) return dateDiff;

  const timeDiff = getTradeNewestTimestamp(b) - getTradeNewestTimestamp(a);
  if (timeDiff !== 0) return timeDiff;

  return String(b.id || "").localeCompare(String(a.id || ""));
};

const sortTradesNewestFirst = (trades) => [...trades].sort(compareTradesNewestFirst);

const buildImportedTradeRecord = ({
  userId,
  date,
  pair,
  direction,
  pnl,
  entry,
  exitPrice,
  size,
  account,
  plainNotes,
  importLabel,
  entryReason,
  targetPlan = "",
}) => {
  const signature = buildTradeDuplicateSignature({
    date,
    pair,
    pnl,
    direction,
    entry,
    exitPrice,
  });

  return {
    preview: {
      id: `${pair}-${date}-${signature}`,
      date,
      pair,
      pnl,
      entry,
      exitPrice,
      direction,
      signature,
      raw: null,
    },
    payload: {
      user_id: userId,
      date,
      pair,
      setup: importLabel,
      direction,
      pnl,
      result: inferResultFromPnl(pnl),
      screenshot: "",
      notes: buildStoredNotes(plainNotes, {
        importId: "",
        source: "csv",
        importBatchId: "",
        importSource: "csv",
        importedAt: "",
        originalFileName: "",
        entryReason,
        entryTrigger: importLabel,
        targetPlan,
        entry,
        stopLoss: "",
        takeProfit: "",
        exitPrice,
        size,
        riskAmount: "",
        session: "NY Open",
        account,
        executionGrade: "A",
        plannedRR: null,
        realizedR: null,
      }),
    },
    signature,
  };
};

const reconstructTradovateTrades = (rows, userId) => {
  const fills = rows
    .map((row, index) => {
      const contract = getRowValue(row, ["contract", "instrument", "symbol"]);
      const product = getRowValue(row, ["product", "productdescription"]);
      const pair = contract || product || "Imported";
      const timestampValue = getRowValue(row, ["timestamp", "_timestamp", "date", "filltime", "executiontime", "time"]);
      const timestamp = normalizeImportedTimestamp(timestampValue);
      const action = getRowValue(row, ["b/s", "side", "buysell", "_action", "action"]);
      const quantity = Math.abs(
        normalizeImportedNumber(getRowValue(row, ["quantity", "qty", "_qty", "filledqty"]))
      );
      const price = normalizeImportedNumber(getRowValue(row, ["price", "_price", "fillprice", "avgprice"]));
      const commission = Math.abs(normalizeImportedNumber(getRowValue(row, ["commission"])));

      if (!pair || !timestamp || !quantity || !price || !action) return null;

      const signedQty = normalizeImportedDirection(action) === "Short" ? -quantity : quantity;

      return {
        index,
        row,
        pair,
        pointSymbol: product || contract || pair,
        account: getRowValue(row, ["account", "_accountid"]),
        timestamp,
        date: normalizeImportedDate(timestampValue),
        signedQty,
        quantity,
        price,
        commission,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.timestamp - b.timestamp);

  const openPositions = new Map();
  const completedTrades = [];
  let orphanCount = 0;

  const finalizeTrade = (state) => {
    if (!state || !state.entryQty || !state.exitQty || state.netQty !== 0 || !state.direction) return;

    const avgEntry = roundTo(state.entryValue / state.entryQty, 2);
    const avgExit = roundTo(state.exitValue / state.exitQty, 2);
    const direction = state.direction;
    const pointValue = getFuturesPointValue(state.pointSymbol);
    const points =
      direction === "Long" ? roundTo(avgExit - avgEntry, 2) : roundTo(avgEntry - avgExit, 2);
    const grossPnl =
      pointValue === 1
        ? roundTo(points * state.entryQty, 2)
        : roundTo(points * state.entryQty * pointValue, 2);
    const netPnl = roundTo(grossPnl - state.commission, 2);

    if (
      !Number.isFinite(avgEntry) ||
      !Number.isFinite(avgExit) ||
      !Number.isFinite(netPnl) ||
      !state.entryTimestamp ||
      !state.exitTimestamp
    ) {
      orphanCount += 1;
      return;
    }

    completedTrades.push(
      buildImportedTradeRecord({
        userId,
        date: normalizeImportedDate(state.exitTimestamp.toISOString()),
        pair: state.pair,
        direction,
        pnl: netPnl,
        entry: String(avgEntry),
        exitPrice: String(avgExit),
        size: String(state.entryQty),
        account: state.account,
        plainNotes: "",
        importLabel: "Tradovate Trade",
        entryReason: `Imported from Tradovate fills${state.commission ? ` • Commission $${roundTo(state.commission, 2)}` : ""}`,
        targetPlan: pointValue === 1 ? `${points.toFixed(2)} points` : `${points.toFixed(2)} pts • gross ${formatMoney(grossPnl)}`,
      })
    );
  };

  const applyOpenFill = (state, fill, qtyPortion, commissionPortion) => {
    state.fillIndices.add(fill.index);
    state.entryQty += qtyPortion;
    state.entryValue += fill.price * qtyPortion;
    state.commission += commissionPortion;
    state.netQty += fill.signedQty > 0 ? qtyPortion : -qtyPortion;
    state.entryTimestamp = state.entryTimestamp || fill.timestamp;
    state.exitTimestamp = fill.timestamp;
  };

  const applyCloseFill = (state, fill, qtyPortion, commissionPortion) => {
    state.fillIndices.add(fill.index);
    state.exitQty += qtyPortion;
    state.exitValue += fill.price * qtyPortion;
    state.commission += commissionPortion;
    state.netQty += fill.signedQty > 0 ? qtyPortion : -qtyPortion;
    state.exitTimestamp = fill.timestamp;
  };

  for (const fill of fills) {
    const key = fill.pair;
    const sign = fill.signedQty > 0 ? 1 : -1;
    let remainingQty = fill.quantity;
    let remainingCommission = fill.commission;
    let state = openPositions.get(key) ?? null;

    while (remainingQty > 0) {
      if (!state || state.netQty === 0) {
        const openQty = remainingQty;
        const commissionPortion = remainingCommission;
        state = {
          pair: fill.pair,
          pointSymbol: fill.pointSymbol,
          account: fill.account,
          direction: sign > 0 ? "Long" : "Short",
          fillIndices: new Set(),
          netQty: 0,
          entryQty: 0,
          exitQty: 0,
          entryValue: 0,
          exitValue: 0,
          commission: 0,
          entryTimestamp: fill.timestamp,
          exitTimestamp: fill.timestamp,
        };
        applyOpenFill(state, fill, openQty, commissionPortion);
        remainingQty = 0;
        remainingCommission = 0;
        openPositions.set(key, state);
        continue;
      }

      const openSign = state.netQty > 0 ? 1 : -1;

      if (openSign === sign) {
        const commissionPortion = remainingCommission;
        applyOpenFill(state, fill, remainingQty, commissionPortion);
        remainingQty = 0;
        remainingCommission = 0;
        openPositions.set(key, state);
        continue;
      }

      const closeQty = Math.min(Math.abs(state.netQty), remainingQty);
      const commissionPortion =
        remainingQty > 0 ? remainingCommission * (closeQty / remainingQty) : 0;
      applyCloseFill(state, fill, closeQty, commissionPortion);
      remainingQty -= closeQty;
      remainingCommission -= commissionPortion;

      if (state.netQty === 0) {
        finalizeTrade(state);
        openPositions.delete(key);
        state = null;
      } else {
        openPositions.set(key, state);
      }
    }
  }

  for (const state of openPositions.values()) {
    if (state.netQty !== 0) orphanCount += state.fillIndices.size || 1;
  }

  return {
    trades: completedTrades,
    orphanCount,
    fillCount: fills.length,
  };
};

const mapImportedTradeRow = (row, index, userId, formatId = "generic", batchMeta = {}) => {
  const pair = getRowValue(row, ["symbol", "pair", "instrument", "ticker"]) || "Imported";
  const pnl = normalizeImportedNumber(getRowValue(row, ["profit", "pnl", "netpnl", "netp&l", "realizedpnl"]));
  const entry = getRowValue(row, ["entry", "entryprice", "avgentry", "open", "price", "fillprice", "avgprice"]);
  const exitPrice = getRowValue(row, ["exit", "exitprice", "avgexit", "close"]);
  const direction = normalizeImportedDirection(getRowValue(row, ["side", "direction", "action", "buysell"]) || "long");
  const date = normalizeImportedDate(getRowValue(row, ["date", "opendate", "closetime", "time", "timestamp", "filltime", "executiontime"]));
  const importLabel = getRowValue(row, ["setup", "strategy", "signal"]) || "Imported Trade";
  const plainNotes = getRowValue(row, ["notes", "comment", "memo"]);
  const signature = buildTradeDuplicateSignature({
    date,
    pair,
    pnl,
    direction,
    entry,
    exitPrice,
  });

  const record = {
    preview: {
      id: `${pair}-${date}-${index}`,
      date,
      pair,
      pnl,
      entry,
      exitPrice,
      direction,
      signature,
      raw: row,
    },
    payload: {
      user_id: userId,
      date,
      pair,
      setup: importLabel,
      direction,
      pnl,
      result: inferResultFromPnl(pnl),
      screenshot: "",
      notes: buildStoredNotes(plainNotes, {
        importBatchId: batchMeta.importBatchId ?? "",
        importSource: batchMeta.importSource ?? "csv",
        importedAt: batchMeta.importedAt ?? "",
        entryReason: "Imported from CSV",
        entryTrigger: importLabel,
        targetPlan: "",
        entry,
        stopLoss: "",
        takeProfit: "",
        exitPrice,
        size: getRowValue(row, ["size", "qty", "quantity", "contracts"]),
        riskAmount: "",
        session: "NY Open",
        account: getRowValue(row, ["account", "accountname"]),
        executionGrade: "A",
        plannedRR: null,
        realizedR: null,
      }),
    },
    signature,
  };

  return batchMeta.importBatchId ? { ...record, payload: withImportBatchMeta(record.payload, batchMeta) } : record;
};

const BROKER_OPTIONS = [
  {
    id: "tradovate",
    name: "Tradovate",
    description: "Auto-sync futures executions and keep reviews current.",
    badge: "Most requested",
  },
  {
    id: "ninjatrader",
    name: "NinjaTrader",
    description: "Bring in fills and sessions from your desktop workflow.",
    badge: "Desktop flow",
  },
  {
    id: "mt5",
    name: "MT5",
    description: "Track forex and CFD history with a cleaner review layer.",
    badge: "Global markets",
  },
  {
    id: "csv",
    name: "Other / CSV Import",
    description: "Use file import while direct broker syncing is still rolling out.",
    badge: "Flexible import",
  },
];

const normalizeTrade = (trade) => {
  const meta = extractMetaFromNotes(trade.notes || "");

  const normalized = {
    ...trade,
    importId: meta.importId ?? meta.importBatchId ?? "",
    source: meta.source ?? meta.importSource ?? "",
    importBatchId: meta.importBatchId ?? "",
    importSource: meta.importSource ?? "",
    importedAt: meta.importedAt ?? "",
    originalFileName: meta.originalFileName ?? "",
    setupCategory: meta.setupCategory ?? normalizeReviewSetupCategory(trade.setup),
    entryReason: meta.entryReason ?? "",
    entryTrigger: meta.entryTrigger ?? "",
    targetPlan: meta.targetPlan ?? "",
    confluences: normalizeTradeConfluences(meta.confluences),
    entry: meta.entry ?? "",
    stopLoss: meta.stopLoss ?? "",
    takeProfit: meta.takeProfit ?? "",
    exitPrice: meta.exitPrice ?? "",
    entryTime: meta.entryTime ?? "",
    exitTime: meta.exitTime ?? "",
    size: meta.size ?? "",
    riskAmount: meta.riskAmount ?? "",
    session: meta.session ?? "NY Open",
    account: meta.account ?? "",
    executionGrade: meta.executionGrade ?? "A",
    reviewSetup: meta.reviewSetup ?? "",
    reviewConfidence: meta.reviewConfidence ?? "",
    reviewNote: meta.reviewNote ?? "",
    plainNotes: stripMetaFromNotes(trade.notes || ""),
  };

  normalized.plannedRR =
    meta.plannedRR ??
    calcPlannedRR({
      entry: normalized.entry,
      stopLoss: normalized.stopLoss,
      takeProfit: normalized.takeProfit,
      direction: trade.direction,
    });

  normalized.realizedR =
    calcRealizedR({
      entry: normalized.entry,
      stopLoss: normalized.stopLoss,
      exitPrice: normalized.exitPrice,
      direction: trade.direction,
    }) ?? meta.realizedR ?? null;

  return normalized;
};

const PremiumShell = ({ children, className = "" }) => (
  <div className={`premium-card overflow-hidden ${className}`}>
    <div className="hud-divider" />
    {children}
  </div>
);

const MiniStatCard = ({ title, value, sub, variant = "gold" }) => (
  <div className={`stat-card-${variant} min-w-0 p-5`}>
    <div className="hud-label">{title}</div>
    <div
      className={`hud-number mt-4 text-[2.6rem] font-bold leading-none ${
        variant === "green"
          ? "text-emerald-300 glow-profit"
          : variant === "red"
          ? "text-red-300 glow-loss"
          : variant === "cream"
          ? "text-amber-100 glow-cream"
          : "text-[#fcd34d] glow-gold"
      }`}
    >
      {value}
    </div>
    <div className="mt-4 border-t border-white/6 pt-3 text-[11px] font-medium text-white/36">
      {sub}
    </div>
  </div>
);

const QuickSelectButton = ({ active, children, onClick }) => (
  
  <button
  
    onClick={onClick}
    className={`rounded-[12px] border px-3.5 py-2 text-[12px] font-semibold transition-all duration-200 ${
      active
        ? "border-[#fbbf24]/26 bg-[#f59e0b]/12 text-white shadow-[0_0_16px_rgba(251,191,36,0.12)]"
        : "border-white/8 bg-white/[0.03] text-white/50 hover:border-white/12 hover:text-white/80"
    }`}
  >
    {children}
  </button>
);

const monthKeyFromDate = (dateString) => {
  const d = new Date(`${dateString}T00:00:00`);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

const getWeekStartFromDate = (dateString) => {
  const date = new Date(`${dateString}T00:00:00`);
  const weekday = date.getDay();
  const mondayOffset = weekday === 0 ? -6 : 1 - weekday;
  const weekStart = new Date(date);
  weekStart.setDate(date.getDate() + mondayOffset);
  weekStart.setHours(0, 0, 0, 0);
  return weekStart;
};

const getWeekKeyFromDate = (dateString) => getWeekStartFromDate(dateString).toISOString().split("T")[0];

const formatWeekRangeLabel = (weekStartKey) => {
  const weekStart = new Date(`${weekStartKey}T00:00:00`);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const startLabel = weekStart.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  const endLabel = weekEnd.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  return `Week of ${startLabel} – ${endLabel}`;
};

const formatMonthLabel = (date) =>
  date.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

const shiftMonth = (date, amount) =>
  new Date(date.getFullYear(), date.getMonth() + amount, 1);

const getCalendarDays = (monthDate) => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const startWeekday = firstDayOfMonth.getDay();
  const startDate = new Date(year, month, 1 - startWeekday);

  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    return {
      date,
      dateKey: date.toISOString().split("T")[0],
      isCurrentMonth: date.getMonth() === month,
    };
  });
};

const getWeekLabelFromIndex = (index) => `Week ${index + 1}`;

/* ──────────────────────────────────────────────────────────
   APP
────────────────────────────────────────────────────────── */
export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");
  const [analyticsView, setAnalyticsView] = useState("performance");
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [showAllSetupAnalytics, setShowAllSetupAnalytics] = useState(false);

  const [tradeForm, setTradeForm] = useState(defaultTradeForm);
  const [journalForm, setJournalForm] = useState(defaultJournalForm);
  const [showAdvancedTradeFields, setShowAdvancedTradeFields] = useState(false);

  const [tradeSearch, setTradeSearch] = useState("");
  const [tradeSort, setTradeSort] = useState("newest");
  const [tradeResultFilter, setTradeResultFilter] = useState("all");
  const [tradeSetupFilter, setTradeSetupFilter] = useState("all");
  const [selectedTradeIds, setSelectedTradeIds] = useState([]);
  const [openWeeks, setOpenWeeks] = useState({});
  const [openDays, setOpenDays] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteLastSyncConfirm, setShowDeleteLastSyncConfirm] = useState(false);
  const [showClearImportedConfirm, setShowClearImportedConfirm] = useState(false);
  const [isClearingImportedTrades, setIsClearingImportedTrades] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [editingTradeId, setEditingTradeId] = useState(null);
  const [isDraggingScreenshot, setIsDraggingScreenshot] = useState(false);
  const [showBrokerModal, setShowBrokerModal] = useState(false);
  const [brokerFlowMode, setBrokerFlowMode] = useState("connect");
  const [brokerFlowState, setBrokerFlowState] = useState("selection");
  const [selectedBroker, setSelectedBroker] = useState(null);
  const [brokerCredentials, setBrokerCredentials] = useState({
    identifier: "",
    secret: "",
  });
  const [connectedBroker, setConnectedBroker] = useState(null);
  const [importFlowState, setImportFlowState] = useState("upload");
  const [importFileName, setImportFileName] = useState("");
  const [importError, setImportError] = useState("");
  const [isDraggingImport, setIsDraggingImport] = useState(false);
  const [parsedImportRows, setParsedImportRows] = useState([]);
  const [normalizedImportTrades, setNormalizedImportTrades] = useState([]);
  const [detectedImportFormat, setDetectedImportFormat] = useState(null);
  const [rememberedImportFormat, setRememberedImportFormat] = useState(null);
  const [importPreviewSummary, setImportPreviewSummary] = useState(null);
  const [duplicateImportCount, setDuplicateImportCount] = useState(0);
  const [importSkippedCount, setImportSkippedCount] = useState(0);
  const [lastImportSync, setLastImportSync] = useState(null);
  const [importDetectedHeaders, setImportDetectedHeaders] = useState([]);
  const [importNotice, setImportNotice] = useState("");
  const [importMappedTrades, setImportMappedTrades] = useState([]);
  const [syncFeedback, setSyncFeedback] = useState("");
  const [showImportSummary, setShowImportSummary] = useState(false);
  const [importSummary, setImportSummary] = useState(null);
  const [reviewMode, setReviewMode] = useState(false);
  const [latestImportBatchId, setLatestImportBatchId] = useState("");
  const [latestImportTradeIds, setLatestImportTradeIds] = useState([]);
  const [customTradeOptions, setCustomTradeOptions] = useState(DEFAULT_CUSTOM_TRADE_OPTIONS);
  const [customOptionPanelField, setCustomOptionPanelField] = useState("");
  const [customOptionDraft, setCustomOptionDraft] = useState("");
  const [showOptionVisibilityEditor, setShowOptionVisibilityEditor] = useState(false);
  const [expandedReviewTradeId, setExpandedReviewTradeId] = useState(null);
  const [reviewDraft, setReviewDraft] = useState({
    reviewSetup: "",
    reviewConfidence: "5",
    reviewNote: "",
  });
  const [savingReviewTradeId, setSavingReviewTradeId] = useState(null);
  const [hoveredEquityPoint, setHoveredEquityPoint] = useState(null);

  const screenshotInputRef = useRef(null);
  const hasInitializedTradesExpansionRef = useRef(false);
  const importInputRef = useRef(null);
  const brokerConnectTimeoutRef = useRef(null);
  const equityChartRef = useRef(null);

    const [trades, setTrades] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);

  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(null);

  const inputCls =
    "w-full rounded-[14px] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-200 focus:border-[#fbbf24]/28 focus:bg-white/[0.045]";
  const textAreaCls =
    "w-full rounded-[16px] border border-white/8 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-200 focus:border-[#fbbf24]/28 focus:bg-white/[0.045]";
  const L = "hud-label";
  const textMuted = "text-[#fbf7fd]/32";
  const textBody = "text-[#fbf7fd]/48";

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("trades")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(async ({ data }) => {
        if (!data) return;

        const normalizedTrades = data.map(normalizeTrade);
        const legacyPlaceholderIds = normalizedTrades
          .filter(isLegacyTradovatePlaceholderTrade)
          .map((trade) => trade.id);

        if (!legacyPlaceholderIds.length) {
          setTrades(normalizedTrades);
          return;
        }

        const { error } = await supabase.from("trades").delete().in("id", legacyPlaceholderIds);

        if (error) {
          setTrades(normalizedTrades);
          return;
        }

        setTrades(normalizedTrades.filter((trade) => !legacyPlaceholderIds.includes(trade.id)));
      });
  }, [user]);

  useEffect(() => {
    return () => {
      if (brokerConnectTimeoutRef.current) {
        window.clearTimeout(brokerConnectTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!syncFeedback) return undefined;

    const timeoutId = window.setTimeout(() => setSyncFeedback(""), 3200);
    return () => window.clearTimeout(timeoutId);
  }, [syncFeedback]);

  useEffect(() => {
    if (!user?.id) {
      setCustomTradeOptions(DEFAULT_CUSTOM_TRADE_OPTIONS);
      return;
    }

    try {
      const raw = window.localStorage.getItem(getCustomTradeOptionsStorageKey(user.id));
      if (!raw) {
        setCustomTradeOptions(DEFAULT_CUSTOM_TRADE_OPTIONS);
        return;
      }

      const parsed = JSON.parse(raw);
      setCustomTradeOptions({
        entryTrigger: normalizeManagedTradeOptionStoreItem(parsed?.entryTrigger),
        targetPlan: normalizeManagedTradeOptionStoreItem(parsed?.targetPlan),
        confluences: normalizeManagedTradeOptionStoreItem(parsed?.confluences),
      });
    } catch {
      setCustomTradeOptions(DEFAULT_CUSTOM_TRADE_OPTIONS);
    }
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;

    window.localStorage.setItem(
      getCustomTradeOptionsStorageKey(user.id),
      JSON.stringify(customTradeOptions)
    );
  }, [customTradeOptions, user?.id]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("journal_entries")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setJournalEntries(data);
      });
  }, [user]);

  const handleTradeChange = (field, value) => {
    setTradeForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleJournalChange = (field, value) => {
    setJournalForm((prev) => ({ ...prev, [field]: value }));
  };

  const openCustomOptionPanel = (field) => {
    setCustomOptionPanelField(field);
    setCustomOptionDraft("");
    setShowOptionVisibilityEditor(false);
  };

  const closeCustomOptionPanel = () => {
    setCustomOptionPanelField("");
    setCustomOptionDraft("");
    setShowOptionVisibilityEditor(false);
  };

  const getManagedTradeOptions = (field) =>
    mergeCustomTradeOptions(
      getManagedTradeFieldBuiltInOptions(field).filter(
        (option) =>
          !normalizeManagedTradeOptionStoreItem(customTradeOptions[field]).hiddenBuiltIns.some(
            (hiddenOption) => hiddenOption.toLowerCase() === option.toLowerCase()
          )
      ),
      normalizeManagedTradeOptionStoreItem(customTradeOptions[field]).custom
    );

  const handleManagedTradeFieldChange = (field, value) => {
    if (value === "__create__") {
      openCustomOptionPanel(field);
      return;
    }

    if (field === "confluences") {
      const nextOption = sanitizeCustomOption(value);
      if (!nextOption) return;

      setTradeForm((prev) => {
        const existingConfluences = normalizeTradeConfluences(prev.confluences);
        if (existingConfluences.some((option) => option.toLowerCase() === nextOption.toLowerCase())) return prev;
        if (existingConfluences.length >= 10) return prev;

        return {
          ...prev,
          confluences: [...existingConfluences, nextOption],
        };
      });
      return;
    }

    handleTradeChange(field, value);
  };

  const handleSaveCustomTradeOption = (field) => {
    const nextOption = sanitizeCustomOption(customOptionDraft);
    if (!nextOption) return;

    const builtInOptions = getManagedTradeFieldBuiltInOptions(field);
    const hasBuiltIn = builtInOptions.some((option) => option.toLowerCase() === nextOption.toLowerCase());
    const hasCustom = normalizeManagedTradeOptionStoreItem(customTradeOptions[field]).custom.some(
      (option) => option.toLowerCase() === nextOption.toLowerCase()
    );

    if (hasBuiltIn) {
      setCustomTradeOptions((prev) => ({
        ...prev,
        [field]: {
          ...normalizeManagedTradeOptionStoreItem(prev[field]),
          hiddenBuiltIns: normalizeManagedTradeOptionStoreItem(prev[field]).hiddenBuiltIns.filter(
            (option) => option.toLowerCase() !== nextOption.toLowerCase()
          ),
        },
      }));
    } else if (!hasBuiltIn && !hasCustom) {
      setCustomTradeOptions((prev) => ({
        ...prev,
        [field]: {
          ...normalizeManagedTradeOptionStoreItem(prev[field]),
          custom: [...normalizeManagedTradeOptionStoreItem(prev[field]).custom, nextOption],
        },
      }));
    }

    handleManagedTradeFieldChange(field, nextOption);
    closeCustomOptionPanel();
  };

  const handleDeleteCustomTradeOption = (field, optionToDelete) => {
    setCustomTradeOptions((prev) => ({
      ...prev,
      [field]: {
        ...normalizeManagedTradeOptionStoreItem(prev[field]),
        custom: normalizeManagedTradeOptionStoreItem(prev[field]).custom.filter(
          (option) => option.toLowerCase() !== optionToDelete.toLowerCase()
        ),
      },
    }));
  };

  const toggleBuiltInTradeOptionVisibility = (field, optionToToggle) => {
    setCustomTradeOptions((prev) => {
      const fieldOptions = normalizeManagedTradeOptionStoreItem(prev[field]);
      const isHidden = fieldOptions.hiddenBuiltIns.some(
        (option) => option.toLowerCase() === optionToToggle.toLowerCase()
      );

      return {
        ...prev,
        [field]: {
          ...fieldOptions,
          hiddenBuiltIns: isHidden
            ? fieldOptions.hiddenBuiltIns.filter(
                (option) => option.toLowerCase() !== optionToToggle.toLowerCase()
              )
            : [...fieldOptions.hiddenBuiltIns, optionToToggle],
        },
      };
    });
  };

  const removeConfluenceFromTradeForm = (optionToRemove) => {
    setTradeForm((prev) => ({
      ...prev,
      confluences: normalizeTradeConfluences(prev.confluences).filter(
        (option) => option.toLowerCase() !== optionToRemove.toLowerCase()
      ),
    }));
  };

  const renderManagedOptionPanel = (field, placeholder) => {
    if (customOptionPanelField !== field) return null;

    const fieldOptions = normalizeManagedTradeOptionStoreItem(customTradeOptions[field]);
    const builtInOptions = getManagedTradeFieldBuiltInOptions(field);
    const optionTypeLabel =
      field === "entryTrigger"
        ? "trigger"
        : field === "targetPlan"
        ? "target"
        : "confluence";

    return (
      <div className="rounded-[14px] border border-white/6 bg-white/[0.02] p-3">
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            value={customOptionDraft}
            onChange={(e) => setCustomOptionDraft(e.target.value)}
            className={inputCls}
            placeholder={placeholder}
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleSaveCustomTradeOption(field)}
              className="rounded-[12px] border border-[#fbbf24]/20 bg-[#f59e0b]/10 px-3.5 py-2 text-[12px] font-semibold text-[#fde68a] transition-all hover:border-[#fbbf24]/28 hover:bg-[#f59e0b]/14"
            >
              Save option
            </button>
            <button
              type="button"
              onClick={closeCustomOptionPanel}
              className="rounded-[12px] border border-white/8 bg-white/[0.03] px-3.5 py-2 text-[12px] font-semibold text-white/66 transition-all hover:border-white/12 hover:text-white/88"
            >
              Close
            </button>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-[12px] font-medium text-white/42">
            {`Keep the ${optionTypeLabel} dropdown tight by hiding defaults you never use. You can restore them anytime.`}
          </div>

          <div className="mt-3">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setShowOptionVisibilityEditor((prev) => !prev)}
                className="rounded-[12px] border border-white/8 bg-white/[0.03] px-3 py-2 text-[11px] font-semibold text-white/66 transition-all hover:border-white/12 hover:text-white/88"
              >
                {showOptionVisibilityEditor ? "Close visible options" : "Edit visible options"}
              </button>

              {fieldOptions.hiddenBuiltIns.length > 0 ? (
                <button
                  type="button"
                  onClick={() =>
                    setCustomTradeOptions((prev) => ({
                      ...prev,
                      [field]: {
                        ...normalizeManagedTradeOptionStoreItem(prev[field]),
                        hiddenBuiltIns: [],
                      },
                    }))
                  }
                  className="rounded-[12px] border border-white/8 bg-white/[0.03] px-3 py-2 text-[11px] font-semibold text-white/66 transition-all hover:border-white/12 hover:text-white/88"
                >
                  Show all defaults
                </button>
              ) : null}
            </div>

            {showOptionVisibilityEditor ? (
              <div className="mt-3 max-h-44 overflow-y-auto rounded-[14px] border border-white/6 bg-white/[0.015] p-2.5">
                <div className="space-y-1.5">
                  {builtInOptions.map((option) => {
                    const isVisible = !fieldOptions.hiddenBuiltIns.some(
                      (hiddenOption) => hiddenOption.toLowerCase() === option.toLowerCase()
                    );

                    return (
                      <label
                        key={option}
                        className="flex items-center gap-2 rounded-[10px] px-2.5 py-2 text-[12px] font-medium text-white/62 transition-colors hover:bg-white/[0.03] hover:text-white/84"
                      >
                        <input
                          type="checkbox"
                          checked={isVisible}
                          onChange={() => toggleBuiltInTradeOptionVisibility(field, option)}
                          className="h-3.5 w-3.5 accent-[#fbbf24]"
                        />
                        <span>{option}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>

          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/36">
              Custom options
            </div>
            {fieldOptions.custom.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {fieldOptions.custom.map((option) => (
                  <div
                    key={option}
                    className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-white/62"
                  >
                    <span>{option}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteCustomTradeOption(field, option)}
                      className="text-red-300 transition-colors hover:text-red-200"
                      aria-label={`Delete ${option}`}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-3 text-[12px] font-medium text-white/36">
                No custom options yet.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const isTradeInLatestImportReview = (trade) =>
    reviewMode &&
    latestImportBatchId &&
    (trade.importBatchId === latestImportBatchId || trade.importId === latestImportBatchId);

  const hasTradeReview = (trade) =>
    Boolean(trade.reviewSetup || trade.reviewConfidence || trade.reviewNote?.trim());

  const resetLatestImportState = () => {
    setLastImportSync(null);
    setImportFileName("");
    setDetectedImportFormat(null);
    setRememberedImportFormat(null);
    setImportDetectedHeaders([]);
    setImportNotice("");
    setImportPreviewSummary(null);
    setParsedImportRows([]);
    setNormalizedImportTrades([]);
    setImportMappedTrades([]);
    setDuplicateImportCount(0);
    setImportSkippedCount(0);
    setImportFlowState("upload");
    setImportError("");
    if (importInputRef.current) importInputRef.current.value = "";
  };

  const resetBrokerFlow = () => {
    if (brokerConnectTimeoutRef.current) {
      window.clearTimeout(brokerConnectTimeoutRef.current);
      brokerConnectTimeoutRef.current = null;
    }

    setBrokerFlowState(connectedBroker ? "success" : "selection");
    setSelectedBroker(connectedBroker ? BROKER_OPTIONS.find((broker) => broker.name === connectedBroker.name) ?? null : null);
    setBrokerCredentials({ identifier: "", secret: "" });
    resetLatestImportState();
    setImportError("");
    setIsDraggingImport(false);
    if (importInputRef.current) importInputRef.current.value = "";
  };

  const openBrokerModal = (mode = "connect") => {
    setBrokerFlowMode(mode);
    setShowBrokerModal(true);

    if (mode === "import") {
      setSelectedBroker(null);
      setBrokerFlowState("selection");
      setImportFlowState("upload");
      setImportError("");
    } else if (connectedBroker) {
      setSelectedBroker(BROKER_OPTIONS.find((broker) => broker.name === connectedBroker.name) ?? null);
      setBrokerFlowState("success");
    } else {
      setSelectedBroker(null);
      setBrokerFlowState("selection");
    }

    setBrokerCredentials({ identifier: "", secret: "" });
  };

  const closeBrokerModal = () => {
    setShowBrokerModal(false);
    resetBrokerFlow();
  };

  const handleBrokerSelection = (broker) => {
    if (broker.id === "csv") {
      setBrokerFlowMode("import");
      setSelectedBroker(null);
      setImportFlowState("upload");
      return;
    }

    setSelectedBroker(broker);
    setBrokerFlowState("details");
  };

  const handleBrokerCredentialChange = (field, value) => {
    setBrokerCredentials((prev) => ({ ...prev, [field]: value }));
  };

  const handleBrokerConnect = () => {
    if (!selectedBroker) return;

    if (brokerConnectTimeoutRef.current) {
      window.clearTimeout(brokerConnectTimeoutRef.current);
    }

    setBrokerFlowState("connecting");

    brokerConnectTimeoutRef.current = window.setTimeout(() => {
      setConnectedBroker({
        name: selectedBroker.name,
        tradesSynced: selectedBroker.id === "csv" ? 48 : 124,
        lastSynced: "Just now",
      });
      setBrokerFlowState("success");
      brokerConnectTimeoutRef.current = null;
    }, 1100);
  };

  const handleBrokerSyncNow = () => {
    if (!connectedBroker) return;

    setConnectedBroker((prev) =>
      prev
        ? {
            ...prev,
            tradesSynced: prev.tradesSynced + 3,
            lastSynced: "Just now",
          }
        : prev
    );

    if (showBrokerModal) {
      setBrokerFlowState("success");
    }
  };

  const handleBrokerDisconnect = () => {
    if (brokerConnectTimeoutRef.current) {
      window.clearTimeout(brokerConnectTimeoutRef.current);
      brokerConnectTimeoutRef.current = null;
    }

    setConnectedBroker(null);
    setSelectedBroker(null);
    setBrokerCredentials({ identifier: "", secret: "" });
    setBrokerFlowState("selection");
  };

  const handleImportDragOver = (e) => {
    e.preventDefault();
    setIsDraggingImport(true);
  };

  const handleImportDragLeave = (e) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget)) setIsDraggingImport(false);
  };

  const processImportFile = async (file) => {
    if (!file) {
      setImportError("No file selected.");
      setImportFlowState("error");
      return;
    }

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setImportError("Please upload a CSV broker export file.");
      setImportFlowState("error");
      return;
    }

    try {
      const text = await file.text();
      const parsedRows = parseCsvText(text);
      const format = detectImportFormat(parsedRows);
      const detectedHeaders = parsedRows[0] ? Object.keys(parsedRows[0]) : [];

      if (!parsedRows.length) {
        setImportError("Unsupported CSV format");
        setParsedImportRows([]);
        setNormalizedImportTrades([]);
        setDetectedImportFormat(format);
        setImportDetectedHeaders([]);
        setImportMappedTrades([]);
        setImportSkippedCount(0);
        setImportFlowState("error");
        return;
      }

      const existingSignatures = new Set(trades.map((trade) => buildTradeDuplicateSignature(trade)));
      const batchSignatures = new Set();
      let duplicateCount = 0;
      let mappedTrades = [];
      let nextNotice = "";
      let skippedCount = 0;

      if (format.id === "tradovate") {
        const reconstructed = reconstructTradovateTrades(parsedRows, user.id);
        mappedTrades = reconstructed.trades;
        skippedCount = reconstructed.orphanCount;
        if (reconstructed.orphanCount > 0) {
          nextNotice = `${reconstructed.trades.length} completed trade${reconstructed.trades.length === 1 ? "" : "s"} reconstructed • ${reconstructed.orphanCount} unresolved fill${reconstructed.orphanCount === 1 ? "" : "s"} skipped.`;
        }
      } else {
        mappedTrades = parsedRows
          .map((row, index) => mapImportedTradeRow(row, index, user.id, format.id))
          .filter((item) => item.preview.pair || item.preview.pnl || item.preview.entry || item.preview.exitPrice);
      }

      const normalizedTrades = mappedTrades
        .map((item) => {
          const isDuplicate = existingSignatures.has(item.signature) || batchSignatures.has(item.signature);
          if (isDuplicate) {
            duplicateCount += 1;
          } else {
            batchSignatures.add(item.signature);
          }

          return {
            ...item,
            preview: {
              ...item.preview,
              isDuplicate,
            },
          };
        });

      if (!normalizedTrades.length) {
        setImportError(
          format.id === "tradovate"
            ? "TradeFlow read the Tradovate fills, but no completed trades could be reconstructed from that file."
            : "That file did not contain any usable trade rows."
        );
        setParsedImportRows([]);
        setNormalizedImportTrades([]);
        setDetectedImportFormat(format);
        setImportMappedTrades([]);
        setImportNotice(nextNotice);
        setImportSkippedCount(skippedCount + duplicateCount);
        setImportFlowState("error");
        return;
      }

      const newTrades = normalizedTrades.filter((item) => !item.preview.isDuplicate);
      const previewRows = normalizedTrades.map((item) => item.preview);
      const sourceRows = newTrades.map((item) => item.payload);
      const newTradePnL = newTrades.reduce((sum, item) => sum + safeNumber(item.payload.pnl), 0);
      const newTradeDates = newTrades.map((item) => item.payload.date).sort();
      const wins = newTrades.filter((item) => item.payload.pnl > 0).length;
      const losses = newTrades.filter((item) => item.payload.pnl < 0).length;

      setImportFileName(file.name);
      setImportError("");
      setDetectedImportFormat(format);
      setRememberedImportFormat(format);
      setImportDetectedHeaders(detectedHeaders);
      setParsedImportRows(previewRows);
      setNormalizedImportTrades(sourceRows);
      setImportMappedTrades(normalizedTrades);
      setDuplicateImportCount(duplicateCount);
      setImportSkippedCount(skippedCount + duplicateCount);
      setImportNotice(nextNotice);
      setImportPreviewSummary({
        tradeCount: sourceRows.length,
        totalRows: previewRows.length,
        netPnl: newTradePnL,
        wins,
        losses,
        startDate: newTradeDates[0] || today(),
        endDate: newTradeDates[newTradeDates.length - 1] || today(),
      });
      setImportFlowState("preview");
    } catch {
      setImportError("TradeFlow could not read that CSV. Try exporting a clean broker file and upload again.");
      setParsedImportRows([]);
      setNormalizedImportTrades([]);
      setDetectedImportFormat(null);
      setImportPreviewSummary(null);
      setDuplicateImportCount(0);
      setImportSkippedCount(0);
      setImportDetectedHeaders([]);
      setImportNotice("");
      setImportMappedTrades([]);
      setImportFlowState("error");
    }
  };

  const handleImportFileChange = async (e) => {
    await processImportFile(e.target.files?.[0]);
  };

  const handleImportDrop = async (e) => {
    e.preventDefault();
    setIsDraggingImport(false);
    await processImportFile(e.dataTransfer.files?.[0]);
  };

  const handleImportTrades = async () => {
    if (!normalizedImportTrades.length && duplicateImportCount === 0) {
      setImportError("No parsed trades are ready to sync.");
      setImportFlowState("error");
      return;
    }

    setImportFlowState("importing");
    const importBatchId = createImportBatchId();
    const importedAt = new Date().toISOString();
    const batchMeta = {
      importId: importBatchId,
      source: detectedImportFormat?.id || "csv",
      importBatchId,
      importSource: "csv",
      importedAt,
      originalFileName: importFileName,
    };
    const batchPayloads = importMappedTrades
      .filter((item) => !item.preview.isDuplicate)
      .map((item) => withImportBatchMeta(item.payload, batchMeta));

    if (!normalizedImportTrades.length && duplicateImportCount > 0) {
      setLatestImportBatchId(importBatchId);
      setLatestImportTradeIds([]);
      setImportSummary({
        importBatchId,
        importedCount: 0,
        skippedCount: importSkippedCount || duplicateImportCount,
        netPnl: 0,
        winRate: 0,
        bestTrade: null,
        worstTrade: null,
        sourceName: detectedImportFormat?.sourceName || rememberedImportFormat?.sourceName || "Generic CSV",
        fileName: importFileName,
      });
      setLastImportSync({
        importId: importBatchId,
        importBatchId,
        source: detectedImportFormat?.id || "csv",
        sourceName: detectedImportFormat?.sourceName || rememberedImportFormat?.sourceName || "Generic CSV",
        fileName: importFileName,
        lastSync: importedAt,
        syncedCount: 0,
        duplicatesSkipped: duplicateImportCount,
        tradeIds: [],
      });
      setImportFlowState("success");
      setShowImportSummary(true);
      setShowBrokerModal(false);
      resetBrokerFlow();
      setSyncFeedback("Last sync completed with duplicates skipped.");
      return;
    }

    const { data, error } = await supabase.from("trades").insert(batchPayloads).select();

    if (error || !data) {
      setImportError(error?.message || "TradeFlow could not import those trades.");
      setImportFlowState("error");
      return;
    }

    const normalizedInsertedTrades = data.map(normalizeTrade);
    const importedCount = normalizedInsertedTrades.length;
    const importedNetPnl = normalizedInsertedTrades.reduce((sum, trade) => sum + safeNumber(trade.pnl), 0);
    const importedWins = normalizedInsertedTrades.filter((trade) => safeNumber(trade.pnl) > 0).length;
    const bestTrade = normalizedInsertedTrades.length
      ? [...normalizedInsertedTrades].sort((a, b) => safeNumber(b.pnl) - safeNumber(a.pnl))[0]
      : null;
    const worstTrade = normalizedInsertedTrades.length
      ? [...normalizedInsertedTrades].sort((a, b) => safeNumber(a.pnl) - safeNumber(b.pnl))[0]
      : null;

    setLatestImportBatchId(importBatchId);
    setLatestImportTradeIds(data.map((trade) => trade.id));
    setTrades((prev) => [...normalizedInsertedTrades, ...prev]);
    setConnectedBroker((prev) =>
      prev
        ? {
            ...prev,
            tradesSynced: prev.tradesSynced + importedCount,
            lastSynced: "Just now",
          }
        : prev
    );
    setLastImportSync({
      importId: importBatchId,
      importBatchId,
      source: detectedImportFormat?.id || "csv",
      sourceName: detectedImportFormat?.sourceName || rememberedImportFormat?.sourceName || "Generic CSV",
      fileName: importFileName,
      lastSync: importedAt,
        syncedCount: importedCount,
        duplicatesSkipped: duplicateImportCount,
        tradeIds: data.map((trade) => trade.id),
      });
    setImportSummary({
      importBatchId,
      importedCount,
      skippedCount: importSkippedCount,
      netPnl: importedNetPnl,
      winRate: roundTo(getWinRateFromCounts(importedWins, normalizedInsertedTrades.filter((trade) => safeNumber(trade.pnl) < 0).length), 1),
      bestTrade,
      worstTrade,
      sourceName: detectedImportFormat?.sourceName || rememberedImportFormat?.sourceName || "Generic CSV",
      fileName: importFileName,
    });
    setImportFlowState("success");
    setShowImportSummary(true);
    setShowBrokerModal(false);
    resetBrokerFlow();
    setSyncFeedback(
      `Imported ${importedCount} completed trade${importedCount === 1 ? "" : "s"}${importNotice ? ` • ${importNotice}` : ""}`
    );
  };

  const handleDeleteLastSync = async () => {
    if (!latestExistingImportBatch?.importId) {
      setShowDeleteLastSyncConfirm(false);
      return;
    }

    const metadataMatchedIds = trades
      .filter(
        (trade) =>
          trade.importId === latestExistingImportBatch.importId ||
          trade.importBatchId === latestExistingImportBatch.importBatchId
      )
      .map((trade) => trade.id);

    const tradeIdsToDelete = Array.from(
      new Set([...(latestExistingImportBatch.tradeIds || []), ...metadataMatchedIds])
    );

    if (!tradeIdsToDelete.length) {
      resetLatestImportState();
      setShowDeleteLastSyncConfirm(false);
      setSyncFeedback("Last sync removed successfully.");
      return;
    }

    const { error } = await supabase.from("trades").delete().in("id", tradeIdsToDelete);

    if (error) {
      setSyncFeedback(error.message || "TradeFlow could not remove the last sync.");
      setShowDeleteLastSyncConfirm(false);
      return;
    }

    setTrades((prev) => prev.filter((trade) => !tradeIdsToDelete.includes(trade.id)));
    setSelectedTradeIds((prev) => prev.filter((id) => !tradeIdsToDelete.includes(id)));
    if (
      reviewMode &&
      latestImportBatchId &&
      (latestImportBatchId === latestExistingImportBatch.importBatchId ||
        latestImportBatchId === latestExistingImportBatch.importId)
    ) {
      setReviewMode(false);
      setLatestImportBatchId("");
      setLatestImportTradeIds([]);
      setExpandedReviewTradeId(null);
    }
    if (editingTradeId && tradeIdsToDelete.includes(editingTradeId)) resetTradeForm();
    resetLatestImportState();
    setShowDeleteLastSyncConfirm(false);
    setSyncFeedback("Last sync removed successfully.");
  };

  const handleDeleteAllImportedTrades = async () => {
    if (!user) {
      setShowClearImportedConfirm(false);
      return;
    }

    setIsClearingImportedTrades(true);

    const { data, error } = await supabase
      .from("trades")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      setSyncFeedback(error.message || "TradeFlow could not load imported trades.");
      setIsClearingImportedTrades(false);
      setShowClearImportedConfirm(false);
      return;
    }

    const importedTradesToDelete = (data || []).map(normalizeTrade).filter(isImportedTrade);
    const importedTradeIds = importedTradesToDelete.map((trade) => trade.id);

    if (!importedTradeIds.length) {
      resetLatestImportState();
      setIsClearingImportedTrades(false);
      setShowClearImportedConfirm(false);
      setSyncFeedback("No imported trades were found to remove.");
      return;
    }

    const { error: deleteError } = await supabase.from("trades").delete().in("id", importedTradeIds);

    if (deleteError) {
      setSyncFeedback(deleteError.message || "TradeFlow could not clear imported trades.");
      setIsClearingImportedTrades(false);
      setShowClearImportedConfirm(false);
      return;
    }

    console.log("[TradeFlow] Deleted imported trades:", importedTradeIds.length);

    setTrades((prev) => prev.filter((trade) => !isImportedTrade(trade)));
    setSelectedTradeIds((prev) => prev.filter((id) => !importedTradeIds.includes(id)));
    setReviewMode(false);
    setLatestImportBatchId("");
    setLatestImportTradeIds([]);
    setExpandedReviewTradeId(null);
    if (editingTradeId && importedTradeIds.includes(editingTradeId)) resetTradeForm();
    resetLatestImportState();
    setIsClearingImportedTrades(false);
    setShowClearImportedConfirm(false);
    setSyncFeedback("All imported trades removed successfully.");
  };

  const handleEnterLatestImportReview = (batch = null) => {
    const importBatch = batch || latestExistingImportBatch || null;
    const batchId = importBatch?.importBatchId || importBatch?.importId || "";

    if (!batchId) return;

    setLatestImportBatchId(batchId);
    setLatestImportTradeIds(importBatch?.tradeIds || []);
    setReviewMode(true);
    setExpandedReviewTradeId(null);
    setTradeSearch("");
    setActivePage("trades");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReviewImportedTrades = () => {
    setShowImportSummary(false);
    handleEnterLatestImportReview(importSummary);
  };

  const toggleTradeReviewPanel = (trade) => {
    if (!isTradeInLatestImportReview(trade)) return;

    if (expandedReviewTradeId === trade.id) {
      setExpandedReviewTradeId(null);
      return;
    }

    setExpandedReviewTradeId(trade.id);
    setReviewDraft({
      reviewSetup: normalizeReviewSetupCategory(trade.reviewSetup),
      reviewConfidence: String(trade.reviewConfidence || 5),
      reviewNote: trade.reviewNote || "",
    });
  };

  const handleReviewDraftChange = (field, value) => {
    setReviewDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveTradeReview = async (trade) => {
    if (!trade?.id) return;

    const existingMeta = extractMetaFromNotes(trade.notes || "");
    const nextMeta = {
      ...existingMeta,
      reviewSetup: reviewDraft.reviewSetup || "",
      reviewConfidence: Number(reviewDraft.reviewConfidence) || 5,
      reviewNote: reviewDraft.reviewNote || "",
    };

    setSavingReviewTradeId(trade.id);

    const { data, error } = await supabase
      .from("trades")
      .update({
        notes: buildStoredNotes(trade.plainNotes || "", nextMeta),
      })
      .eq("id", trade.id)
      .select()
      .single();

    setSavingReviewTradeId(null);

    if (error || !data) {
      setSyncFeedback(error?.message || "TradeFlow could not save that review.");
      return;
    }

    setTrades((prev) => prev.map((item) => (item.id === trade.id ? normalizeTrade(data) : item)));
    setExpandedReviewTradeId(null);
    setSyncFeedback("Trade review saved.");
  };

  const resetTradeForm = () => {
    setTradeForm({ ...defaultTradeForm, date: today() });
    setEditingTradeId(null);
    setShowAdvancedTradeFields(false);
    setIsDraggingScreenshot(false);
    closeCustomOptionPanel();
    if (screenshotInputRef.current) screenshotInputRef.current.value = "";
  };

  const setScreenshotFromFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => setTradeForm((prev) => ({ ...prev, screenshot: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleScreenshotUpload = (e) => setScreenshotFromFile(e.target.files?.[0]);

  const handleScreenshotDrop = (e) => {
    e.preventDefault();
    setIsDraggingScreenshot(false);
    setScreenshotFromFile(e.dataTransfer.files?.[0]);
  };

  const handleScreenshotDragOver = (e) => {
    e.preventDefault();
    setIsDraggingScreenshot(true);
  };

  const handleScreenshotDragLeave = (e) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget)) setIsDraggingScreenshot(false);
  };

  const removeScreenshot = () => {
    setTradeForm((prev) => ({ ...prev, screenshot: "" }));
    if (screenshotInputRef.current) screenshotInputRef.current.value = "";
  };

  const plannedRR = useMemo(
    () =>
      calcPlannedRR({
        entry: tradeForm.entry,
        stopLoss: tradeForm.stopLoss,
        takeProfit: tradeForm.takeProfit,
        direction: tradeForm.direction,
      }),
    [tradeForm.entry, tradeForm.stopLoss, tradeForm.takeProfit, tradeForm.direction]
  );

  const realizedR = useMemo(
    () =>
      calcRealizedR({
        entry: tradeForm.entry,
        stopLoss: tradeForm.stopLoss,
        exitPrice: tradeForm.exitPrice,
        direction: tradeForm.direction,
      }),
    [tradeForm.entry, tradeForm.stopLoss, tradeForm.exitPrice, tradeForm.direction]
  );

  const advancedMeta = useMemo(
    () => ({
      setupCategory: normalizeReviewSetupCategory(tradeForm.setup),
      entryReason: tradeForm.entryReason,
      entryTrigger: tradeForm.entryTrigger,
      targetPlan: tradeForm.targetPlan,
      confluences: normalizeTradeConfluences(tradeForm.confluences),
      entry: tradeForm.entry,
      stopLoss: tradeForm.stopLoss,
      takeProfit: tradeForm.takeProfit,
      exitPrice: tradeForm.exitPrice,
      entryTime: tradeForm.entryTime,
      exitTime: tradeForm.exitTime,
      size: tradeForm.size,
      riskAmount: tradeForm.riskAmount,
      session: tradeForm.session,
      account: tradeForm.account,
      executionGrade: tradeForm.executionGrade,
      plannedRR,
      realizedR,
    }),
    [
      tradeForm.setup,
      tradeForm.entryReason,
      tradeForm.entryTrigger,
      tradeForm.targetPlan,
      tradeForm.confluences,
      tradeForm.entry,
      tradeForm.stopLoss,
      tradeForm.takeProfit,
      tradeForm.exitPrice,
      tradeForm.entryTime,
      tradeForm.exitTime,
      tradeForm.size,
      tradeForm.session,
      tradeForm.account,
      tradeForm.executionGrade,
      plannedRR,
      realizedR,
    ]
  );

  const createTradePayload = () => {
    const pnlValue = safeNumber(tradeForm.pnl);
    const result = inferResultFromPnl(pnlValue);
    const structuredSetupCategory = normalizeReviewSetupCategory(tradeForm.setup);
    const derivedSetup = structuredSetupCategory || deriveTradeSetup(tradeForm);

    return {
      user_id: user.id,
      date: tradeForm.date,
      pair: tradeForm.pair,
      setup: derivedSetup,
      direction: tradeForm.direction,
      pnl: pnlValue,
      result,
      screenshot: tradeForm.screenshot,
      notes: buildStoredNotes(tradeForm.notes, advancedMeta),
    };
  };

  const addTrade = async () => {
    if (
      (!tradeForm.setup.trim() && !hasStructuredTradeDetails(tradeForm)) ||
      tradeForm.pnl === "" ||
      normalizeTradeConfluences(tradeForm.confluences).length === 0
    ) return;
    const payload = createTradePayload();
    const { data, error } = await supabase.from("trades").insert(payload).select().single();

    if (!error && data) {
      const normalizedTrade = normalizeTrade(data);
      setTrades((prev) => sortTradesNewestFirst([normalizedTrade, ...prev]));
      const weekKey = getWeekKeyFromDate(normalizedTrade.date);
      setOpenWeeks((prev) => ({ ...prev, [weekKey]: true }));
      setOpenDays((prev) => ({ ...prev, [normalizedTrade.date]: true }));
      setActivePage("trades");
      window.scrollTo({ top: 0, behavior: "smooth" });
      resetTradeForm();
    }
  };

  const updateTrade = async () => {
    if (
      !editingTradeId ||
      ((!tradeForm.setup.trim() && !hasStructuredTradeDetails(tradeForm)) ||
        tradeForm.pnl === "" ||
        normalizeTradeConfluences(tradeForm.confluences).length === 0)
    ) return;
    const payload = createTradePayload();

    const { data, error } = await supabase
      .from("trades")
      .update({
        date: payload.date,
        pair: payload.pair,
        setup: payload.setup,
        direction: payload.direction,
        pnl: payload.pnl,
        result: payload.result,
        screenshot: payload.screenshot,
        notes: payload.notes,
      })
      .eq("id", editingTradeId)
      .select()
      .single();

    if (!error && data) {
      const normalizedTrade = normalizeTrade(data);
      setTrades((prev) =>
        sortTradesNewestFirst(prev.map((t) => (t.id === editingTradeId ? normalizedTrade : t)))
      );
      const weekKey = getWeekKeyFromDate(normalizedTrade.date);
      setOpenWeeks((prev) => ({ ...prev, [weekKey]: true }));
      setOpenDays((prev) => ({ ...prev, [normalizedTrade.date]: true }));
      setActivePage("trades");
      window.scrollTo({ top: 0, behavior: "smooth" });
      resetTradeForm();
    }
  };

  const loadTradeForEdit = (trade) => {
    closeCustomOptionPanel();
    setEditingTradeId(trade.id);
    setTradeForm({
      date: trade.date || today(),
      pair: trade.pair || "NQ",
      setup: trade.setupCategory || normalizeReviewSetupCategory(trade.setup) || "",
      entryReason: trade.entryReason ?? "",
      entryTrigger: trade.entryTrigger ?? "",
      targetPlan: trade.targetPlan ?? "",
      confluences: normalizeTradeConfluences(trade.confluences),
      direction: trade.direction || "Long",
      pnl: String(trade.pnl ?? ""),
      notes: trade.plainNotes ?? "",
      screenshot: trade.screenshot || "",
      entry: trade.entry ?? "",
      stopLoss: trade.stopLoss ?? "",
      takeProfit: trade.takeProfit ?? "",
      exitPrice: trade.exitPrice ?? "",
      entryTime: trade.entryTime ?? "",
      exitTime: trade.exitTime ?? "",
      size: trade.size ?? "",
      riskAmount: trade.riskAmount ?? "",
      session: trade.session ?? "NY Open",
      account: trade.account ?? "",
      executionGrade: trade.executionGrade ?? "A",
    });

    const hasAdvanced =
      trade.entryReason ||
      trade.entryTrigger ||
      trade.targetPlan ||
      normalizeTradeConfluences(trade.confluences).length > 0 ||
      trade.entry ||
      trade.stopLoss ||
      trade.takeProfit ||
      trade.exitPrice ||
      trade.entryTime ||
      trade.exitTime ||
      trade.size ||
      trade.executionGrade !== "A";

    setShowAdvancedTradeFields(Boolean(hasAdvanced));
    setActivePage("trades");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveJournalEntry = async () => {
    if (!journalForm.followedPlan && !journalForm.lesson.trim() && journalForm.confidence === 5) return;

    const { data, error } = await supabase
      .from("journal_entries")
      .insert({
        user_id: user.id,
        date: journalForm.date,
        followed_plan: journalForm.followedPlan,
        confidence: journalForm.confidence,
        lesson: journalForm.lesson,
      })
      .select()
      .single();

    if (!error && data) {
      setJournalEntries((prev) => [data, ...prev]);
      setJournalForm({ ...defaultJournalForm, date: today() });
    }
  };

  const deleteJournalEntry = async (id) => {
    const { error } = await supabase.from("journal_entries").delete().eq("id", id);
    if (!error) setJournalEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const toggleTradeSelection = (id) => {
    setSelectedTradeIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const confirmDeleteSelectedTrades = async () => {
    const { error } = await supabase.from("trades").delete().in("id", selectedTradeIds);
    if (!error) {
      setTrades((prev) => prev.filter((trade) => !selectedTradeIds.includes(trade.id)));
      setSelectedTradeIds([]);
      if (editingTradeId && selectedTradeIds.includes(editingTradeId)) resetTradeForm();
      setShowDeleteConfirm(false);
    }
  };

  const clearTradeFilters = () => {
    setTradeSearch("");
    setTradeSort("newest");
    setTradeResultFilter("all");
    setTradeSetupFilter("all");
  };

  const toggleWeekOpen = (weekKey) => {
    setOpenWeeks((prev) => ({
      ...prev,
      [weekKey]: !prev[weekKey],
    }));
  };

  const toggleDayOpen = (dayKey) => {
    setOpenDays((prev) => ({
      ...prev,
      [dayKey]: !prev[dayKey],
    }));
  };

  const filteredAndSortedTrades = useMemo(() => {
    const s = tradeSearch.trim().toLowerCase();

    const filtered = trades.filter((trade) => {
      if (
        reviewMode &&
        latestImportBatchId &&
        trade.importBatchId !== latestImportBatchId &&
        trade.importId !== latestImportBatchId
      ) {
        return false;
      }

      if (tradeResultFilter !== "all") {
        const result = inferResultFromPnl(trade.pnl);
        if (tradeResultFilter === "win" && result !== "Win") return false;
        if (tradeResultFilter === "loss" && result !== "Loss") return false;
        if (tradeResultFilter === "be" && result !== "BE") return false;
      }

      if (tradeSetupFilter !== "all") {
        const resolvedSetupCategory =
          normalizeReviewSetupCategory(trade.reviewSetup) ||
          normalizeReviewSetupCategory(trade.setupCategory) ||
          normalizeReviewSetupCategory(trade.setup);

        if (resolvedSetupCategory !== tradeSetupFilter) return false;
      }

      if (!s) return true;
      return [
        trade.setup,
        trade.setupCategory,
        trade.reviewSetup,
        trade.entryReason,
        trade.entryTrigger,
        trade.targetPlan,
        ...(Array.isArray(trade.confluences) ? trade.confluences : []),
        trade.pair,
        trade.direction,
        trade.result,
        trade.reviewNote,
        trade.plainNotes,
        trade.session,
      ]
        .join(" ")
        .toLowerCase()
        .includes(s);
    });

    return [...filtered].sort((a, b) => {
      if (tradeSort === "newest") return compareTradesNewestFirst(a, b);
      if (tradeSort === "oldest") return compareTradesNewestFirst(b, a);
      if (tradeSort === "biggestWin") return b.pnl - a.pnl;
      if (tradeSort === "biggestLoss") return a.pnl - b.pnl;
      return compareTradesNewestFirst(a, b);
    });
  }, [trades, tradeSearch, tradeSort, tradeResultFilter, tradeSetupFilter, reviewMode, latestImportBatchId]);

  const groupedTradesByDay = useMemo(() => {
    const grouped = filteredAndSortedTrades.reduce((acc, trade) => {
      if (!acc[trade.date]) {
        acc[trade.date] = {
          date: trade.date,
          trades: [],
          totalPnl: 0,
          wins: 0,
          losses: 0,
          breakeven: 0,
        };
      }

      acc[trade.date].trades.push(trade);
      acc[trade.date].totalPnl += safeNumber(trade.pnl);
      if (trade.pnl > 0) acc[trade.date].wins += 1;
      else if (trade.pnl < 0) acc[trade.date].losses += 1;
      else acc[trade.date].breakeven += 1;

      return acc;
    }, {});

    return Object.values(grouped)
      .map((day) => ({
        ...day,
        trades: sortTradesNewestFirst(day.trades),
      }))
      .sort((a, b) => {
        const dayDiff = new Date(`${b.date}T00:00:00`) - new Date(`${a.date}T00:00:00`);
        if (dayDiff !== 0) return dayDiff;

        const newestTradeA = a.trades[0];
        const newestTradeB = b.trades[0];
        return compareTradesNewestFirst(newestTradeA, newestTradeB);
      });
  }, [filteredAndSortedTrades]);

  const groupedTradesByWeek = useMemo(() => {
    const grouped = groupedTradesByDay.reduce((acc, day) => {
      const weekKey = getWeekKeyFromDate(day.date);

      if (!acc[weekKey]) {
        acc[weekKey] = {
          weekKey,
          weekLabel: formatWeekRangeLabel(weekKey),
        days: [],
        totalPnl: 0,
        tradeCount: 0,
        wins: 0,
        losses: 0,
        breakeven: 0,
      };
    }

    acc[weekKey].days.push(day);
    acc[weekKey].totalPnl += day.totalPnl;
    acc[weekKey].tradeCount += day.trades.length;
    acc[weekKey].wins += day.wins;
    acc[weekKey].losses += day.losses;
    acc[weekKey].breakeven += day.breakeven;

      return acc;
    }, {});

    return Object.values(grouped)
      .map((week) => ({
        ...week,
        days: [...week.days].sort((a, b) => new Date(`${b.date}T00:00:00`) - new Date(`${a.date}T00:00:00`)),
      }))
      .sort((a, b) => new Date(`${b.weekKey}T00:00:00`) - new Date(`${a.weekKey}T00:00:00`));
  }, [groupedTradesByDay]);

  useEffect(() => {
    if (activePage !== "trades" || groupedTradesByWeek.length === 0) return;
    const availableDays = groupedTradesByWeek.flatMap((week) => week.days);
    if (!hasInitializedTradesExpansionRef.current) {
      hasInitializedTradesExpansionRef.current = true;
      setOpenWeeks({ [groupedTradesByWeek[0].weekKey]: true });
      setOpenDays({ [availableDays[0].date]: true });
      return;
    }

    const availableWeekKeys = new Set(groupedTradesByWeek.map((week) => week.weekKey));
    const availableDayKeys = new Set(availableDays.map((day) => day.date));

    setOpenWeeks((prev) => {
      const next = Object.fromEntries(
        Object.entries(prev).filter(([key, isOpen]) => availableWeekKeys.has(key) && isOpen)
      );
      return Object.keys(next).length === Object.keys(prev).length ? prev : next;
    });

    setOpenDays((prev) => {
      const next = Object.fromEntries(
        Object.entries(prev).filter(([key, isOpen]) => availableDayKeys.has(key) && isOpen)
      );
      return Object.keys(next).length === Object.keys(prev).length ? prev : next;
    });
  }, [activePage, groupedTradesByWeek]);

    const calendarDays = useMemo(() => getCalendarDays(calendarMonth), [calendarMonth]);

  const tradesByDate = useMemo(() => {
    return trades.reduce((acc, trade) => {
      const key = trade.date;

      if (!acc[key]) {
        acc[key] = {
          date: key,
          trades: [],
          totalPnl: 0,
          wins: 0,
          losses: 0,
          breakeven: 0,
        };
      }

      acc[key].trades.push(trade);
      acc[key].totalPnl += safeNumber(trade.pnl);

      if (trade.pnl > 0) acc[key].wins += 1;
      else if (trade.pnl < 0) acc[key].losses += 1;
      else acc[key].breakeven += 1;

      return acc;
    }, {});
  }, [trades]);

  const selectedMonthKey = useMemo(
    () =>
      `${calendarMonth.getFullYear()}-${String(calendarMonth.getMonth() + 1).padStart(2, "0")}`,
    [calendarMonth]
  );

  const currentMonthCalendarStats = useMemo(() => {
    const monthDays = Object.values(tradesByDate).filter(
      (day) => monthKeyFromDate(day.date) === selectedMonthKey
    );

    const pnl = monthDays.reduce((sum, day) => sum + day.totalPnl, 0);
    const tradesCount = monthDays.reduce((sum, day) => sum + day.trades.length, 0);
    const greenDays = monthDays.filter((day) => day.totalPnl > 0).length;
    const redDays = monthDays.filter((day) => day.totalPnl < 0).length;
    const flatDays = monthDays.filter((day) => day.totalPnl === 0).length;

    return {
      pnl,
      tradesCount,
      greenDays,
      redDays,
      flatDays,
    };
  }, [tradesByDate, selectedMonthKey]);

  const importBatchHistory = useMemo(() => {
    const grouped = trades.reduce((acc, trade) => {
      if (!trade.importBatchId && !trade.importId) return acc;

      const batchKey = trade.importBatchId || trade.importId;
      if (!acc[batchKey]) {
        acc[batchKey] = {
          importId: trade.importId || batchKey,
          importBatchId: trade.importBatchId || batchKey,
          source: trade.source || trade.importSource || "csv",
          sourceName: formatImportSourceName(trade.source || trade.importSource || "csv"),
          fileName: trade.originalFileName || "",
          lastSync: trade.importedAt || "",
          syncedCount: 0,
          duplicatesSkipped: 0,
          tradeIds: [],
        };
      }

      acc[batchKey].syncedCount += 1;
      acc[batchKey].tradeIds.push(trade.id);

      if (trade.originalFileName && !acc[batchKey].fileName) {
        acc[batchKey].fileName = trade.originalFileName;
      }

      if (trade.importedAt && (!acc[batchKey].lastSync || trade.importedAt > acc[batchKey].lastSync)) {
        acc[batchKey].lastSync = trade.importedAt;
      }

      return acc;
    }, {});

    return Object.values(grouped).sort((a, b) => {
      const aTime = a.lastSync ? new Date(a.lastSync).getTime() : 0;
      const bTime = b.lastSync ? new Date(b.lastSync).getTime() : 0;
      return bTime - aTime;
    });
  }, [trades]);

  const latestExistingImportBatch = importBatchHistory[0] || null;

  const selectedCalendarDayData = selectedCalendarDate ? tradesByDate[selectedCalendarDate] : null;

  const weeklyCalendarBreakdown = useMemo(() => {
    const weeks = [];

    for (let i = 0; i < 6; i += 1) {
      const weekDays = calendarDays.slice(i * 7, i * 7 + 7);
      const currentMonthWeekDays = weekDays.filter((day) => day.isCurrentMonth);

      const summary = currentMonthWeekDays.reduce(
        (acc, day) => {
          const dayData = tradesByDate[day.dateKey];
          if (!dayData) return acc;

          acc.pnl += safeNumber(dayData.totalPnl);
          acc.tradeCount += dayData.trades.length;
          acc.activeDays += 1;
          return acc;
        },
        { pnl: 0, tradeCount: 0, activeDays: 0 }
      );

      weeks.push({
        label: getWeekLabelFromIndex(i),
        ...summary,
      });
    }

    return weeks;
  }, [calendarDays, tradesByDate]);

  useEffect(() => {
  if (selectedCalendarDate) return;

  const matchingTrades = trades
    .filter((trade) => monthKeyFromDate(trade.date) === selectedMonthKey)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  if (matchingTrades.length) {
    setSelectedCalendarDate(matchingTrades[0].date);
  }
}, [trades, selectedMonthKey, selectedCalendarDate]);

  const stats = useMemo(() => {
    const totalTrades = trades.length;
    const wins = trades.filter((t) => t.pnl > 0).length;
    const losses = trades.filter((t) => t.pnl < 0).length;
    const breakeven = trades.filter((t) => t.pnl === 0).length;
    const totalPnL = trades.reduce((sum, t) => sum + safeNumber(t.pnl), 0);
    const winRate = getWinRateFromCounts(wins, losses);

    const totalProfit = trades
      .filter((t) => safeNumber(t.pnl) > 0)
      .reduce((sum, t) => sum + safeNumber(t.pnl), 0);

    const totalLoss = trades
      .filter((t) => safeNumber(t.pnl) < 0)
      .reduce((sum, t) => sum + Math.abs(safeNumber(t.pnl)), 0);

    const profitFactor =
      totalProfit === 0 && totalLoss === 0
        ? null
        : totalLoss === 0
        ? Infinity
        : totalProfit / totalLoss;

    const rrTrades = trades.filter(
      (t) =>
        hasPriceValue(t.entry) &&
        hasPriceValue(t.stopLoss) &&
        (hasPriceValue(t.takeProfit) || hasPriceValue(t.exitPrice)) &&
        Number.isFinite(Number(t.plannedRR))
    );
    const avgPlannedRR = rrTrades.length
      ? rrTrades.reduce((sum, t) => sum + safeNumber(t.plannedRR), 0) / rrTrades.length
      : null;

    const rTrades = trades.filter((t) => Number.isFinite(Number(t.realizedR)));
    const avgRealizedR = rTrades.length
      ? rTrades.reduce((sum, t) => sum + safeNumber(t.realizedR), 0) / rTrades.length
      : null;

    const executionEfficiencyTrades = trades.filter(
      (t) =>
        hasPriceValue(t.entry) &&
        hasPriceValue(t.stopLoss) &&
        hasPriceValue(t.takeProfit) &&
        hasPriceValue(t.exitPrice) &&
        Number.isFinite(Number(t.plannedRR)) &&
        Number.isFinite(Number(t.realizedR))
    );
    const executionAvgPlannedR = executionEfficiencyTrades.length
      ? executionEfficiencyTrades.reduce((sum, t) => sum + safeNumber(t.plannedRR), 0) /
        executionEfficiencyTrades.length
      : null;
    const executionAvgRealizedR = executionEfficiencyTrades.length
      ? executionEfficiencyTrades.reduce((sum, t) => sum + safeNumber(t.realizedR), 0) /
        executionEfficiencyTrades.length
      : null;
    const executionEfficiency =
      Number.isFinite(executionAvgPlannedR) &&
      Number.isFinite(executionAvgRealizedR) &&
      executionAvgPlannedR > 0
        ? executionAvgRealizedR / executionAvgPlannedR
        : null;

    const dailyChrono = Object.values(
      trades.reduce((acc, trade) => {
        if (!acc[trade.date]) {
          acc[trade.date] = {
            date: trade.date,
            pnl: 0,
          };
        }

        acc[trade.date].pnl += safeNumber(trade.pnl);
        return acc;
      }, {})
    ).sort((a, b) => new Date(a.date) - new Date(b.date));

    let curW = 0;
    let curL = 0;
    let bestW = 0;
    let worstL = 0;

    for (const day of dailyChrono) {
      if (day.pnl > 0) {
        curW++;
        curL = 0;
      } else if (day.pnl < 0) {
        curL++;
        curW = 0;
      }

      if (curW > bestW) bestW = curW;
      if (curL > worstL) worstL = curL;
    }

    let activeWinStreak = 0;
    let activeLossStreak = 0;

    for (const day of [...dailyChrono].reverse()) {
      if (day.pnl > 0 && activeLossStreak === 0) activeWinStreak++;
      else if (day.pnl < 0 && activeWinStreak === 0) activeLossStreak++;
      else if (day.pnl === 0) continue;
      else break;
    }

    return {
      totalTrades,
      wins,
      losses,
      breakeven,
      totalPnL,
      totalProfit,
      totalLoss,
      profitFactor,
      winRate,
      bestWinStreak: bestW,
      worstLossStreak: worstL,
      activeWinStreak,
      activeLossStreak,
      avgPlannedRR,
      avgPlannedRRTradeCount: rrTrades.length,
      avgRealizedR,
      executionAvgPlannedR,
      executionAvgRealizedR,
      executionEfficiency,
      executionEfficiencyTradeCount: executionEfficiencyTrades.length,
    };
  }, [trades]);

  const dailyPnL = useMemo(() => {
    const grouped = trades.reduce((acc, t) => {
      acc[t.date] = (acc[t.date] || 0) + safeNumber(t.pnl);
      return acc;
    }, {});

    return Object.entries(grouped)
      .map(([date, pnl]) => ({ date, pnl }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [trades]);

  const setupAnalytics = useMemo(() => {
    const grouped = trades.reduce((acc, t) => {
      const name = t.setup.trim() || "Unknown";
      if (!acc[name]) {
        acc[name] = {
          setup: name,
          trades: 0,
          wins: 0,
          losses: 0,
          breakeven: 0,
          pnl: 0,
        };
      }

      acc[name].trades++;
      acc[name].pnl += safeNumber(t.pnl);
      if (t.pnl > 0) acc[name].wins++;
      else if (t.pnl < 0) acc[name].losses++;
      else acc[name].breakeven++;

      return acc;
    }, {});

    return Object.values(grouped)
      .map((item) => ({
        ...item,
        winRate: getWinRateFromCounts(item.wins, item.losses),
      }))
      .sort((a, b) => b.pnl - a.pnl);
  }, [trades]);

  const setupAnalyticsTrust = useMemo(() => getAnalyticsTrustState(setupAnalytics), [setupAnalytics]);

  const visibleSetupAnalytics = useMemo(
    () =>
      showAllSetupAnalytics
        ? setupAnalyticsTrust.reliableItems
        : setupAnalyticsTrust.reliableItems.slice(0, 5),
    [setupAnalyticsTrust, showAllSetupAnalytics]
  );

  const setupInsight = useMemo(() => {
    const best = getBestPositiveCategory(setupAnalytics);
    const worst = setupAnalyticsTrust.hasEnoughData
      ? getWorstNegativePerformer(setupAnalyticsTrust.reliableItems)
      : null;
    const mostUsed = setupAnalyticsTrust.hasEnoughData
      ? [...setupAnalyticsTrust.reliableItems].sort(
          (a, b) => b.trades - a.trades || safeNumber(b.pnl) - safeNumber(a.pnl)
        )[0] ?? null
      : null;

    return {
      status: setupAnalyticsTrust.status,
      best,
      worst,
      mostUsed,
    };
  }, [setupAnalyticsTrust]);

  const reviewedSetupAnalytics = useMemo(() => {
    const grouped = trades.reduce((acc, trade) => {
      const setupName = getResolvedSetupAnalyticsName(trade);
      if (!setupName) return acc;

      if (!acc[setupName]) {
        acc[setupName] = {
          setup: setupName,
          trades: 0,
          wins: 0,
          losses: 0,
          breakeven: 0,
          pnl: 0,
        };
      }

      acc[setupName].trades += 1;
      acc[setupName].pnl += safeNumber(trade.pnl);
      if (safeNumber(trade.pnl) > 0) acc[setupName].wins += 1;
      else if (safeNumber(trade.pnl) < 0) acc[setupName].losses += 1;
      else acc[setupName].breakeven += 1;

      return acc;
    }, {});

    const items = Object.values(grouped)
      .map((item) => ({
        ...item,
        winRate: getWinRateFromCounts(item.wins, item.losses),
        avgPnl: item.trades ? item.pnl / item.trades : 0,
      }))
      .sort((a, b) => {
        if (safeNumber(b.pnl) !== safeNumber(a.pnl)) return safeNumber(b.pnl) - safeNumber(a.pnl);
        return b.trades - a.trades;
      });

    const trust = getAnalyticsTrustState(items);

    return {
      items,
      trust,
      bestSetup: getBestPositiveCategory(items),
      worstSetup: trust.hasEnoughData ? getWorstNegativePerformer(trust.reliableItems) : null,
      highestWinRate: getHighestWinRatePositiveCategory(items),
      mostTraded: trust.hasEnoughData
        ? [...trust.reliableItems].sort((a, b) => {
            if (b.trades !== a.trades) return b.trades - a.trades;
            return safeNumber(b.pnl) - safeNumber(a.pnl);
          })[0] ?? null
        : null,
    };
  }, [trades]);

  const entryTriggerAnalytics = useMemo(() => {
    const allowedTriggerOptions = mergeCustomTradeOptions(
      ENTRY_TRIGGER_OPTIONS,
      normalizeManagedTradeOptionStoreItem(customTradeOptions.entryTrigger).custom
    );
    const allowedTriggerMap = new Map(
      allowedTriggerOptions.map((option) => [normalizeStructuredOptionValue(option), option])
    );

    const grouped = trades.reduce((acc, trade) => {
      const triggerName = resolveValidEntryTrigger(trade.entryTrigger, allowedTriggerMap);
      if (!triggerName) return acc;

      if (!acc[triggerName]) {
        acc[triggerName] = {
          trigger: triggerName,
          trades: 0,
          wins: 0,
          losses: 0,
          breakeven: 0,
          pnl: 0,
        };
      }

      acc[triggerName].trades += 1;
      acc[triggerName].pnl += safeNumber(trade.pnl);
      if (safeNumber(trade.pnl) > 0) acc[triggerName].wins += 1;
      else if (safeNumber(trade.pnl) < 0) acc[triggerName].losses += 1;
      else acc[triggerName].breakeven += 1;

      return acc;
    }, {});

    const items = Object.values(grouped)
      .map((item) => ({
        ...item,
        winRate: getWinRateFromCounts(item.wins, item.losses),
        avgPnl: item.trades ? item.pnl / item.trades : 0,
      }))
      .sort((a, b) => {
        if (safeNumber(b.pnl) !== safeNumber(a.pnl)) return safeNumber(b.pnl) - safeNumber(a.pnl);
        return b.trades - a.trades;
      });

    const trust = getAnalyticsTrustState(items);
    const bestTrigger = getBestPositiveCategory(items);
    const highestWinRate = getHighestWinRatePositiveCategory(items);
    const mostTraded = trust.hasEnoughData
      ? [...trust.reliableItems].sort((a, b) => {
          if (b.trades !== a.trades) return b.trades - a.trades;
          return safeNumber(b.pnl) - safeNumber(a.pnl);
        })[0] ?? null
      : null;
    const worstTrigger = trust.hasEnoughData ? getWorstNegativePerformer(trust.reliableItems) : null;

    const summaryCards = [];
    if (trust.hasCredibleBest) {
      if (bestTrigger) {
        summaryCards.push({
          id: `best:${bestTrigger.trigger}`,
          title: "Best Trigger",
          label: bestTrigger.trigger,
          value: formatMoney(bestTrigger.pnl),
          sub: `${bestTrigger.wins}W • ${bestTrigger.losses}L • ${bestTrigger.breakeven}BE`,
          meta: `${formatMoney(bestTrigger.avgPnl)} avg per trade`,
          tone: "text-emerald-300 glow-profit",
        });
      }

      if (highestWinRate) {
        summaryCards.push({
          id: `wr:${highestWinRate.trigger}`,
          title: "Highest Win Rate Trigger",
          label: highestWinRate.trigger,
          value: formatPercentage(highestWinRate.winRate),
          sub: `${highestWinRate.wins}W • ${highestWinRate.losses}L • ${highestWinRate.breakeven}BE`,
          meta: `${formatMoney(highestWinRate.pnl)} net • ${formatMoney(highestWinRate.avgPnl)} avg`,
          tone: "text-[#fcd34d] glow-gold",
        });
      }

      if (mostTraded) {
        summaryCards.push({
          id: `most:${mostTraded.trigger}`,
          title: "Most Used Trigger",
          label: mostTraded.trigger,
          value: `${mostTraded.trades}`,
          sub: `${mostTraded.wins}W • ${mostTraded.losses}L • ${mostTraded.breakeven}BE`,
          meta: `${formatMoney(mostTraded.avgPnl)} avg per trade`,
          tone: "text-white/92",
        });
      }

      if (worstTrigger && worstTrigger.trigger !== bestTrigger?.trigger) {
        summaryCards.push({
          id: `worst:${worstTrigger.trigger}`,
          title: "Worst Trigger",
          label: worstTrigger.trigger,
          value: formatMoney(worstTrigger.pnl),
          sub: `${worstTrigger.wins}W • ${worstTrigger.losses}L • ${worstTrigger.breakeven}BE`,
          meta: `${formatMoney(worstTrigger.avgPnl)} avg per trade`,
          tone: "text-red-300 glow-loss",
        });
      }
    }

    return {
      items,
      trust,
      summaryCards,
    };
  }, [trades, customTradeOptions.entryTrigger]);

  const modelPerformanceAnalytics = useMemo(() => {
    const allowedTriggerOptions = mergeCustomTradeOptions(
      ENTRY_TRIGGER_OPTIONS,
      normalizeManagedTradeOptionStoreItem(customTradeOptions.entryTrigger).custom
    );
    const allowedTargetOptions = mergeCustomTradeOptions(
      TARGET_TYPE_OPTIONS,
      normalizeManagedTradeOptionStoreItem(customTradeOptions.targetPlan).custom
    );
    const allowedTriggerMap = new Map(
      allowedTriggerOptions.map((option) => [normalizeStructuredOptionValue(option), option])
    );
    const allowedTargetTypeMap = new Map(
      allowedTargetOptions.map((option) => [normalizeStructuredOptionValue(option), option])
    );

    const grouped = trades.reduce((acc, trade) => {
      const setupCategory = getResolvedSetupAnalyticsName(trade);
      const entryTrigger = resolveValidEntryTrigger(trade.entryTrigger, allowedTriggerMap);
      const targetType = resolveValidTargetType(trade.targetPlan, allowedTargetTypeMap);

      if (!setupCategory || !entryTrigger || !targetType) return acc;

      const model = buildModelLabel({ setupCategory, entryTrigger, targetType });

      if (!acc[model]) {
        acc[model] = {
          model,
          setupCategory,
          entryTrigger,
          targetType,
          trades: 0,
          wins: 0,
          losses: 0,
          breakeven: 0,
          pnl: 0,
        };
      }

      acc[model].trades += 1;
      acc[model].pnl += safeNumber(trade.pnl);
      if (safeNumber(trade.pnl) > 0) acc[model].wins += 1;
      else if (safeNumber(trade.pnl) < 0) acc[model].losses += 1;
      else acc[model].breakeven += 1;

      return acc;
    }, {});

    const items = Object.values(grouped)
      .map((item) => ({
        ...item,
        winRate: getWinRateFromCounts(item.wins, item.losses),
        avgPnl: item.trades ? item.pnl / item.trades : 0,
      }))
      .sort((a, b) => {
        if (safeNumber(b.pnl) !== safeNumber(a.pnl)) return safeNumber(b.pnl) - safeNumber(a.pnl);
        return b.trades - a.trades;
      });

    const trust = getAnalyticsTrustState(items);
    const bestModel = getBestPositiveCategory(items);
    const highestWinRate = getHighestWinRatePositiveCategory(items);
    const mostUsed = trust.hasEnoughData
      ? [...trust.reliableItems].sort((a, b) => {
          if (b.trades !== a.trades) return b.trades - a.trades;
          return safeNumber(b.pnl) - safeNumber(a.pnl);
        })[0] ?? null
      : null;
    const worstModel = trust.hasEnoughData ? getWorstNegativePerformer(trust.reliableItems) : null;
    const summaryCards = [];
    if (trust.hasCredibleBest) {
      if (bestModel) {
        summaryCards.push({
          id: `best:${bestModel.model}`,
          title: "Best Model",
          label: bestModel.model,
          value: formatMoney(bestModel.pnl),
          sub: `${bestModel.wins}W • ${bestModel.losses}L • ${bestModel.breakeven}BE`,
          meta: `${formatMoney(bestModel.avgPnl)} avg per trade`,
          tone: "text-emerald-300 glow-profit",
        });
      }

      if (highestWinRate) {
        summaryCards.push({
          id: `wr:${highestWinRate.model}`,
          title: "Highest Win Rate Model",
          label: highestWinRate.model,
          value: formatPercentage(highestWinRate.winRate),
          sub: `${highestWinRate.wins}W • ${highestWinRate.losses}L • ${highestWinRate.breakeven}BE`,
          meta: `${formatMoney(highestWinRate.pnl)} net • ${formatMoney(highestWinRate.avgPnl)} avg`,
          tone: "text-[#fcd34d] glow-gold",
        });
      }

      if (mostUsed) {
        summaryCards.push({
          id: `most:${mostUsed.model}`,
          title: "Most Used Model",
          label: mostUsed.model,
          value: `${mostUsed.trades}`,
          sub: `${mostUsed.wins}W • ${mostUsed.losses}L • ${mostUsed.breakeven}BE`,
          meta: `${formatMoney(mostUsed.avgPnl)} avg per trade`,
          tone: "text-white/92",
        });
      }

      if (worstModel && worstModel.model !== bestModel?.model) {
        summaryCards.push({
          id: `worst:${worstModel.model}`,
          title: "Worst Model",
          label: worstModel.model,
          value: formatMoney(worstModel.pnl),
          sub: `${worstModel.wins}W • ${worstModel.losses}L • ${worstModel.breakeven}BE`,
          meta: `${formatMoney(worstModel.avgPnl)} avg per trade`,
          tone: "text-red-300 glow-loss",
        });
      }
    }

    return {
      items,
      trust,
      summaryCards,
    };
  }, [trades, customTradeOptions.entryTrigger, customTradeOptions.targetPlan]);

  const profitFactorBySetup = useMemo(() => {
    const grouped = trades.reduce((acc, t) => {
      const key = t.setup?.trim() || "Unknown";

      if (!acc[key]) {
        acc[key] = {
          label: key,
          grossProfit: 0,
          grossLoss: 0,
          pnl: 0,
          trades: 0,
        };
      }

      const pnl = safeNumber(t.pnl);
      acc[key].trades += 1;
      acc[key].pnl += pnl;

      if (pnl > 0) acc[key].grossProfit += pnl;
      if (pnl < 0) acc[key].grossLoss += Math.abs(pnl);

      return acc;
    }, {});

    return Object.values(grouped)
      .map((item) => ({
        ...item,
        profitFactor:
          item.grossProfit === 0 && item.grossLoss === 0
            ? null
            : item.grossLoss === 0
            ? Infinity
            : item.grossProfit / item.grossLoss,
      }))
      .sort((a, b) => safeNumber(b.pnl) - safeNumber(a.pnl));
  }, [trades]);

  const profitFactorBySession = useMemo(() => {
    const grouped = trades.reduce((acc, t) => {
      const key = t.session || "Unlabeled";

      if (!acc[key]) {
        acc[key] = {
          label: key,
          grossProfit: 0,
          grossLoss: 0,
          pnl: 0,
          trades: 0,
        };
      }

      const pnl = safeNumber(t.pnl);
      acc[key].trades += 1;
      acc[key].pnl += pnl;

      if (pnl > 0) acc[key].grossProfit += pnl;
      if (pnl < 0) acc[key].grossLoss += Math.abs(pnl);

      return acc;
    }, {});

    return Object.values(grouped)
      .map((item) => ({
        ...item,
        profitFactor:
          item.grossProfit === 0 && item.grossLoss === 0
            ? null
            : item.grossLoss === 0
            ? Infinity
            : item.grossProfit / item.grossLoss,
      }))
      .sort((a, b) => safeNumber(b.pnl) - safeNumber(a.pnl));
  }, [trades]);

  const profitFactorByGrade = useMemo(() => {
    const grouped = trades.reduce((acc, t) => {
      const key = t.executionGrade || "A";

      if (!acc[key]) {
        acc[key] = {
          label: key,
          grossProfit: 0,
          grossLoss: 0,
          pnl: 0,
          trades: 0,
        };
      }

      const pnl = safeNumber(t.pnl);
      acc[key].trades += 1;
      acc[key].pnl += pnl;

      if (pnl > 0) acc[key].grossProfit += pnl;
      if (pnl < 0) acc[key].grossLoss += Math.abs(pnl);

      return acc;
    }, {});

    return Object.values(grouped)
      .map((item) => ({
        ...item,
        profitFactor:
          item.grossProfit === 0 && item.grossLoss === 0
            ? null
            : item.grossLoss === 0
            ? Infinity
            : item.grossProfit / item.grossLoss,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [trades]);

  const setupEdgeTrust = useMemo(() => getAnalyticsTrustState(profitFactorBySetup), [profitFactorBySetup]);

  const canRenderSetupBestInsights = setupAnalyticsTrust.hasCredibleBest && hasProfitableData(setupAnalyticsTrust.reliableItems);
  const canRenderReviewedSetupBestInsights =
    reviewedSetupAnalytics.trust.hasCredibleBest && hasProfitableData(reviewedSetupAnalytics.trust.reliableItems);
  const canRenderTriggerBestInsights =
    entryTriggerAnalytics.trust.hasCredibleBest && hasProfitableData(entryTriggerAnalytics.trust.reliableItems);
  const canRenderModelBestInsights =
    modelPerformanceAnalytics.trust.hasCredibleBest && hasProfitableData(modelPerformanceAnalytics.trust.reliableItems);

  const sessionEdgeInsight = useMemo(() => {
    const trust = getAnalyticsTrustState(profitFactorBySession);
    const best = getBestPositiveCategory(profitFactorBySession);
    const worst = trust.hasEnoughData ? getWorstNegativePerformer(trust.reliableItems) : null;
    return { trust, best, worst };
  }, [profitFactorBySession]);

  const canRenderSessionBestInsights =
    sessionEdgeInsight?.trust?.hasCredibleBest && hasProfitableData(sessionEdgeInsight?.trust?.reliableItems ?? []);

  const setupEdgeItems = useMemo(
    () => (canRenderSetupBestInsights ? setupEdgeTrust.reliableItems.slice(0, 5) : []),
    [canRenderSetupBestInsights, setupEdgeTrust]
  );

  const disciplineComparison = useMemo(() => {
    const trust = getAnalyticsTrustState(profitFactorByGrade, { minTotalTrades: 3, minCategoryTrades: 2 });
    const comparisonPool = trust.reliableItems;
    const rankedByPnl = [...comparisonPool].sort((a, b) => safeNumber(b.pnl) - safeNumber(a.pnl));
    const best = trust.hasCredibleBest ? rankedByPnl.find((item) => safeNumber(item.pnl) > 0) ?? null : null;
    const comparison = best ? rankedByPnl.find((item) => item.label !== best.label) ?? null : null;

    return {
      trust: {
        ...trust,
        hasEnoughData: trust.hasEnoughData && comparisonPool.length >= 2,
        hasCredibleBest: trust.hasCredibleBest && comparisonPool.length >= 2,
        status:
          !trust.normalizedItems.length
            ? "empty"
            : trust.hasEnoughData && trust.hasCredibleBest && comparisonPool.length >= 2
            ? "ready"
            : trust.hasEnoughData && comparisonPool.length >= 2
            ? "no_profitable"
            : "early",
      },
      best,
      comparison,
      items: comparisonPool.slice(0, 4),
    };
  }, [profitFactorByGrade]);

  const keyInsight = useMemo(() => {
    if (canRenderSetupBestInsights && canRenderSessionBestInsights && sessionEdgeInsight?.best && setupEdgeItems[0]) {
      const topSetup = setupEdgeItems[0];
      if (safeNumber(topSetup.pnl) > 0 && safeNumber(sessionEdgeInsight.best.pnl) > 0) {
        return `Your edge is strongest on ${topSetup.label} setups during ${sessionEdgeInsight.best.label}.`;
      }
    }

    if (disciplineComparison?.trust?.hasCredibleBest && disciplineComparison?.best && disciplineComparison?.comparison) {
      const pnlGap = safeNumber(disciplineComparison.best.pnl) - safeNumber(disciplineComparison.comparison.pnl);
      if (pnlGap > 0) {
        return `Grade ${disciplineComparison.best.label} trades are outperforming Grade ${disciplineComparison.comparison.label} by ${formatMoney(pnlGap)}.`;
      }
    }

    if (canRenderSetupBestInsights && setupEdgeItems[0]) {
      return `${setupEdgeItems[0].label} is currently your strongest tracked setup.`;
    }

    if (setupEdgeTrust.status === "no_profitable") {
      return "No clear edge yet — keep logging trades and TradeFlow will surface what’s actually working.";
    }

    return "Add a few more structured trades to unlock clearer edge insights.";
  }, [canRenderSessionBestInsights, canRenderSetupBestInsights, sessionEdgeInsight, disciplineComparison, setupEdgeItems, setupEdgeTrust]);

  const averageConfidence = useMemo(() => {
    if (!journalEntries.length) return 0;
    return Math.round(
      journalEntries.reduce((sum, entry) => sum + safeNumber(entry.confidence), 0) /
        journalEntries.length
    );
  }, [journalEntries]);

  const equityCurve = useMemo(() => {
    const buildSmoothPath = (inputPoints) => {
      if (inputPoints.length === 0) return "";
      if (inputPoints.length === 1) return `M ${inputPoints[0].x} ${inputPoints[0].y}`;

      let path = `M ${inputPoints[0].x} ${inputPoints[0].y}`;

      for (let index = 0; index < inputPoints.length - 1; index += 1) {
        const previous = inputPoints[index - 1] ?? inputPoints[index];
        const current = inputPoints[index];
        const next = inputPoints[index + 1];
        const afterNext = inputPoints[index + 2] ?? next;

        const controlPoint1X = current.x + (next.x - previous.x) / 18;
        const controlPoint1Y = current.y + (next.y - previous.y) / 18;
        const controlPoint2X = next.x - (afterNext.x - current.x) / 18;
        const controlPoint2Y = next.y - (afterNext.y - current.y) / 18;

        path += ` C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${next.x} ${next.y}`;
      }

      return path;
    };

    const resolveTimelineDate = (trade) => {
      const primaryDate = String(trade?.date ?? "").trim();
      if (primaryDate) {
        const primaryParsed = new Date(`${primaryDate}T00:00:00`);
        if (!Number.isNaN(primaryParsed.getTime())) {
          return {
            key: primaryDate,
            timestamp: primaryParsed.getTime(),
          };
        }
      }

      const createdAt = new Date(trade?.created_at || "");
      if (!Number.isNaN(createdAt.getTime())) {
        const createdKey = createdAt.toISOString().split("T")[0];
        return {
          key: createdKey,
          timestamp: new Date(`${createdKey}T00:00:00`).getTime(),
        };
      }

      const fallbackKey = today();
      return {
        key: fallbackKey,
        timestamp: new Date(`${fallbackKey}T00:00:00`).getTime(),
      };
    };

    const resolveCreatedAtDateKey = (trade) => {
      const createdAt = new Date(trade?.created_at || "");
      if (!Number.isNaN(createdAt.getTime())) {
        return createdAt.toISOString().split("T")[0];
      }

      return "";
    };

    const source = [...trades]
      .filter((trade) => Number.isFinite(Number(trade?.pnl)))
      .map((trade) => {
        const timelineDate = resolveTimelineDate(trade);
        const createdAtDate = resolveCreatedAtDateKey(trade);
        return {
          ...trade,
          timelineDate,
          createdAtDate,
        };
      })
      .sort((a, b) => {
        const dateDiff = a.timelineDate.timestamp - b.timelineDate.timestamp;
        if (dateDiff !== 0) return dateDiff;
        return new Date(a.created_at) - new Date(b.created_at);
      })
      .map((trade) => ({
        date: trade.timelineDate.key,
        labelDate: trade.timelineDate.key,
        createdAtDate: trade.createdAtDate,
        pnl: safeNumber(trade.pnl),
      }));

    if (!source.length) {
      return {
        linePath: "",
        areaPath: "",
        points: [],
        xAxisLabels: [],
        yAxisLabels: [],
      };
    }

    const uniqueTimelineDates = Array.from(new Set(source.map((trade) => trade.date).filter(Boolean)));
    const uniqueCreatedAtDates = Array.from(
      new Set(source.map((trade) => trade.createdAtDate).filter(Boolean))
    );
    const labelDateSource =
      uniqueTimelineDates.length > 1 || uniqueCreatedAtDates.length <= 1
        ? "timeline"
        : "createdAt";

    const dailySummaries = source.reduce((acc, trade) => {
      const summaryDate = labelDateSource === "createdAt" ? trade.createdAtDate || trade.date : trade.date;
      if (!summaryDate) return acc;

      if (!acc[summaryDate]) {
        acc[summaryDate] = {
          date: summaryDate,
          pnl: 0,
          trades: 0,
        };
      }

      acc[summaryDate].pnl += safeNumber(trade.pnl);
      acc[summaryDate].trades += 1;
      return acc;
    }, {});

    let running = 0;
    const cumulative = source.map((trade, index) => {
      running += safeNumber(trade.pnl);
      const effectiveLabelDate =
        labelDateSource === "createdAt" ? trade.createdAtDate || trade.date : trade.date;
      return {
        ...trade,
        effectiveLabelDate,
        dayPnl: safeNumber(dailySummaries[effectiveLabelDate]?.pnl),
        dayTrades: dailySummaries[effectiveLabelDate]?.trades ?? 0,
        equity: running,
        index,
      };
    });

    const values = cumulative.map((d) => d.equity);
    const min = Math.min(0, ...values);
    const max = Math.max(0, ...values);
    const range = Math.max(1, max - min);

    const W = 720;
    const H = 280;
    const LP = 18;
    const TP = 12;
    const BP = 30;
    const chartHeight = H - TP - BP;

    const valueToY = (value) => TP + chartHeight - ((value - min) / range) * chartHeight;

    const points = cumulative.map((item, i) => ({
      ...item,
      x: LP + (i / Math.max(cumulative.length - 1, 1)) * (W - LP * 2),
      y: valueToY(item.equity),
    }));

    const linePath = buildSmoothPath(points);
    const baselineY = H - BP;
    const areaPath = `${linePath} L ${points[points.length - 1].x} ${baselineY} L ${points[0].x} ${baselineY} Z`;
    const uniqueXAxisDates = Array.from(
      new Set(cumulative.map((trade) => trade.effectiveLabelDate).filter(Boolean))
    );
    const desiredLabelCount =
      uniqueXAxisDates.length <= 1 ? uniqueXAxisDates.length : Math.min(4, Math.max(2, uniqueXAxisDates.length));
    const labelIndexes = new Set(
      Array.from({ length: desiredLabelCount }, (_, index) =>
        Math.round((index * (uniqueXAxisDates.length - 1)) / Math.max(desiredLabelCount - 1, 1))
      )
    );
    const xAxisLabels = uniqueXAxisDates
      .filter((_, index) => labelIndexes.has(index))
      .map((date, index, items) => ({
        date,
        x:
          items.length === 1
            ? LP + (W - LP * 2) / 2
            : LP + (index / (items.length - 1)) * (W - LP * 2),
      }));
    const startingEquity = cumulative[0]?.equity ?? 0;
    const currentEquity = cumulative[cumulative.length - 1]?.equity ?? 0;
    const midpointEquity = startingEquity + (currentEquity - startingEquity) / 2;
    const yAxisLabels = [
      { key: "start", label: "Start", value: startingEquity, y: valueToY(startingEquity) },
      { key: "mid", label: "Mid", value: midpointEquity, y: valueToY(midpointEquity) },
      { key: "current", label: "Now", value: currentEquity, y: valueToY(currentEquity) },
    ].filter((item, index, items) =>
      items.findIndex((candidate) => Math.abs(candidate.y - item.y) < 18) === index
    );

    return { linePath, areaPath, points, xAxisLabels, yAxisLabels };
  }, [trades]);

  const handleEquityChartPointerMove = (event) => {
    if (!equityChartRef.current || !equityCurve.points.length) return;

    const bounds = equityChartRef.current.getBoundingClientRect();
    const relativeX = event.clientX - bounds.left;
    const svgX = (relativeX / bounds.width) * 720;

    const closestPoint = equityCurve.points.reduce((closest, candidate) => {
      if (!closest) return candidate;
      return Math.abs(candidate.x - svgX) < Math.abs(closest.x - svgX) ? candidate : closest;
    }, null);

    if (!closestPoint) return;

    setHoveredEquityPoint({
      ...closestPoint,
      tooltipX: (closestPoint.x / 720) * bounds.width,
      tooltipY: Math.max(18, (closestPoint.y / 280) * bounds.height),
      chartWidth: bounds.width,
      chartHeight: bounds.height,
    });
  };

  const handleEquityChartPointerLeave = () => {
    setHoveredEquityPoint(null);
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", sub: "overview", icon: LayoutDashboard },
    { id: "trades", label: "Trades", sub: "log + manage", icon: ClipboardCheck },
    { id: "analytics", label: "Analytics", sub: "performance", icon: BarChart3 },
    { id: "journal", label: "Journal", sub: "mindset + review", icon: BookOpen },
  ];
  const normalizedUserEmail = normalizeBetaEmail(user?.email);
  const isApprovedBetaUser = normalizedUserEmail
    ? ALLOWED_BETA_EMAILS.includes(normalizedUserEmail)
    : false;
  const isFirstTimeDashboard = trades.length === 0;

  useEffect(() => {
    if (authLoading || !user) return;

    console.log("BETA CHECK", {
      rawEmail: user?.email,
      normalizedEmail: normalizedUserEmail,
      allowlisted: ALLOWED_BETA_EMAILS.includes(normalizedUserEmail),
      allowedBetaEmails: ALLOWED_BETA_EMAILS,
      secondaryGate: null,
      isApprovedBetaUser,
    });
  }, [authLoading, user, normalizedUserEmail, isApprovedBetaUser]);

  if (authLoading) return null;
  if (!user) return <AuthScreen />;
  if (!isApprovedBetaUser) return <RestrictedAccessScreen email={user?.email ?? ""} />;

  return (
    <div className="min-h-screen bg-[#080600] text-[#fef3c7]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#080600]" />
        <div className="absolute left-[-10%] top-[-5%] h-[700px] w-[700px] rounded-full bg-[#f59e0b]/6 blur-[200px]" />
        <div className="absolute right-[-10%] bottom-[-5%] h-[600px] w-[600px] rounded-full bg-[#92400e]/6 blur-[200px]" />
      </div>

      <div className="relative min-h-screen font-['Satoshi']">
        <aside
          className={`fixed left-0 top-0 z-50 h-screen transition-all duration-300 ${
            sidebarExpanded ? "w-[286px]" : "w-[72px]"
          }`}
          onMouseEnter={() => setSidebarExpanded(true)}
          onMouseLeave={() => setSidebarExpanded(false)}
        >
          <div className="relative h-full">
            <div className="absolute left-0 top-0 h-full w-[72px] border-r border-white/6 bg-[#0d0a02]/95 backdrop-blur-3xl">
              <div className="flex h-full flex-col items-center px-2 py-4">
                <div className="mb-6 flex items-center justify-center">
                  <div className="group flex items-center justify-center w-14 h-14 rounded-2xl border border-amber-400/30 bg-[#070707] shadow-[0_0_10px_rgba(251,191,36,0.15)] transition-all duration-300 ease-out group-hover:shadow-[0_0_20px_rgba(251,191,36,0.35)] group-hover:border-amber-300/50">
                    <img
                      src={iconLogo}
                      alt="TradeFlow Icon"
                      className="w-9 h-9 object-contain bg-transparent brightness-110 transition-all duration-300 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3.5">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = activePage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActivePage(item.id)}
                        className={`flex h-10 w-10 items-center justify-center rounded-[14px] border transition-all duration-300 ${
                          active
                            ? "border-[#fbbf24]/24 bg-[#f59e0b]/12 text-[#fef3c7] shadow-[0_0_18px_rgba(251,191,36,0.16)]"
                            : "border-transparent text-white/40 hover:border-white/7 hover:bg-white/[0.04] hover:text-white/72"
                        }`}
                      >
                        <Icon size={16} />
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => supabase.auth.signOut()}
                  title="Sign out"
                  className="mt-auto flex h-10 w-10 items-center justify-center rounded-[14px] border border-white/7 bg-white/[0.03] text-white/38 transition-all duration-300 hover:border-red-400/18 hover:bg-red-500/10 hover:text-red-300"
                >
                  <LogOut size={15} />
                </button>
              </div>
            </div>

            <div
              className={`absolute left-[72px] top-0 h-full w-[214px] border-r border-white/6 bg-[linear-gradient(180deg,rgba(13,10,2,0.98),rgba(10,8,2,0.98))] backdrop-blur-3xl transition-all duration-300 ${
                sidebarExpanded ? "translate-x-0 opacity-100" : "pointer-events-none -translate-x-6 opacity-0"
              }`}
            >
              <div className="flex h-full flex-col px-4 py-4">
                <div className="relative overflow-hidden rounded-[18px] border border-white/6 bg-[linear-gradient(135deg,rgba(255,255,255,0.035),rgba(255,255,255,0.01))] px-4 py-4 shadow-[0_0_24px_rgba(251,191,36,0.06)]">
                  <div className="hud-divider absolute inset-x-0 top-0 rounded-t-[18px]" />
                  <div className="relative flex items-center gap-3.5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-amber-400/24 bg-[linear-gradient(135deg,rgba(12,10,6,0.96),rgba(8,7,4,0.9))] shadow-[0_0_18px_rgba(251,191,36,0.12)] backdrop-blur-2xl">
                      <img
                        src={iconLogo}
                        alt="TradeFlow Icon"
                        className="h-8 w-8 object-contain"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <img
                        src={tradeflowFullLogo}
                        alt="TradeFlow"
                        className="block h-8 w-full object-contain object-left"
                      />
                    </div>
                  </div>
                </div>

                <nav className="mt-6 space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = activePage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActivePage(item.id)}
                        className={`flex w-full items-center gap-3 rounded-[14px] border px-3.5 py-3 text-left transition-all duration-300 ${
                          active
                            ? "border-[#fbbf24]/20 bg-[linear-gradient(135deg,rgba(251,191,36,0.10),rgba(251,191,36,0.03))] shadow-[0_0_20px_rgba(251,191,36,0.09)]"
                            : "border-transparent text-white/54 hover:border-white/7 hover:bg-white/[0.03] hover:text-white/82"
                        }`}
                      >
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] ${
                            active ? "bg-[#f59e0b]/12 text-[#fef3c7]" : "bg-white/[0.04] text-white/54"
                          }`}
                        >
                          <Icon size={16} />
                        </div>
                        <div>
                          <div className="text-[14px] font-semibold text-white/88">{item.label}</div>
                          <div className="text-[11px] font-medium text-white/26">{item.sub}</div>
                        </div>
                      </button>
                    );
                  })}
                </nav>

                <div className="mt-auto rounded-[14px] border border-white/5 bg-white/[0.02] px-4 py-4">
                  <div className="hud-divider mb-3" />
                  <div className={L}>System</div>
                  <div className="mt-2 text-[12px] font-medium leading-6 text-white/36">
                    Fast logging first. Deeper analytics when you want them.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="relative ml-[72px] min-h-screen p-4 md:p-5">
          <div className="mx-auto max-w-[1280px]">
            {activePage === "dashboard" && (
              isFirstTimeDashboard ? (
                <div className="animate-fadeUp">
                  <div className="relative overflow-hidden rounded-[28px] border border-amber-400/12 bg-[linear-gradient(135deg,rgba(18,13,3,0.99),rgba(10,8,2,0.98))] px-6 py-8 shadow-[0_0_52px_rgba(251,191,36,0.07)] md:px-8 md:py-10">
                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute left-[10%] top-[-12%] h-[260px] w-[260px] rounded-full bg-[#f59e0b]/10 blur-[110px]" />
                      <div className="absolute right-[12%] top-[8%] h-[220px] w-[220px] rounded-full bg-[#fbbf24]/5 blur-[100px]" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.03),transparent_34%)]" />
                    </div>
                    <div className="hud-divider absolute inset-x-0 top-0" />

                    <div className="relative flex min-h-[560px] items-center justify-center">
                      <div className="w-full max-w-[720px] text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/14 bg-[#f59e0b]/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-200/82 shadow-[0_0_16px_rgba(251,191,36,0.08)]">
                          <Sparkles size={10} />
                          Private Beta
                        </div>

                        <h1 className="mt-6 text-[3.2rem] font-bold leading-[0.94] tracking-[-0.06em] text-white glow-soft md:text-[4rem]">
                          No trades yet.
                        </h1>

                        <p className="mx-auto mt-5 max-w-[560px] text-[15px] font-medium leading-[1.9] text-white/44">
                          Start by adding your first trade — this is where your journal, stats, and review flow begin.
                        </p>

                        <button
                          onClick={() => setActivePage("trades")}
                          className="group relative mt-8 inline-flex items-center justify-center gap-2 overflow-hidden rounded-[16px] border border-[#fbbf24]/18 bg-[linear-gradient(135deg,#d97706,#b45309)] px-6 py-4 text-[14px] font-bold text-white shadow-[0_0_28px_rgba(251,191,36,0.28)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_38px_rgba(251,191,36,0.42)]"
                        >
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                          <Plus size={15} className="relative" />
                          <span className="relative">Add your first trade</span>
                        </button>

                        <p className="mt-4 text-[13px] leading-relaxed text-white/34">
                          You can keep it simple at first and add advanced details later.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
              <div className="animate-fadeUp space-y-5">
                <div className="relative overflow-hidden rounded-[26px] border border-white/7 bg-[linear-gradient(135deg,rgba(18,13,3,0.99),rgba(10,8,2,0.98))] px-6 py-7 shadow-[0_0_50px_rgba(251,191,36,0.08)] md:px-8">
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-[8%] top-[-14%] h-[260px] w-[260px] rounded-full bg-[#f59e0b]/11 blur-[110px]" />
                    <div className="absolute right-[8%] top-[8%] h-[220px] w-[220px] rounded-full bg-[#fbbf24]/6 blur-[100px]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.03),transparent_30%)]" />
                  </div>
                  <div className="hud-divider absolute inset-x-0 top-0" />

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="max-w-3xl">
                      <div className="inline-flex items-center gap-2 rounded-full border border-[#fbbf24]/16 bg-[#f59e0b]/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#fde68a] shadow-[0_0_16px_rgba(251,191,36,0.10)]">
                        <Sparkles size={10} />
                        Performance Hub
                      </div>

                      <div className="mt-5">
                        <div className={L}>TradeFlow</div>
                        <h1 className="mt-2 text-[3.8rem] font-bold leading-[0.9] tracking-[-0.068em] text-white glow-strong">
                          Dashboard
                        </h1>
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="mt-3 space-y-1"
                        >
                          <p className="text-xs uppercase tracking-[0.25em] text-amber-400/60">
                            Execution Over Emotion.
                          </p>
                          <p className="text-xs text-white/40">
                            Journal faster. Review smarter.
                          </p>
                        </motion.div>
                      </div>

                      <p className="mt-5 max-w-xl text-[13px] font-medium leading-[1.8] text-white/44">
                        The default experience stays lightweight, but TradeFlow still captures deeper data when you choose to open advanced fields.
                      </p>

                      <div className="mt-6 flex flex-wrap gap-3">
                        {[
                          {
                            label: "Net P&L",
                            value: formatWholeMoney(stats.totalPnL),
                            color:
                              stats.totalPnL > 0
                                ? "text-emerald-300 glow-profit"
                                : stats.totalPnL < 0
                                ? "text-red-300 glow-loss"
                                : "text-white/80",
                          },
                          {
                            label: "Win Rate",
                            value: `${Math.round(stats.winRate)}%`,
                            color: "text-white/94",
                          },
                          {
                            label: "Profit Factor",
                            value: formatProfitFactor(stats.profitFactor),
                            color: "text-[#fcd34d] glow-gold",
                          },
                        ].map((s) => (
                          <div
                            key={s.label}
                            className="rounded-[16px] border border-white/7 bg-white/[0.035] px-5 py-3.5 backdrop-blur-xl"
                          >
                            <div className={L}>{s.label}</div>
                            <div
                              className={`hud-number mt-2 text-[1.5rem] font-bold leading-none tracking-[-0.055em] ${s.color}`}
                            >
                              {s.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setActivePage("trades")}
                      className="group relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-[16px] border border-[#fbbf24]/18 bg-[linear-gradient(135deg,#d97706,#b45309)] px-5 py-3.5 text-[13px] font-bold text-white shadow-[0_0_28px_rgba(251,191,36,0.32)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_38px_rgba(251,191,36,0.46)]"
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <Plus size={14} className="relative" />
                      <span className="relative">Add Trade</span>
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
                  <MiniStatCard
                    title="Net P&L"
                    value={formatWholeMoney(stats.totalPnL)}
                    sub="Realized result"
                    variant={stats.totalPnL > 0 ? "green" : stats.totalPnL < 0 ? "red" : "cream"}
                  />
                  <MiniStatCard
                    title="Win Rate"
                    value={`${Math.round(stats.winRate)}%`}
                    sub={`${stats.wins}W • ${stats.losses}L • ${stats.breakeven}BE`}
                    variant="cream"
                  />
                  <MiniStatCard
                    title="Profit Factor"
                    value={formatProfitFactor(stats.profitFactor)}
                    sub="Gross profit ÷ gross loss"
                    variant="gold"
                  />
                  <MiniStatCard
                    title="Avg Planned R:R"
                    value={stats.avgPlannedRR !== null ? `${stats.avgPlannedRR.toFixed(2)}R` : "—"}
                    sub={`Based on ${stats.avgPlannedRRTradeCount} trades`}
                    variant="gold"
                  />
                  <MiniStatCard
                    title="Execution Efficiency"
                    value={
                      stats.executionEfficiency !== null
                        ? formatPercentage(stats.executionEfficiency * 100)
                        : "—"
                    }
                    sub="Realized R vs planned R"
                    variant="cream"
                  />
                  <MiniStatCard
                    title="Confidence"
                    value={`${averageConfidence}/10`}
                    sub="From journal entries"
                    variant="cream"
                  />
                </div>

                <div className="grid gap-5 xl:grid-cols-[1.18fr_0.82fr]">
                  <PremiumShell>
                    <div className="p-6 md:p-7">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-[20px] font-bold tracking-[-0.04em] text-white glow-soft">
                            Daily P&L flow
                          </h2>
                        </div>

                        <div className="rounded-full border border-white/7 bg-white/[0.03] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/42">
                          {equityCurve.points.length} cumulative trades
                        </div>
                      </div>

                      <div
                        ref={equityChartRef}
                        onMouseMove={handleEquityChartPointerMove}
                        onMouseLeave={handleEquityChartPointerLeave}
                        className="relative mt-6 rounded-[18px] border border-white/6 bg-[linear-gradient(135deg,rgba(255,255,255,0.025),rgba(255,255,255,0.008))] p-4"
                      >
                        {equityCurve.points.length === 0 ? (
                          <div className={`flex h-[280px] items-center justify-center text-sm font-medium ${textMuted}`}>
                            No equity data yet.
                          </div>
                        ) : (
                          <>
                            <svg viewBox="0 0 720 280" className="h-[280px] w-full">
                              <defs>
                                <linearGradient id="equityFill" x1="0" x2="0" y1="0" y2="1">
                                  <stop offset="0%" stopColor="rgba(251,191,36,0.14)" />
                                  <stop offset="55%" stopColor="rgba(251,191,36,0.05)" />
                                  <stop offset="100%" stopColor="rgba(251,191,36,0)" />
                                </linearGradient>
                                <linearGradient id="equityAreaMaskGradient" x1="0" x2="1" y1="0" y2="0">
                                  <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
                                  <stop offset="12%" stopColor="rgba(255,255,255,0.58)" />
                                  <stop offset="24%" stopColor="rgba(255,255,255,0.82)" />
                                  <stop offset="100%" stopColor="rgba(255,255,255,1)" />
                                </linearGradient>
                                <mask id="equityAreaMask">
                                  <rect x="0" y="0" width="720" height="280" fill="url(#equityAreaMaskGradient)" />
                                </mask>
                              </defs>

                              {equityCurve.yAxisLabels.map((item) => (
                                <g key={item.key}>
                                  <line
                                    x1="18"
                                    x2="702"
                                    y1={item.y}
                                    y2={item.y}
                                    stroke="rgba(255,255,255,0.035)"
                                    strokeWidth="1"
                                  />
                                  <text
                                    x="14"
                                    y={item.y + 3}
                                    textAnchor="start"
                                    fontSize="9"
                                    fill="rgba(255,255,255,0.3)"
                                    style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
                                  >
                                    {formatAxisMoney(item.value)}
                                  </text>
                                </g>
                              ))}
                              <path d={equityCurve.areaPath} fill="url(#equityFill)" mask="url(#equityAreaMask)" />
                              <path
                                d={equityCurve.linePath}
                                fill="none"
                                stroke="rgba(251,191,36,0.22)"
                                strokeWidth="5.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ filter: "drop-shadow(0 0 10px rgba(251,191,36,0.16))" }}
                              />
                              <path
                                d={equityCurve.linePath}
                                fill="none"
                                stroke="#fbbf24"
                                strokeWidth="2.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ filter: "drop-shadow(0 0 4px rgba(251,191,36,0.16))" }}
                              />

                              {equityCurve.points.length > 0 && (
                                <g>
                                  <circle
                                    cx={equityCurve.points[0].x}
                                    cy={equityCurve.points[0].y}
                                    r="4.5"
                                    fill="rgba(251,191,36,0.06)"
                                    style={{ filter: "blur(2px)" }}
                                  />
                                  <circle
                                    cx={equityCurve.points[0].x}
                                    cy={equityCurve.points[0].y}
                                    r="2.9"
                                    fill="rgba(252,211,77,0.82)"
                                  />
                                  <circle
                                    cx={equityCurve.points[equityCurve.points.length - 1].x}
                                    cy={equityCurve.points[equityCurve.points.length - 1].y}
                                    r="7"
                                    fill="rgba(251,191,36,0.08)"
                                    style={{ filter: "blur(3px)" }}
                                  />
                                  <circle
                                    cx={equityCurve.points[equityCurve.points.length - 1].x}
                                    cy={equityCurve.points[equityCurve.points.length - 1].y}
                                    r="3.8"
                                    fill="#fcd34d"
                                    style={{ filter: "drop-shadow(0 0 4px rgba(251,191,36,0.2))" }}
                                  />
                                </g>
                              )}

                              {equityCurve.xAxisLabels.map((label) => (
                                <text
                                  key={label.date}
                                  x={label.x}
                                  y="262"
                                  textAnchor="middle"
                                  fontSize="10"
                                  fill="rgba(255,255,255,0.34)"
                                >
                                  {new Date(`${label.date}T00:00:00`).toLocaleDateString(undefined, {
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </text>
                              ))}
                            </svg>

                            <AnimatePresence>
                              {hoveredEquityPoint && (
                                (() => {
                                  const equityTone = getTooltipValueTone(hoveredEquityPoint.equity, "soft");
                                  const dayPnlTone = getTooltipValueTone(hoveredEquityPoint.dayPnl, "soft");
                                  const equityPulse = getTooltipValuePulse(hoveredEquityPoint.equity, {
                                    neutralTone: "soft",
                                  });
                                  const dayPnlPulse = getTooltipValuePulse(hoveredEquityPoint.dayPnl, {
                                    subtle: true,
                                    neutralTone: "soft",
                                  });

                                  return (
                                    <motion.div
                                      key={`${hoveredEquityPoint.effectiveLabelDate}-${hoveredEquityPoint.index}`}
                                      initial={{ opacity: 0, y: 8 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: 6 }}
                                      transition={{ duration: 0.18, ease: "easeOut" }}
                                      className="pointer-events-none absolute z-20 w-[208px] rounded-[18px] border border-amber-400/12 bg-[linear-gradient(180deg,rgba(18,14,8,0.96),rgba(10,9,8,0.94))] px-4 py-3 text-left shadow-[0_14px_30px_rgba(0,0,0,0.30)] backdrop-blur-xl"
                                      style={{
                                        left: `${Math.min(
                                          Math.max(hoveredEquityPoint.tooltipX - 104, 10),
                                          Math.max((hoveredEquityPoint.chartWidth ?? 0) - 218, 10)
                                        )}px`,
                                        top: `${Math.max(hoveredEquityPoint.tooltipY - 98, 10)}px`,
                                      }}
                                    >
                                      <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)]" />

                                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/42">
                                        {new Date(`${hoveredEquityPoint.effectiveLabelDate}T00:00:00`).toLocaleDateString(
                                          undefined,
                                          {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                          }
                                        )}
                                      </div>

                                      <motion.div
                                        className={`mt-2 font-sans text-[26px] font-semibold leading-none tracking-[-0.04em] ${equityTone.className}`}
                                        style={equityTone.style}
                                        animate={equityPulse.animate}
                                        transition={{
                                          duration: 1.6,
                                          ease: "easeInOut",
                                          repeat: Infinity,
                                        }}
                                      >
                                        {formatWholeMoney(hoveredEquityPoint.equity)}
                                      </motion.div>

                                      <div className="mt-2.5 grid grid-cols-2 gap-4 border-t border-white/6 pt-2.5">
                                        <div>
                                          <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/24">
                                            Daily P&L
                                          </div>
                                          <motion.div
                                            className={`mt-1 font-sans text-[13px] font-medium tracking-[-0.02em] ${dayPnlTone.className}`}
                                            style={dayPnlTone.style}
                                            animate={dayPnlPulse.animate}
                                            transition={{
                                              duration: 1.7,
                                              ease: "easeInOut",
                                              repeat: Infinity,
                                            }}
                                          >
                                            {formatMoney(hoveredEquityPoint.dayPnl)}
                                          </motion.div>
                                        </div>
                                        <div>
                                          <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/24">
                                            Trades
                                          </div>
                                          <div className="mt-1 font-sans text-[13px] font-medium tracking-[-0.02em] text-white/72">
                                            {hoveredEquityPoint.dayTrades}
                                          </div>
                                        </div>
                                      </div>
                                    </motion.div>
                                  );
                                })()
                              )}
                            </AnimatePresence>
                          </>
                        )}
                      </div>
                    </div>
                  </PremiumShell>

                  <div className="grid gap-5">
                    <PremiumShell>
                      <div className="p-5 md:p-6">
                        <div className={L}>Active Streak</div>
                        <div className="mt-3 flex items-end gap-2">
                          <div className="hud-number text-[2.5rem] font-bold leading-none text-white/96 glow-soft">
                            {stats.activeWinStreak > 0
                              ? `${stats.activeWinStreak}W`
                              : stats.activeLossStreak > 0
                              ? `${stats.activeLossStreak}L`
                              : "—"}
                          </div>
                        </div>
                        <div className="hud-divider my-4" />
                        <div className="text-[12px] font-medium text-white/38">
                          {stats.activeWinStreak > 0
                            ? "Current winning streak"
                            : stats.activeLossStreak > 0
                            ? "Current losing streak"
                            : "No active streak yet"}
                        </div>
                      </div>
                    </PremiumShell>

                    <PremiumShell>
                      <div className="p-5 md:p-6">
                        <div className={L}>Best Win Streak</div>
                        <div className="hud-number mt-3 text-[2.4rem] font-bold leading-none text-emerald-300 glow-profit">
                          {stats.bestWinStreak}
                        </div>
                        <div className="hud-divider my-4" />
                        <div className="text-[12px] font-medium text-white/38">
                          Strongest positive sequence
                        </div>
                      </div>
                    </PremiumShell>

                    <PremiumShell>
                      <div className="p-5 md:p-6">
                        <div className={L}>Worst Loss Streak</div>
                        <div className="hud-number mt-3 text-[2.4rem] font-bold leading-none text-red-300 glow-loss">
                          {stats.worstLossStreak}
                        </div>
                        <div className="hud-divider my-4" />
                        <div className="text-[12px] font-medium text-white/38">
                          Helps spot execution slippage
                        </div>
                      </div>
                    </PremiumShell>
                  </div>
	                </div>
	              </div>
                )
	            )}

            {activePage === "trades" && (
              <div className="animate-fadeUp space-y-5">
                <div className="relative overflow-hidden rounded-[26px] border border-[#fbbf24]/12 bg-[linear-gradient(135deg,rgba(18,13,3,0.99),rgba(10,8,2,0.98))] px-6 py-8 md:px-8" style={{ boxShadow: "0 0 60px rgba(251,191,36,0.07), 0 0 0 1px rgba(251,191,36,0.05)" }}>
  <div className="hud-divider absolute inset-x-0 top-0" />
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute left-[-5%] top-[-20%] h-[300px] w-[300px] rounded-full bg-[#f59e0b]/14 blur-[120px]" />
    <div className="absolute left-[35%] top-[-10%] h-[200px] w-[200px] rounded-full bg-[#d97706]/10 blur-[100px]" />
    <div className="absolute right-[-5%] top-[-10%] h-[280px] w-[280px] rounded-full bg-[#92400e]/10 blur-[120px]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.04),transparent_40%)]" />
  </div>

  <div className="relative flex items-center justify-between gap-6">
    <div>
      <div className="inline-flex items-center gap-2 rounded-full border border-[#fbbf24]/18 bg-[#f59e0b]/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#fde68a] shadow-[0_0_16px_rgba(251,191,36,0.10)]">
        <ClipboardCheck size={10} />Trade Logger
      </div>

      <h1 className="mt-4 text-[3rem] font-extrabold tracking-[-0.055em] text-white glow-soft">Trades</h1>

      <div className="mt-3 flex items-center gap-2.5">
        <div className="luxury-pulse h-2 w-2 rounded-full bg-[#fbbf24] shadow-[0_0_14px_rgba(251,191,36,0.9)]" />
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#fcd34d]">Fast log by default.</div>
      </div>

      <p className={`mt-4 max-w-xl text-[13px] font-medium leading-[1.8] ${textBody}`}>
        Log any trade in seconds. Open advanced fields when you want R:R, session, grade, and deeper analytics.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => openBrokerModal("connect")}
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-[14px] border border-[#fbbf24]/20 bg-[linear-gradient(135deg,#d97706,#b45309)] px-4 py-3 text-[12px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_0_26px_rgba(251,191,36,0.20)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_36px_rgba(251,191,36,0.32)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <Link2 size={14} className="relative" />
          <span className="relative">Connect Broker</span>
        </button>

        <button
          type="button"
          onClick={() => openBrokerModal("import")}
          className="rounded-[14px] border border-white/8 bg-white/[0.03] px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/68 transition-all duration-300 hover:border-white/12 hover:text-white/88"
        >
          Import Trades
        </button>
      </div>
    </div>

    <div className="hidden shrink-0 xl:block xl:w-[320px]">
  <div className="grid grid-cols-2 gap-3">
    {[
      { label: "Total Trades", value: stats.totalTrades, color: "text-white/90" },
      { label: "Win Rate", value: `${Math.round(stats.winRate)}%`, color: "text-[#fcd34d]" },
      {
        label: "Net P&L",
        value: formatWholeMoney(stats.totalPnL),
        color: stats.totalPnL > 0 ? "text-emerald-300" : stats.totalPnL < 0 ? "text-red-300" : "text-white/80",
      },
      { label: "Profit Factor", value: formatProfitFactor(stats.profitFactor), color: "text-[#fcd34d]" },
      { label: "Best Streak", value: `${stats.bestWinStreak}W`, color: "text-emerald-300" },
      { label: "Worst Streak", value: `${stats.worstLossStreak}L`, color: "text-red-300" },
    ].map((s) => (
      <div key={s.label} className="rounded-[14px] border border-[#fbbf24]/10 bg-[#f59e0b]/5 px-4 py-3.5">
        <div className="hud-label">{s.label}</div>
        <div className={`hud-number mt-2 text-[1.25rem] font-bold leading-none ${s.color}`}>{s.value}</div>
      </div>
    ))}
  </div>
</div>
  </div>
</div>

                <div className="space-y-5">
                  <PremiumShell>
                    <div className="p-6 md:p-7">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h2 className="text-[20px] font-bold tracking-tight text-white">
                            {editingTradeId ? "Edit Trade" : "Add Trade"}
                          </h2>
                          <p className={`mt-1 text-[12px] font-medium ${textMuted}`}>
                            {editingTradeId
                              ? "Update the trade details and save."
                              : "Log your execution clearly in seconds."}
                          </p>
                        </div>

                        <div className="rounded-[14px] border border-white/6 bg-white/[0.025] px-4 py-3.5">
                          <div className={L}>Total Trades</div>
                          <div className="hud-number mt-1.5 text-[18px] font-bold text-white/88">
                            {stats.totalTrades}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <div className={L}>Date</div>
                            <input
                              type="date"
                              value={tradeForm.date}
                              onChange={(e) => handleTradeChange("date", e.target.value)}
                              className={inputCls}
                            />
                          </div>

                          <div className="space-y-2">
                            <div className={L}>Pair</div>
                            <input
                              type="text"
                              value={tradeForm.pair}
                              onChange={(e) => handleTradeChange("pair", e.target.value)}
                              className={inputCls}
                              placeholder="NQ"
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 xl:grid-cols-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <div className={L}>Setup Category</div>
                            </div>
                            <select
                              value={isValidSetupCategory(tradeForm.setup) ? tradeForm.setup : tradeForm.setup ? tradeForm.setup : ""}
                              onChange={(e) => handleTradeChange("setup", e.target.value)}
                              className={inputCls}
                            >
                              <option value="">Choose category</option>
                              {tradeForm.setup && !isValidSetupCategory(tradeForm.setup) ? (
                                <option value={tradeForm.setup}>Legacy: {tradeForm.setup}</option>
                              ) : null}
                              {SETUP_CATEGORIES.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <div className={L}>Entry Trigger</div>
                              <button
                                type="button"
                                onClick={() =>
                                  setCustomOptionPanelField((prev) => (prev === "entryTrigger" ? "" : "entryTrigger"))
                                }
                                className="text-[11px] font-semibold text-white/42 transition-colors hover:text-white/70"
                              >
                                Custom
                              </button>
                            </div>
                            <select
                              value={tradeForm.entryTrigger}
                              onChange={(e) => handleManagedTradeFieldChange("entryTrigger", e.target.value)}
                              className={inputCls}
                            >
                              <option value="">Choose trigger</option>
                              {tradeForm.entryTrigger &&
                              !getManagedTradeOptions("entryTrigger").some(
                                (option) => option.toLowerCase() === tradeForm.entryTrigger.toLowerCase()
                              ) ? (
                                <option value={tradeForm.entryTrigger}>Current: {tradeForm.entryTrigger}</option>
                              ) : null}
                              {getManagedTradeOptions("entryTrigger").map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                              <option value="__create__">+ Create new option</option>
                            </select>

                            {renderManagedOptionPanel("entryTrigger", "Create custom trigger")}
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <div className={L}>Target Type</div>
                              <button
                                type="button"
                                onClick={() =>
                                  setCustomOptionPanelField((prev) => (prev === "targetPlan" ? "" : "targetPlan"))
                                }
                                className="text-[11px] font-semibold text-white/42 transition-colors hover:text-white/70"
                              >
                                Custom
                              </button>
                            </div>
                            <select
                              value={tradeForm.targetPlan}
                              onChange={(e) => handleManagedTradeFieldChange("targetPlan", e.target.value)}
                              className={inputCls}
                            >
                              <option value="">Choose target</option>
                              {tradeForm.targetPlan &&
                              !getManagedTradeOptions("targetPlan").some(
                                (option) => option.toLowerCase() === tradeForm.targetPlan.toLowerCase()
                              ) ? (
                                <option value={tradeForm.targetPlan}>Current: {tradeForm.targetPlan}</option>
                              ) : null}
                              {getManagedTradeOptions("targetPlan").map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                              <option value="__create__">+ Create new option</option>
                            </select>

                            {renderManagedOptionPanel("targetPlan", "Create custom target type")}
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <div className={L}>Confluences</div>
                              <button
                                type="button"
                                onClick={() =>
                                  setCustomOptionPanelField((prev) => (prev === "confluences" ? "" : "confluences"))
                                }
                                className="text-[11px] font-semibold text-white/42 transition-colors hover:text-white/70"
                              >
                                Custom
                              </button>
                            </div>

                            <select
                              value=""
                              onChange={(e) => handleManagedTradeFieldChange("confluences", e.target.value)}
                              className={inputCls}
                            >
                              <option value="">
                                {normalizeTradeConfluences(tradeForm.confluences).length >= 10
                                  ? "Max 10 confluences selected"
                                  : "Add confluence"}
                              </option>
                              {getManagedTradeOptions("confluences")
                                .filter(
                                  (option) =>
                                    !normalizeTradeConfluences(tradeForm.confluences).some(
                                      (selectedOption) =>
                                        selectedOption.toLowerCase() === option.toLowerCase()
                                    )
                                )
                                .map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              {normalizeTradeConfluences(tradeForm.confluences).length < 10 ? (
                                <option value="__create__">+ Create new option</option>
                              ) : null}
                            </select>

                            <div className="rounded-[14px] border border-white/6 bg-white/[0.02] px-3 py-3">
                              {normalizeTradeConfluences(tradeForm.confluences).length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                  {normalizeTradeConfluences(tradeForm.confluences).map((option) => (
                                    <div
                                      key={option}
                                      className="inline-flex items-center gap-2 rounded-full border border-[#fbbf24]/16 bg-[#f59e0b]/10 px-3 py-1.5 text-[11px] font-medium text-[#fde68a]"
                                    >
                                      <span>{option}</span>
                                      <button
                                        type="button"
                                        onClick={() => removeConfluenceFromTradeForm(option)}
                                        className="text-[#fde68a]/70 transition-colors hover:text-[#fff4c2]"
                                        aria-label={`Remove ${option}`}
                                      >
                                        <X size={12} />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-[12px] font-medium text-white/36">
                                  Add at least 1 confluence. You can select up to 10.
                                </div>
                              )}
                            </div>

                            {renderManagedOptionPanel("confluences", "Create custom confluence")}
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                          <div className="space-y-2">
                            <div className={L}>Direction</div>
                            <div className="flex gap-2">
                              <QuickSelectButton
                                active={tradeForm.direction === "Long"}
                                onClick={() => handleTradeChange("direction", "Long")}
                              >
                                Long
                              </QuickSelectButton>
                              <QuickSelectButton
                                active={tradeForm.direction === "Short"}
                                onClick={() => handleTradeChange("direction", "Short")}
                              >
                                Short
                              </QuickSelectButton>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className={L}>P&L</div>
                            <input
                              type="number"
                              step="any"
                              value={tradeForm.pnl}
                              onChange={(e) => handleTradeChange("pnl", e.target.value)}
                              className={inputCls}
                              placeholder="250"
                            />
                          </div>

                          <div className="space-y-2">
                            <div className={L}>Session</div>
                            <select
                              value={tradeForm.session}
                              onChange={(e) => handleTradeChange("session", e.target.value)}
                              className={inputCls}
                            >
                              <option value="NY Open">NY Open</option>
                              <option value="London">London</option>
                              <option value="Asia">Asia</option>
                              <option value="NY Lunch">NY Lunch</option>
                              <option value="PM Session">PM Session</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className={L}>Notes</div>
                          <textarea
                            rows={4}
                            value={tradeForm.notes}
                            onChange={(e) => handleTradeChange("notes", e.target.value)}
                            className={textAreaCls}
                            placeholder="Why did you take it? How did you execute? What should you improve?"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className={L}>Screenshot</div>
                          <div
                            onDrop={handleScreenshotDrop}
                            onDragOver={handleScreenshotDragOver}
                            onDragLeave={handleScreenshotDragLeave}
                            className={`relative rounded-[18px] border border-dashed p-4 transition-all duration-300 ${
                              isDraggingScreenshot
                                ? "border-[#fbbf24]/35 bg-[#f59e0b]/8"
                                : "border-white/10 bg-white/[0.025]"
                            }`}
                          >
                            {!tradeForm.screenshot ? (
                              <div className="flex flex-col items-center justify-center gap-3 py-6 text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-[16px] border border-white/8 bg-white/[0.04]">
                                  <Upload size={18} className="text-white/50" />
                                </div>
                                <div>
                                  <div className="text-[13px] font-semibold text-white/78">
                                    Drag and drop your trade screenshot
                                  </div>
                                  <div className="mt-1 text-[12px] font-medium text-white/32">
                                    Or upload manually
                                  </div>
                                </div>
                                <label className="cursor-pointer rounded-[12px] border border-white/8 bg-white/[0.03] px-3.5 py-2 text-[12px] font-semibold text-white/66 transition-all hover:border-white/12 hover:text-white/88">
                                  Choose image
                                  <input
                                    ref={screenshotInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleScreenshotUpload}
                                    className="hidden"
                                  />
                                </label>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                <div className="overflow-hidden rounded-[16px] border border-white/8">
                                  <img
                                    src={tradeForm.screenshot}
                                    alt="Trade screenshot preview"
                                    className="max-h-[320px] w-full object-cover"
                                  />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setPreviewImage(tradeForm.screenshot)}
                                    className="rounded-[12px] border border-white/8 bg-white/[0.03] px-3.5 py-2 text-[12px] font-semibold text-white/66 transition-all hover:border-white/12 hover:text-white/88"
                                  >
                                    Preview
                                  </button>
                                  <label className="cursor-pointer rounded-[12px] border border-white/8 bg-white/[0.03] px-3.5 py-2 text-[12px] font-semibold text-white/66 transition-all hover:border-white/12 hover:text-white/88">
                                    Replace
                                    <input
                                      ref={screenshotInputRef}
                                      type="file"
                                      accept="image/*"
                                      onChange={handleScreenshotUpload}
                                      className="hidden"
                                    />
                                  </label>
                                  <button
                                    type="button"
                                    onClick={removeScreenshot}
                                    className="rounded-[12px] border border-red-400/16 bg-red-500/8 px-3.5 py-2 text-[12px] font-semibold text-red-300 transition-all hover:border-red-400/25"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="rounded-[18px] border border-white/6 bg-white/[0.02]">
                          <button
                            type="button"
                            onClick={() => setShowAdvancedTradeFields((prev) => !prev)}
                            className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition-all hover:bg-white/[0.02]"
                          >
                            <div>
                              <div className={L}>Advanced</div>
                              <div className="mt-1 text-[12px] font-medium text-white/38">
                                Optional fields for deeper analytics and auto R:R
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              {(plannedRR || realizedR) && (
                                <div className="rounded-full border border-[#fbbf24]/18 bg-[#f59e0b]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#fde68a]">
                                  Smart metrics active
                                </div>
                              )}
                              {showAdvancedTradeFields ? (
                                <ChevronDown size={16} className="text-white/38" />
                              ) : (
                                <ChevronRight size={16} className="text-white/38" />
                              )}
                            </div>
                          </button>

                          {showAdvancedTradeFields && (
                            <div className="border-t border-white/6 px-4 py-4">
                              <div className="grid gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                  <div className={L}>Entry</div>
                                  <input
                                    type="number"
                                    step="any"
                                    value={tradeForm.entry}
                                    onChange={(e) => handleTradeChange("entry", e.target.value)}
                                    className={inputCls}
                                    placeholder="21345.25"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <div className={L}>Stop Loss</div>
                                  <input
                                    type="number"
                                    step="any"
                                    value={tradeForm.stopLoss}
                                    onChange={(e) => handleTradeChange("stopLoss", e.target.value)}
                                    className={inputCls}
                                    placeholder="21325.25"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <div className={L}>Take Profit</div>
                                  <input
                                    type="number"
                                    step="any"
                                    value={tradeForm.takeProfit}
                                    onChange={(e) => handleTradeChange("takeProfit", e.target.value)}
                                    className={inputCls}
                                    placeholder="21395.25"
                                  />
                                </div>
                              </div>

                              <div className="mt-4 grid gap-4 md:grid-cols-4">
                                <div className="space-y-2">
                                  <div className={L}>Exit Price</div>
                                  <input
                                    type="number"
                                    step="any"
                                    value={tradeForm.exitPrice}
                                    onChange={(e) => handleTradeChange("exitPrice", e.target.value)}
                                    className={inputCls}
                                    placeholder="Optional"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <div className={L}>Size</div>
                                  <input
                                    type="number"
                                    step="any"
                                    value={tradeForm.size}
                                    onChange={(e) => handleTradeChange("size", e.target.value)}
                                    className={inputCls}
                                    placeholder="2"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <div className={L}>Entry Time</div>
                                  <input
                                    type="time"
                                    value={tradeForm.entryTime}
                                    onChange={(e) => handleTradeChange("entryTime", e.target.value)}
                                    className={inputCls}
                                  />
                                </div>

                                <div className="space-y-2">
                                  <div className={L}>Exit Time</div>
                                  <input
                                    type="time"
                                    value={tradeForm.exitTime}
                                    onChange={(e) => handleTradeChange("exitTime", e.target.value)}
                                    className={inputCls}
                                  />
                                </div>
                              </div>

                              <div className="mt-4 grid gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                  <div className={L}>Execution Grade</div>
                                  <select
                                    value={tradeForm.executionGrade}
                                    onChange={(e) => handleTradeChange("executionGrade", e.target.value)}
                                    className={inputCls}
                                  >
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                  </select>
                                </div>

                                <div className="rounded-[14px] border border-white/6 bg-white/[0.02] px-4 py-3">
                                  <div className={L}>Planned R:R</div>
                                  <div className="hud-number mt-2 text-[1.35rem] font-bold text-[#fcd34d] glow-gold">
                                    {formatRMultiple(plannedRR)}
                                  </div>
                                </div>

                                <div className="rounded-[14px] border border-white/6 bg-white/[0.02] px-4 py-3">
                                  <div className={L}>Realized R</div>
                                  <div className="hud-number mt-2 text-[1.35rem] font-bold text-[#fcd34d] glow-gold">
                                    {formatRMultiple(realizedR)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-3 pt-2">
                          <button
                            type="button"
                            onClick={editingTradeId ? updateTrade : addTrade}
                            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-[14px] border border-[#fbbf24]/20 bg-[linear-gradient(135deg,#d97706,#b45309)] px-5 py-3 text-[13px] font-bold text-white shadow-[0_0_28px_rgba(251,191,36,0.24)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_38px_rgba(251,191,36,0.34)]"
                          >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <span className="relative flex items-center gap-2">
                              {editingTradeId ? <Pencil size={14} /> : <Plus size={14} />}
                              {editingTradeId ? "Update Trade" : "Save Trade"}
                            </span>
                          </button>

                          {editingTradeId && (
                            <button
                              type="button"
                              onClick={resetTradeForm}
                              className="rounded-[14px] border border-white/8 bg-white/[0.03] px-5 py-3 text-[13px] font-semibold text-white/62 transition-all hover:border-white/12 hover:text-white/88"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </PremiumShell>

                  <div className="grid gap-5">
                    <PremiumShell>
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-[20px] font-bold tracking-[-0.04em] text-white">
                              {latestExistingImportBatch ? "Smart CSV Sync Ready" : "CSV sync center"}
                            </h3>
                          </div>
                          <CloudUpload size={16} className="text-white/32" />
                        </div>

                        {syncFeedback ? (
                          <div className="mt-4 rounded-[14px] border border-[#fbbf24]/14 bg-[#f59e0b]/8 px-4 py-3 text-[12px] font-semibold text-[#fde68a]">
                            {syncFeedback}
                          </div>
                        ) : null}

                        {latestExistingImportBatch ? (
                          <div className="mt-5 rounded-[18px] border border-[#fbbf24]/12 bg-[linear-gradient(135deg,rgba(251,191,36,0.08),rgba(255,255,255,0.015))] p-4">
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#fbbf24]/16 bg-[#f59e0b]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#fde68a]">
                              Smart CSV Sync
                            </div>
                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                              <div className="rounded-[14px] border border-white/6 bg-white/[0.02] p-3">
                                <div className={L}>Last Source</div>
                                <div className="mt-2 text-[14px] font-semibold text-white/84">
                                  {latestExistingImportBatch.sourceName}
                                </div>
                              </div>
                              <div className="rounded-[14px] border border-white/6 bg-white/[0.02] p-3">
                                <div className={L}>Last Sync</div>
                                <div className="mt-2 text-[14px] font-semibold text-white/84">
                                  {latestExistingImportBatch.lastSync
                                    ? new Date(latestExistingImportBatch.lastSync).toLocaleString()
                                    : "—"}
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 rounded-[14px] border border-white/6 bg-white/[0.02] p-3">
                              <div className={L}>Last File</div>
                              <div className="mt-2 text-[13px] font-semibold text-white/84">
                                {latestExistingImportBatch.fileName || "Imported CSV"}
                              </div>
                              <div className="mt-1 text-[11px] font-medium text-white/38">
                                Synced {latestExistingImportBatch.syncedCount} new trades
                                {latestExistingImportBatch.duplicatesSkipped
                                  ? ` • Skipped ${latestExistingImportBatch.duplicatesSkipped} duplicates`
                                  : ""}
                              </div>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => handleEnterLatestImportReview(latestExistingImportBatch)}
                                disabled={!latestExistingImportBatch?.tradeIds?.length}
                                className="rounded-[12px] border border-white/8 bg-white/[0.03] px-3.5 py-2 text-[12px] font-semibold text-white/68 transition-all hover:border-white/12 hover:text-white/88 disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                Review Last Import
                              </button>
                              <button
                                type="button"
                                onClick={() => openBrokerModal("import")}
                                className="inline-flex items-center gap-2 rounded-[12px] border border-[#fbbf24]/20 bg-[#f59e0b]/10 px-3.5 py-2 text-[12px] font-semibold text-[#fde68a] transition-all hover:border-[#fbbf24]/28 hover:bg-[#f59e0b]/14"
                              >
                                <RefreshCw size={13} />
                                Sync Another File
                              </button>
                              <button
                                type="button"
                                onClick={() => setShowDeleteLastSyncConfirm(true)}
                                disabled={!latestExistingImportBatch.tradeIds?.length}
                                className="rounded-[12px] border border-red-400/16 bg-red-500/8 px-3.5 py-2 text-[12px] font-semibold text-red-300 shadow-[0_0_18px_rgba(248,113,113,0.06)] transition-all hover:border-red-400/24 hover:shadow-[0_0_24px_rgba(248,113,113,0.10)] disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                Delete Last Sync
                              </button>
                              <button
                                type="button"
                                onClick={() => setShowClearImportedConfirm(true)}
                                className="rounded-[12px] border border-red-400/16 bg-[linear-gradient(135deg,rgba(127,29,29,0.40),rgba(153,27,27,0.20))] px-3.5 py-2 text-[12px] font-semibold text-red-200 shadow-[0_0_18px_rgba(248,113,113,0.06)] transition-all hover:border-red-400/24 hover:shadow-[0_0_24px_rgba(248,113,113,0.10)]"
                              >
                                Clear All Imported Trades
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-5 rounded-[18px] border border-white/6 bg-white/[0.02] p-4">
                            <div className="text-[13px] font-medium leading-7 text-white/42">
                              Turn broker exports into a fast sync workflow. TradeFlow recognizes common CSV formats and keeps analytics live after every import.
                            </div>
                            <div className="mt-3 text-[11px] font-medium text-white/34">
                              {rememberedImportFormat
                                ? `Last recognized source this session: ${rememberedImportFormat.sourceName}`
                                : "No sync source recognized yet."}
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => openBrokerModal("import")}
                                className="inline-flex items-center gap-2 rounded-[12px] border border-[#fbbf24]/20 bg-[#f59e0b]/10 px-3.5 py-2 text-[12px] font-semibold text-[#fde68a] transition-all hover:border-[#fbbf24]/28 hover:bg-[#f59e0b]/14"
                              >
                                <CloudUpload size={13} />
                                Sync Trades
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </PremiumShell>

                    <PremiumShell>
                      <div className="p-6">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <h3 className="text-[20px] font-bold tracking-[-0.04em] text-white">
                              Clean at a glance
                            </h3>
                          </div>
                          <Activity size={16} className="text-white/32" />
                        </div>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                          <div className="rounded-[16px] border border-white/6 bg-white/[0.02] p-4">
                            <div className={L}>Trade Structure</div>
                            <div className="mt-2 text-[15px] font-semibold text-white/88">
                              {tradeForm.entryTrigger || tradeForm.setup || "—"}
                            </div>
                            <div className="mt-1 text-[11px] font-medium text-white/32">
                              {tradeForm.entryReason || `${tradeForm.pair} • ${tradeForm.direction}`}
                            </div>
                            {tradeForm.targetPlan ? (
                              <div className="mt-3 inline-flex rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/54">
                                Target: {tradeForm.targetPlan}
                              </div>
                            ) : null}
                            {normalizeTradeConfluences(tradeForm.confluences).length > 0 ? (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {normalizeTradeConfluences(tradeForm.confluences).slice(0, 4).map((confluence) => (
                                  <div
                                    key={confluence}
                                    className="rounded-full border border-[#fbbf24]/16 bg-[#f59e0b]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#fde68a]"
                                  >
                                    {confluence}
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>

                          <div className="rounded-[16px] border border-white/6 bg-white/[0.02] p-4">
                            <div className={L}>Result</div>
                            <div className={`mt-2 text-[15px] font-semibold ${resultTone(safeNumber(tradeForm.pnl))}`}>
                              {tradeForm.pnl === "" ? "—" : inferResultFromPnl(tradeForm.pnl)}
                            </div>
                            <div className="mt-1 text-[11px] font-medium text-white/32">
                              {tradeForm.pnl === "" ? "No P&L yet" : formatMoney(tradeForm.pnl)}
                            </div>
                          </div>

                          <div className="rounded-[16px] border border-white/6 bg-white/[0.02] p-4">
                            <div className={L}>Planned R:R</div>
                            <div className="hud-number mt-2 text-[1.7rem] font-bold text-[#fcd34d] glow-gold">
                              {formatRMultiple(plannedRR)}
                            </div>
                            <div className="mt-1 text-[11px] font-medium text-white/32">
                              Only appears when advanced data is filled
                            </div>
                          </div>

                          <div className="rounded-[16px] border border-white/6 bg-white/[0.02] p-4">
                            <div className={L}>Realized R</div>
                            <div className="hud-number mt-2 text-[1.7rem] font-bold text-[#fcd34d] glow-gold">
                              {formatRMultiple(realizedR)}
                            </div>
                            <div className="mt-1 text-[11px] font-medium text-white/32">
                              P&L ÷ risk amount
                            </div>
                          </div>
                        </div>
                      </div>
                    </PremiumShell>

                </div>

                <div className="space-y-4">
                  <div className="sticky top-4 z-20 space-y-3">
                    <div className="rounded-[22px] border border-white/8 bg-[linear-gradient(135deg,rgba(18,13,3,0.92),rgba(10,8,2,0.9))] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.24)] backdrop-blur-xl md:p-5">
                      <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
                        <div className="relative min-w-0 flex-1">
                          <Search
                            size={15}
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/28"
                          />
                          <input
                            type="text"
                            value={tradeSearch}
                            onChange={(e) => setTradeSearch(e.target.value)}
                            placeholder="Search pair, notes, setup, trigger, target..."
                            className={`${inputCls} pl-10`}
                          />
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2 xl:flex xl:items-center">
                          <select
                            value={tradeSort}
                            onChange={(e) => setTradeSort(e.target.value)}
                            className={`${inputCls} xl:w-[180px]`}
                          >
                            <option value="newest">Newest first</option>
                            <option value="oldest">Oldest first</option>
                            <option value="biggestWin">Biggest win</option>
                            <option value="biggestLoss">Biggest loss</option>
                          </select>

                          <select
                            value={tradeResultFilter}
                            onChange={(e) => setTradeResultFilter(e.target.value)}
                            className={`${inputCls} xl:w-[150px]`}
                          >
                            <option value="all">All results</option>
                            <option value="win">Wins</option>
                            <option value="loss">Losses</option>
                            <option value="be">Break-even</option>
                          </select>

                          <select
                            value={tradeSetupFilter}
                            onChange={(e) => setTradeSetupFilter(e.target.value)}
                            className={`${inputCls} xl:w-[220px]`}
                          >
                            <option value="all">All setups</option>
                            {SETUP_CATEGORIES.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>

                          <button
                            type="button"
                            onClick={clearTradeFilters}
                            className="rounded-[14px] border border-white/8 bg-white/[0.03] px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/66 transition-all hover:border-white/12 hover:text-white/88 xl:shrink-0"
                          >
                            Clear Filters
                          </button>
                        </div>
                      </div>
                    </div>

                    {selectedTradeIds.length > 0 && (
                      <div className="flex items-center justify-between gap-3 rounded-[16px] border border-red-400/16 bg-[linear-gradient(135deg,rgba(127,29,29,0.35),rgba(239,68,68,0.08))] p-4 backdrop-blur-xl">
                        <div className="text-[12px] font-semibold text-red-300">
                          {selectedTradeIds.length} selected
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowDeleteConfirm(true)}
                          className="rounded-[12px] border border-red-400/18 bg-red-500/10 px-3.5 py-2 text-[12px] font-semibold text-red-300 transition-all hover:border-red-400/28"
                        >
                          Delete selected
                        </button>
                      </div>
                    )}

                    {reviewMode && latestImportBatchId && (
                      <div className="flex items-center justify-between gap-3 rounded-[16px] border border-[#fbbf24]/16 bg-[linear-gradient(135deg,rgba(245,158,11,0.14),rgba(251,191,36,0.06))] p-4 backdrop-blur-xl">
                        <div>
                          <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#fde68a]">
                            Reviewing Latest Import
                          </div>
                          <div className="mt-1 text-[12px] font-medium text-white/54">
                            {(latestImportTradeIds.length || filteredAndSortedTrades.length)} trade
                            {(latestImportTradeIds.length || filteredAndSortedTrades.length) === 1 ? "" : "s"} in this batch. Showing only the latest imported trades right now.
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setReviewMode(false);
                            setLatestImportBatchId("");
                            setExpandedReviewTradeId(null);
                          }}
                          className="rounded-[12px] border border-white/8 bg-white/[0.03] px-3.5 py-2 text-[12px] font-semibold text-white/66 transition-all hover:border-white/12 hover:text-white/88"
                        >
                          Exit review
                        </button>
                      </div>
                    )}
                  </div>

                  {groupedTradesByWeek.length === 0 ? (
                    <PremiumShell>
                      <div className={`p-8 text-center text-sm font-medium ${textMuted}`}>
                        No trades found yet.
                      </div>
                    </PremiumShell>
                  ) : (
                    groupedTradesByWeek.map((week) => {
                      const weekOpen = Boolean(openWeeks[week.weekKey]);

                      return (
                        <PremiumShell key={week.weekKey}>
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              toggleWeekOpen(week.weekKey);
                            }}
                            className="flex w-full items-center justify-between gap-4 p-5 text-left md:p-6"
                          >
                            <div className="min-w-0">
                              <div className="text-[15px] font-semibold text-white/88">{week.weekLabel}</div>

                              <div className="mt-3 flex flex-wrap items-center gap-2.5">
                                <div className={`text-[18px] font-bold ${resultTone(week.totalPnl)}`}>
                                  {formatMoney(week.totalPnl)}
                                </div>
                                <div className="text-[11px] font-medium text-white/32">
                                  {week.tradeCount} trades • {week.wins} wins • {week.losses} losses
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/42">
                                {week.days.length} days
                              </div>
                              {weekOpen ? (
                                <ChevronDown size={17} className="text-white/32" />
                              ) : (
                                <ChevronRight size={17} className="text-white/32" />
                              )}
                            </div>
                          </button>

                          {weekOpen && (
                            <div className="border-t border-white/6 px-5 py-5 md:px-6">
                              <div className="grid gap-4">
                                {week.days.map((day) => {
                                  const dayOpen = Boolean(openDays[day.date]);

                                  return (
                                    <div
                                      key={day.date}
                                      className="overflow-hidden rounded-[18px] border border-white/6 bg-[linear-gradient(135deg,rgba(255,255,255,0.025),rgba(255,255,255,0.01))]"
                                    >
                                      <button
                                        type="button"
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          setOpenWeeks((prev) => ({ ...prev, [week.weekKey]: true }));
                                          toggleDayOpen(day.date);
                                        }}
                                        className="flex w-full items-center justify-between gap-4 p-4 text-left md:p-5"
                                      >
                                        <div className="min-w-0">
                                          <div className={L}>
                                            {new Date(`${day.date}T00:00:00`).toLocaleDateString(undefined, {
                                              weekday: "long",
                                              month: "short",
                                              day: "numeric",
                                              year: "numeric",
                                            })}
                                          </div>

                                          <div className="mt-3 flex flex-wrap items-center gap-2.5">
                                            <div className={`text-[17px] font-bold ${resultTone(day.totalPnl)}`}>
                                              {formatMoney(day.totalPnl)}
                                            </div>
                                            <div className="text-[11px] font-medium text-white/32">
                                              {day.trades.length} trades • {day.wins} wins • {day.losses} losses
                                            </div>
                                          </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                          <div className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/42">
                                            {day.trades.length} logs
                                          </div>
                                          {dayOpen ? (
                                            <ChevronDown size={17} className="text-white/32" />
                                          ) : (
                                            <ChevronRight size={17} className="text-white/32" />
                                          )}
                                        </div>
                                      </button>

                                      {dayOpen && (
                                        <div className="border-t border-white/6 px-4 py-4 md:px-5">
                                          <div className="grid gap-4">
                                            {day.trades.map((trade) => (
                                              <div
                                                key={trade.id}
                                                className="rounded-[18px] border border-white/6 bg-[linear-gradient(135deg,rgba(255,255,255,0.025),rgba(255,255,255,0.01))] p-4 md:p-5"
                                              >
                                                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                                                  <div className="min-w-0 flex-1">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                      <button
                                                        type="button"
                                                        onClick={() => toggleTradeSelection(trade.id)}
                                                        className={`flex h-8 w-8 items-center justify-center rounded-[10px] border text-[12px] font-bold transition-all ${
                                                          selectedTradeIds.includes(trade.id)
                                                            ? "border-[#fbbf24]/26 bg-[#f59e0b]/12 text-white"
                                                            : "border-white/8 bg-white/[0.03] text-white/42"
                                                        }`}
                                                      >
                                                        {selectedTradeIds.includes(trade.id) ? "✓" : ""}
                                                      </button>

                                                      <div className="text-[15px] font-semibold text-white/90">
                                                        {getTradePrimaryTitle(trade)}
                                                      </div>

                                                      <div
                                                        className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${badgeTone(
                                                          trade.result
                                                        )}`}
                                                      >
                                                        {trade.result}
                                                      </div>

                                                      {trade.executionGrade && (
                                                        <div
                                                          className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${gradeTone(
                                                            trade.executionGrade
                                                          )}`}
                                                        >
                                                          Grade {trade.executionGrade}
                                                        </div>
                                                      )}
                                                    </div>

                                                    <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-medium text-white/34">
                                                      <span>{trade.pair}</span>
                                                      <span>•</span>
                                                      <span>{trade.direction}</span>
                                                      {trade.session && (
                                                        <>
                                                          <span>•</span>
                                                          <span>{trade.session}</span>
                                                        </>
                                                      )}
                                                    </div>

                                                    {getTradeSupportLine(trade) ? (
                                                      <div className="mt-3 text-[12px] font-medium leading-6 text-white/50">
                                                        {getTradeSupportLine(trade)}
                                                      </div>
                                                    ) : null}

                                                    {getTradeTargetPlan(trade) ? (
                                                      <div className="mt-3 inline-flex rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/54">
                                                        Target: {getTradeTargetPlan(trade)}
                                                      </div>
                                                    ) : null}

                                                    {getTradeConfluences(trade).length > 0 ? (
                                                      <div className="mt-3 flex flex-wrap gap-2">
                                                        {getTradeConfluences(trade).slice(0, 4).map((confluence) => (
                                                          <div
                                                            key={confluence}
                                                            className="rounded-full border border-[#fbbf24]/16 bg-[#f59e0b]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#fde68a]"
                                                          >
                                                            {confluence}
                                                          </div>
                                                        ))}
                                                        {getTradeConfluences(trade).length > 4 ? (
                                                          <div className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/54">
                                                            +{getTradeConfluences(trade).length - 4} more
                                                          </div>
                                                        ) : null}
                                                      </div>
                                                    ) : null}

                                                    <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                                                      <div className="rounded-[14px] border border-white/6 bg-white/[0.02] p-3">
                                                        <div className={L}>P&L</div>
                                                        <div className={`mt-2 text-[15px] font-bold ${resultTone(trade.pnl)}`}>
                                                          {formatMoney(trade.pnl)}
                                                        </div>
                                                      </div>

                                                      <div className="rounded-[14px] border border-white/6 bg-white/[0.02] p-3">
                                                        <div className={L}>Planned R:R</div>
                                                        <div className="mt-2 text-[15px] font-bold text-[#fcd34d] glow-gold">
                                                          {formatRMultiple(trade.plannedRR)}
                                                        </div>
                                                      </div>

                                                      <div className="rounded-[14px] border border-white/6 bg-white/[0.02] p-3">
                                                        <div className={L}>Realized R</div>
                                                        <div className="mt-2 text-[15px] font-bold text-[#fcd34d] glow-gold">
                                                          {formatRMultiple(trade.realizedR)}
                                                        </div>
                                                      </div>

                                                      <div className="rounded-[14px] border border-white/6 bg-white/[0.02] p-3">
                                                        <div className={L}>Profit Factor</div>
                                                        <div className="mt-2 text-[15px] font-bold text-[#fcd34d] glow-gold">
                                                          {trade.result === "Win"
                                                            ? "Win"
                                                            : trade.result === "Loss"
                                                            ? "Loss"
                                                            : "BE"}
                                                        </div>
                                                      </div>

                                                      <div className="rounded-[14px] border border-white/6 bg-white/[0.02] p-3">
                                                        <div className={L}>Entry / Stop / TP</div>
                                                        <div className="mt-2 text-[13px] font-semibold text-white/80">
                                                          {trade.entry || "—"} / {trade.stopLoss || "—"} / {trade.takeProfit || "—"}
                                                        </div>
                                                      </div>
                                                    </div>

                                                    {getTradeDisplayedNote(trade) ? (
                                                      <div className="mt-4 rounded-[14px] border border-white/6 bg-white/[0.02] p-4">
                                                        <div className={L}>Notes</div>
                                                        <div className="mt-2 whitespace-pre-wrap text-[12px] font-medium leading-6 text-white/46">
                                                          {getTradeDisplayedNote(trade)}
                                                        </div>
                                                      </div>
                                                    ) : null}

                                                    {isTradeInLatestImportReview(trade) ? (
                                                      <div className="mt-4 rounded-[16px] border border-[#fbbf24]/12 bg-[linear-gradient(135deg,rgba(251,191,36,0.06),rgba(255,255,255,0.015))] p-4">
                                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                                          <div>
                                                            <div className={L}>Trade Review</div>
                                                            <div className="mt-1 text-[12px] font-medium text-white/42">
                                                              Add a simple setup category, confidence score, and note for this imported trade.
                                                            </div>
                                                          </div>

                                                          <div className="flex items-center gap-2">
                                                            {hasTradeReview(trade) ? (
                                                              <div className="rounded-full border border-emerald-400/18 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-300">
                                                                Reviewed
                                                              </div>
                                                            ) : null}
                                                            <button
                                                              type="button"
                                                              onClick={() => toggleTradeReviewPanel(trade)}
                                                              className="rounded-[12px] border border-white/8 bg-white/[0.03] px-3.5 py-2 text-[12px] font-semibold text-white/68 transition-all hover:border-white/12 hover:text-white/88"
                                                            >
                                                              {expandedReviewTradeId === trade.id
                                                                ? "Hide Review"
                                                                : hasTradeReview(trade)
                                                                ? "Edit Review"
                                                                : "Review"}
                                                            </button>
                                                          </div>
                                                        </div>

                                                        {hasTradeReview(trade) && expandedReviewTradeId !== trade.id ? (
                                                          <div className="mt-4 grid gap-3 md:grid-cols-[1fr_120px]">
                                                            <div className="rounded-[14px] border border-white/6 bg-white/[0.02] p-3">
                                                              <div className={L}>Saved Review</div>
                                                              <div className="mt-2 text-[12px] font-medium leading-6 text-white/46">
                                                                {trade.reviewNote ||
                                                                  normalizeReviewSetupCategory(trade.reviewSetup) ||
                                                                  trade.reviewSetup ||
                                                                  "Review saved"}
                                                              </div>
                                                              {normalizeReviewSetupCategory(trade.reviewSetup) ? (
                                                                <div className="mt-3 inline-flex rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/54">
                                                                  Category: {normalizeReviewSetupCategory(trade.reviewSetup)}
                                                                </div>
                                                              ) : null}
                                                            </div>
                                                            <div className="rounded-[14px] border border-white/6 bg-white/[0.02] p-3">
                                                              <div className={L}>Confidence</div>
                                                              <div className="mt-2 text-[15px] font-bold text-white/84">
                                                                {trade.reviewConfidence || "—"}/10
                                                              </div>
                                                            </div>
                                                          </div>
                                                        ) : null}

                                                        {expandedReviewTradeId === trade.id ? (
                                                          <div className="mt-4 grid gap-4">
                                                            {trade.reviewSetup && !normalizeReviewSetupCategory(trade.reviewSetup) ? (
                                                              <div className="rounded-[14px] border border-amber-400/16 bg-amber-500/8 px-4 py-3 text-[12px] font-medium leading-6 text-amber-200/90">
                                                                Previous saved setup: {trade.reviewSetup}. Re-save this trade with a setup category to standardize analytics.
                                                              </div>
                                                            ) : null}

                                                            <div className="grid gap-4 md:grid-cols-[1fr_140px]">
                                                              <div className="space-y-2">
                                                                <div className={L}>Setup Category</div>
                                                                <select
                                                                  value={reviewDraft.reviewSetup}
                                                                  onChange={(e) => handleReviewDraftChange("reviewSetup", e.target.value)}
                                                                  className={inputCls}
                                                                >
                                                                  <option value="">Choose category</option>
                                                                  {SETUP_CATEGORIES.map((option) => (
                                                                    <option key={option} value={option}>
                                                                      {option}
                                                                    </option>
                                                                  ))}
                                                                </select>
                                                              </div>

                                                              <div className="space-y-2">
                                                                <div className={L}>Confidence</div>
                                                                <select
                                                                  value={reviewDraft.reviewConfidence}
                                                                  onChange={(e) => handleReviewDraftChange("reviewConfidence", e.target.value)}
                                                                  className={inputCls}
                                                                >
                                                                  {Array.from({ length: 10 }, (_, index) => String(index + 1)).map((value) => (
                                                                    <option key={value} value={value}>
                                                                      {value}/10
                                                                    </option>
                                                                  ))}
                                                                </select>
                                                              </div>
                                                            </div>

                                                            <div className="space-y-2">
                                                              <div className={L}>Note</div>
                                                              <textarea
                                                                rows={4}
                                                                value={reviewDraft.reviewNote}
                                                                onChange={(e) => handleReviewDraftChange("reviewNote", e.target.value)}
                                                                className={textAreaCls}
                                                                placeholder="What stood out about this trade?"
                                                              />
                                                            </div>

                                                            <div className="flex flex-wrap gap-3">
                                                              <button
                                                                type="button"
                                                                onClick={() => handleSaveTradeReview(trade)}
                                                                disabled={savingReviewTradeId === trade.id}
                                                                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-[14px] border border-[#fbbf24]/20 bg-[linear-gradient(135deg,#d97706,#b45309)] px-4 py-3 text-[12px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_0_24px_rgba(251,191,36,0.18)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_34px_rgba(251,191,36,0.28)] disabled:cursor-not-allowed disabled:opacity-60"
                                                              >
                                                                <span>{savingReviewTradeId === trade.id ? "Saving..." : "Save Review"}</span>
                                                              </button>
                                                              <button
                                                                type="button"
                                                                onClick={() => setExpandedReviewTradeId(null)}
                                                                className="rounded-[14px] border border-white/8 bg-white/[0.03] px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/66 transition-all hover:border-white/12 hover:text-white/88"
                                                              >
                                                                Cancel
                                                              </button>
                                                            </div>
                                                          </div>
                                                        ) : null}
                                                      </div>
                                                    ) : null}
                                                  </div>

                                                  <div className="flex shrink-0 flex-col gap-2 xl:w-[170px]">
                                                    {trade.screenshot ? (
                                                      <button
                                                        type="button"
                                                        onClick={() => setPreviewImage(trade.screenshot)}
                                                        className="group overflow-hidden rounded-[16px] border border-white/8 bg-white/[0.02] text-left"
                                                      >
                                                        <img
                                                          src={trade.screenshot}
                                                          alt="Trade screenshot"
                                                          className="h-[118px] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                                        />
                                                      </button>
                                                    ) : (
                                                      <div className="flex h-[118px] items-center justify-center rounded-[16px] border border-white/8 bg-white/[0.02] text-white/22">
                                                        No image
                                                      </div>
                                                    )}

                                                    <button
                                                      type="button"
                                                      onClick={() => loadTradeForEdit(trade)}
                                                      className="rounded-[12px] border border-white/8 bg-white/[0.03] px-3.5 py-2 text-[12px] font-semibold text-white/62 transition-all hover:border-white/12 hover:text-white/88"
                                                    >
                                                      Edit trade
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </PremiumShell>
                      );
                    })
	                  )}
	                </div>
	              </div>
	            </div>
	            )}

            {activePage === "analytics" && (
              <div className="animate-fadeUp space-y-5">
                <div className="relative overflow-hidden rounded-[26px] border border-white/7 bg-[linear-gradient(135deg,rgba(18,13,3,0.99),rgba(10,8,2,0.98))] px-6 py-7 md:px-8">
                  <div className="hud-divider absolute inset-x-0 top-0" />
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-[16%] top-[-16%] h-[220px] w-[220px] rounded-full bg-[#f59e0b]/10 blur-[95px]" />
                    <div className="absolute right-[12%] top-[10%] h-[180px] w-[180px] rounded-full bg-[#92400e]/9 blur-[90px]" />
                  </div>
                  <div className="relative">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#fbbf24]/16 bg-[#f59e0b]/9 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#fde68a]">
                      <BarChart3 size={10} />
                      Performance View
                    </div>
                    <h1 className="mt-4 text-[2.8rem] font-extrabold tracking-[-0.048em] text-white glow-soft">
                      Analytics
                    </h1>
                    <p className={`mt-3 max-w-2xl text-[13px] font-medium leading-[1.8] ${textBody}`}>
                      Break down which setups are performing, where your edge is strongest, and how your consistency is developing.
                    </p>

                    <div className="mt-6 inline-flex rounded-[16px] border border-white/8 bg-white/[0.03] p-1">
                      {[
                        {
                          id: "performance",
                          label: "Performance",
                          description: "What trade patterns and behaviors perform best?",
                        },
                        {
                          id: "review",
                          label: "Review",
                          description: "What happened over time, by day, week, and month?",
                        },
                      ].map((view) => (
                        <button
                          key={view.id}
                          type="button"
                          onClick={() => setAnalyticsView(view.id)}
                          className={`rounded-[12px] px-4 py-3 text-left transition-all duration-300 ${
                            analyticsView === view.id
                              ? "bg-[linear-gradient(135deg,rgba(251,191,36,0.20),rgba(251,191,36,0.07))] text-white shadow-[0_0_16px_rgba(251,191,36,0.12)]"
                              : "text-white/42 hover:text-white/78"
                          }`}
                        >
                          <div className="text-[12px] font-semibold uppercase tracking-[0.14em]">
                            {view.label}
                          </div>
                          <div className="mt-1 max-w-[220px] text-[11px] font-medium leading-5 opacity-80">
                            {view.description}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {analyticsView === "performance" && (
                  <>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
                  <MiniStatCard
                    title="Profit Factor"
                    value={formatProfitFactor(stats.profitFactor)}
                    sub="System-level profitability"
                    variant="gold"
                  />
                  <MiniStatCard
                    title="Gross Profit"
                    value={formatMoney(stats.totalProfit)}
                    sub="All winning trades combined"
                    variant="green"
                  />
                  <MiniStatCard
                    title="Gross Loss"
                    value={`-$${Math.abs(stats.totalLoss).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}`}
                    sub="All losing trades combined"
                    variant="red"
                  />
                  <MiniStatCard
                    title="Avg Planned R:R"
                    value={stats.avgPlannedRR !== null ? `${stats.avgPlannedRR.toFixed(2)}R` : "—"}
                    sub={`Based on ${stats.avgPlannedRRTradeCount} trades`}
                    variant="gold"
                  />
                  <MiniStatCard
                    title="Avg Realized R"
                    value={stats.avgRealizedR !== null ? `${stats.avgRealizedR.toFixed(2)}R` : "—"}
                    sub="P&L relative to risk"
                    variant="cream"
                  />
                  <MiniStatCard
                    title="Execution Efficiency"
                    value={
                      stats.executionEfficiency !== null
                        ? formatPercentage(stats.executionEfficiency * 100)
                        : "—"
                    }
                    sub={`Based on ${stats.executionEfficiencyTradeCount} advanced trades`}
                    variant="gold"
                  />
                </div>

                <PremiumShell>
                  <div className="p-6 md:p-7">
                    <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                      <div>
                        <h2 className="text-[20px] font-bold tracking-[-0.04em] text-white glow-soft">
                          Execution quality
                        </h2>
                        <p className={`mt-2 text-[12px] font-medium leading-6 ${textBody}`}>
                          Based on advanced trades only.
                        </p>
                      </div>

                      <div className="rounded-full border border-white/7 bg-white/[0.03] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/42">
                        {stats.executionEfficiencyTradeCount} qualified trade
                        {stats.executionEfficiencyTradeCount === 1 ? "" : "s"}
                      </div>
                    </div>

                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                      <div className="rounded-[18px] border border-white/7 bg-white/[0.025] p-5">
                        <div className={L}>Avg Planned R</div>
                        <div className="hud-number mt-3 text-[2rem] font-bold leading-none text-[#fcd34d] glow-gold">
                          {stats.executionAvgPlannedR !== null
                            ? `${stats.executionAvgPlannedR.toFixed(2)}R`
                            : "—"}
                        </div>
                        <div className="mt-3 text-[11px] font-medium text-white/34">
                          What the plan offered
                        </div>
                      </div>

                      <div className="rounded-[18px] border border-white/7 bg-white/[0.025] p-5">
                        <div className={L}>Avg Realized R</div>
                        <div className="hud-number mt-3 text-[2rem] font-bold leading-none text-amber-100 glow-cream">
                          {stats.executionAvgRealizedR !== null
                            ? `${stats.executionAvgRealizedR.toFixed(2)}R`
                            : "—"}
                        </div>
                        <div className="mt-3 text-[11px] font-medium text-white/34">
                          What was actually captured
                        </div>
                      </div>

                      <div className="rounded-[18px] border border-[#fbbf24]/12 bg-[#f59e0b]/[0.035] p-5">
                        <div className={L}>Execution Efficiency</div>
                        <div className="hud-number mt-3 text-[2rem] font-bold leading-none text-[#fcd34d] glow-gold">
                          {stats.executionEfficiency !== null
                            ? formatPercentage(stats.executionEfficiency * 100)
                            : "—"}
                        </div>
                        <div className="mt-3 text-[11px] font-medium text-white/34">
                          Realized R vs planned R
                        </div>
                      </div>
                    </div>

                    {stats.executionEfficiencyTradeCount === 0 ? (
                      <div className="mt-4 rounded-[16px] border border-white/7 bg-white/[0.02] px-4 py-3 text-[12px] font-medium text-white/40">
                        Add advanced trade fields to unlock execution quality.
                      </div>
                    ) : null}
                  </div>
                </PremiumShell>
                  </>
                )}

                {analyticsView === "review" && (
                  <>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <MiniStatCard
                    title="Calendar Month P&L"
                    value={formatMoney(currentMonthCalendarStats.pnl)}
                    sub="Selected month total"
                    variant={currentMonthCalendarStats.pnl >= 0 ? "green" : "red"}
                  />
                  <MiniStatCard
                    title="Trading Days"
                    value={String(
                      currentMonthCalendarStats.greenDays +
                        currentMonthCalendarStats.redDays +
                        currentMonthCalendarStats.flatDays
                    )}
                    sub="Active days this month"
                    variant="cream"
                  />
                  <MiniStatCard
                    title="Winning Days"
                    value={String(currentMonthCalendarStats.greenDays)}
                    sub="Green calendar days"
                    variant="green"
                  />
                  <MiniStatCard
                    title="Losing Days"
                    value={String(currentMonthCalendarStats.redDays)}
                    sub="Red calendar days"
                    variant="red"
                  />
                </div>
                                  <PremiumShell>
                 <div className="p-5 md:p-6">
                   <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
  <div>
    <div className="flex flex-wrap items-center gap-3">
      <div className="text-[1.95rem] font-extrabold tracking-[-0.04em] text-white glow-soft">
        {formatMonthLabel(calendarMonth)}
      </div>

      <div
        className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${
          currentMonthCalendarStats.pnl > 0
            ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
            : currentMonthCalendarStats.pnl < 0
            ? "border-red-400/20 bg-red-500/10 text-red-300"
            : "border-white/8 bg-white/[0.03] text-white/58"
        }`}
      >
        {formatMoney(currentMonthCalendarStats.pnl)}
      </div>
    </div>

    <div className={`mt-2 text-[12px] font-medium ${textBody}`}>
      Review consistency day by day, spot momentum weeks, and see exactly where the month came from.
    </div>
  </div>

  <div className="flex flex-wrap items-center gap-2">
    <QuickSelectButton
      onClick={() => {
        setCalendarMonth((prev) => shiftMonth(prev, -1));
        setSelectedCalendarDate(null);
      }}
    >
      Prev Month
    </QuickSelectButton>

    <QuickSelectButton
      onClick={() => {
        const now = new Date();
        setCalendarMonth(new Date(now.getFullYear(), now.getMonth(), 1));
        setSelectedCalendarDate(null);
      }}
      active={monthKeyFromDate(today()) === selectedMonthKey}
    >
      Current Month
    </QuickSelectButton>

    <QuickSelectButton
      onClick={() => {
        setCalendarMonth((prev) => shiftMonth(prev, 1));
        setSelectedCalendarDate(null);
      }}
    >
      Next Month
    </QuickSelectButton>
  </div>
</div>

                    <div className="mt-5 grid gap-4 2xl:grid-cols-[1.75fr_0.85fr]">
                      <div className="relative overflow-hidden rounded-[24px] border border-white/7 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-3 md:p-4 shadow-[0_12px_40px_rgba(0,0,0,0.28)]">
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)]" />
                        <div className="mb-3 grid grid-cols-7 gap-2">
                          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                            <div
                              key={day}
                              className="rounded-[12px] border border-white/6 bg-white/[0.02] px-2 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-white/34"
                            >
                              {day}
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-7 gap-2">
                          {calendarDays.map((day) => {
                            const dayData = tradesByDate[day.dateKey];
                            const totalPnl = safeNumber(dayData?.totalPnl);
                            const tradeCount = dayData?.trades?.length || 0;
                            const isSelected = selectedCalendarDate === day.dateKey;
                            const decisiveTrades = (dayData?.wins || 0) + (dayData?.losses || 0);
                            const winRate =
                             decisiveTrades > 0 ? Math.round(((dayData?.wins || 0) / decisiveTrades) * 100) : null;
                            const isToday = day.dateKey === today();
                            const hasTrades = tradeCount > 0;
 
                            const tone =
                             totalPnl > 0
                               ? "border-emerald-400/18 bg-[linear-gradient(180deg,rgba(16,185,129,0.14),rgba(6,13,8,0.88))] hover:border-emerald-300/34 hover:shadow-[0_0_30px_rgba(52,211,153,0.10)]"
                                 : totalPnl < 0
                                ? "border-red-400/18 bg-[linear-gradient(180deg,rgba(239,68,68,0.13),rgba(13,6,6,0.88))] hover:border-red-300/34 hover:shadow-[0_0_30px_rgba(248,113,113,0.10)]"
                               : "border-white/7 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.012))] hover:border-white/12 hover:bg-white/[0.04]";
                            return (
                              <button
  key={day.dateKey}
  type="button"
  onClick={() => setSelectedCalendarDate(day.dateKey)}
  className={`group relative min-h-[118px] overflow-hidden rounded-[20px] border p-2.5 text-left transition-all duration-300 ${
    day.isCurrentMonth ? tone : "border-white/5 bg-white/[0.015] opacity-35"
  } ${
    isSelected
      ? "scale-[1.01] ring-1 ring-[#fbbf24]/40 shadow-[0_0_26px_rgba(251,191,36,0.14)]"
      : ""
  }`}
>
  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
    <div className="absolute inset-x-0 top-0 h-[1px] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)]" />
    <div className="absolute right-[-18px] top-[-18px] h-16 w-16 rounded-full bg-white/6 blur-2xl" />
  </div>

  <div className="relative flex items-start justify-between gap-2">
    <div className="flex items-center gap-2">
      <div
        className={`text-[12px] font-bold ${
          day.isCurrentMonth ? "text-white/82" : "text-white/24"
        }`}
      >
        {day.date.getDate()}
      </div>

      {isToday ? (
        <div className="rounded-full border border-[#fbbf24]/20 bg-[#f59e0b]/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#fde68a]">
          Today
        </div>
      ) : null}
    </div>

    {hasTrades ? (
      <div className="rounded-full border border-white/8 bg-black/20 px-2 py-0.5 text-[10px] font-semibold text-white/55">
        {tradeCount}
      </div>
    ) : null}
  </div>

  <div className="relative mt-5">
    {hasTrades ? (
      <>
        <div
          className={`hud-number text-[1.05rem] font-bold leading-none ${
            totalPnl > 0
              ? "text-emerald-300 glow-profit"
              : totalPnl < 0
              ? "text-red-300 glow-loss"
              : "text-white/68"
          }`}
        >
          {formatMoney(totalPnl)}
        </div>

        <div className="mt-1.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/34">
          <span>
            {dayData.wins}W · {dayData.losses}L
            {dayData.breakeven ? ` · ${dayData.breakeven}BE` : ""}
          </span>

          {winRate !== null ? (
            <>
              <span className="text-white/16">•</span>
              <span>{winRate}%</span>
            </>
          ) : null}
        </div>

        <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-white/[0.05]">
          <div
            className={`h-full rounded-full ${
              totalPnl > 0
                ? "bg-[linear-gradient(90deg,rgba(52,211,153,0.35),rgba(52,211,153,0.9))]"
                : totalPnl < 0
                ? "bg-[linear-gradient(90deg,rgba(248,113,113,0.35),rgba(248,113,113,0.9))]"
                : "bg-white/18"
            }`}
            style={{
              width: `${Math.min(
                100,
                Math.max(
                  18,
                  (Math.abs(totalPnl) /
                    Math.max(Math.abs(currentMonthCalendarStats.pnl), 1)) *
                    100
                )
              )}%`,
            }}
          />
        </div>
      </>
    ) : (
      <div className="mt-9 text-[10px] font-medium uppercase tracking-[0.16em] text-white/16">
        No trades
      </div>
    )}
  </div>
</button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="relative overflow-hidden rounded-[24px] border border-white/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-4 shadow-[0_8px_40px_rgba(0,0,0,0.22)]">
                          <div className={L}>Selected Day</div>

                          {selectedCalendarDayData ? (
                            <div className="mt-4">
                              <div className="text-[1.05rem] font-bold text-white">
                                {new Date(`${selectedCalendarDayData.date}T00:00:00`).toLocaleDateString(undefined, {
                                  weekday: "long",
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </div>

                              <div
                                className={`hud-number mt-2 text-[1.8rem] font-extrabold ${
                                  selectedCalendarDayData.totalPnl > 0
                                    ? "text-emerald-300 glow-profit"
                                    : selectedCalendarDayData.totalPnl < 0
                                    ? "text-red-300 glow-loss"
                                    : "text-white/70"
                                }`}
                              >
                                {formatMoney(selectedCalendarDayData.totalPnl)}
                              </div>

                              <div className="mt-2 text-[12px] font-medium text-white/40">
                                {selectedCalendarDayData.trades.length} trade
                                {selectedCalendarDayData.trades.length === 1 ? "" : "s"} ·{" "}
                                {selectedCalendarDayData.wins}W / {selectedCalendarDayData.losses}L
                                {selectedCalendarDayData.breakeven
                                  ? ` / ${selectedCalendarDayData.breakeven}BE`
                                  : ""}
                              </div>

                               <div className="mt-4 grid grid-cols-3 gap-2">
                                <div className="rounded-[14px] border border-emerald-400/14 bg-emerald-500/8 px-3 py-3">
                                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-200/55">
                                    Wins
                                  </div>
                                  <div className="mt-1 text-[1.05rem] font-bold text-emerald-300">
                                    {selectedCalendarDayData.wins}
                                  </div>
                                </div>

                                <div className="rounded-[14px] border border-red-400/14 bg-red-500/8 px-3 py-3">
                                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-red-200/55">
                                   Losses
                                  </div>
                                  <div className="mt-1 text-[1.05rem] font-bold text-red-300">
                                    {selectedCalendarDayData.losses}
                                  </div>
                                </div>

                                <div className="rounded-[14px] border border-white/8 bg-white/[0.03] px-3 py-3">
                                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/36">
                                    Win Rate
                                  </div>
                                  <div className="mt-1 text-[1.05rem] font-bold text-white/86">
                                    {selectedCalendarDayData.wins + selectedCalendarDayData.losses
                                      ? `${Math.round(
                              (selectedCalendarDayData.wins / (selectedCalendarDayData.wins + selectedCalendarDayData.losses)) * 100
                                  )}%`
                                  : "—"}
                              </div>
                              </div>
                              </div>

                              <div className="mt-4 space-y-3">
                                {selectedCalendarDayData.trades.map((trade) => (
                                  <div
                                    key={trade.id}
                                    className="group relative overflow-hidden rounded-[18px] border border-white/7 bg-[linear-gradient(135deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] p-4 transition-all duration-300 hover:border-[#fbbf24]/20 hover:shadow-[0_0_28px_rgba(251,191,36,0.10)]"
                                  >
                                    <div className="flex flex-wrap items-start justify-between gap-3">
                                      <div>
                                        <div className="text-[14px] font-bold text-white/88">
                                          {getTradePrimaryTitle(trade)}
                                        </div>
                                        <div className="mt-1 text-[11px] font-medium text-white/45 tracking-[0.02em]">
                                          {trade.pair} · {trade.direction} · {trade.session || "Session not set"}
                                        </div>
                                        {getTradeSupportLine(trade) ? (
                                          <div className="mt-2 text-[11px] font-medium leading-5 text-white/52">
                                            {getTradeSupportLine(trade)}
                                          </div>
                                        ) : null}
                                      </div>

                                      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                     <div className="absolute inset-x-0 top-0 h-[1px] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)]" />
                                      <div className="absolute right-[-20px] top-[-20px] h-20 w-20 rounded-full bg-white/6 blur-2xl" />
                                      </div>

                                      <div
                                      className={`text-[15px] font-extrabold tracking-[-0.02em] ${
                                      trade.pnl > 0
                                      ? "text-emerald-300 glow-profit"
                                      : trade.pnl < 0
                                      ? "text-red-300 glow-loss"
                                      : "text-white/70"
                                      }`}
                                      >
                                      {formatMoney(trade.pnl)}
                                      </div>
                                    </div>

                                    <div className="mt-3 flex flex-wrap gap-2">
                                      <div
                                        className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${badgeTone(
                                          trade.result
                                        )}`}
                                      >
                                        {trade.result}
                                      </div>

                                      <div
                                        className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${gradeTone(
                                          trade.executionGrade || "A"
                                        )}`}
                                      >
                                        Grade {trade.executionGrade || "A"}
                                      </div>

                                      {trade.plannedRR !== null && trade.plannedRR !== undefined ? (
                                        <div className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/58">
                                          RR {trade.plannedRR}
                                        </div>
                                      ) : null}

                                      {getTradeTargetPlan(trade) ? (
                                        <div className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/58">
                                          Target: {getTradeTargetPlan(trade)}
                                        </div>
                                      ) : null}

                                      {getTradeConfluences(trade).slice(0, 3).map((confluence) => (
                                        <div
                                          key={confluence}
                                          className="rounded-full border border-[#fbbf24]/16 bg-[#f59e0b]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#fde68a]"
                                        >
                                          {confluence}
                                        </div>
                                      ))}
                                    </div>
                                  </div>



                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="mt-4 rounded-[16px] border border-white/7 bg-white/[0.02] p-4 text-[12px] font-medium text-white/40">
                              Click any day in the calendar to inspect that day’s trades.
                            </div>
                          )}
                        </div>

                        <div className="relative overflow-hidden rounded-[24px] border border-white/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-4 shadow-[0_8px_40px_rgba(0,0,0,0.22)]">
                          <div className={L}>Weekly Breakdown</div>
                          <div className="pointer-events-none absolute inset-0">
                          <div className="absolute inset-x-0 top-0 h-[1px] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)]" />
                          <div className="absolute left-[-30px] bottom-[-30px] h-24 w-24 rounded-full bg-[#fbbf24]/5 blur-3xl" />
                          </div>
                          <div className="pointer-events-none absolute inset-0">
                          <div className="absolute inset-x-0 top-0 h-[1px] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)]" />
                          </div>

                          <div className="mt-4 space-y-3">
                            {weeklyCalendarBreakdown.map((week) => (
                              <div
                                key={week.label}
                                className="group rounded-[18px] border border-white/7 bg-[linear-gradient(135deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] p-4 transition-all duration-300 hover:border-[#fbbf24]/16 hover:shadow-[0_0_24px_rgba(251,191,36,0.08)]"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <div className="text-[12px] font-semibold text-white/56">{week.label}</div>
                                    <div
                                      className={`hud-number mt-2 text-[1.35rem] font-bold ${
                                        week.pnl > 0
                                          ? "text-emerald-300 glow-profit"
                                          : week.pnl < 0
                                          ? "text-red-300 glow-loss"
                                          : "text-white/65"
                                      }`}
                                    >
                                      {formatMoney(week.pnl)}
                                    </div>
                                  </div>

                                  <div className="text-right">
                                  <div className="text-[11px] font-medium text-white/34">
                                    {week.activeDays} active day{week.activeDays === 1 ? "" : "s"}
                                 </div>
                                  <div className="mt-1 text-[11px] font-medium text-white/34">
                                  {week.tradeCount} trade{week.tradeCount === 1 ? "" : "s"}
                                 </div>
                                 <div className="mt-1 text-[11px] font-medium text-white/28">
                                 {week.activeDays > 0
                                  ? `${Math.round(week.tradeCount / week.activeDays)} avg/day`
                                  : "No activity"}
                                  </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </PremiumShell>
                  </>
                )}

                {analyticsView === "performance" && (
                  <>
                <div className="grid gap-5 xl:grid-cols-3">
                  <PremiumShell>
                    <div className="p-6">
                      <h2 className="text-[20px] font-bold tracking-[-0.04em] text-white">
                        Key Insight
                      </h2>
                      <div className="mt-5 rounded-[18px] border border-[#fbbf24]/12 bg-[linear-gradient(135deg,rgba(251,191,36,0.08),rgba(255,255,255,0.015))] p-5">
                        <div className={L}>What stands out</div>
                        <div className="mt-3 text-[1.15rem] font-semibold leading-7 text-white/88">
                          {keyInsight}
                        </div>
                      </div>
                    </div>
                  </PremiumShell>

                  <PremiumShell>
                    <div className="p-6">
                      <h2 className="text-[20px] font-bold tracking-[-0.04em] text-white">
                        Your Setup Edge
                      </h2>

                      <div className="mt-5 space-y-3">
                        {!setupEdgeTrust.hasCredibleBest ? (
                          <div className={`rounded-[16px] border border-white/6 bg-white/[0.02] p-4 text-sm ${textMuted}`}>
                            <div className="text-[15px] font-semibold text-white/84">
                              {getAnalyticsInsightCopy("setup", setupEdgeTrust.status).title}
                            </div>
                            <div className="mt-2 text-[13px] font-medium leading-7 text-white/42">
                              {getAnalyticsInsightCopy("setup", setupEdgeTrust.status).body}
                            </div>
                          </div>
                        ) : (
                          setupEdgeItems.map((item) => (
                            <div
                              key={item.label}
                              className="rounded-[16px] border border-white/6 bg-white/[0.02] p-4"
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div>
                                  <div className="flex flex-wrap items-center gap-2">
                                    <div className="text-[14px] font-semibold text-white/84">{item.label}</div>
                                    <div className={`rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] ${
                                      item.trades >= 2
                                        ? "border-emerald-400/18 bg-emerald-500/10 text-emerald-300"
                                        : "border-white/8 bg-white/[0.03] text-white/50"
                                    }`}>
                                      {item.trades >= 2 ? "Reliable" : "Low sample"}
                                    </div>
                                  </div>
                                  <div className="mt-1 text-[11px] font-medium text-white/34">
                                    {item.trades} trades
                                  </div>
                                </div>

                                <div className="text-right">
                                  <div className="text-[15px] font-bold text-[#fcd34d] glow-gold">
                                    PF {formatInsightProfitFactor(item.profitFactor)}
                                  </div>
                                  <div className={`mt-1 text-[11px] font-medium ${resultTone(item.pnl)}`}>
                                    {formatMoney(item.pnl)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </PremiumShell>

                  <PremiumShell>
                    <div className="p-6">
                      <h2 className="text-[20px] font-bold tracking-[-0.04em] text-white">
                        Session Edge
                      </h2>

                      <div className="mt-5 space-y-3">
                        {!canRenderSessionBestInsights ? (
                          <div className={`rounded-[16px] border border-white/6 bg-white/[0.02] p-4 text-sm ${textMuted}`}>
                            <div className="text-[15px] font-semibold text-white/84">
                              {getAnalyticsInsightCopy("session", sessionEdgeInsight?.trust?.status ?? "empty").title}
                            </div>
                            <div className="mt-2 text-[13px] font-medium leading-7 text-white/42">
                              {getAnalyticsInsightCopy("session", sessionEdgeInsight?.trust?.status ?? "empty").body}
                            </div>
                          </div>
                        ) : (
                          <>
                            <div
                              className="rounded-[16px] border border-emerald-400/14 bg-emerald-500/8 p-4"
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div>
                                  <div className={L}>Best Session</div>
                                  <div className="mt-2 text-[14px] font-semibold text-white/84">{sessionEdgeInsight.best.label}</div>
                                  <div className="mt-1 text-[11px] font-medium text-white/34">
                                    {sessionEdgeInsight.best.trades} trades
                                  </div>
                                </div>

                                <div className="text-right">
                                  <div className="text-[15px] font-bold text-emerald-300 glow-profit">
                                    {formatMoney(sessionEdgeInsight.best.pnl)}
                                  </div>
                                  <div className="mt-1 text-[11px] font-medium text-white/42">
                                    PF {formatInsightProfitFactor(sessionEdgeInsight.best.profitFactor)}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {sessionEdgeInsight.worst ? (
                              <div className="rounded-[16px] border border-red-400/14 bg-red-500/8 p-4">
                                <div className="flex items-center justify-between gap-3">
                                  <div>
                                    <div className={L}>Weakest Session</div>
                                    <div className="mt-2 text-[14px] font-semibold text-white/84">{sessionEdgeInsight.worst.label}</div>
                                    <div className="mt-1 text-[11px] font-medium text-white/34">
                                      {sessionEdgeInsight.worst.trades} trades
                                    </div>
                                  </div>

                                  <div className="text-right">
                                    <div className="text-[15px] font-bold text-red-300 glow-loss">
                                      {formatMoney(sessionEdgeInsight.worst.pnl)}
                                    </div>
                                    <div className="mt-1 text-[11px] font-medium text-white/42">
                                      PF {formatInsightProfitFactor(sessionEdgeInsight.worst.profitFactor)}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : null}
                          </>
                        )}
                      </div>
                    </div>
                  </PremiumShell>
                </div>

                <div className="grid gap-5 xl:grid-cols-[1.1fr_1.9fr]">
                  <PremiumShell>
                    <div className="p-6">
                      <h2 className="text-[20px] font-bold tracking-[-0.04em] text-white">
                        Discipline Edge
                      </h2>

                      <div className="mt-5 space-y-3">
                        {disciplineComparison?.trust?.status !== "ready" ? (
                          <div className={`rounded-[16px] border border-white/6 bg-white/[0.02] p-4 text-sm ${textMuted}`}>
                            <div className="text-[15px] font-semibold text-white/84">
                              {getAnalyticsInsightCopy("discipline", disciplineComparison?.trust?.status ?? "empty").title}
                            </div>
                            <div className="mt-2 text-[13px] font-medium leading-7 text-white/42">
                              {getAnalyticsInsightCopy("discipline", disciplineComparison?.trust?.status ?? "empty").body}
                            </div>
                          </div>
                        ) : (
                          <>
                            {disciplineComparison.comparison ? (
                              <div className="rounded-[16px] border border-white/6 bg-white/[0.02] p-4">
                                <div className={L}>Grade Comparison</div>
                                <div className="mt-3 grid gap-3">
                                  {[disciplineComparison.best, disciplineComparison.comparison].map((item) => (
                                    <div
                                      key={item.label}
                                      className="flex items-center justify-between gap-3 rounded-[14px] border border-white/6 bg-white/[0.02] px-3 py-3"
                                    >
                                      <div className="flex items-center gap-3">
                                        <div
                                          className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${gradeTone(
                                            item.label
                                          )}`}
                                        >
                                          Grade {item.label}
                                        </div>
                                        <div className="text-[11px] font-medium text-white/34">
                                          {item.trades} trades
                                        </div>
                                      </div>

                                      <div className="text-right">
                                        <div className={`text-[14px] font-bold ${resultTone(item.pnl)}`}>
                                          {formatMoney(item.pnl)}
                                        </div>
                                        <div className="mt-1 text-[11px] font-medium text-white/42">
                                          PF {formatInsightProfitFactor(item.profitFactor)}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : null}

                            {!disciplineComparison.comparison ? (
                              <div className="rounded-[16px] border border-white/6 bg-white/[0.02] p-4">
                                <div className={L}>Best Available Grade</div>
                                <div className="mt-2 flex items-center gap-3">
                                  <div
                                    className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${gradeTone(
                                      disciplineComparison.best.label
                                    )}`}
                                  >
                                    Grade {disciplineComparison.best.label}
                                  </div>
                                  <div className="text-[11px] font-medium text-white/34">
                                    {disciplineComparison.best.trades} trades
                                  </div>
                                </div>
                                <div className="mt-3 text-[15px] font-bold text-white/84">
                                  {formatMoney(disciplineComparison.best.pnl)}
                                </div>
                                <div className="mt-1 text-[11px] font-medium text-white/42">
                                  PF {formatInsightProfitFactor(disciplineComparison.best.profitFactor)}
                                </div>
                              </div>
                            ) : null}
                          </>
                        )}
                      </div>
                    </div>
                  </PremiumShell>
                </div>

                <PremiumShell>
                  <div className="p-6 md:p-7">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h2 className="text-[20px] font-bold tracking-[-0.04em] text-white">
                          Setup performance at a glance
                        </h2>
                      </div>
                      <Target size={16} className="text-white/32" />
                    </div>

                    {reviewedSetupAnalytics.items.length === 0 ? (
                      <div className="mt-5 rounded-[20px] border border-white/7 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-6">
                        <div className="text-[15px] font-semibold text-white/84">No setup analytics yet</div>
                        <div className="mt-2 text-[13px] font-medium leading-7 text-white/42">
                          Add setup categories to trades to unlock setup analytics.
                        </div>
                      </div>
                    ) : (
                      <>
                        {canRenderReviewedSetupBestInsights ? (
                          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            {[
                              {
                                title: "Best Setup",
                                label: reviewedSetupAnalytics.bestSetup?.setup || "—",
                                value: reviewedSetupAnalytics.bestSetup
                                  ? formatMoney(reviewedSetupAnalytics.bestSetup.pnl)
                                  : "—",
                                sub: reviewedSetupAnalytics.bestSetup
                                  ? `${reviewedSetupAnalytics.bestSetup.wins}W • ${reviewedSetupAnalytics.bestSetup.losses}L • ${reviewedSetupAnalytics.bestSetup.breakeven}BE`
                                  : "No reviewed setups",
                                tone: "text-emerald-300 glow-profit",
                              },
                              {
                                title: "Worst Setup",
                                label: reviewedSetupAnalytics.worstSetup?.setup || "—",
                                value: reviewedSetupAnalytics.worstSetup
                                  ? formatMoney(reviewedSetupAnalytics.worstSetup.pnl)
                                  : "—",
                                sub: reviewedSetupAnalytics.worstSetup
                                  ? `${reviewedSetupAnalytics.worstSetup.wins}W • ${reviewedSetupAnalytics.worstSetup.losses}L • ${reviewedSetupAnalytics.worstSetup.breakeven}BE`
                                  : "No losing setups yet",
                                tone: "text-red-300 glow-loss",
                              },
                              {
                                title: "Highest Win Rate",
                                label: reviewedSetupAnalytics.highestWinRate?.setup || "—",
                                value: reviewedSetupAnalytics.highestWinRate
                                  ? formatPercentage(reviewedSetupAnalytics.highestWinRate.winRate)
                                  : "—",
                                sub: reviewedSetupAnalytics.highestWinRate
                                  ? `${reviewedSetupAnalytics.highestWinRate.wins}W • ${reviewedSetupAnalytics.highestWinRate.losses}L • ${reviewedSetupAnalytics.highestWinRate.breakeven}BE`
                                  : "No reviewed setups",
                                tone: "text-[#fcd34d] glow-gold",
                              },
                              {
                                title: "Most Traded Setup",
                                label: reviewedSetupAnalytics.mostTraded?.setup || "—",
                                value: reviewedSetupAnalytics.mostTraded
                                  ? `${reviewedSetupAnalytics.mostTraded.trades}`
                                  : "—",
                                sub: reviewedSetupAnalytics.mostTraded
                                  ? `${reviewedSetupAnalytics.mostTraded.wins}W • ${reviewedSetupAnalytics.mostTraded.losses}L • ${reviewedSetupAnalytics.mostTraded.breakeven}BE`
                                  : "No reviewed setups",
                                tone: "text-white/92",
                              },
                            ].map((item) => (
                              <div
                                key={item.title}
                                className="rounded-[20px] border border-white/7 bg-[linear-gradient(135deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] p-5"
                              >
                                <div className={L}>{item.title}</div>
                                <div className="mt-3 text-[14px] font-semibold text-white/84">{item.label}</div>
                                <div className={`mt-3 text-[1.45rem] font-bold ${item.tone}`}>{item.value}</div>
                                <div className="mt-2 text-[11px] font-medium text-white/36">{item.sub}</div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="mt-5 rounded-[20px] border border-white/7 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-6">
                            <div className="text-[15px] font-semibold text-white/84">
                              {getAnalyticsInsightCopy("setup", reviewedSetupAnalytics.trust.status).title}
                            </div>
                            <div className="mt-2 text-[13px] font-medium leading-7 text-white/42">
                              {getAnalyticsInsightCopy("setup", reviewedSetupAnalytics.trust.status).body}
                            </div>
                          </div>
                        )}

                        <div className="mt-5 overflow-hidden rounded-[20px] border border-white/7 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))]">
                          <div className="grid grid-cols-[1.6fr_0.75fr_0.85fr_1fr_1fr] gap-3 border-b border-white/6 bg-white/[0.03] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/34">
                            <div>Setup</div>
                            <div>Trades</div>
                            <div>Win Rate</div>
                            <div>Net P&amp;L</div>
                            <div>Avg P&amp;L</div>
                          </div>

                          <div className="divide-y divide-white/6">
                            {reviewedSetupAnalytics.items.map((item) => (
                              <div
                                key={item.setup}
                                className="grid grid-cols-[1.6fr_0.75fr_0.85fr_1fr_1fr] gap-3 px-4 py-4 text-[12px]"
                              >
                                <div>
                                  <div className="font-semibold text-white/84">{item.setup}</div>
                                  <div className="mt-1 text-[11px] font-medium text-white/34">
                                    {item.wins}W • {item.losses}L • {item.breakeven}BE
                                  </div>
                                </div>
                                <div className="text-white/58">{item.trades}</div>
                                <div className="text-white/58">{formatPercentage(item.winRate)}</div>
                                <div className={resultTone(item.pnl)}>{formatMoney(item.pnl)}</div>
                                <div className={resultTone(item.avgPnl)}>{formatMoney(item.avgPnl)}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </PremiumShell>

                <PremiumShell>
                  <div className="p-6 md:p-7">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h2 className="text-[20px] font-bold tracking-[-0.04em] text-white">
                          Entry trigger performance
                        </h2>
                      </div>
                      <Sparkles size={16} className="text-white/32" />
                    </div>

                    {entryTriggerAnalytics.items.length === 0 ? (
                      <div className="mt-5 rounded-[20px] border border-white/7 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-6">
                        <div className="text-[15px] font-semibold text-white/84">No entry trigger analytics yet</div>
                        <div className="mt-2 text-[13px] font-medium leading-7 text-white/42">
                          Add entry triggers to trades to unlock trigger analytics.
                        </div>
                      </div>
                    ) : (
                      <>
                        {canRenderTriggerBestInsights && entryTriggerAnalytics.summaryCards.length > 0 ? (
                          <div
                            className={`mt-5 grid gap-4 ${
                              entryTriggerAnalytics.summaryCards.length >= 4
                                ? "md:grid-cols-2 xl:grid-cols-4"
                                : entryTriggerAnalytics.summaryCards.length === 3
                                ? "md:grid-cols-3"
                                : entryTriggerAnalytics.summaryCards.length === 2
                                ? "md:grid-cols-2"
                                : "md:grid-cols-1 xl:max-w-sm"
                            }`}
                          >
                            {entryTriggerAnalytics.summaryCards.map((item) => (
                              <div
                                key={item.id}
                                className="rounded-[20px] border border-white/7 bg-[linear-gradient(135deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] p-5"
                              >
                                <div className={L}>{item.title}</div>
                                <div className="mt-3 text-[14px] font-semibold text-white/84">{item.label}</div>
                                <div className={`mt-3 text-[1.45rem] font-bold ${item.tone}`}>{item.value}</div>
                                <div className="mt-2 text-[11px] font-medium text-white/42">{item.sub}</div>
                                {item.meta ? (
                                  <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-white/26">
                                    {item.meta}
                                  </div>
                                ) : null}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="mt-5 rounded-[20px] border border-white/7 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-6">
                            <div className="text-[15px] font-semibold text-white/84">
                              {getAnalyticsInsightCopy("trigger", entryTriggerAnalytics.trust.status).title}
                            </div>
                            <div className="mt-2 text-[13px] font-medium leading-7 text-white/42">
                              {getAnalyticsInsightCopy("trigger", entryTriggerAnalytics.trust.status).body}
                            </div>
                          </div>
                        )}

                        <div className="mt-5 overflow-hidden rounded-[20px] border border-white/7 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))]">
                          <div className="grid grid-cols-[1.6fr_0.75fr_0.85fr_1fr_1fr] gap-3 border-b border-white/6 bg-white/[0.03] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/34">
                            <div>Trigger</div>
                            <div>Trades</div>
                            <div>Win Rate</div>
                            <div>Net P&amp;L</div>
                            <div>Avg P&amp;L</div>
                          </div>

                          <div className="divide-y divide-white/6">
                            {entryTriggerAnalytics.items.map((item) => (
                              <div
                                key={item.trigger}
                                className="grid grid-cols-[1.6fr_0.75fr_0.85fr_1fr_1fr] gap-3 px-4 py-4 text-[12px]"
                              >
                                <div>
                                  <div className="font-semibold text-white/84">{item.trigger}</div>
                                  <div className="mt-1 text-[11px] font-medium text-white/34">
                                    {item.wins}W • {item.losses}L • {item.breakeven}BE
                                  </div>
                                </div>
                                <div className="text-white/58">{item.trades}</div>
                                <div className="text-white/58">{formatPercentage(item.winRate)}</div>
                                <div className={resultTone(item.pnl)}>{formatMoney(item.pnl)}</div>
                                <div className={resultTone(item.avgPnl)}>{formatMoney(item.avgPnl)}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </PremiumShell>

                <PremiumShell>
                  <div className="p-6 md:p-7">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h2 className="text-[20px] font-bold tracking-[-0.04em] text-white">
                          Model performance
                        </h2>
                      </div>
                      <Target size={16} className="text-white/32" />
                    </div>

                    {modelPerformanceAnalytics.items.length === 0 ? (
                      <div className="mt-5 rounded-[20px] border border-white/7 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-6">
                        <div className="text-[15px] font-semibold text-white/84">No model analytics yet</div>
                        <div className="mt-2 text-[13px] font-medium leading-7 text-white/42">
                          Add setup, trigger, and target to trades to unlock model analytics.
                        </div>
                      </div>
                    ) : (
                      <>
                        {canRenderModelBestInsights && modelPerformanceAnalytics.summaryCards.length > 0 ? (
                          <div
                            className={`mt-5 grid gap-4 ${
                              modelPerformanceAnalytics.summaryCards.length >= 4
                                ? "md:grid-cols-2 xl:grid-cols-4"
                                : modelPerformanceAnalytics.summaryCards.length === 3
                                ? "md:grid-cols-3"
                                : modelPerformanceAnalytics.summaryCards.length === 2
                                ? "md:grid-cols-2"
                                : "md:grid-cols-1 xl:max-w-sm"
                            }`}
                          >
                            {modelPerformanceAnalytics.summaryCards.map((item) => (
                              <div
                                key={item.id}
                                className="rounded-[20px] border border-white/7 bg-[linear-gradient(135deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] p-5"
                              >
                                <div className={L}>{item.title}</div>
                                <div className="mt-3 text-[13px] font-semibold leading-5 text-white/84">
                                  {item.label}
                                </div>
                                <div className={`mt-3 text-[1.45rem] font-bold ${item.tone}`}>{item.value}</div>
                                <div className="mt-2 text-[11px] font-medium text-white/42">{item.sub}</div>
                                {item.meta ? (
                                  <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-white/26">
                                    {item.meta}
                                  </div>
                                ) : null}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="mt-5 rounded-[20px] border border-white/7 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-6">
                            <div className="text-[15px] font-semibold text-white/84">
                              {getAnalyticsInsightCopy("model", modelPerformanceAnalytics.trust.status).title}
                            </div>
                            <div className="mt-2 text-[13px] font-medium leading-7 text-white/42">
                              {getAnalyticsInsightCopy("model", modelPerformanceAnalytics.trust.status).body}
                            </div>
                          </div>
                        )}

                        <div className="mt-5 overflow-hidden rounded-[20px] border border-white/7 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))]">
                          <div className="grid grid-cols-[2.1fr_0.7fr_0.85fr_1fr_1fr] gap-3 border-b border-white/6 bg-white/[0.03] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/34">
                            <div>Model</div>
                            <div>Trades</div>
                            <div>Win Rate</div>
                            <div>Net P&amp;L</div>
                            <div>Avg P&amp;L</div>
                          </div>

                          <div className="divide-y divide-white/6">
                            {modelPerformanceAnalytics.items.map((item) => (
                              <div
                                key={item.model}
                                className="grid grid-cols-[2.1fr_0.7fr_0.85fr_1fr_1fr] gap-3 px-4 py-4 text-[12px]"
                              >
                                <div>
                                  <div className="font-semibold leading-5 text-white/84">{item.model}</div>
                                  <div className="mt-1 text-[11px] font-medium text-white/34">
                                    {item.wins}W • {item.losses}L • {item.breakeven}BE
                                  </div>
                                </div>
                                <div className="text-white/58">{item.trades}</div>
                                <div className="text-white/58">{formatPercentage(item.winRate)}</div>
                                <div className={resultTone(item.pnl)}>{formatMoney(item.pnl)}</div>
                                <div className={resultTone(item.avgPnl)}>{formatMoney(item.avgPnl)}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </PremiumShell>

                <div className="grid gap-5 xl:grid-cols-2">
                  <PremiumShell>
                    <div className="p-6">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h2 className="text-[20px] font-bold tracking-[-0.04em] text-white">
                            What setups pay best?
                          </h2>
                        </div>
                        <Target size={16} className="text-white/32" />
                      </div>

                      {!canRenderSetupBestInsights ? (
                        <div className="mt-5 rounded-[18px] border border-white/6 bg-white/[0.02] p-5">
                          <div className="text-[15px] font-semibold text-white/84">
                            {getAnalyticsInsightCopy("setup", setupAnalyticsTrust.status).title}
                          </div>
                          <div className="mt-2 text-[13px] font-medium leading-7 text-white/42">
                            {getAnalyticsInsightCopy("setup", setupAnalyticsTrust.status).body}
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="mt-5 overflow-hidden rounded-[18px] border border-white/6">
                            <div className="grid grid-cols-[1.6fr_0.8fr_0.8fr_1fr] gap-3 border-b border-white/6 bg-white/[0.03] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/34">
                              <div>Setup</div>
                              <div>Trades</div>
                              <div>WR</div>
                              <div>P&L</div>
                            </div>

                            <div className="divide-y divide-white/6">
                              {visibleSetupAnalytics.map((item) => (
                                <div
                                  key={item.setup}
                                  className="grid grid-cols-[1.6fr_0.8fr_0.8fr_1fr] gap-3 px-4 py-3.5 text-[12px]"
                                >
                                  <div>
                                    <div className="font-semibold text-white/84">{item.setup}</div>
                                    <div className="mt-1 text-[11px] font-medium text-white/34">
                                      {item.wins}W • {item.losses}L • {item.breakeven}BE
                                    </div>
                                  </div>
                                  <div className="text-white/46">{item.trades}</div>
                                  <div className="text-white/46">{item.winRate.toFixed(0)}%</div>
                                  <div className={resultTone(item.pnl)}>{formatMoney(item.pnl)}</div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {setupAnalyticsTrust.reliableItems.length > 5 ? (
                            <div className="mt-4 flex justify-end">
                              <button
                                type="button"
                                onClick={() => setShowAllSetupAnalytics((prev) => !prev)}
                                className="rounded-[12px] border border-white/8 bg-white/[0.03] px-3.5 py-2 text-[12px] font-semibold text-white/66 transition-all hover:border-white/12 hover:text-white/88"
                              >
                                {showAllSetupAnalytics ? "Show top 5" : "Show all setups"}
                              </button>
                            </div>
                          ) : null}
                        </>
                      )}
                    </div>
                  </PremiumShell>

                  <PremiumShell>
                    <div className="p-6">
                      <h2 className="text-[20px] font-bold tracking-[-0.04em] text-white">
                        Setup insight
                      </h2>
                      {setupInsight ? (
                        <>
                          {canRenderSetupBestInsights && setupInsight.status === "ready" ? (
                            <>
                              <p className="mt-4 text-[13px] font-medium leading-7 text-white/42">
                                A quick read on which setups are carrying your performance right now.
                              </p>

                              <div className="mt-5 grid gap-3">
                                {setupInsight.best ? (
                                  <div className="rounded-[16px] border border-emerald-400/14 bg-emerald-500/8 p-4">
                                    <div className={L}>Best Setup</div>
                                    <div className="mt-2 text-[16px] font-semibold text-white/88">
                                      {setupInsight.best.setup}
                                    </div>
                                    <div className="mt-2 text-[1.35rem] font-bold text-emerald-300 glow-profit">
                                      {formatMoney(setupInsight.best.pnl)}
                                    </div>
                                    <div className="mt-2 text-[12px] font-medium text-white/42">
                                      Your {setupInsight.best.setup.toLowerCase()} trades are leading setup performance.
                                    </div>
                                  </div>
                                ) : null}

                                {setupInsight.mostUsed ? (
                                  <div className="rounded-[16px] border border-white/6 bg-white/[0.02] p-4">
                                    <div className={L}>Most Used Setup</div>
                                    <div className="mt-2 text-[15px] font-semibold text-white/84">
                                      {setupInsight.mostUsed.setup}
                                    </div>
                                    <div className="mt-2 text-[12px] font-medium text-white/42">
                                      {setupInsight.mostUsed.trades} trades • {formatPercentage(setupInsight.mostUsed.winRate)} win rate
                                    </div>
                                  </div>
                                ) : null}

                                {setupInsight.worst ? (
                                  <div className="rounded-[16px] border border-red-400/14 bg-red-500/8 p-4">
                                    <div className={L}>Weakest Setup</div>
                                    <div className="mt-2 text-[15px] font-semibold text-white/84">
                                      {setupInsight.worst.setup}
                                    </div>
                                    <div className="mt-2 text-[1.15rem] font-bold text-red-300 glow-loss">
                                      {formatMoney(setupInsight.worst.pnl)}
                                    </div>
                                    <div className="mt-2 text-[12px] font-medium text-white/42">
                                      This setup is clearly underperforming enough to flag.
                                    </div>
                                  </div>
                                ) : (
                                  <div className="rounded-[16px] border border-white/6 bg-white/[0.02] p-4">
                                    <div className={L}>Current Takeaway</div>
                                    <div className="mt-2 text-[15px] font-semibold text-white/84">
                                      No losing setup yet
                                    </div>
                                    <div className="mt-2 text-[12px] font-medium text-white/42">
                                      Your reliable setups are holding flat or positive right now, which keeps the setup view clean.
                                    </div>
                                  </div>
                                )}
                              </div>
                            </>
                          ) : (
                            <div className="mt-5 rounded-[16px] border border-white/6 bg-white/[0.02] p-4 text-[13px] font-medium text-white/42">
                              <div className="text-[15px] font-semibold text-white/84">
                                {getAnalyticsInsightCopy("setup", setupInsight.status).title}
                              </div>
                              <div className="mt-2 leading-7">
                                {getAnalyticsInsightCopy("setup", setupInsight.status).body}
                              </div>
                              {setupInsight.status === "no_profitable" && setupInsight.worst ? (
                                <div className="mt-4 rounded-[14px] border border-red-400/14 bg-red-500/8 p-4">
                                  <div className={L}>Weakest Setup</div>
                                  <div className="mt-2 text-[15px] font-semibold text-white/84">
                                    {setupInsight.worst.setup}
                                  </div>
                                  <div className="mt-2 text-[1.1rem] font-bold text-red-300 glow-loss">
                                    {formatMoney(setupInsight.worst.pnl)}
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="mt-5 rounded-[16px] border border-white/6 bg-white/[0.02] p-4 text-[13px] font-medium text-white/42">
                          Add setup data to trades and this insight card will highlight your strongest patterns.
                        </div>
                      )}
                    </div>
                  </PremiumShell>
                </div>
                  </>
                )}
              </div>
            )}

            {activePage === "journal" && (
              <div className="animate-fadeUp grid gap-5 xl:grid-cols-[0.92fr_1.08fr]">
                <PremiumShell>
                  <div className="p-6 md:p-7">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-amber-300/60">
                        Execution Over Emotion.
                      </p>
                      <h2 className="text-[22px] font-bold tracking-[-0.04em] text-white glow-soft">
                        Review the person behind the trade
                      </h2>
                      <p className="mt-2 max-w-lg text-[12px] font-medium leading-6 text-white/38">
                        This page is for execution, discipline, confidence, and lessons.
                      </p>
                    </div>

                    <div className="mt-6 grid gap-4">
                      <div className="space-y-2">
                        <div className={L}>Date</div>
                        <input
                          type="date"
                          value={journalForm.date}
                          onChange={(e) => handleJournalChange("date", e.target.value)}
                          className={inputCls}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className={L}>Did you follow your plan?</div>
                        <div className="flex flex-wrap gap-2">
                          {["Yes", "Mostly", "No"].map((value) => (
                            <QuickSelectButton
                              key={value}
                              active={journalForm.followedPlan === value}
                              onClick={() => handleJournalChange("followedPlan", value)}
                            >
                              {value}
                            </QuickSelectButton>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className={L}>Confidence ({journalForm.confidence}/10)</div>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={journalForm.confidence}
                          onChange={(e) => handleJournalChange("confidence", Number(e.target.value))}
                          className="w-full accent-[#fbbf24]"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className={L}>Biggest lesson</div>
                        <textarea
                          rows={7}
                          value={journalForm.lesson}
                          onChange={(e) => handleJournalChange("lesson", e.target.value)}
                          className={textAreaCls}
                          placeholder="What did today teach you about execution, emotions, patience, or discipline?"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={saveJournalEntry}
                        className="group relative inline-flex w-fit items-center gap-2 overflow-hidden rounded-[14px] border border-[#fbbf24]/20 bg-[linear-gradient(135deg,#d97706,#b45309)] px-5 py-3 text-[13px] font-bold text-white shadow-[0_0_28px_rgba(251,191,36,0.24)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_38px_rgba(251,191,36,0.34)]"
                      >
                        <span className="relative flex items-center gap-2">
                          <BookOpen size={14} />
                          Save Journal Entry
                        </span>
                      </button>
                    </div>
                  </div>
                </PremiumShell>

                <PremiumShell>
                  <div className="p-6 md:p-7">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h2 className="text-[20px] font-bold tracking-[-0.04em] text-white">
                          Mindset log
                        </h2>
                      </div>
                      <BookOpen size={16} className="text-white/32" />
                    </div>

                    <div className="mt-5 space-y-4">
                      {journalEntries.length === 0 ? (
                        <div className={`rounded-[16px] border border-white/6 bg-white/[0.02] p-4 text-sm ${textMuted}`}>
                          No journal entries yet.
                        </div>
                      ) : (
                        journalEntries.map((entry) => (
                          <div
                            key={entry.id}
                            className="rounded-[18px] border border-white/6 bg-[linear-gradient(135deg,rgba(255,255,255,0.025),rgba(255,255,255,0.01))] p-4 md:p-5"
                          >
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div>
                                <div className={L}>
                                  {new Date(`${entry.date}T00:00:00`).toLocaleDateString(undefined, {
                                    weekday: "long",
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </div>
                                <div className="mt-2 flex flex-wrap items-center gap-2">
                                  {entry.followed_plan ? (
                                    <div className="rounded-full border border-white/8 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/60">
                                      Plan: {entry.followed_plan}
                                    </div>
                                  ) : null}
                                  <div className="rounded-full border border-[#fbbf24]/18 bg-[#f59e0b]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#fde68a]">
                                    Confidence {entry.confidence}/10
                                  </div>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => deleteJournalEntry(entry.id)}
                                className="rounded-[12px] border border-red-400/16 bg-red-500/8 px-3 py-2 text-[12px] font-semibold text-red-300 transition-all hover:border-red-400/28"
                              >
                                Delete
                              </button>
                            </div>

                            <div className="mt-4 whitespace-pre-wrap text-[12px] font-medium leading-6 text-white/44">
                              {entry.lesson}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </PremiumShell>
              </div>
            )}
          </div>
        </main>

        {showBrokerModal && (
          <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/78 p-4 backdrop-blur-md">
            <div className="relative w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(18,13,3,0.99),rgba(10,8,2,0.99))] shadow-[0_0_70px_rgba(0,0,0,0.5)]">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-[-10%] top-[-16%] h-[280px] w-[280px] rounded-full bg-[#f59e0b]/12 blur-[110px]" />
                <div className="absolute right-[-8%] bottom-[-20%] h-[260px] w-[260px] rounded-full bg-[#92400e]/12 blur-[120px]" />
                <div className="absolute inset-x-0 top-0 h-[1px] bg-[linear-gradient(90deg,transparent,rgba(251,191,36,0.45),transparent)]" />
              </div>

              <div className="relative p-6 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#fbbf24]/18 bg-[#f59e0b]/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#fde68a]">
                      {brokerFlowMode === "import" ? <CloudUpload size={10} /> : <Link2 size={10} />}
                      {brokerFlowMode === "import" ? "Trade Import" : "Broker Sync"}
                    </div>
                    <h2 className="mt-4 text-[2rem] font-bold tracking-[-0.05em] text-white glow-soft">
                      {brokerFlowMode === "import" ? "Import Trades" : "Connect Your Broker"}
                    </h2>
                    <p className="mt-3 max-w-xl text-[13px] font-medium leading-7 text-white/42">
                      {brokerFlowMode === "import"
                        ? "Upload a broker export file to auto-fill trades in TradeFlow. CSV comes first, and more broker formats can layer in later."
                        : "Automatically import trades into TradeFlow so you can spend less time manually logging and more time reviewing execution."}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={closeBrokerModal}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white/72 transition-all hover:border-white/14 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                </div>

                {brokerFlowMode === "connect" && brokerFlowState === "selection" && (
                  <div className="mt-8">
                    <div className="grid gap-4 md:grid-cols-2">
                      {BROKER_OPTIONS.map((broker) => (
                        <button
                          key={broker.id}
                          type="button"
                          onClick={() => handleBrokerSelection(broker)}
                          className="group relative overflow-hidden rounded-[22px] border border-white/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))] p-5 text-left transition-all duration-300 hover:border-[#fbbf24]/20 hover:shadow-[0_0_28px_rgba(251,191,36,0.10)]"
                        >
                          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <div className="absolute inset-x-0 top-0 h-[1px] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)]" />
                            <div className="absolute right-[-10px] top-[-10px] h-20 w-20 rounded-full bg-[#fbbf24]/8 blur-3xl" />
                          </div>
                          <div className="relative flex items-start justify-between gap-3">
                            <div>
                              <div className="text-[18px] font-bold tracking-[-0.03em] text-white">
                                {broker.name}
                              </div>
                              <div className="mt-3 text-[12px] font-medium leading-6 text-white/40">
                                {broker.description}
                              </div>
                            </div>
                            <div className="rounded-full border border-[#fbbf24]/16 bg-[#f59e0b]/9 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#fde68a]">
                              {broker.badge}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {brokerFlowMode === "connect" && brokerFlowState === "details" && selectedBroker && (
                  <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-[24px] border border-white/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))] p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-[1.35rem] font-bold tracking-[-0.04em] text-white">
                            {selectedBroker.name}
                          </div>
                        </div>
                        <div className="rounded-full border border-[#fbbf24]/16 bg-[#f59e0b]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#fde68a]">
                          {selectedBroker.id === "csv" ? "Import ready" : "Auto-sync soon"}
                        </div>
                      </div>

                      <div className="mt-5 grid gap-4">
                        <div className="space-y-2">
                          <div className={L}>
                            {selectedBroker.id === "csv" ? "Account Email / Label" : "Account Email / Username"}
                          </div>
                          <input
                            type="text"
                            value={brokerCredentials.identifier}
                            onChange={(e) => handleBrokerCredentialChange("identifier", e.target.value)}
                            className={inputCls}
                            placeholder={
                              selectedBroker.id === "csv" ? "desk@tradeflow.com" : "your broker login"
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <div className={L}>
                            {selectedBroker.id === "csv" ? "Import Key / Password" : "Password / API Key"}
                          </div>
                          <input
                            type="password"
                            value={brokerCredentials.secret}
                            onChange={(e) => handleBrokerCredentialChange("secret", e.target.value)}
                            className={inputCls}
                            placeholder={selectedBroker.id === "csv" ? "Placeholder only" : "Placeholder only"}
                          />
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={handleBrokerConnect}
                          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-[14px] border border-[#fbbf24]/20 bg-[linear-gradient(135deg,#d97706,#b45309)] px-5 py-3 text-[13px] font-bold text-white shadow-[0_0_28px_rgba(251,191,36,0.22)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_38px_rgba(251,191,36,0.34)]"
                        >
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                          <span className="relative">
                            {selectedBroker.id === "csv" ? "Continue Import Flow" : "Connect Broker"}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setBrokerFlowState("selection")}
                          className="rounded-[14px] border border-white/8 bg-white/[0.03] px-5 py-3 text-[13px] font-semibold text-white/62 transition-all hover:border-white/12 hover:text-white/88"
                        >
                          Back
                        </button>
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-white/8 bg-[linear-gradient(135deg,rgba(251,191,36,0.08),rgba(255,255,255,0.015))] p-5">
                      <div className="text-[1.25rem] font-bold tracking-[-0.04em] text-white">
                        Premium journaling without the admin work.
                      </div>
                      <div className="mt-4 space-y-3">
                        {[
                          "Auto-fill executions into your journal",
                          "Keep analytics current without manual entry",
                          "Review synced trades alongside screenshots and notes",
                        ].map((item) => (
                          <div
                            key={item}
                            className="rounded-[16px] border border-white/7 bg-white/[0.02] px-4 py-3 text-[12px] font-medium text-white/52"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {brokerFlowMode === "connect" && brokerFlowState === "connecting" && selectedBroker && (
                  <div className="mt-8 flex min-h-[320px] items-center justify-center">
                    <div className="w-full max-w-md rounded-[24px] border border-[#fbbf24]/16 bg-[linear-gradient(135deg,rgba(251,191,36,0.08),rgba(255,255,255,0.015))] p-8 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[18px] border border-[#fbbf24]/18 bg-[#f59e0b]/10 text-[#fde68a] shadow-[0_0_24px_rgba(251,191,36,0.16)]">
                        <RefreshCw size={20} className="animate-spin" />
                      </div>
                      <div className="mt-5 text-[1.5rem] font-bold tracking-[-0.04em] text-white">
                        Connecting to {selectedBroker.name}
                      </div>
                      <div className="mt-3 text-[13px] font-medium leading-7 text-white/42">
                        Verifying credentials, preparing sync preferences, and staging your first import.
                      </div>
                    </div>
                  </div>
                )}

                {brokerFlowMode === "connect" && brokerFlowState === "success" && connectedBroker && (
                  <div className="mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="rounded-[24px] border border-[#fbbf24]/14 bg-[linear-gradient(135deg,rgba(251,191,36,0.10),rgba(255,255,255,0.015))] p-6">
                      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/18 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300">
                        <ShieldCheck size={12} />
                        Connected successfully
                      </div>

                      <div className="mt-4 text-[1.9rem] font-bold tracking-[-0.05em] text-white">
                        {connectedBroker.name} is now linked to TradeFlow
                      </div>

                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-[16px] border border-white/7 bg-white/[0.02] p-4">
                          <div className={L}>Trades Synced</div>
                          <div className="hud-number mt-2 text-[1.9rem] font-bold text-[#fcd34d] glow-gold">
                            {connectedBroker.tradesSynced}
                          </div>
                        </div>
                        <div className="rounded-[16px] border border-white/7 bg-white/[0.02] p-4">
                          <div className={L}>Last Sync</div>
                          <div className="mt-2 text-[15px] font-semibold text-white/88">
                            {connectedBroker.lastSynced}
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            closeBrokerModal();
                            setActivePage("trades");
                          }}
                          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-[14px] border border-[#fbbf24]/20 bg-[linear-gradient(135deg,#d97706,#b45309)] px-5 py-3 text-[13px] font-bold text-white shadow-[0_0_28px_rgba(251,191,36,0.22)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_38px_rgba(251,191,36,0.34)]"
                        >
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                          <span className="relative">View Trades</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleBrokerSyncNow}
                          className="inline-flex items-center gap-2 rounded-[14px] border border-white/8 bg-white/[0.03] px-5 py-3 text-[13px] font-semibold text-white/68 transition-all hover:border-white/12 hover:text-white/88"
                        >
                          <RefreshCw size={14} />
                          Sync Again
                        </button>

                        <button
                          type="button"
                          onClick={handleBrokerDisconnect}
                          className="rounded-[14px] border border-red-400/16 bg-red-500/8 px-5 py-3 text-[13px] font-semibold text-red-300 transition-all hover:border-red-400/24"
                        >
                          Disconnect
                        </button>
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-white/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))] p-6">
                      <div className="text-[1.15rem] font-bold tracking-[-0.04em] text-white">
                        Your import workflow is ready for the next product layer.
                      </div>
                      <div className="mt-4 space-y-3">
                        {[
                          "Manual logging still works exactly the same",
                          "Auto-sync can sit alongside screenshots and review notes",
                          "Future broker APIs can plug into this same premium flow",
                        ].map((item) => (
                          <div
                            key={item}
                            className="rounded-[16px] border border-white/7 bg-white/[0.02] px-4 py-3 text-[12px] font-medium text-white/50"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {brokerFlowMode === "import" && importFlowState === "upload" && (
                  <div className="mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                    <div
                      onDrop={handleImportDrop}
                      onDragOver={handleImportDragOver}
                      onDragLeave={handleImportDragLeave}
                      className={`relative overflow-hidden rounded-[24px] border border-dashed p-6 transition-all duration-300 ${
                        isDraggingImport
                          ? "border-[#fbbf24]/34 bg-[#f59e0b]/8 shadow-[0_0_28px_rgba(251,191,36,0.10)]"
                          : "border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))]"
                      }`}
                    >
                      <div className="pointer-events-none absolute inset-0">
                        <div className="absolute inset-x-0 top-0 h-[1px] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)]" />
                      </div>
                      <div className="relative flex min-h-[280px] flex-col items-center justify-center text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-[20px] border border-white/8 bg-white/[0.04] text-[#fde68a] shadow-[0_0_28px_rgba(251,191,36,0.10)]">
                          <Upload size={22} />
                        </div>
                        <div className="mt-5 text-[1.35rem] font-bold tracking-[-0.04em] text-white">
                          Drop your broker export to smart sync
                        </div>
                        <div className="mt-3 max-w-md text-[13px] font-medium leading-7 text-white/42">
                          Upload a `.csv` file and TradeFlow will recognize the format, preview the trades, and sync only what is new.
                        </div>
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                          <div className="rounded-full border border-[#fbbf24]/16 bg-[#f59e0b]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#fde68a]">
                            Smart CSV Sync
                          </div>
                          <div className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/54">
                            {detectedImportFormat?.label || rememberedImportFormat?.label || "Waiting for file"}
                          </div>
                        </div>
                        {importDetectedHeaders.length > 0 ? (
                          <div className="mt-4 max-w-2xl rounded-[16px] border border-white/8 bg-white/[0.03] px-4 py-3 text-left text-[11px] font-medium leading-6 text-white/42">
                            <span className="text-white/58">Detected headers:</span>{" "}
                            {importDetectedHeaders.join(" • ")}
                          </div>
                        ) : null}
                        <div className="mt-5 flex flex-wrap justify-center gap-3">
                          <label className="cursor-pointer rounded-[14px] border border-[#fbbf24]/20 bg-[linear-gradient(135deg,#d97706,#b45309)] px-5 py-3 text-[12px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_0_24px_rgba(251,191,36,0.20)] transition-all duration-300 hover:scale-[1.01]">
                            Choose CSV
                            <input
                              ref={importInputRef}
                              type="file"
                              accept=".csv,text/csv"
                              onChange={handleImportFileChange}
                              className="hidden"
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => setBrokerFlowMode("connect")}
                            className="rounded-[14px] border border-white/8 bg-white/[0.03] px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/66 transition-all hover:border-white/12 hover:text-white/88"
                          >
                            Connect Broker Instead
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-white/8 bg-[linear-gradient(135deg,rgba(251,191,36,0.08),rgba(255,255,255,0.015))] p-5">
                      <div className="text-[1.2rem] font-bold tracking-[-0.04em] text-white">
                        Sync today, automate later.
                      </div>
                      <div className="mt-4 space-y-3">
                        {[
                          "Recognize common broker export formats automatically",
                          "Preview only the trades that matter before sync",
                          "Keep analytics and calendar views current immediately",
                        ].map((item) => (
                          <div
                            key={item}
                            className="rounded-[16px] border border-white/7 bg-white/[0.02] px-4 py-3 text-[12px] font-medium text-white/50"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 rounded-[16px] border border-white/7 bg-white/[0.02] px-4 py-3 text-[11px] font-medium leading-6 text-white/38">
                        More broker export formats can be supported later. CSV is the first fast path.
                      </div>
                    </div>
                  </div>
                )}

                {brokerFlowMode === "import" && importFlowState === "preview" && (
                  <div className="mt-8 grid gap-5">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="text-[1.3rem] font-bold tracking-[-0.04em] text-white">
                          {normalizedImportTrades.length} new trade{normalizedImportTrades.length === 1 ? "" : "s"} ready from {importFileName}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <div className="rounded-full border border-[#fbbf24]/16 bg-[#f59e0b]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#fde68a]">
                            {detectedImportFormat?.label || "Generic CSV detected"}
                          </div>
                          {duplicateImportCount > 0 ? (
                            <div className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/58">
                              {duplicateImportCount} duplicates will be skipped
                            </div>
                          ) : null}
                        </div>
                        {importDetectedHeaders.length > 0 ? (
                          <div className="mt-3 text-[11px] font-medium leading-6 text-white/40">
                            Headers: {importDetectedHeaders.join(" • ")}
                          </div>
                        ) : null}
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setImportFlowState("upload");
                            setImportError("");
                          }}
                          className="rounded-[14px] border border-white/8 bg-white/[0.03] px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/66 transition-all hover:border-white/12 hover:text-white/88"
                        >
                          Change File
                        </button>
                        <button
                          type="button"
                          onClick={handleImportTrades}
                          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-[14px] border border-[#fbbf24]/20 bg-[linear-gradient(135deg,#d97706,#b45309)] px-5 py-3 text-[12px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_0_26px_rgba(251,191,36,0.20)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_36px_rgba(251,191,36,0.32)]"
                        >
                          <span>Sync {normalizedImportTrades.length} Trades</span>
                        </button>
                      </div>
                    </div>

                    {importPreviewSummary ? (
                      <div className="grid gap-4 md:grid-cols-5">
                        <div className="rounded-[18px] border border-[#fbbf24]/12 bg-[linear-gradient(135deg,rgba(251,191,36,0.08),rgba(255,255,255,0.015))] p-4">
                          <div className={L}>New Trades</div>
                          <div className="hud-number mt-2 text-[1.8rem] font-bold text-[#fcd34d] glow-gold">
                            {importPreviewSummary.tradeCount}
                          </div>
                        </div>
                        <div className="rounded-[18px] border border-white/8 bg-white/[0.02] p-4">
                          <div className={L}>Date Range</div>
                          <div className="mt-2 text-[13px] font-semibold text-white/84">
                            {importPreviewSummary.startDate} to {importPreviewSummary.endDate}
                          </div>
                        </div>
                        <div className="rounded-[18px] border border-white/8 bg-white/[0.02] p-4">
                          <div className={L}>Net P&L</div>
                          <div className={`mt-2 text-[1.2rem] font-bold ${resultTone(importPreviewSummary.netPnl)}`}>
                            {formatMoney(importPreviewSummary.netPnl)}
                          </div>
                        </div>
                        <div className="rounded-[18px] border border-emerald-400/12 bg-emerald-500/8 p-4">
                          <div className={L}>Winning Trades</div>
                          <div className="mt-2 text-[1.2rem] font-bold text-emerald-300">
                            {importPreviewSummary.wins}
                          </div>
                        </div>
                        <div className="rounded-[18px] border border-red-400/12 bg-red-500/8 p-4">
                          <div className={L}>Losing Trades</div>
                          <div className="mt-2 text-[1.2rem] font-bold text-red-300">
                            {importPreviewSummary.losses}
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-[18px] border border-emerald-400/12 bg-emerald-500/8 p-4">
                        <div className={L}>New Trades Found</div>
                        <div className="mt-2 text-[1.6rem] font-bold text-emerald-300">
                          {normalizedImportTrades.length}
                        </div>
                      </div>
                      <div className="rounded-[18px] border border-white/8 bg-white/[0.02] p-4">
                        <div className={L}>Duplicates Skipped</div>
                        <div className="mt-2 text-[1.6rem] font-bold text-white/84">
                          {duplicateImportCount}
                        </div>
                      </div>
                    </div>

                    {importNotice ? (
                      <div className="rounded-[18px] border border-white/8 bg-white/[0.02] px-4 py-3 text-[12px] font-medium leading-6 text-white/46">
                        {importNotice}
                      </div>
                    ) : null}

                    <div className="overflow-hidden rounded-[24px] border border-white/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))]">
                      <div className="grid grid-cols-[1.1fr_1fr_0.9fr_0.9fr_0.9fr_0.7fr] gap-3 border-b border-white/6 bg-white/[0.03] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/34">
                        <div>Date</div>
                        <div>Symbol</div>
                        <div>P&L</div>
                        <div>Entry</div>
                        <div>Exit</div>
                        <div>Side</div>
                      </div>
                      <div className="max-h-[320px] overflow-y-auto divide-y divide-white/6">
                        {parsedImportRows.map((row) => (
                          <div
                            key={row.id}
                            className={`grid grid-cols-[1.1fr_1fr_0.9fr_0.9fr_0.9fr_0.7fr] gap-3 px-4 py-3.5 text-[12px] ${
                              row.isDuplicate ? "opacity-45" : ""
                            }`}
                          >
                            <div className="text-white/70">{row.date}</div>
                            <div className="font-semibold text-white/88">{row.pair}</div>
                            <div className={resultTone(row.pnl)}>{formatMoney(row.pnl)}</div>
                            <div className="text-white/56">{row.entry || "—"}</div>
                            <div className="text-white/56">{row.exitPrice || "—"}</div>
                            <div className="text-white/56">
                              {row.direction}
                              {row.isDuplicate ? (
                                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/44">
                                  Duplicate
                                </div>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {brokerFlowMode === "import" && importFlowState === "importing" && (
                  <div className="mt-8 flex min-h-[320px] items-center justify-center">
                    <div className="w-full max-w-md rounded-[24px] border border-[#fbbf24]/16 bg-[linear-gradient(135deg,rgba(251,191,36,0.08),rgba(255,255,255,0.015))] p-8 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[18px] border border-[#fbbf24]/18 bg-[#f59e0b]/10 text-[#fde68a] shadow-[0_0_24px_rgba(251,191,36,0.16)]">
                        <RefreshCw size={20} className="animate-spin" />
                      </div>
                      <div className="mt-5 text-[1.5rem] font-bold tracking-[-0.04em] text-white">
                        Syncing your trades
                      </div>
                      <div className="mt-3 text-[13px] font-medium leading-7 text-white/42">
                        Recognizing the source file, skipping duplicates, saving new trades, and refreshing analytics.
                      </div>
                    </div>
                  </div>
                )}

                {brokerFlowMode === "import" && importFlowState === "success" && (
                  <div className="mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="rounded-[24px] border border-[#fbbf24]/14 bg-[linear-gradient(135deg,rgba(251,191,36,0.10),rgba(255,255,255,0.015))] p-6">
                      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/18 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300">
                        <ShieldCheck size={12} />
                        Sync successful
                      </div>
                      <div className="mt-4 text-[1.9rem] font-bold tracking-[-0.05em] text-white">
                        Imported {normalizedImportTrades.length} completed trade{normalizedImportTrades.length === 1 ? "" : "s"}
                      </div>
                      <div className="mt-3 text-[13px] font-medium leading-7 text-white/42">
                        {duplicateImportCount} duplicate trade{duplicateImportCount === 1 ? "" : "s"} skipped • Last sync: Just now
                      </div>
                      {importNotice ? (
                        <div className="mt-3 rounded-[16px] border border-white/7 bg-white/[0.02] px-4 py-3 text-[12px] font-medium leading-6 text-white/46">
                          {importNotice}
                        </div>
                      ) : null}
                      <div className="mt-5 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            closeBrokerModal();
                            setActivePage("trades");
                          }}
                          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-[14px] border border-[#fbbf24]/20 bg-[linear-gradient(135deg,#d97706,#b45309)] px-5 py-3 text-[13px] font-bold text-white shadow-[0_0_28px_rgba(251,191,36,0.22)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_38px_rgba(251,191,36,0.34)]"
                        >
                          <span className="relative">View Trades</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => openBrokerModal("import")}
                          className="rounded-[14px] border border-white/8 bg-white/[0.03] px-5 py-3 text-[13px] font-semibold text-white/68 transition-all hover:border-white/12 hover:text-white/88"
                        >
                          Sync Another File
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowDeleteLastSyncConfirm(true)}
                          disabled={!latestExistingImportBatch?.tradeIds?.length}
                          className="rounded-[14px] border border-red-400/16 bg-red-500/8 px-5 py-3 text-[13px] font-semibold text-red-300 shadow-[0_0_18px_rgba(248,113,113,0.06)] transition-all hover:border-red-400/24 hover:shadow-[0_0_24px_rgba(248,113,113,0.10)] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Delete Last Sync
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowClearImportedConfirm(true)}
                          className="rounded-[14px] border border-red-400/16 bg-[linear-gradient(135deg,rgba(127,29,29,0.40),rgba(153,27,27,0.20))] px-5 py-3 text-[13px] font-semibold text-red-200 shadow-[0_0_18px_rgba(248,113,113,0.06)] transition-all hover:border-red-400/24 hover:shadow-[0_0_24px_rgba(248,113,113,0.10)]"
                        >
                          Clear All Imported Trades
                        </button>
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-white/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))] p-6">
                      <div className="text-[1.15rem] font-bold tracking-[-0.04em] text-white">
                        Your trade list, analytics, and monthly calendar have already updated from this sync.
                      </div>
                      <div className="mt-4 space-y-3">
                        <div className="rounded-[16px] border border-white/7 bg-white/[0.02] px-4 py-3 text-[12px] font-medium text-white/50">
                          Source: {detectedImportFormat?.sourceName || rememberedImportFormat?.sourceName || "Generic CSV"}
                        </div>
                        <div className="rounded-[16px] border border-white/7 bg-white/[0.02] px-4 py-3 text-[12px] font-medium text-white/50">
                          File: {importFileName || "Current upload"}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {brokerFlowMode === "import" && importFlowState === "error" && (
                  <div className="mt-8">
                    <div className="rounded-[24px] border border-red-400/16 bg-red-500/8 p-6">
                      <div className="text-[1.2rem] font-bold tracking-[-0.04em] text-white">
                        Import needs attention
                      </div>
                      <div className="mt-3 text-[13px] font-medium leading-7 text-red-200/80">
                        {importError || "TradeFlow could not process that CSV."}
                      </div>
                      {importDetectedHeaders.length > 0 ? (
                        <div className="mt-4 rounded-[16px] border border-white/8 bg-white/[0.03] px-4 py-3 text-[11px] font-medium leading-6 text-white/72">
                          Detected headers: {importDetectedHeaders.join(" • ")}
                        </div>
                      ) : null}
                      <div className="mt-5 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setImportFlowState("upload");
                            setImportError("");
                          }}
                          className="rounded-[14px] border border-white/8 bg-white/[0.03] px-5 py-3 text-[13px] font-semibold text-white/68 transition-all hover:border-white/12 hover:text-white/88"
                        >
                          Try Another File
                        </button>
                        <button
                          type="button"
                          onClick={closeBrokerModal}
                          className="rounded-[14px] border border-red-400/16 bg-red-500/8 px-5 py-3 text-[13px] font-semibold text-red-300 transition-all hover:border-red-400/24"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {previewImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
            <div className="relative max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[24px] border border-white/10 bg-[#080600]">
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/80 transition-all hover:text-white"
              >
                <X size={16} />
              </button>
              <img src={previewImage} alt="Preview" className="max-h-[92vh] w-full object-contain" />
            </div>
          </div>
        )}

        {showImportSummary && importSummary && (
          <div className="fixed inset-0 z-[108] flex items-center justify-center bg-black/72 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl overflow-hidden rounded-[28px] border border-[#fbbf24]/14 bg-[linear-gradient(135deg,rgba(18,13,3,0.99),rgba(10,8,2,0.98))] shadow-[0_0_60px_rgba(251,191,36,0.08)]">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-[-5%] top-[-18%] h-[260px] w-[260px] rounded-full bg-[#f59e0b]/12 blur-[110px]" />
                <div className="absolute right-[-8%] top-[8%] h-[220px] w-[220px] rounded-full bg-[#92400e]/10 blur-[110px]" />
              </div>
              <div className="hud-divider absolute inset-x-0 top-0" />

              <div className="relative p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/18 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300">
                      <ShieldCheck size={12} />
                      Import complete
                    </div>
                    <h3 className="mt-4 text-[2rem] font-bold tracking-[-0.05em] text-white glow-soft">
                      Import complete
                    </h3>
                    <p className="mt-3 max-w-xl text-[13px] font-medium leading-7 text-white/42">
                      Your trades were imported successfully. Any incomplete trades were skipped automatically, and you can review this batch now or come back later.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowImportSummary(false)}
                    className="rounded-full border border-white/10 bg-black/20 p-2 text-white/70 transition-all hover:text-white"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <div className="rounded-[20px] border border-[#fbbf24]/14 bg-[linear-gradient(135deg,rgba(251,191,36,0.08),rgba(255,255,255,0.015))] p-5">
                    <div className={L}>Trades Imported</div>
                    <div className="hud-number mt-3 text-[2.2rem] font-bold text-[#fcd34d] glow-gold">
                      {importSummary.importedCount}
                    </div>
                    <div className="mt-2 text-[11px] font-medium text-white/36">
                      {getImportSummarySourceText(importSummary)}
                    </div>
                  </div>

                  {importSummary.skippedCount > 0 ? (
                    <div className="rounded-[20px] border border-white/8 bg-white/[0.02] p-5">
                      <div className={L}>Skipped Incomplete Trades</div>
                      <div className="hud-number mt-3 text-[2.2rem] font-bold text-white/88">
                        {importSummary.skippedCount}
                      </div>
                      <div className="mt-2 text-[11px] font-medium text-white/36">
                        TradeFlow skipped anything it could not complete safely.
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-[20px] border border-emerald-400/12 bg-emerald-500/8 p-5">
                      <div className={L}>All Detected Trades Imported</div>
                      <div className="hud-number mt-3 text-[2.2rem] font-bold text-emerald-300">
                        Yes
                      </div>
                      <div className="mt-2 text-[11px] font-medium text-white/40">
                        No incomplete trades were skipped in this batch.
                      </div>
                    </div>
                  )}

                  <div className="rounded-[20px] border border-white/8 bg-white/[0.02] p-5">
                    <div className={L}>Net P&L</div>
                    <div className={`hud-number mt-3 text-[2.2rem] font-bold ${resultTone(importSummary.netPnl)}`}>
                      {formatMoney(importSummary.netPnl)}
                    </div>
                    <div className="mt-2 text-[11px] font-medium text-white/36">
                      Quick result from this imported batch
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[0.8fr_1.2fr_1.2fr]">
                  <div className="rounded-[20px] border border-white/8 bg-white/[0.02] p-4">
                    <div className={L}>Win Rate</div>
                    <div className="hud-number mt-2.5 text-[2rem] font-bold text-white/92">
                      {importSummary.importedCount ? formatPercentage(importSummary.winRate) : "—"}
                    </div>
                    <div className="mt-2 text-[11px] font-medium text-white/36">
                      Based on the trades imported in this batch
                    </div>
                  </div>

                  <div className="rounded-[20px] border border-emerald-400/12 bg-emerald-500/8 p-4">
                    <div className={L}>Best Trade</div>
                    {importSummary.bestTrade ? (
                      <>
                        <div className="mt-2.5 text-[16px] font-bold text-white">
                          {getImportSummaryTradeTitle(importSummary.bestTrade)}
                        </div>
                        <div className="mt-1 text-[12px] font-medium text-white/54">
                          {importSummary.bestTrade.pair} • {importSummary.bestTrade.direction}
                        </div>
                        <div className="mt-3 text-[1.35rem] font-bold text-emerald-300 glow-profit">
                          {formatMoney(importSummary.bestTrade.pnl)}
                        </div>
                      </>
                    ) : (
                      <div className="mt-2.5 text-[13px] font-medium text-white/42">
                        No winning trade in this batch.
                      </div>
                    )}
                  </div>

                  <div className="rounded-[20px] border border-red-400/12 bg-red-500/8 p-4">
                    <div className={L}>Worst Trade</div>
                    {importSummary.worstTrade ? (
                      <>
                        <div className="mt-2.5 text-[16px] font-bold text-white">
                          {getImportSummaryTradeTitle(importSummary.worstTrade)}
                        </div>
                        <div className="mt-1 text-[12px] font-medium text-white/54">
                          {importSummary.worstTrade.pair} • {importSummary.worstTrade.direction}
                        </div>
                        <div className={`mt-3 text-[1.35rem] font-bold ${resultTone(importSummary.worstTrade.pnl)}`}>
                          {formatMoney(importSummary.worstTrade.pnl)}
                        </div>
                      </>
                    ) : (
                      <div className="mt-2.5 text-[13px] font-medium text-white/42">
                        No completed trade landed in this batch.
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleReviewImportedTrades}
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-[14px] border border-[#fbbf24]/20 bg-[linear-gradient(135deg,#d97706,#b45309)] px-5 py-3 text-[13px] font-bold text-white shadow-[0_0_28px_rgba(251,191,36,0.22)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_38px_rgba(251,191,36,0.34)]"
                  >
                    <span className="relative">Review imported trades</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowImportSummary(false)}
                    className="rounded-[14px] border border-white/8 bg-white/[0.03] px-5 py-3 text-[13px] font-semibold text-white/68 transition-all hover:border-white/12 hover:text-white/88"
                  >
                    Done for now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showDeleteConfirm && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(18,13,3,0.99),rgba(10,8,2,0.98))] p-6 shadow-[0_0_60px_rgba(0,0,0,0.45)]">
              <h3 className="text-[22px] font-bold tracking-[-0.04em] text-white">
                Delete selected trades?
              </h3>
              <p className="mt-3 text-[13px] font-medium leading-7 text-white/42">
                This will remove {selectedTradeIds.length} selected trade
                {selectedTradeIds.length > 1 ? "s" : ""}.
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 rounded-[14px] border border-white/8 bg-white/[0.03] px-4 py-3 text-[13px] font-semibold text-white/62 transition-all hover:border-white/12 hover:text-white/88"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDeleteSelectedTrades}
                  className="flex-1 rounded-[14px] border border-red-400/18 bg-red-500/10 px-4 py-3 text-[13px] font-semibold text-red-300 transition-all hover:border-red-400/28"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {showDeleteLastSyncConfirm && latestExistingImportBatch && (
          <div className="fixed inset-0 z-[111] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(18,13,3,0.99),rgba(10,8,2,0.98))] p-6 shadow-[0_0_60px_rgba(0,0,0,0.45)]">
              <h3 className="text-[22px] font-bold tracking-[-0.04em] text-white">
                Delete the {latestExistingImportBatch.syncedCount} trades from your last sync?
              </h3>
              <p className="mt-3 text-[13px] font-medium leading-7 text-white/42">
                This will remove only the most recently imported CSV batch from{" "}
                {latestExistingImportBatch.sourceName}. Manual trades and older sync batches will stay untouched.
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowDeleteLastSyncConfirm(false)}
                  className="flex-1 rounded-[14px] border border-white/8 bg-white/[0.03] px-4 py-3 text-[13px] font-semibold text-white/62 transition-all hover:border-white/12 hover:text-white/88"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteLastSync}
                  className="flex-1 rounded-[14px] border border-red-400/18 bg-red-500/10 px-4 py-3 text-[13px] font-semibold text-red-300 transition-all hover:border-red-400/28"
                >
                  Delete Last Sync
                </button>
              </div>
            </div>
          </div>
        )}

        {showClearImportedConfirm && (
          <div className="fixed inset-0 z-[112] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(18,13,3,0.99),rgba(10,8,2,0.98))] p-6 shadow-[0_0_60px_rgba(0,0,0,0.45)]">
              <h3 className="text-[22px] font-bold tracking-[-0.04em] text-white">
                Clear all imported trades?
              </h3>
              <p className="mt-3 text-[13px] font-medium leading-7 text-white/42">
                This will remove all imported trades. This cannot be undone. Manually added trades will remain.
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowClearImportedConfirm(false)}
                  className="flex-1 rounded-[14px] border border-white/8 bg-white/[0.03] px-4 py-3 text-[13px] font-semibold text-white/62 transition-all hover:border-white/12 hover:text-white/88"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteAllImportedTrades}
                  disabled={isClearingImportedTrades}
                  className="flex-1 rounded-[14px] border border-red-400/18 bg-red-500/10 px-4 py-3 text-[13px] font-semibold text-red-300 transition-all hover:border-red-400/28"
                >
                  {isClearingImportedTrades ? "Clearing..." : "Clear Imported Trades"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
