import openAi from "openai"
import dotenv from "dotenv"
import fs from "fs"

dotenv.config();
const openai = new openAi({
    apiKey:process.env.OPENAI_API_KEY
})

const speaker1 = await openai.audio.speech.create({
    model:"gpt-4o-mini-tts",
    voice:"cedar",
    input:"Alright everyone, let’s begin. Today’s session is about team collaboration under pressure. I’ll walk you through the rules step by step. First rule: listen before reacting.",
    instructions:"Speak slowly, with a steady and reassuring tone"
})
const speaker2 = await openai.audio.speech.create({
    model:"gpt-4o-mini-tts",
    voice:"cedar",
    input:"“Ohhh, I love this! Finally, something practical! So, what do we do if, like, two people start talking at the same time? Should I just shout louder?",
    instructions:"Speak fast, with enthusiasm, almost bouncing in tone"
})


if(!fs.existsSync("audio")){
    fs.mkdirSync("audio")
}


const mp3 = Buffer.from(await speaker2.arrayBuffer())

fs.writeFileSync("audio/speaker2.mp3",mp3) 

console.log("file saved with audio");
