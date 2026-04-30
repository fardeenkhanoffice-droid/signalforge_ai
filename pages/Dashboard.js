import Header from "../components/Header.js";
import RiskCard from "../components/RiskCard.js";
import SignalCard from "../components/SignalCard.js";
import AnalyzeButton from "../components/AnalyzeButton.js";
import AnalyticsCard from "../components/AnalyticsCard.js";
import InsightsCard from "../components/InsightsCard.js";
import StrategyPage from "./strategy.js"; // ✅ FIXED
import { startAutoSignal } from "../core/AutoSignal.js"; // ✅ FIXED

export default function Dashboard() {
  return `
    ${Header()}
    ${RiskCard()}
    ${AnalyticsCard()}
    ${SignalCard()}
    ${AnalyzeButton()}
    ${InsightsCard()}

    <button onclick="unlockPro()"
      class="w-full py-2 mt-3 bg-yellow-500 text-black font-bold rounded-xl">
      Unlock Pro
    </button>

    <button onclick="startAuto()"
      class="w-full py-2 mt-3 bg-green-600 rounded-xl font-bold">
      Start Auto Signals
    </button>

    <button onclick="openStrategy()"
      class="w-full py-2 mt-3 bg-gray-800 rounded-xl">
      Strategy Builder
    </button>
  `;
}

/* GLOBAL FUNCTIONS */

window.openStrategy = function () {
  const root = document.getElementById("root");

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

window.startAuto = function () {
  startAutoSignal();
  alert("Auto Signal Started 🤖");
};

window.unlockPro = function () {
  alert("Pro feature coming soon 🚀");
};
