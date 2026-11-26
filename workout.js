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
  {
    name: "Quick Warm-Up",
    work: 30,
    rest: 10,
    roundRest: 30,
    rounds: 2,
    exercises: [
      { name: "Jumping Jacks", gif: "gifs/jumping-jacks.svg", cues: ["Easy pace to start"] },
      { name: "High Knees",    gif: "gifs/high-knees.svg",    cues: ["Light on your toes"] },
      { name: "Squats",        gif: "gifs/squats.svg",        cues: ["Slow and controlled"] }
    ]
  }
];
