export function isProUser() {
  return localStorage.getItem("pro") === "true";
}

export function unlockPro() {
  const pass = prompt("Enter Pro Code");

  if (pass === "1234") {
    localStorage.setItem("pro", "true");
    alert("Pro Unlocked");
    location.reload();
  } else {
    alert("Invalid Code");
  }
}
