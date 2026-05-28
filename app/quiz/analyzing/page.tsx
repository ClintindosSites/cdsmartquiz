"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AnalyzingPage() {
  const router = useRouter();

  const [progress, setProgress] = useState(0);

  const messages = [
    "Analisando padrões neurais...",
    "Comparando respostas cognitivas...",
    "Calculando inteligência analítica...",
    "Gerando perfil cognitivo...",
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            router.push("/quiz/result");
          }, 500);

          return 100;
        }

        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [router]);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMessageIndex(prev => {
        if (prev >= messages.length - 1) {
          return prev;
        }

        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(msgInterval);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <div className="w-24 h-24 rounded-full border-4 border-blue-500 border-t-transparent animate-spin mx-auto" />
        </div>

        <h1 className="text-4xl font-bold mb-6">Análise em andamento</h1>

        <p className="text-zinc-400 text-lg mb-10 min-h-[60px]">
          {messages[messageIndex]}
        </p>

        <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-blue-400 font-bold text-xl">{progress}%</div>
      </div>
    </main>
  );
}
