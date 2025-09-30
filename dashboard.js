import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAC4OsROPrCgPIUPmSwYr-CghyunuDCp50",
  authDomain: "recovery-37244.firebaseapp.com",
  projectId: "recovery-37244",
  storageBucket: "recovery-37244.appspot.com",
  messagingSenderId: "28338679097",
  appId: "1:28338679097:web:e72b17cb57a00c38078ce8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const greeting = document.getElementById("userGreeting");
const logoutBtn = document.getElementById("logoutBtn");
const form = document.getElementById("reportForm");
const fileInput = document.getElementById("evidence");
const fileList = document.getElementById("fileList");
document.getElementById("year").textContent = new Date().getFullYear();

// --- Firebase auth ---
onAuthStateChanged(auth, (user) => {
  if (user) {
    const name = user.displayName || user.email;
    greeting.textContent = `Welcome, ${name}`;
    document.getElementById("fullName").value = user.displayName || "";
    document.getElementById("email").value = user.email || "";
  } else {
    window.location.href = "login.html";
  }
});

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  alert("You have been logged out.");
  window.location.href = "login.html";
});

// --- File preview ---
fileInput.addEventListener("change", () => {
  fileList.innerHTML = "";
  const file = fileInput.files[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    alert("File too large (max 5MB).");
    fileInput.value = "";
    return;
  }
  const div = document.createElement("div");
  div.textContent = `${file.name} (${(file.size/1024/1024).toFixed(2)} MB)`;
  fileList.appendChild(div);
});

// --- Clear form ---
document.getElementById("clearBtn").addEventListener("click", () => {
  form.reset();
  fileList.innerHTML = "";
});
