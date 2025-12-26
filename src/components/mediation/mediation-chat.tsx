
'use client';

import { useState, useRef, useEffect, type FormEvent } from "react";
import { Send, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { findUser } from "@/lib/data";

interface ChatMessage {
  id: number;
  text: string;
  senderId: string;
  timestamp: string;
}

const sampleMessages: ChatMessage[] = [
    { id: 1, senderId: 'user-mediator-1', text: 'Welcome everyone to the mediation session for InfraCorp vs. GreenScape Builders. I am Samuel Green, your mediator.', timestamp: '10:00 AM' },
    { id: 2, senderId: 'user-lawyer-1', text: 'Thank you, Mr. Green. Priya Sharma here on behalf of GreenScape Builders.', timestamp: '10:01 AM' },
    { id: 3, senderId: 'user-litigant-1', text: 'Rajesh Kumar, for InfraCorp. We are ready to proceed.', timestamp: '10:01 AM' },
    { id: 4, senderId: 'user-mediator-1', text: 'Excellent. Let\'s begin by outlining the agreed upon issues. Ms. Sharma, would you like to start?', timestamp: '10:02 AM' },
];

const senderIsMediator = (senderId: string) => senderId === 'user-mediator-1';

export function MediationChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(sampleMessages);
  const [input, setInput] = useState("");
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
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      text: input,
      senderId: "user-mediator-1", // Assume mediator is sending for now
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[60vh] bg-background rounded-xl border">
       <div className="p-4 border-b">
            <h3 className="font-semibold text-lg text-primary">Secure Mediation Chat</h3>
            <p className="text-sm text-muted-foreground">This conversation is private and recorded for archival purposes.</p>
        </div>
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message) => {
            const sender = findUser(message.senderId);
            return (
                <div
                key={message.id}
                className={cn(
                    "flex items-start gap-3",
                    senderIsMediator(message.senderId) ? "justify-end" : "justify-start"
                )}
                >
                {!senderIsMediator(message.senderId) && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={sender?.avatarUrl} />
                      <AvatarFallback>{sender?.name.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                )}
                <div
                    className={cn(
                    "max-w-xs md:max-w-md lg:max-w-2xl rounded-lg p-3 text-sm",
                    senderIsMediator(message.senderId)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                >
                    <div className="flex items-baseline justify-between">
                         <p className="font-semibold">{sender?.name || 'Unknown User'}</p>
                         <time className="text-xs text-muted-foreground/80 ml-2">{message.timestamp}</time>
                    </div>
                    <p className="mt-1">{message.text}</p>
                </div>
                {senderIsMediator(message.senderId) && (
                    <Avatar className="h-8 w-8">
                       <AvatarImage src={sender?.avatarUrl} />
                      <AvatarFallback><User /></AvatarFallback>
                    </Avatar>
                )}
                </div>
            )
          })}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!input.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
