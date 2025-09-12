import openAi from "openai";
import dotenv from "dotenv";
import fs from "fs"

dotenv.config();

const openai = new openAi({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateImageWithDalle = async (prompt) => {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt:prompt,
    size:"1024x1024",
    n:1,
    style:"natural",
    quality:"hd",
    output_format:"jpeg"
  });

  return response
};


const generateImage = async (prompt) => {
  const response = await openai.images.generate({
    model: "gpt-image-1",
    prompt:prompt,
    size:"1024x1024",
    n:1,
    quality:"high",
    output_format:"jpeg"
  });

  return response.data[0].b64_json
};


if(!fs.existsSync("images")){
    fs.mkdirSync("images");
}

const image = await generateImage("generate a man with have hoodie clothes")
// const dalleImage = await generateImageWithDalle("generate a man with have hoodie clothes")



const image_base64 = Buffer.from(image,"base64")

fs.writeFileSync(`images/hoodie.png`,image_base64)
