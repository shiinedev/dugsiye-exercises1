import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { getConversationsByUser } from "@/lib/chat";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { NavUser } from "./ui/nav-user";
import { Bot, Plus } from "lucide-react";
import { Button } from "./ui/button";

export async function AppSidebar() {
  const session = await auth.api.getSession({ headers: await headers() });

  console.log(session);

  if (!session?.user) {
    redirect("/login");
  }

  const conversations = await getConversationsByUser(session.user.id);

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <Bot className="!size-5 text-foreground" />
                <span className="text-2xl text-foreground font-semibold">
                  Chat App
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarMenuButton asChild>
          <Button asChild>
            <Link href="/">
              <Plus />
              New Chat
            </Link>
          </Button>
        </SidebarMenuButton>
        <SidebarGroupLabel>Messages</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {conversations.map((conv) => (
              <SidebarMenuItem key={conv.id}>
                <SidebarMenuButton asChild>
                  <Link
                    href={`/chat/${conv.id}`}
                    className="text-muted-foreground text-lg">
                    <span>{conv.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
