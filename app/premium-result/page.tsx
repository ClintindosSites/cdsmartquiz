"use client";

export default function PremiumResultPage() {
  const score =
    typeof window !== "undefined"
      ? Number(localStorage.getItem("quizScore"))
      : 0;

  const estimatedIQ = 85 + score * 5;

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="text-green-400 uppercase tracking-[0.3em] text-sm mb-4">
            acesso liberado
          </div>

          <h1 className="text-4xl font-bold mb-6">Sua análise completa</h1>

          <p className="text-zinc-400 text-lg">
            Seu perfil cognitivo foi processado com sucesso.
          </p>
        </div>

        {/* CARD RESULTADO */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-8">
          <div className="text-center mb-8">
            <div className="text-zinc-500 uppercase text-sm tracking-widest mb-3">
              QI estimado
            </div>

            <div className="text-7xl font-black text-blue-400">
              {estimatedIQ}
            </div>

            <div className="mt-4 text-green-400 font-bold">
              Acima da média populacional
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black/40 border border-zinc-800 rounded-2xl p-4">
              🧠 Alto raciocínio lógico
            </div>

            <div className="bg-black/40 border border-zinc-800 rounded-2xl p-4">
              ⚡ Excelente reconhecimento de padrões
            </div>

            <div className="bg-black/40 border border-zinc-800 rounded-2xl p-4">
              📈 Capacidade analítica acima da média
            </div>

            <div className="bg-black/40 border border-zinc-800 rounded-2xl p-4">
              🚀 Forte velocidade cognitiva
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
