"use client";

import { useState } from "react";
import Image from "next/image";
import { questions } from "@/data/questions";
import { useRouter } from "next/navigation";

export default function QuizPage() {
  const router = useRouter();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);

  const [showResult, setShowResult] = useState(false);

  const [screen, setScreen] = useState<"QUESTION" | "INSIGHT">("QUESTION");

  const [insightMessage, setInsightMessage] = useState("");
  const [insightImage, setInsightImage] = useState("");

  const question = questions[currentQuestion];

  const progress = Math.round(((currentQuestion + 1) / questions.length) * 100);

  const insights: Record<
    number,
    {
      text: string;
      image: string;
    }
  > = {
    2: {
      text: "Seu desempenho está acima de 74% das pessoas.",
      image: "/insight-1.png",
    },

    5: {
      text: "Seu padrão cognitivo está acima da média.",
      image: "/insight-2.png",
    },

    8: {
      text: "Poucas pessoas chegam tão longe com essa precisão.",
      image: "/insight-3.png",
    },
  };

  const finishQuiz = (finalScore: number) => {
    localStorage.setItem("quizScore", String(finalScore));

    router.push("/quiz/analyzing");
  };

  const handleSelect = (option: string) => {
    if (showResult) return;

    setSelected(option);
    setShowResult(true);

    const isCorrect = option === question.answer;

    const updatedScore = isCorrect ? score + 1 : score;

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;

      if (nextQuestion >= questions.length) {
        finishQuiz(updatedScore);
        return;
      }

      if (insights[currentQuestion]) {
        setInsightMessage(insights[currentQuestion].text);
        setInsightImage(insights[currentQuestion].image);

        setScreen("INSIGHT");

        setTimeout(() => {
          setScore(updatedScore);

          setSelected("");
          setShowResult(false);

          setCurrentQuestion(nextQuestion);

          setScreen("QUESTION");
        }, 7000);

        return;
      }

      setScore(updatedScore);

      setSelected("");
      setShowResult(false);

      setCurrentQuestion(nextQuestion);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {screen === "QUESTION" ? (
          <>
            {/* progresso */}
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2 text-zinc-400">
                <span>
                  Pergunta {currentQuestion + 1} de {questions.length}
                </span>

                <span>{progress}%</span>
              </div>

              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* pergunta */}
            <h1 className="text-3xl font-bold mb-8 leading-tight text-center">
              {question.question}
            </h1>

            {/* padrão */}
            {question.pattern && (
              <div className="text-4xl font-bold tracking-widest text-center mb-10 text-blue-400">
                {question.pattern}
              </div>
            )}

            {/* respostas */}
            <div className="flex flex-col gap-4">
              {question.options.map(option => (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`
                    p-5 rounded-2xl border transition-all duration-300
                    font-bold text-lg cursor-pointer

                    ${
                      showResult
                        ? option === question.answer
                          ? "bg-green-500 border-green-400 shadow-[0_0_25px_rgba(34,197,94,0.6)]"
                          : selected === option
                            ? "bg-red-500 border-red-400 shadow-[0_0_25px_rgba(239,68,68,0.6)]"
                            : "bg-zinc-900 border-zinc-800 opacity-40"
                        : "bg-zinc-900 border-zinc-800 hover:border-blue-500 hover:scale-[1.02]"
                    }
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center min-h-[500px]">
            {/* imagem */}
            <Image
              src={insightImage}
              alt="Insight"
              width={220}
              height={220}
              className="mb-8 animate-pulse"
            />

            {/* tag */}
            <div className="text-blue-400 uppercase tracking-[0.3em] text-sm mb-4">
              análise cognitiva
            </div>

            {/* texto */}
            <h2 className="text-4xl font-bold leading-relaxed mb-10">
              {insightMessage}
            </h2>

            {/* loading */}
            <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 animate-loading rounded-full" />
            </div>

            <p className="text-zinc-500 text-sm mt-4">
              Processando análise neural...
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
