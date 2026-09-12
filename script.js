let simulationRunning = false;
let simulationTimer = null;

let alerts = 7;
let incidents = 1;
let trips = 3;

const states = [
    {
        name: "SAFE",
        status: "SYSTEM NOMINAL",
        attention: 100,
        alert: null
    },
    {
        name: "DISTRACTED",
        status: "WARNING",
        attention: 72,
        alert: "Driver distraction detected"
    },
    {
        name: "DROWSY",
        status: "CRITICAL",
        attention: 48,
        alert: "Driver drowsiness detected"
    },
    {
        name: "OBSTACLE_DETECTED",
        status: "CRITICAL",
        attention: 35,
        alert: "Pedestrian detected in path"
    }
];

let currentState = 0;


/* -----------------------------
   ELEMENTS
----------------------------- */

const simulationBtn = document.getElementById("simulationBtn");
const tripBtn = document.getElementById("tripBtn");

const systemStatus = document.getElementById("systemStatus");

const alertCount = document.getElementById("alertCount");
const incidentCount = document.getElementById("incidentCount");
const attention = document.getElementById("attention");
const tripCount = document.getElementById("tripCount");

const tripStatus = document.getElementById("tripStatus");
const alertsList = document.getElementById("alertsList");

const inference = document.getElementById("inference");
const cpuTemp = document.getElementById("cpuTemp");
const power = document.getElementById("power");
const latency = document.getElementById("latency");

const dashboardPage = document.getElementById("dashboardPage");
const analyticsPage = document.getElementById("analyticsPage");
const logsPage = document.getElementById("logsPage");


/* -----------------------------
   SIMULATION
----------------------------- */

simulationBtn.addEventListener("click", () => {

    simulationRunning = !simulationRunning;

    if (simulationRunning) {

        simulationBtn.textContent = "■ Stop Simulation";

        simulationBtn.classList.remove("primary");

        runSimulation();

        simulationTimer = setInterval(() => {
            runSimulation();
        }, 5000);

    } else {

        simulationBtn.textContent = "◉ Start Simulation";

        simulationBtn.classList.add("primary");

        clearInterval(simulationTimer);
    }
});


function runSimulation() {

    const state = states[currentState];

    updateState(state);
    updateMetrics();

    if (state.alert) {
        addAlert(state.alert, state.name === "DISTRACTED" ? "warning" : "critical");
    }

    currentState++;

    if (currentState >= states.length) {
        currentState = 0;
    }
}


/* -----------------------------
   UPDATE AI STATE
----------------------------- */

function updateState(state) {

    systemStatus.textContent = state.status;

    systemStatus.className = "status";

    if (state.name === "SAFE") {
        systemStatus.classList.add("safe");
    }

    else if (state.name === "DISTRACTED") {
        systemStatus.classList.add("warning");
    }

    else {
        systemStatus.classList.add("critical");
    }

    attention.textContent = `${state.attention}%`;
}


/* -----------------------------
   METRICS
----------------------------- */

function updateMetrics() {

    const newInference = (18 + Math.random() * 8).toFixed(1);
    const newTemp = (58 + Math.random() * 8).toFixed(1);
    const newPower = (3.2 + Math.random() * 1.1).toFixed(1);
    const newLatency = (15 + Math.random() * 7).toFixed(1);

    inference.textContent = newInference;
    cpuTemp.textContent = newTemp;
    power.textContent = newPower;
    latency.textContent = newLatency;
}


/* -----------------------------
   ALERTS
----------------------------- */

function addAlert(message, severity = "critical") {

    alerts++;

    alertCount.textContent = alerts;

    const alert = document.createElement("div");

    alert.className =
        severity === "warning"
            ? "alert warning-alert"
            : "alert critical-alert";

    const now = new Date();

    const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    alert.innerHTML = `
        <strong>${message}</strong>
        <small>${time}</small>
    `;

    alertsList.prepend(alert);

    /* Keep the alert list manageable */

    while (alertsList.children.length > 8) {
        alertsList.removeChild(alertsList.lastChild);
    }
}


/* -----------------------------
   START / STOP TRIP
----------------------------- */

tripBtn.addEventListener("click", () => {

    if (tripBtn.textContent === "Start Trip") {

        tripBtn.textContent = "End Trip";

        tripStatus.textContent = "Trip active • Monitoring enabled";

        tripStatus.style.color = "#10b981";

    } else {

        tripBtn.textContent = "Start Trip";

        tripStatus.textContent = "Trip completed";

        tripStatus.style.color = "#9ca3af";

        trips++;

        tripCount.textContent = trips;
    }
});


/* -----------------------------
   ANALYTICS
----------------------------- */

const analyticsBtn = document.getElementById("analyticsBtn");
const backFromAnalytics = document.getElementById("backFromAnalytics");

analyticsBtn.addEventListener("click", () => {

    dashboardPage.classList.add("hidden");
    logsPage.classList.add("hidden");

    analyticsPage.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


backFromAnalytics.addEventListener("click", () => {

    analyticsPage.classList.add("hidden");

    dashboardPage.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


/* -----------------------------
   LOGS
----------------------------- */

const logsBtn = document.getElementById("logsBtn");
const backFromLogs = document.getElementById("backFromLogs");

logsBtn.addEventListener("click", () => {

    dashboardPage.classList.add("hidden");
    analyticsPage.classList.add("hidden");

    logsPage.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


backFromLogs.addEventListener("click", () => {

    logsPage.classList.add("hidden");

    dashboardPage.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


/* -----------------------------
   INITIAL STATE
----------------------------- */

systemStatus.textContent = "CRITICAL";
systemStatus.classList.add("critical");

console.log("SENTINEL AI initialized.");
console.log("Simulation engine ready.");
