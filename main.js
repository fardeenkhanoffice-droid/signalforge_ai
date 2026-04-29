import App from "./App.js";

const root = document.getElementById("root");

try {
  root.innerHTML = App();
} catch (e) {
  root.innerHTML = `
    <h1 style="color:red">App Crashed</h1>
    <pre>${e.message}</pre>
  `;
  console.error(e);
}
