"use client";

import { useEffect, useState, useRef } from "react";
import { analyzeProducts } from "../../usecase/analyzeProducts";
import { getAllProducts } from "../../infrastructure/productRepository";
import { Product } from "../../entities/product";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function assistant() {
  const [products, setProducts] = useState<Product[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadData() {
      const data = await getAllProducts();
      setProducts(data);
    }
    loadData();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  async function handleAsk() {
    if (!query.trim()) return;

    const userMsg: Message = { role: "user", content: query };
    setMessages((prev) => [...prev, userMsg]);
    setQuery("");
    setLoading(true);

    const aiResult = await analyzeProducts(products, query);

    const aiMsg: Message = { role: "ai", content: aiResult };
    setMessages((prev) => [...prev, aiMsg]);
    setLoading(false);
  }

  useEffect(() => {
    const storage = localStorage.getItem("messages");
    if (storage) {
      setMessages(JSON.parse(storage));
    } else {
      setMessages([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  function handleDelete() {
    setMessages([]);
    localStorage.setItem("message", JSON.stringify([]));
  }

  return (
    <main className="flex flex-col h-screen max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 flex">
        <img className="w-10 " src="image.png" alt="" /> Produk Assistant
      </h1>

      <Card className="flex-1 flex flex-col">
        <CardContent className="flex-1 p-0">
          <ScrollArea className="h-[70vh] p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "ai" && (
                    <Avatar>
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={`rounded-2xl px-4 py-2 max-w-[75%] shadow-sm ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>

                  {msg.role === "user" && (
                    <Avatar>
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-start gap-2">
                  <Avatar>
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 text-gray-900 rounded-2xl px-4 py-2 shadow-sm">
                    Sedang mengetik...
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>

        <div className="flex items-center gap-2 border-t p-4">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            placeholder="Tanyakan sesuatu tentang produk..."
            disabled={loading}
          />
          <Button onClick={handleAsk} disabled={loading || !query.trim()}>
            <Send className="w-4 h-4" />
          </Button>
          <Button onClick={handleDelete}>delete</Button>
        </div>
      </Card>
    </main>
  );
}
