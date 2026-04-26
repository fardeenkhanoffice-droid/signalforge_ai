import Header from "../components/Header.js";
import RiskCard from "../components/RiskCard.js";
import SignalCard from "../components/SignalCard.js";
import AnalyzeButton from "../components/AnalyzeButton.js";
import AnalyticsCard from "../components/AnalyticsCard.js";

export default function Dashboard() {
  return `
    ${Header()}
    ${RiskCard()}
    ${AnalyticsCard()}
    ${SignalCard()}
    ${AnalyzeButton()}

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
  `;
}
