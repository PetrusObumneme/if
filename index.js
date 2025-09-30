// dashboard.js

// Show current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Personalized greeting
const fullNameInput = document.getElementById("fullName");
const greeting = document.getElementById("userGreeting");

fullNameInput.addEventListener("input", () => {
  if (fullNameInput.value.trim() !== "") {
    greeting.textContent = "Welcome, " + fullNameInput.value.trim();
  } else {
    greeting.textContent = "Welcome, Guest";
  }
});

// Clear form
document.getElementById("clearBtn").addEventListener("click", () => {
  document.getElementById("reportForm").reset();
  greeting.textContent = "Welcome, Guest";
  document.getElementById("fileList").innerHTML = "";
});

// File list preview
document.getElementById("evidence").addEventListener("change", function () {
  const fileList = document.getElementById("fileList");
  fileList.innerHTML = "";
  for (let i = 0; i < this.files.length; i++) {
    const li = document.createElement("div");
    li.textContent = this.files[i].name;
    fileList.appendChild(li);
  }
});

// Submit form popup message
document.getElementById("reportForm").addEventListener("submit", function () {
  alert("Please wait, we will recover your money in a short while.");
});


