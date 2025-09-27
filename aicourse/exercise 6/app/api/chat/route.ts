import {
  streamText,
  UIMessage,
  convertToModelMessages,
  validateUIMessages,
  createIdGenerator,
  stepCountIs,
  tool,
  experimental_generateImage as generateImage,
} from "ai";
import { openai } from "@ai-sdk/openai";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createMessage, loadChat } from "@/lib/chat";
import z from "zod";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // check if user login
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return Response.json(
        { error: "unAuthorized" },
        { status: 401, statusText: "unAuthorized" }
      );
    }

    // get body data
    const {
      messages,
      message: singleMessage,
      id: conversationId,
      isImage,
    } = await req.json();

    if (!conversationId) {
      return Response.json(
        { error: "conversation id is required" },
        { status: 404, statusText: "conversation id not found " }
      );
    }

    // prepare messages
    let allMessages: UIMessage[];

    if (singleMessage) {
      const prevuesMessages = await loadChat(conversationId);

      allMessages = [...prevuesMessages, singleMessage];
    } else if (messages) {
      allMessages = messages;
    } else {
      return Response.json(
        { error: "message is required" },
        { status: 404, statusText: "message not found" }
      );
    }

    // validate messages

    let validatedMessage: UIMessage[];

    try {
      validatedMessage = await validateUIMessages({
        messages: allMessages,
      });
    } catch (error) {
      return Response.json(
        { error: "message is not valid" },
        { status: 400, statusText: "message is not valid" }
      );
    }

    // call the model
    const result = streamText({
      model: openai("gpt-5"),
      messages: convertToModelMessages(validatedMessage),
      tools: {
        generateImage: tool({
          description: "Generate image with user prompt",
          inputSchema: z.object({
            prompt: z.string().describe("the prompt to generate image for "),
            isImage: z
              .boolean()
              .describe("check if isImage true generate else don`t generate")
              .default(isImage),
          }),
          execute: async ({ prompt, isImage }) => {
            if (isImage) {
              const { image } = await generateImage({
                model: openai.image("dall-e-3"),
                prompt,
                n: 1,
                size: "1024x1024",
              });

              return {
                base64: image.base64,
                uint8Array: image.uint8Array,
                mediaType: image.mediaType,
              };
            }

            return;
          },
        }),
      },
      stopWhen: stepCountIs(5),
    });

    // consume the result
    result.consumeStream();

    // return the result and save to database
    return result.toUIMessageStreamResponse({
      originalMessages: validatedMessage,
      generateMessageId: createIdGenerator({
        prefix: "msg_",
        size: 16,
      }),
      onFinish: async ({ messages }) => {
        try {
          console.log("messages", messages);

          await createMessage({ conversationId, messages });
        } catch (error) {
          console.log("error saving chat");
        }
      },
    });
  } catch (error) {
    return Response.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
