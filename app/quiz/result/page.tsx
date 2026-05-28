"use client";

import Link from "next/link";

export default function ResultPage() {
  const score =
    typeof window !== "undefined"
      ? Number(localStorage.getItem("quizScore"))
      : 0;

  const estimatedIQ = 85 + score * 5;

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="text-blue-400 uppercase tracking-[0.3em] text-sm mb-4">
            resultado preliminar
          </div>

          <h1 className="text-4xl font-bold mb-6">
            Sua análise cognitiva está pronta
          </h1>

          <p className="text-zinc-400 text-lg">
            Detectamos fortes padrões de inteligência analítica.
          </p>
        </div>

        {/* CARD */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-8">
          <div className="text-center">
            <div className="text-zinc-500 uppercase text-sm tracking-widest mb-3">
              QI estimado
            </div>

            <div className="text-7xl font-black blur-sm select-none mb-4">
              {estimatedIQ}
            </div>

            <div className="text-blue-400 font-bold">Resultado bloqueado</div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="bg-black/40 border border-zinc-800 rounded-2xl p-4">
              ✅ Perfil cognitivo completo
            </div>

            <div className="bg-black/40 border border-zinc-800 rounded-2xl p-4">
              ✅ Inteligência analítica
            </div>

            <div className="bg-black/40 border border-zinc-800 rounded-2xl p-4">
              ✅ Comparação populacional
            </div>

            <div className="bg-black/40 border border-zinc-800 rounded-2xl p-4">
              ✅ Pontos fortes mentais
            </div>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/checkout"
          className="
            w-full block text-center
            bg-blue-500 hover:bg-blue-400
            transition-all duration-300
            p-5 rounded-2xl
            font-bold uppercase
            shadow-[0_0_30px_rgba(59,130,246,0.5)]
          "
        >
          Desbloquear análise completa
        </Link>
      </div>
    </main>
  );
}
