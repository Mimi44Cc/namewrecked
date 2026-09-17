import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const templates = {
  funny: [
    "{n} walked in like they own the place,",
    "Big main-character energy all over their face.",
    "Said, 'I'm five minutes away,' then vanished from sight,",
    "Came back with a snack like everything's alright."
  ],
  petty: [
    "{n} said 'I'm not petty' — we all had to laugh,",
    "Started one little argument and wrote the whole paragraph.",
    "Says 'I'm done talking' then sends another text,",
    "If chaos had a captain, {n} would be next."
  ],
  unhinged: [
    "Everybody hide — {n} just walked through the door,",
    "Nobody knows what's happening anymore.",
    "One random idea turned into twenty-three,",
    "And somehow {n} says, 'This is exactly what I need!'"
  ],
  rap: [
    "Yo, {n} on the beat, everybody make room,",
    "Walked in with a vibe that could shake the whole room.",
    "Got jokes on deck and a plan that's brand new,",
    "Nobody knows what {n} is gonna do."
  ],
  party: [
    "DJ turn it up, {n} hit the floor,",
    "Said 'one more song' — now they're asking for four.",
    "Hands in the air, let the whole room know,",
    "When {n} gets started, we don't go home!"
  ],
  kid: [
    "Hey {n}, hey {n}, what are you doing today?",
    "Started cleaning up, then somehow went to play.",
    "Got a snack in one hand and a toy in the other,",
    "Everybody's laughing — call your mother!"
  ]
};

const genreFlavor = {
  pop: "Sugar-rush hooks and shiny pop energy.",
  "hip-hop": "Big drums, punchy bars, and swagger.",
  "r-and-b": "Smooth late-night bounce with silky attitude.",
  country: "Front-porch twang with a boot-stomping grin.",
  dance: "Club energy, four-on-the-floor chaos, hands up.",
  rock: "Loud guitars, big crashes, and rebellious energy."
};

app.post("/api/generate", (req, res) => {
  const {
    name,
    vibe = "funny",
    genre = "pop",
    intensity = "wrecked"
  } = req.body || {};

  if (!name?.trim()) {
    return res.status(400).json({ error: "Enter a name first." });
  }

  const n = name.trim().replace(/[<>]/g, "");
  const chosen = templates[vibe] || templates.funny;

  const verse = chosen.map(line => line.replaceAll("{n}", n));

  const chorus = `${n}, ${n}, look what you started!
This little song got everybody laughing!
${n}, ${n}, you asked for the rhyme,
So we had to Namewreck you one more time!`;

  const extra =
    intensity === "mild"
      ? `${n} has entered the chat with a smile,
Keeping it silly in Namewrecked style.`
      : intensity === "maximum"
        ? `BREAKING NEWS: ${n} has officially been Namewrecked!
The group chat has requested a sequel! 💀
Even the beat said, "I need a minute!"`
        : `Three new plans and forgot plan one,
Started a whole new adventure before the old one's done.
Said "I got this!" with a confident grin,
Then looked at everybody like, "Okay... who can help me win?"`;

  res.json({
    title: `${n} Got Namewrecked`,
    lyrics: `[VERSE 1]
${verse.join("\n")}

[CHORUS]
${chorus}

[VERSE 2]
${extra}

[CHORUS]
${chorus}

[OUTRO]
${genreFlavor[genre] || genreFlavor.pop}
No hard feelings — just jokes in the booth. 😂`,
    name: n,
    vibe,
    genre,
    intensity
  });
});

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`NAMEWRECKED running on port ${port}`);
});
