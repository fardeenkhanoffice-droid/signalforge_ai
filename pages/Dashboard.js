import Header from "../components/Header.js";
import RiskCard from "../components/RiskCard.js";
import SignalCard from "../components/SignalCard.js";
import AnalyzeButton from "../components/AnalyzeButton.js";
import AnalyticsCard from "../components/AnalyticsCard.js";
import InsightsCard from "../components/InsightsCard.js";
import StrategyPage from "./strategy.js";
import { startAutoSignal } from "../core/AutoSignal.js";

export default function Dashboard() {
  return `
    ${Header()}
    ${RiskCard()}
    ${AnalyticsCard()}
    ${SignalCard()}
    ${AnalyzeButton()}
    ${InsightsCard()}

    <!-- 👑 UNLOCK PRO BUTTON -->
    <button onclick="unlockPro()"
      class="w-full py-2 mt-3 bg-yellow-500 text-black font-bold rounded-xl">
      Unlock Pro
    </button>

    <!-- 🤖 AUTO SIGNAL BUTTON -->
    <button onclick="startAuto()"
      class="w-full py-2 mt-3 bg-green-600 rounded-xl font-bold">
      Start Auto Signals
    </button>

    <!-- 📘 JOURNAL BUTTON -->
    <button onclick="toggleJournal()"
      class="w-full py-2 mt-3 bg-gray-800 rounded-xl">
      Open Journal
    </button>

    <!-- 📜 JOURNAL PANEL -->
    <div id="journalPanel"
      class="hidden mt-3 bg-gray-900 p-4 rounded-2xl max-h-60 overflow-y-auto">
      <h2 class="text-sm opacity-70 mb-2">Trade Journal</h2>
      <div id="journalList" class="text-xs"></div>
    </div>

    <!-- 🧠 STRATEGY BUTTON -->
    <button onclick="openStrategy()"
      class="w-full py-2 mt-3 bg-gray-800 rounded-xl">
      Strategy Builder
    </button>
  `;
}

/* ✅ FUNCTIONS */

// Strategy page
window.openStrategy = function () {
  const root = document.getElementById("root");
  if (!root) return;

  root.innerHTML = `
    <div class="p-4">
      <button onclick="location.reload()"
        class="mb-3 px-3 py-1 bg-gray-700 rounded">
        ← Back
      </button>

      ${StrategyPage()}
    </div>
  `;
};

// Auto signals
window.startAuto = function () {
  startAutoSignal();
  alert("Auto Signal Started 🤖");
};

// 👑 Unlock Pro
window.unlockPro = function () {
  alert("Pro feature coming soon 🚀");
};
