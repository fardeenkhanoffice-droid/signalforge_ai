import { getCandles } from "../services/api.js";
import { analyzeMarket } from "./analyzer.js";
import { updateSignalUI } from "../components/SignalCard.js";

let running = false;
let intervalId = null;

export function startAutoSignal() {
  if (running) {
    console.log("AutoSignal already running...");
    return;
  }

  running = true;

  intervalId = setInterval(async () => {
    try {
      const candles = await getCandles("5min");

      if (!candles || candles.length === 0) {
        console.warn("No candles data");
        return;
      }

      const result = analyzeMarket(candles);

      if (result && result.signal) {
        // Safe UI update
        if (typeof updateSignalUI === "function") {
          updateSignalUI(result);
        }

        notifyUser(result);
      }

    } catch (err) {
      console.error("AutoSignal Error:", err);
    }
  }, 15000); // every 15 sec
}

/* ✅ STOP FUNCTION (IMPORTANT) */
export function stopAutoSignal() {
  if (intervalId) {
    clearInterval(intervalId);
    running = false;
    console.log("AutoSignal stopped");
  }
}

/* 🔔 NOTIFICATION */
function notifyUser(result) {
  try {
    alert(`Signal: ${result.signal} | Expiry: ${result.expiry}`);
  } catch (e) {
    console.log("Notification error:", e);
  }
}
