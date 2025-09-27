import { db } from "@/db/drizzle";
import { conversation, message } from "@/db/schema";
import { eq } from "drizzle-orm";
import {UIMessage} from "ai"



export async function loadChat(conversationId:string):Promise<UIMessage[]> {

    const messages = await db.select()
    .from(message)
    .where(eq(message.conversationId,conversationId))
    .orderBy(message.createdAt)

    return messages.map(msg =>({
        id:msg.id,
        role:msg.role as "assistant"  | "user",
        parts:[{ type: 'text' as const, text: msg.content }]
    }))

   
    
}


export async function createMessage({conversationId,messages}:{conversationId:string,messages:UIMessage[]}):Promise<void> {


    /// get conversation
    const conv = await db.select({userId:conversation.userId})
    .from(conversation)
    .where(eq(conversation.id,conversationId))
    .limit(1)


    // check id conversation ids not empty
    if(conv.length === 0) {
        throw new Error("Chat not found")
    }

    // get existing messages
    const existingMessages = await db.select({id:message.id})
    .from(message)
    .where(eq(message.conversationId,conversationId))
    
    const existingIds = new Set( existingMessages.map((m) => m.id))

    const newMessages = messages.filter(msg => !existingIds.has(msg.id));

    if(newMessages.length > 0){
        const messageData = newMessages.map(msg =>{
          const  part = msg.parts.find( p => p.type === "text");
          const  content =  part?.text || "";

          return {
            id:msg.id,
            content,
            role:msg.role,
            conversationId,
            userId:conv[0].userId
          }
        })

         await db.insert(message).values(messageData)
    }


}