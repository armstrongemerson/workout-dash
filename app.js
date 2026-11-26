// =============================================================
//  Circuit Coach — the "brain" of the timer.
//  You don't need to edit this file to change workouts (see workout.js).
// =============================================================

const GET_READY = 10; // seconds of "get ready" before the first exercise

const $ = (id) => document.getElementById(id);
const els = {
  picker: $("picker"), round: $("round"), stage: $("stage"), phaseLabel: $("phaseLabel"),
  exName: $("exName"), gif: $("gif"), cues: $("cues"), time: $("time"), bar: $("bar"),
  next: $("next"), list: $("list"), settings: $("settings"), stations: $("stations"),
  app: document.querySelector(".app"),
  start: $("startBtn"), skip: $("skipBtn"), reset: $("resetBtn"), sound: $("soundBtn")
};

const RING = 2 * Math.PI * 54; // circumference of the timer circle
els.bar.style.strokeDasharray = RING;

let workout, steps, stepIndex, remainingMs, endsAt, running, ticker, lastBeep;
let soundOn = true, audio, wakeLock;

// ---------- build the list of steps (get ready, work, rest, ...) ----------
function buildSteps(w) {
  const s = [{ type: "ready", dur: GET_READY, ex: 0, round: 1 }];
  for (let r = 1; r <= w.rounds; r++) {
    w.exercises.forEach((_, i) => {
      s.push({ type: "work", dur: w.work, ex: i, round: r });
      const lastInRound = i === w.exercises.length - 1;
      if (!lastInRound && w.rest > 0) s.push({ type: "rest", dur: w.rest, ex: i + 1, round: r });
      if (lastInRound && r < w.rounds && w.roundRest > 0) s.push({ type: "roundRest", dur: w.roundRest, ex: 0, round: r + 1 });
    });
  }
  s.push({ type: "done", dur: 0, ex: 0, round: w.rounds });
  return s;
}

// ---------- load a workout ----------
function loadWorkout(i) {
  workout = WORKOUTS[i];
  steps = buildSteps(workout);
  stopTicker();
  running = false;
  stepIndex = 0;
  remainingMs = steps[0].dur * 1000;
  const mins = Math.round(steps.reduce((t, s) => t + s.dur, 0) / 60);
  els.settings.textContent = `${workout.work}s work · ${workout.rest}s rest · ${workout.rounds} rounds · about ${mins} min`;
  els.list.innerHTML = workout.exercises.map((e, n) =>
    `<li data-i="${n}"><img src="${e.gif}" alt=""><span class="n">${e.name}</span><span class="tick" aria-hidden="true">✓</span></li>`
  ).join("");

  // Station mode: show every station at once
  const isStations = workout.mode === "stations";
  els.app.classList.toggle("is-stations", isStations);
  els.stations.hidden = !isStations;
  els.stations.innerHTML = isStations ? workout.exercises.map((e, n) =>
    `<li><span class="num">${n + 1}</span><span class="sname">${e.name}</span>` +
    `<span class="stip">${(e.cues || []).join(" · ")}</span>` +
    `<img src="${e.gif}" alt="${e.name} demo">` +
    (e.why ? `<span class="why">★ ${e.why}</span>` : "") + `</li>`
  ).join("") : "";
  render();
}

// ---------- draw the screen ----------
function render() {
  const step = steps[stepIndex];
  const ex = workout.exercises[step.ex];
  const colors = { ready: "--ready", work: "--work", rest: "--rest", roundRest: "--rest", done: "--rest" };
  document.documentElement.style.setProperty("--phase", `var(${colors[step.type]})`);

  els.round.innerHTML = `<small>${workout.mode === "stations" ? "Lap" : "Round"}</small>${step.round} / ${workout.rounds}`;
  els.start.textContent = running ? "Pause" : (stepIndex === 0 && remainingMs === step.dur * 1000 ? "Start" : "Go");
  els.start.classList.toggle("pause", running);

  if (step.type === "done") {
    els.phaseLabel.textContent = "Finished";
    els.exName.textContent = "Great work, team!";
    els.time.textContent = "✓";
    els.bar.style.strokeDashoffset = 0;
    els.next.innerHTML = "Get some water and stretch.";
    els.cues.innerHTML = "";
    els.start.textContent = "Again";
    markList(-1, true);
    return;
  }

  if (workout.mode === "stations") { renderStations(step); return; }

  const labels = { ready: "Get ready", work: "Work", rest: "Rest · up next", roundRest: `Round break · round ${step.round} next` };
  els.phaseLabel.textContent = labels[step.type];
  els.exName.textContent = ex.name;
  if (els.gif.getAttribute("src") !== ex.gif) { els.gif.src = ex.gif; els.gif.alt = `${ex.name} demo`; }
  els.cues.innerHTML = (ex.cues || []).map((c) => `<li>${c}</li>`).join("") + (ex.why ? `<li class="why">★ ${ex.why}</li>` : "");

  const secs = Math.ceil(remainingMs / 1000);
  els.time.textContent = secs;
  els.bar.style.strokeDashoffset = RING * (1 - remainingMs / (step.dur * 1000));

  // "Up next" line during work
  const nextWork = steps.slice(stepIndex + 1).find((s) => s.type === "work");
  els.next.innerHTML = step.type === "work"
    ? (nextWork ? `Next: <b>${workout.exercises[nextWork.ex].name}</b>` : "Last one — finish strong!")
    : "Get in position.";

  markList(step.ex, false, step);
}

// Station mode screen: everyone is working at once, so show the rotation instead of one exercise
function renderStations(step) {
  const total = workout.exercises.length;
  const rotation = step.type === "work" ? step.ex + 1 : null;
  els.round.innerHTML = `<small>Lap</small>${step.round} / ${workout.rounds}`;
  els.phaseLabel.textContent = { ready: "Get ready", work: "Work", rest: "Rotate ↻", roundRest: "Rotate ↻" }[step.type];
  els.exName.textContent = step.type === "ready" ? "Go to your station"
    : rotation ? `Rotation ${rotation} of ${total}`
    : "Move to the next number";
  els.time.textContent = Math.ceil(remainingMs / 1000);
  els.bar.style.strokeDashoffset = RING * (1 - remainingMs / (step.dur * 1000));
  els.next.innerHTML = step.type === "work"
    ? "Quality reps! When it beeps, rotate."
    : `Station ${total} goes to station 1.`;
}

function markList(current, allDone, step) {
  els.list.querySelectorAll("li").forEach((li) => {
    const i = Number(li.dataset.i);
    li.classList.toggle("now", i === current);
    let done = allDone;
    if (step && !allDone) {
      // done = this exercise's "work" step for the current round is already behind us
      done = steps.slice(0, stepIndex).some((s) => s.type === "work" && s.ex === i && s.round === step.round) && i !== current;
    }
    li.classList.toggle("done", done);
  });
}

// ---------- the timer ----------
function tick() {
  remainingMs = Math.max(0, endsAt - Date.now());
  const secs = Math.ceil(remainingMs / 1000);
  if (secs <= 3 && secs > 0 && secs !== lastBeep) { beep(660, 0.12); lastBeep = secs; }
  if (remainingMs <= 0) nextStep(true);
  else render();
}

function nextStep(fromTimer) {
  stepIndex = Math.min(stepIndex + 1, steps.length - 1);
  const step = steps[stepIndex];
  remainingMs = step.dur * 1000;
  lastBeep = null;
  if (step.type === "done") { stopTicker(); running = false; if (fromTimer) beep(880, 0.8); releaseWake(); }
  else {
    if (fromTimer) beep(step.type === "work" ? 990 : 520, 0.45);
    if (running) endsAt = Date.now() + remainingMs;
  }
  render();
}

function start() {
  if (steps[stepIndex].type === "done") { loadWorkout(els.picker.value); }
  unlockAudio();
  running = true;
  endsAt = Date.now() + remainingMs;
  stopTicker();
  ticker = setInterval(tick, 100);
  keepAwake();
  render();
}
function pause() { running = false; stopTicker(); remainingMs = Math.max(0, endsAt - Date.now()); render(); }
function stopTicker() { clearInterval(ticker); ticker = null; }

// ---------- sound (iPad only plays sound after a tap, so we unlock on Start) ----------
function unlockAudio() {
  try { audio = audio || new (window.AudioContext || window.webkitAudioContext)(); audio.resume(); } catch (e) { audio = null; }
}
function beep(freq, seconds) {
  if (!soundOn || !audio) return;
  try {
    const o = audio.createOscillator(), g = audio.createGain();
    o.frequency.value = freq; o.type = "square";
    g.gain.setValueAtTime(0.15, audio.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + seconds);
    o.connect(g).connect(audio.destination);
    o.start(); o.stop(audio.currentTime + seconds);
  } catch (e) { /* no sound available */ }
}

// ---------- keep the iPad screen on while the timer runs ----------
async function keepAwake() {
  try { if ("wakeLock" in navigator && !wakeLock) wakeLock = await navigator.wakeLock.request("screen"); wakeLock?.addEventListener?.("release", () => (wakeLock = null)); }
  catch (e) { wakeLock = null; }
}
function releaseWake() { try { wakeLock?.release(); } catch (e) {} wakeLock = null; }
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible" && running) keepAwake(); });

// ---------- buttons ----------
els.start.addEventListener("click", () => (running ? pause() : start()));
els.skip.addEventListener("click", () => { if (steps[stepIndex].type !== "done") nextStep(false); });
els.reset.addEventListener("click", () => { releaseWake(); loadWorkout(els.picker.value); });
els.sound.addEventListener("click", () => {
  soundOn = !soundOn;
  els.sound.textContent = soundOn ? "Sound on" : "Sound off";
  els.sound.setAttribute("aria-pressed", String(soundOn));
});
els.picker.innerHTML = WORKOUTS.map((w, i) => `<option value="${i}">${w.name}</option>`).join("");
els.picker.addEventListener("change", () => { releaseWake(); loadWorkout(els.picker.value); });

loadWorkout(0);
