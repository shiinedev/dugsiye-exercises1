import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const generateBlog = async (topic, question) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates blog post outlines, summaries, and sample answers based on the provided topic. If the answer is not in the context, say 'no'.",
        },
        {
          role: "user",
          content: `Generate a blog post outline for the topic: "${topic}". Then summarize it in 2 sentences.`,
        },

        {
          role: "user",
          content: `based on the same Topic:${topic} and answer these questions${question} into sample answer`,
        },
      ],
      stream: true,
      max_completion_tokens: 150,
      temperature:1
    });
    let fullResponse = "";
    for await (const chunk of response) {
      let content = chunk.choices[0].delta.content || "";
      process.stdout.write(content);

      if (content) {
        fullResponse += content;
      }
    }
    return fullResponse;
  } catch (error) {
    console.log(error);
  }
};

const result = await generateBlog(
  "generate sample blog about programming",
  "what is the first programming language?"
);
console.log(result);

