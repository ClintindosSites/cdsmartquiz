"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    const response = await fetch("/api/create-payment", {
      method: "POST",
    });

    const data = await response.json();

    window.location.href = data.init_point;
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="text-blue-400 uppercase tracking-[0.3em] text-sm mb-4">
            acesso premium
          </div>

          <h1 className="text-4xl font-bold mb-6">Seu resultado está pronto</h1>

          <p className="text-zinc-400">
            Desbloqueie sua análise cognitiva completa agora.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-8">
          <div className="text-center mb-6">
            <div className="text-zinc-500 uppercase text-sm mb-2">
              pagamento único
            </div>

            <div className="text-6xl font-black">R$ 9,90</div>
          </div>

          <div className="space-y-4">
            <div className="bg-black/40 border border-zinc-800 rounded-2xl p-4">
              ✅ Resultado de QI
            </div>

            <div className="bg-black/40 border border-zinc-800 rounded-2xl p-4">
              ✅ Perfil cognitivo
            </div>

            <div className="bg-black/40 border border-zinc-800 rounded-2xl p-4">
              ✅ Comparação populacional
            </div>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="
            w-full
            bg-blue-500 hover:bg-blue-400
            transition-all
            p-5 rounded-2xl
            font-bold uppercase
          "
        >
          {loading ? "Gerando pagamento..." : "Desbloquear agora"}
        </button>
      </div>
    </main>
  );
}
