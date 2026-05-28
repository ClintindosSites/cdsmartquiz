"use client";

import { useState } from "react";
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

  const question = questions[currentQuestion];

  const progress = Math.round(((currentQuestion + 1) / questions.length) * 100);

  // insights estratégicos
  const insights: Record<number, string> = {
    2: "Seu desempenho está acima de 74% das pessoas.",
    5: "Seu padrão cognitivo está acima da média.",
    8: "Poucas pessoas chegam tão longe com essa precisão.",
  };

  const finishQuiz = (finalScore: number) => {
    // salva score
    localStorage.setItem("quizScore", String(finalScore));

    // vai para análise
    router.push("/quiz/analyzing");
  };

  const handleSelect = (option: string) => {
    // impede múltiplos cliques
    if (showResult) return;

    setSelected(option);
    setShowResult(true);

    const isCorrect = option === question.answer;

    // score final da rodada
    const updatedScore = isCorrect ? score + 1 : score;

    // feedback visual
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;

      // verifica se terminou o quiz
      if (nextQuestion >= questions.length) {
        finishQuiz(updatedScore);
        return;
      }

      // mostra insight em perguntas específicas
      if (insights[currentQuestion]) {
        setInsightMessage(insights[currentQuestion]);

        // muda para tela insight
        setScreen("INSIGHT");

        // espera insight
        setTimeout(() => {
          // atualiza score
          setScore(updatedScore);

          // reseta estados
          setSelected("");
          setShowResult(false);

          // próxima pergunta
          setCurrentQuestion(nextQuestion);

          // volta tela pergunta
          setScreen("QUESTION");
        }, 2500);

        return;
      }

      // segue normal

      // atualiza score
      setScore(updatedScore);

      // limpa estados
      setSelected("");
      setShowResult(false);

      // próxima pergunta
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
          <div className="flex flex-col items-center justify-center text-center min-h-[400px] animate-pulse">
            <div className="text-blue-400 uppercase tracking-[0.3em] text-sm mb-4">
              análise cognitiva
            </div>

            <h2 className="text-4xl font-bold leading-relaxed">
              {insightMessage}
            </h2>
          </div>
        )}
      </div>
    </main>
  );
}
