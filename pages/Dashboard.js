import Header from "../components/Header.js";
import RiskCard from "../components/RiskCard.js";
import SignalCard from "../components/SignalCard.js";
import AnalyzeButton from "../components/AnalyzeButton.js";

export default function Dashboard() {
  return `
    ${Header()}
    ${RiskCard()}
    ${SignalCard()}
    ${AnalyzeButton()}
  `;
}
