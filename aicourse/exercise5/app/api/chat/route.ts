import { NextRequest } from "next/server";
import { openai } from "@ai-sdk/openai";
import {
  streamText,
  UIMessage,
  convertToModelMessages,
  tool,
  stepCountIs,
} from "ai";
import z from "zod";

export const maxDuration = 30;

const apikey = process.env.OMDBAPI_KEY;

export async function POST(req: NextRequest) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai("gpt-4"),
    messages: convertToModelMessages(messages),
    tools: {
      dbToo: tool({
        description:
          "Finds what the user needs (such as users, movies, or reviews), executes the database or API query, and must always return the raw data strictly in JSON format without additional text or explanations.",
        inputSchema: z.object({
          table: z
            .enum(["users", "movies", "reviews"])
            .describe("the table of the data"),
          genre: z.string().describe("the genre of the movie").optional(),
          age: z.string().describe("the age of the user").optional(),
          operator: z
            .enum(["gt", "gte", "lt", "lte"])
            .describe("the operator of ")
            .default("gte"),
        }),
        execute: async ({ table, genre, age, operator }) => {
          if (table === "users") {
            if(age){
               const response = await fetch(
              `http://localhost:3000/api/users?age=${age}&op=${operator}`
            );
           return response.json()
            }

           const response = await fetch(
              `http://localhost:3000/api/users`
            );
           return response.json()
           
          } else if (table === "movies") {
            if (genre) {
              const response = await fetch(
                `http://localhost:3000/api/movies?g=${genre}`
              );
              return response.json();
            }
            const response = await fetch(`http://localhost:3000/api/movies`);
            return response.json();
          } else {
            const response = await fetch(`http://localhost:3000/api/reviews`);
            return response.json();
          }
        },
      }),
      movieTool: tool({
        description: "Get the movie data by title ",
        inputSchema: z.object({
          title: z.string().describe("The title to get the movie for"),
          year: z.string().describe("The year to get the movie for").optional(),
        }),
        execute: async ({ title, year }) => {
          const response = await fetch(
            `http://www.omdbapi.com/?t=${title}&y=${year}&apikey=${apikey}`
          );

          console.log(response);
          return response.json();
        },
      }),
      jokeTool: tool({
        description: "Get the jok in a term",
        inputSchema: z.object({
          term: z.string().describe("The term to get the jok for").optional(),
        }),
        execute: async ({ term }) => {
          const response = await fetch(
            `https://icanhazdadjoke.com/search?term=${term}`,
            {
              headers: {
                accept: "application/json",
              },
            }
          );

          return response.body;
        },
      }),
    },
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}
