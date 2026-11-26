# Circuit Coach 🏋️

A self-service bodyweight circuit timer for my athletes, made to run on an iPad.

- The whole circuit stays on screen the entire time
- Each move has an animated demo
- The timer colors are big and easy to read: **yellow** = get ready, **red** = work, **teal** = rest
- It beeps for 3-2-1 and when a new exercise starts
- The screen stays awake while the timer runs

## Change the workouts ✏️

Open **`workout.js`** and edit the words and numbers. That's the only file you need to touch.

## Add your own GIFs 🎞️

1. Film the move on your phone (3–5 seconds is plenty).
2. Turn it into a GIF at https://ezgif.com/video-to-gif
3. Put the file in the `gifs` folder (for example `gifs/burpees.gif`).
4. In `workout.js`, set `gif: "gifs/burpees.gif"`.

## Put it online (free, with GitHub Pages)

1. In this repo, go to **Settings → Pages**.
2. Under **Branch**, choose `main` and `/ (root)`, then click **Save**.
3. Wait about 1 minute. Your link will be `https://YOUR-USERNAME.github.io/circuit-coach/`.

## Set up the iPad 📱

1. Open your link in **Safari**.
2. Tap **Share → Add to Home Screen**.
3. Turn on **Guided Access** so the athletes stay in the app: Settings → Accessibility → Guided Access.
4. Optional: Settings → Display & Brightness → Auto-Lock → Never.

## Files

| File | What it does |
|---|---|
| `index.html` | The page layout (the skeleton) |
| `style.css` | Colors, sizes and fonts (the look) |
| `app.js` | The timer logic (the brain) |
| `workout.js` | Your workouts (the part you edit) |
| `gifs/` | Exercise demos |
