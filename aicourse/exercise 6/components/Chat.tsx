"use client";
import { useSession } from "@/lib/auth-client";
import { DefaultChatTransport, UIMessage } from "ai";
import React, { Fragment, useState } from "react";
import { useChat } from "@ai-sdk/react";
import {
  PromptInput,
  PromptInputBody,
  PromptInputButton,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Streamdown } from "streamdown";
import { CopyIcon, ImageIcon, RefreshCcwIcon } from "lucide-react";
import { Image } from "./ai-elements/image";
import { useRouter } from "next/navigation";
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "./ai-elements/sources";
import { Action, Actions } from "./ai-elements/actions";
import { Response } from "./ai-elements/response";
import { Loader } from "./ai-elements/loader";

interface chatProps {
  initialMessages?: UIMessage[];
  conversationId?: string;
}

const Chat = ({ initialMessages = [], conversationId }: chatProps) => {
  const [input, setInput] = useState("");
  const [isImage, setIsImage] = useState(false);
  const { data: session } = useSession();

  const router = useRouter();

  const { messages, sendMessage, status, regenerate } = useChat({
    id: conversationId,
    messages: initialMessages,
    transport: new DefaultChatTransport({
      api: "/api/chat",
      prepareSendMessagesRequest({ messages, id }) {
        return {
          body: {
            message: messages[messages.length - 1],
            id,
            isImage,
          },
        };
      },
    }),
  });

  const handleSubmit = async () => {
    sendMessage({
      text: input,
    });
    setInput("");
    router.replace(`/chat/${conversationId}`);
  };

  if (!session?.user.id) {
    return null;
  }

  return (
    <div className="h-full flex w-full">
      {/* Chat Panel */}
      <div className="flex flex-col w-full">
        <div className="flex-1 overflow-y-auto ">
          {messages.length === 0 ? (
            <div className="text-center font-semibold mt-8">
              <p className="text-3xl mt-4">What can we build together?</p>
            </div>
          ) : (
            <>
              <Conversation>
                <ConversationContent>
                  {messages.map((msg, index) => (
                    <div key={index}>
                      {msg.role === "assistant" &&
                        msg.parts.filter((part) => part.type === "source-url")
                          .length > 0 && (
                          <Sources>
                            <SourcesTrigger
                              count={
                                msg.parts.filter(
                                  (part) => part.type === "source-url"
                                ).length
                              }
                            />
                            {msg.parts
                              .filter((part) => part.type === "source-url")
                              .map((part, i) => (
                                <SourcesContent key={`${msg.id}-${i}`}>
                                  <Source
                                    key={`${msg.id}-${i}`}
                                    href={part.url}
                                    title={part.url}
                                  />
                                </SourcesContent>
                              ))}
                          </Sources>
                        )}
                      <Message from={msg.role} key={index}>
                        {msg.parts.map((part, i) => {
                          switch (part.type) {
                            case "text":
                              return (
                                <Fragment key={`${msg.id}-${i}`}>
                                  <Message from={msg.role}>
                                    <MessageContent>
                                      <Response>{part.text}</Response>
                                    </MessageContent>
                                  </Message>
                                </Fragment>
                              );

                            case "tool-generateImage": {
                              console.log("output", part.output);
                              const imageData: any = part.output;

                              return (
                                <div className="flex justify-center">
                                  <Image
                                    {...imageData}
                                    alt="Generated image"
                                    className="h-[300px] aspect-square border rounded-lg"
                                  />
                                </div>
                              );
                            }

                            default:
                              return null;
                          }
                        })}
                      </Message>
                       {status === 'submitted' && <Loader />}
                    </div>
                  ))}
                </ConversationContent>
                <ConversationScrollButton />
              </Conversation>
            </>
          )}
        </div>

        {/* Input */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <PromptInput
              onSubmit={handleSubmit}
              className="mt-4 w-full  mx-auto relative">
              <PromptInputBody>
                <PromptInputTextarea
                  onChange={(e) => setInput(e.target.value)}
                  disabled={!status}
                  value={input}
                  className="pr-12 min-h-[60px]"
                />
              </PromptInputBody>
              <PromptInputToolbar>
                <PromptInputTools>
                  <PromptInputButton
                    onClick={() => setIsImage(!isImage)}
                    variant={isImage ? "destructive" : "outline"}>
                    <ImageIcon size={16} />
                    <span>Image</span>
                  </PromptInputButton>
                </PromptInputTools>
                <PromptInputSubmit
                  disabled={!input && !status}
                  status={status}
                />
              </PromptInputToolbar>
            </PromptInput>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
