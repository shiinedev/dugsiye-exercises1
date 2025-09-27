import { AppSidebar } from "@/components/app-sidebar";
import Chat from "@/components/Chat";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/ui/site-header";
import { auth } from "@/lib/auth";
import {
  getConversationById,
  loadChat,
} from "@/lib/chat";
import { UIMessage } from "ai";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

interface chatProps {
  params: Promise<{ id: string }>;
}

const ChatPage = async ({ params }: chatProps) => {
  const { id } = await params;

  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/login");
  }

  const conversation = await getConversationById(id, session.user.id);
  if (!conversation) {
    redirect("/");
  }

  const messages: UIMessage[] = await loadChat(id);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar  />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
              <Chat initialMessages={messages} conversationId={id} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
    
  );
};

export default ChatPage;

