export default function AnalyzeButton() {
  return `
    <button onclick="analyzeMarket()"
      class="w-full py-3 rounded-2xl bg-cyan-400 text-black font-bold">
      Analyze Market
    </button>
  `;
}

window.analyzeMarket = function () {
  alert("Analyzing market (next step will add real logic)");
};
