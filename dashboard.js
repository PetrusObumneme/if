import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

// === CONFIG ===
const firebaseConfig = {
  apiKey: "AIzaSyAC4OsROPrCgPIUPmSwYr-CghyunuDCp50",
  authDomain: "recovery-37244.firebaseapp.com",
  projectId: "recovery-37244",
  storageBucket: "recovery-37244.firebasestorage.app",
  messagingSenderId: "28338679097",
  appId: "1:28338679097:web:e72b17cb57a00c38078ce8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Elements
const greeting = document.getElementById("userGreeting");
const logoutBtn = document.getElementById("logoutBtn");
const form = document.getElementById("reportForm");
const fileInput = document.getElementById("evidence");
const fileList = document.getElementById("fileList");
const toast = document.getElementById("toast");
document.getElementById("year").textContent = new Date().getFullYear();

// --- Auth handler ---
onAuthStateChanged(auth, (user) => {
  if (user) {
    const name = user.displayName || user.email;
    greeting.textContent = `Welcome, ${name}`;
    document.getElementById("fullName").value = user.displayName || "";
    document.getElementById("email").value = user.email || "";
  } else {
    window.location.href = "login.html"; // redirect if not logged in
  }
});

// --- Logout ---
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  showToast("You have been logged out.");
  setTimeout(() => window.location.href = "login.html", 1000);
});

// --- File preview + validation ---
fileInput.addEventListener("change", () => {
  fileList.innerHTML = "";
  const files = Array.from(fileInput.files).slice(0, 5);

  files.forEach(f => {
    if (f.size > 5 * 1024 * 1024) {
      showToast(`File ${f.name} is too large (max 5MB).`);
      return;
    }
    const div = document.createElement("div");
    div.textContent = `${f.name} (${(f.size/1024/1024).toFixed(2)} MB)`;
    fileList.appendChild(div);
  });
});

// --- Toast helper ---
function showToast(msg, ms = 4000) {
  toast.textContent = msg;
  toast.classList.remove("hidden");
  toast.classList.add("show");
  setTimeout(() => { 
    toast.classList.remove("show"); 
    toast.classList.add("hidden"); 
  }, ms);
}

// --- Form submission ---
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!document.getElementById("consent").checked) {
    showToast("Please give consent before submitting.");
    return;
  }

  const fd = new FormData(form);

  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: fd,
      headers: { "Accept": "application/json" }
    });

    if (res.ok) {
      showToast("✅ Please wait, we will recover your money shortly.", 6000);
      form.reset();
      fileList.innerHTML = "";
    } else {
      showToast("❌ Submission failed. Please try again later.");
    }
  } catch (err) {
    console.error(err);
    showToast("⚠️ Network error. Check your connection.");
  }
});

// --- Clear button ---
document.getElementById("clearBtn").addEventListener("click", () => {
  form.reset();
  fileList.innerHTML = "";
});
