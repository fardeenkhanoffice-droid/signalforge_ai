import { getCandles } from "../services/api.js";
import { analyzeMarket } from "./analyzer.js";
import { updateSignalUI } from "../components/SignalCard.js";

let running = false;

export function startAutoSignal() {
  if (running) return;
  running = true;

  setInterval(async () => {
    const candles = await getCandles("5min");
    const result = analyzeMarket(candles);

    if (result.signal) {
      updateSignalUI(result);
      notifyUser(result);
    }
  }, 15000); // every 15 sec
}

function notifyUser(result) {
  alert(`Signal: ${result.signal} | ${result.expiry}`);
}
