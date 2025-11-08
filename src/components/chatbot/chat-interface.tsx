"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { citizenAssistanceChatbot } from "@/ai/flows/citizen-assistance-chatbot";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to NyayaSathi. How can I assist you today? You can ask me to file a case, check a case status, or find legal aid.",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if(viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
        const response = await citizenAssistanceChatbot({ message: input, userId: "citizen-123" });
        const botMessage: Message = {
            id: Date.now() + 1,
            text: response.response,
            sender: "bot",
        };
        setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
        console.error("Chatbot error:", error);
        const errorMessage: Message = {
            id: Date.now() + 1,
            text: "Sorry, I encountered an error. Please try again.",
            sender: "bot",
        };
        setMessages((prev) => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] bg-card rounded-xl border shadow-sm">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-3",
                message.sender === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.sender === "bot" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-xs md:max-w-md lg:max-w-2xl rounded-lg p-3 text-sm",
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <p>{message.text}</p>
              </div>
               {message.sender === "user" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback><User /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
              <Avatar className="h-8 w-8">
                <AvatarFallback><Bot /></AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-lg p-3">
                 <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
