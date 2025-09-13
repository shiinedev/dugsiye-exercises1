import openAI from "openai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const openai = new openAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const chat = async (prompt) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `"Act as a professional content creator. For the given topic, generate:

Article – Clear intro, body, conclusion, informative & engaging.

Summary – Short 2–3 sentence overview + key bullet highlights.

Social Media Posts – 3 variations:

Twitter/X (≤280 chars, catchy)

LinkedIn (professional, 2–4 sentences)

Instagram/Facebook (friendly, 1–2 paragraphs + hashtags).

Tone: Articles = authoritative, Summaries = clear, Social Posts = platform-appropriate.
Output in sections: Article, Summary, Social Posts."`,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    max_completion_tokens: 150,
    temperature: 1,
  });
  return response.choices[0].message.content;
};

const result = await chat("Topic: “The Future of AI in Technology”")

const generateThumbnail = async (article) => {
 
    if (article) {
      const response = await openai.images.generate({
        model: "gpt-image-1",
        user: ``,
        prompt: `Generate a clean, modern, eye-catching thumbnail for the article. Use bold title text or a short phrase, relevant imagery/icons matching the topic, high-contrast colors, and a clear focal point optimized for small previews. about this topic or article ${article}`,
        output_format: "png",
      });

      return response.data[0].b64_json;
    }
  
};

// const image = await generateThumbnail(
//   result
// );

// if(!fs.existsSync("thumbnails")){
//     fs.mkdirSync("thumbnails");
// }


// const image_base64 = Buffer.from(image,"base64")
// fs.writeFileSync("thumbnails/tech-thumbnail.png",image_base64)

// console.log("image saved");

const generateTextToSpeech = async (text) =>{
  if(text){
     const response = await openai.audio.speech.create({
        model:"gpt-4o-mini-tts",
        input:text,
        voice:"marin",
        instructions:"Turn this article or this postUse short into a natural speech script, clear sentences for listening. Add voice cues and emotional instructions (e.g., [speak excited], [pause], [calm tone], [emphasize]). Output should be ready for text-to-speech with expressive delivery."
    });

    return response
  }  
}



const audio = await generateTextToSpeech(result);

if(!fs.existsSync("audio")){
  fs.mkdirSync("audio");
}


const mp3 = Buffer.from(await audio.arrayBuffer())

fs.writeFileSync("audio/article-to-Speech.mp3",mp3);

console.log("audio saved into audio folder");
