// =============================================================
//  YOUR WORKOUTS LIVE HERE  ✏️
//  This is the only file you need to change to make new circuits.
//
//  work      = seconds of exercise
//  rest      = seconds of rest between exercises
//  roundRest = seconds of rest between rounds
//  rounds    = how many times through the list
//  gif       = picture file in the "gifs" folder (.gif or .svg)
//  cues      = short coaching reminders shown on screen
//
//  Tip: copy a whole { ... } block, paste it, and change the words.
//  Keep the commas between blocks!
// =============================================================

const WORKOUTS = [
  {
    name: "Strength Stations",
    mode: "stations",   // "stations" = everyone works at once, then rotates to the next number
    work: 40,           // 40 seconds of work
    rest: 20,           // 20 seconds to rotate
    roundRest: 20,      // also 20 seconds to rotate between laps
    rounds: 2,          // go around twice (about 12 minutes)
    exercises: [
      { name: "Jump Rope",             gif: "gifs/jump-rope.svg",            cues: ["Stay in place, steady rhythm", "No room? Do \"air rope\""] },
      { name: "Goblet Squats",         gif: "gifs/goblet-squats.svg",        cues: ["Bell at chest", "Sit back, chest up"] },
      { name: "Band Rows",             gif: "gifs/band-rows.svg",            cues: ["Stand on the band, flat back", "Pull handles to hips"], why: "Builds the back that protects throwing arms" },
      { name: "Push-Ups",              gif: "gifs/push-ups.svg",             cues: ["Knees are fine", "Quality reps"] },
      { name: "Kettlebell Deadlifts",  gif: "gifs/kettlebell-deadlifts.svg", cues: ["Push hips back, flat back", "Stand tall"], why: "Hip power for hitting and throwing" },
      { name: "Band Pull-Aparts",      gif: "gifs/band-pull-aparts.svg",     cues: ["Straight arms at chest height", "Squeeze shoulder blades"], why: "Arm care" }
    ]
  },
  {
    name: "Speed Ladder",
    // Everyone does the same drill: go through the ladder, jog back to the end of the line, repeat.
    work: 30,           // 30 seconds of drills (fast feet need short bursts)
    rest: 30,           // 30 seconds to recover and read the next drill
    roundRest: 60,      // 1 minute water break between rounds
    rounds: 2,          // about 12 minutes
    exercises: [
      { name: "Quick Feet",           gif: "gifs/ladder-quick-feet.svg",     cues: ["One foot in each box", "Light on your toes"], why: "Gold = left foot, blue = right foot" },
      { name: "Two In",               gif: "gifs/ladder-two-in.svg",         cues: ["Both feet in every box", "Pump your arms"] },
      { name: "Lateral Two In",       gif: "gifs/ladder-lateral-two-in.svg", cues: ["Face sideways", "Both feet in every box"], why: "First step to the ball on defense" },
      { name: "Icky Shuffle",         gif: "gifs/ladder-icky-shuffle.svg",   cues: ["In, in, out", "Switch sides every box"] },
      { name: "In & Outs",            gif: "gifs/ladder-in-outs.svg",        cues: ["Jump in together, jump out wide", "Quiet landings"] },
      { name: "Lateral In-In-Out-Out",gif: "gifs/ladder-lateral-in-out.svg", cues: ["Stand beside the ladder", "In, in, back, back"], why: "Quick feet for fielding and base running" }
    ]
  },
  {
    name: "Cone Agility",
    // Everyone does the same drill: run it, jog back to the end of your line, repeat.
    work: 30,           // 30 seconds of drills (full speed, so keep it short)
    rest: 30,           // 30 seconds to recover and read the next drill
    roundRest: 60,      // 1 minute water break between rounds
    rounds: 2,          // about 12 minutes
    exercises: [
      { name: "Zig-Zag",        gif: "gifs/cones-zig-zag.svg",  cues: ["Sprint cone to cone", "Plant your outside foot and cut"], why: "Solid = sprint · dashed = shuffle · dots = backpedal" },
      { name: "5-10-5 Shuttle", gif: "gifs/cones-5-10-5.svg",   cues: ["Start in the middle", "Touch the line each time"] },
      { name: "T-Drill",        gif: "gifs/cones-t-drill.svg",  cues: ["Sprint up, shuffle left and right", "Backpedal home"], why: "Infield range: forward, side and back" },
      { name: "Box Drill",      gif: "gifs/cones-box.svg",      cues: ["Sprint, shuffle, backpedal, shuffle", "Stay low at the corners"] },
      { name: "Figure 8",       gif: "gifs/cones-figure-8.svg", cues: ["Run tight around the cones", "Lean into the turn"], why: "Practice for rounding the bases" },
      { name: "Star Drill",     gif: "gifs/cones-star.svg",     cues: ["Sprint out, backpedal back", "Hit all 4 cones"] }
    ]
  },
  {
    name: "Full Body Blast",
    work: 40,
    rest: 20,
    roundRest: 60,
    rounds: 3,
    exercises: [
      { name: "Jumping Jacks",     gif: "gifs/jumping-jacks.svg",     cues: ["Arms all the way up", "Land soft"] },
      { name: "Squats",            gif: "gifs/squats.svg",            cues: ["Chest up", "Sit back like a chair"] },
      { name: "High Knees",        gif: "gifs/high-knees.svg",        cues: ["Knees to hip height", "Pump your arms"] },
      { name: "Push-Ups",          gif: "gifs/push-ups.svg",          cues: ["Straight line head to heels", "Knees down is OK!"] },
      { name: "Lunges",            gif: "gifs/lunges.svg",            cues: ["Front knee over ankle", "Switch legs each rep"] },
      { name: "Mountain Climbers", gif: "gifs/mountain-climbers.svg", cues: ["Hips low", "Drive knees to chest"] }
    ]
  },
];
