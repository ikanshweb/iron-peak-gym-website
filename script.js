// ===== 1. MEMBERSHIP PLANS =====
// Each plan has a monthly and yearly price (yearly is per-month, discounted)
const plans = [
  {
    name: "Basic",
    monthly: 1499,
    yearly: 1124,
    features: ["Gym floor access", "Locker room", "1 fitness assessment"],
  },
  {
    name: "Pro",
    monthly: 2499,
    yearly: 1874,
    best: true,
    features: [
      "Everything in Basic",
      "All group classes",
      "Diet consultation",
      "Steam room",
    ],
  },
  {
    name: "Elite",
    monthly: 4999,
    yearly: 3749,
    features: [
      "Everything in Pro",
      "Personal trainer (12 sessions)",
      "Custom diet plan",
      "Priority booking",
    ],
  },
];

let period = "monthly"; // remembers which toggle is selected

function showPlans() {
  document.getElementById("planGrid").innerHTML = plans
    .map(
      (p) => `
    <div class="plan ${p.best ? "best" : ""}">
      <h3>${p.name} ${p.best ? "⭐" : ""}</h3>
      <p class="price">₹${p[period].toLocaleString("en-IN")} <small>/month</small></p>
      <ul>${p.features.map((f) => `<li>${f}</li>`).join("")}</ul>
      <a href="#trial" class="btn">Start Free Trial</a>
    </div>
  `,
    )
    .join("");
}

// Clicking Monthly/Yearly switches prices
document.querySelectorAll(".toggle-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".toggle-btn.active").classList.remove("active");
    btn.classList.add("active");
    period = btn.dataset.period;
    showPlans();
  });
});

showPlans();

// ===== 2. CLASS TIMETABLE =====
const timetable = {
  Mon: [
    ["6:00 AM", "HIIT Burn", "Rohit"],
    ["7:30 AM", "Yoga Flow", "Ananya"],
    ["6:30 PM", "CrossFit", "Vikram"],
  ],
  Tue: [
    ["6:00 AM", "Strength Basics", "Vikram"],
    ["7:00 PM", "Zumba", "Priya"],
  ],
  Wed: [
    ["6:00 AM", "HIIT Burn", "Rohit"],
    ["7:30 AM", "Yoga Flow", "Ananya"],
    ["6:30 PM", "Boxing", "Rohit"],
  ],
  Thu: [
    ["6:00 AM", "Strength Basics", "Vikram"],
    ["7:00 PM", "Zumba", "Priya"],
  ],
  Fri: [
    ["6:00 AM", "HIIT Burn", "Rohit"],
    ["6:30 PM", "CrossFit", "Vikram"],
  ],
  Sat: [
    ["8:00 AM", "Weekend Bootcamp", "All trainers"],
    ["10:00 AM", "Yoga Flow", "Ananya"],
  ],
  Sun: [["9:00 AM", "Open Gym", "-"]],
};

const dayTabs = document.getElementById("dayTabs");
const classList = document.getElementById("classList");

// Make one button per day
dayTabs.innerHTML = Object.keys(timetable)
  .map((day) => `<button class="day" data-day="${day}">${day}</button>`)
  .join("");

function showDay(day) {
  document
    .querySelectorAll(".day")
    .forEach((b) => b.classList.toggle("active", b.dataset.day === day));
  classList.innerHTML = timetable[day]
    .map(
      ([time, name, coach]) => `
    <div class="class-row">
      <span class="time">${time}</span>
      <strong>${name}</strong>
      <span>with ${coach}</span>
    </div>
  `,
    )
    .join("");
}

dayTabs.addEventListener("click", (e) => {
  if (e.target.dataset.day) showDay(e.target.dataset.day);
});

// Open on today's day automatically
const today = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
  new Date().getDay()
];
showDay(today);

// ===== 3. TRAINERS =====
const trainers = [
  { name: "Vikram Singh", role: "Strength & CrossFit" },
  { name: "Ananya Mehta", role: "Yoga & Mobility" },
  { name: "Rohit Yadav", role: "HIIT & Boxing" },
  { name: "Priya Sharma", role: "Zumba & Dance Fitness" },
];

document.getElementById("trainerGrid").innerHTML = trainers
  .map((t) => {
    // Turn "Vikram Singh" into "VS" for the round avatar
    const initials = t.name
      .split(" ")
      .map((w) => w[0])
      .join("");
    return `
    <div class="trainer">
      <div class="avatar">${initials}</div>
      <h3>${t.name}</h3>
      <span>${t.role}</span>
    </div>
  `;
  })
  .join("");

// ===== 4. BMI CALCULATOR =====
document.getElementById("bmiBtn").addEventListener("click", () => {
  const h = parseFloat(document.getElementById("height").value) / 100; // cm → metres
  const w = parseFloat(document.getElementById("weight").value);
  const result = document.getElementById("bmiResult");

  if (!h || !w) {
    result.textContent = "Please enter both height and weight.";
    return;
  }

  const bmi = (w / (h * h)).toFixed(1); // BMI formula, 1 decimal place
  let label = "Healthy range";
  if (bmi < 18.5) label = "Below the healthy range";
  else if (bmi >= 25 && bmi < 30) label = "Above the healthy range";
  else if (bmi >= 30) label = "Well above the healthy range";

  result.textContent = `Your BMI is ${bmi} · ${label}. Book a free session and our trainers will guide you.`;
});

// ===== 5. FREE TRIAL FORM =====
document.getElementById("trialForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const trial = {
    name: document.getElementById("tName").value,
    phone: document.getElementById("tPhone").value,
    goal: document.getElementById("tGoal").value,
    time: document.getElementById("tTime").value,
    bookedAt: new Date().toLocaleString(),
  };

  const all = JSON.parse(localStorage.getItem("trials") || "[]");
  all.push(trial);
  localStorage.setItem("trials", JSON.stringify(all));

  document.getElementById("trialMsg").textContent =
    `You're in, ${trial.name}! 💪 We'll call you to confirm your ${trial.time.split(" ")[0].toLowerCase()} trial.`;
  e.target.reset();
});
