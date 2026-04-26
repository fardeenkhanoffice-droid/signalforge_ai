export default function SignalCard() {
  return `
    <div class="bg-gray-900 p-4 rounded-2xl">
      <h2 class="text-sm opacity-70">Current Signal</h2>

      <div id="signalBox" class="mt-3">
        <p class="text-lg font-bold">No Signal Yet</p>
        <p class="text-xs opacity-60">
          Waiting for analysis...
        </p>
      </div>

      <!-- ✅ NOTE INPUT -->
      <input id="tradeNote"
        placeholder="Add note (optional)"
        class="w-full mt-3 p-2 rounded bg-gray-800 text-white text-sm"/>

      <div class="flex gap-2 mt-4">
        <button onclick="markWin()"
          class="flex-1 py-2 bg-green-500 rounded-xl font-bold">
          WIN
        </button>

        <button onclick="markLoss()"
          class="flex-1 py-2 bg-red-500 rounded-xl font-bold">
          LOSS
        </button>
      </div>
    </div>
  `;
}

export function updateSignalUI(result) {
  const box = document.getElementById("signalBox");
  if (!box) return;

  if (!result || !result.signal) {
    box.innerHTML = `
      <p class="text-yellow-400 font-bold">No Trade</p>
      <p class="text-xs opacity-60">
        ${result?.message || "Market conditions not clear"}
      </p>
    `;
    return;
  }

  const color =
    result.signal === "CALL"
      ? "text-green-400"
      : result.signal === "PUT"
      ? "text-red-400"
      : "text-yellow-400";

  box.innerHTML = `
    <p class="text-lg font-bold ${color}">
      ${result.signal}
    </p>

    <p class="text-xs mt-1">Trend: ${result.trend || "N/A"}</p>
    <p class="text-xs">Confidence: ${result.confidence ?? "N/A"}%</p>
    <p class="text-xs">Expiry: ${result.expiry || "N/A"}</p>

    <p class="text-xs mt-2 opacity-70">
      ${result.reason || ""}
    </p>
  `;
}

/* ✅ RESULT BUTTON LOGIC WITH NOTE */

window.markWin = function () {
  if (!window.lastSignal) {
    return alert("No signal to mark");
  }

  saveResult("WIN");
  alert("Marked as WIN ✅");
};

window.markLoss = function () {
  if (!window.lastSignal) {
    return alert("No signal to mark");
  }

  saveResult("LOSS");
  alert("Marked as LOSS ❌");
};

function saveResult(status) {
  const history = JSON.parse(localStorage.getItem("tradeHistory")) || [];

  // ✅ GET NOTE VALUE
  const noteInput = document.getElementById("tradeNote");
  const note = noteInput ? noteInput.value : "";

  history.push({
    ...window.lastSignal,
    result: status,
    note: note, // ✅ save note
    time: new Date().toLocaleString(),
  });

  localStorage.setItem("tradeHistory", JSON.stringify(history));

  // ✅ optional: clear input after save
  if (noteInput) noteInput.value = "";
}
