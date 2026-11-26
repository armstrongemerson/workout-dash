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
