import { getTrades } from "../utils/storage.js";

export function calculateStats() {
  const trades = getTrades();

  if (!trades.length) {
    return {
      total: 0,
      wins: 0,
      losses: 0,
      winRate: 0,
    };
  }

  let wins = trades.filter(t => t.result === "WIN").length;
  let losses = trades.filter(t => t.result === "LOSS").length;

  let winRate = ((wins / trades.length) * 100).toFixed(1);

  return {
    total: trades.length,
    wins,
    losses,
    winRate,
  };
}
