"use client";

import { Bell, Search, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/user-context";

const getTitleFromPath = (path: string) => {
  if (path.startsWith("/cases/")) {
    const caseId = path.split("/")[2];
    return `Case ${caseId}`;
  }
  switch (path) {
    case "/dashboard":
      return "Dashboard";
    case "/cases":
      return "All Cases";
    case "/chatbot":
      return "NyayaSathi Chatbot";
    case "/academy":
      return "e-Judiciary Academy";
    default:
      return "eCourtConnect";
  }
};

export function Header() {
  const pathname = usePathname();
  const title = getTitleFromPath(pathname);
  const { user, logout } = useUser();

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6 sticky top-0 z-30">
      <div className="flex-1">
        <h1 className="font-headline text-xl md:text-2xl font-bold text-primary">
          {title}
        </h1>
      </div>
      <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search cases, hearings..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-background"
            />
          </div>
        </form>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                {user ? (
                    <>
                        <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person casual" />
                        <AvatarFallback>
                        {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                    </>
                ) : (
                    <AvatarFallback><UserIcon /></AvatarFallback>
                )}
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {user ? (
                <>
                    <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </>
            ) : (
                <Link href="/login" passHref>
                    <DropdownMenuItem>Login</DropdownMenuItem>
                </Link>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
