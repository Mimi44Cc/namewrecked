import express from "express";
import path from "path";
import {fileURLToPath} from "url";
const app=express(), __dirname=path.dirname(fileURLToPath(import.meta.url));
app.use(express.json()); app.use(express.static(path.join(__dirname,"public")));
app.post("/api/generate",(req,res)=>{
  const {name,vibe="funny",genre="pop",intensity="wrecked"}=req.body||{};
  if(!name?.trim()) return res.status(400).json({error:"Enter a name first."});
  const n=name.trim();
  const songs={
    funny:{title:`${n} Got Namewrecked`,lines:[
      `${n} walked in like they own the place,`,
      `Big main-character energy all in their face.`,
      `Said, "I'm five minutes away," then vanished from sight,`,
      `Came back with a snack like everything's alright.`
    ]},
    petty:{title:`Oh, It's ${n} Again`,lines:[
      `${n} said "I'm not petty" — we all had to laugh,`,
      `Started one little argument and wrote the whole paragraph.`,
      `Says "I'm done talking" then sends another text,`,
      `If chaos had a captain, ${n} would be next.`
    ]},
    unhinged:{title:`${n} Has Entered The Chat`,lines:[
      `Everybody hide — ${n} just walked through the door,`,
      `Nobody knows what's happening anymore.`,
      `One random idea turned into twenty-three,`,
      `And somehow ${n} says, "This is exactly what I need!"`
    ]},
    rap:{title:`The ${n} Freestyle`,lines:[
      `Yo, ${n} on the beat, everybody make room,`,
      `Walked in with a vibe that could shake the whole room.`,
      `Got jokes on deck and a plan that's brand new,`,
      `Nobody knows what ${n} is gonna do.`
    ]},
    party:{title:`Everybody Yell ${n}!`,lines:[
      `DJ turn it up, ${n} hit the floor,`,
      `Said "one more song" — now they're asking for four.`,
      `Hands in the air, let the whole room know,`,
      `When ${n} gets started, we don't go home!`
    ]},
    kid:{title:`The ${n} Show`,lines:[
      `Hey ${n}, hey ${n}, what are you doing today?`,
      `Started cleaning up, then somehow went to play.`,
      `Got a snack in one hand and a toy in the other,`,
      `Everybody's laughing — call your mother!`
    ]}
  };
  const s=songs[vibe]||songs.funny;
  const chorus=`${n}, ${n}, look what you started!\nThis little song got everybody laughing!\n${n}, ${n}, you asked for the rhyme,\nSo we had to Namewreck you one more time!`;
  const outro=intensity==="maximum"
    ? `BREAKING NEWS: ${n} has officially been Namewrecked! 💀`
    : `No hard feelings — just jokes in the booth.\n${n} brought the chaos, and that's the truth! 😂`;
  res.json({title:s.title,lyrics:`[VERSE 1]\n${s.lines.join("\n")}\n\n[CHORUS]\n${chorus}\n\n[VERSE 2]\n${n} got three new plans and forgot plan one,\nStarted a whole new adventure before the old one's done.\nSaid "I got this!" with a confident grin,\nThen looked at everybody like, "Okay... who can help me win?"\n\n[CHORUS]\n${chorus}\n\n[OUTRO]\n${outro}`,name:n,vibe,genre,intensity});
});
app.get("*",(req,res)=>res.sendFile(path.join(__dirname,"public","index.html")));
app.listen(process.env.PORT||3000,()=>console.log("NAMEWRECKED FREE running on http://localhost:3000"));