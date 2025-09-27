

import Chat from "@/components/Chat";
import { auth } from "@/lib/auth";
import { createConversation } from "@/lib/chat";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  
 const session = await auth.api.getSession({ headers: await headers() });

  if(!session?.user){
    redirect("/login")
  }
  
    const id = await createConversation(session?.user?.id);

 return (
  <Chat initialMessages={[]} conversationId={id} />
 )



}
