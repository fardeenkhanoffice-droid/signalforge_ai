export function saveTrade(trade) {
  const history = JSON.parse(localStorage.getItem("trades")) || [];

  history.push({
    ...trade,
    note: trade.note || "",
  });

  localStorage.setItem("trades", JSON.stringify(history));
}

export function getTrades() {
  return JSON.parse(localStorage.getItem("trades")) || [];
}
