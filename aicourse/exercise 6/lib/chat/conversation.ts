import { db } from "@/db/drizzle";
import { conversation } from "@/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";


export async function getConversationsByUser(userId: string) {

    const conversations = await db.select()
    .from(conversation)
    .where(eq(conversation.userId,userId))
    .orderBy(conversation.updatedAt)

    return conversations

}


export async function createConversation(userId:string, title?:string) {

    const conversationId = nanoid();

    await db.insert(conversation).values({
        id:conversationId,
        title:title || "new conversation",
        userId,
    })
    
    return conversationId
}


export async function getConversationById(conversationId:string,userId:string) {

    const result = await db.select()
    .from(conversation)
    .where(eq(conversation.id,conversationId))
    

    const coversatation = result[0]

    if(!coversatation || coversatation.userId !== userId ){
        return null
    } 

    return coversatation
}


