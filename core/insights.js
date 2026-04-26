import { getTrades } from "../utils/storage.js";

export function generateInsights() {
  const trades = getTrades();

  if (trades.length < 5) {
    return ["Not enough data yet"];
  }

  let insights = [];

  // 📊 WIN RATE BY TREND
  let upTrades = trades.filter(t => t.trend === "UP");
  let downTrades = trades.filter(t => t.trend === "DOWN");

  const calcWinRate = (arr) => {
    if (!arr.length) return 0;
    let wins = arr.filter(t => t.result === "WIN").length;
    return (wins / arr.length) * 100;
  };

  let upWin = calcWinRate(upTrades);
  let downWin = calcWinRate(downTrades);

  if (upWin > downWin) {
    insights.push("Better performance in UP trends");
  } else if (downWin > upWin) {
    insights.push("Better performance in DOWN trends");
  }

  // 🔻 LOSING STREAK DETECTION
  let streak = 0;
  for (let i = trades.length - 1; i >= 0; i--) {
    if (trades[i].result === "LOSS") {
      streak++;
    } else break;
  }

  if (streak >= 3) {
    insights.push("You are on a losing streak. Stop trading.");
  }

  // 📉 CONFIDENCE ANALYSIS
  let lowConfTrades = trades.filter(t => t.confidence < 70);
  let lowConfWinRate = calcWinRate(lowConfTrades);

  if (lowConfWinRate < 50 && lowConfTrades.length > 3) {
    insights.push("Avoid low confidence trades (<70%)");
  }

  // 🧠 GENERAL TIP
  insights.push("Follow risk management strictly");

  return insights;
}
