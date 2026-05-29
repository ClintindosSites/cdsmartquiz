import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
});

export async function POST() {
  try {
    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: [
          {
            id: "qi-result",
            title: "Resultado Completo de QI",
            quantity: 1,
            currency_id: "BRL",
            unit_price: 9.9,
          },
        ],

        back_urls: {
          success: "https://cdsmartquiz.vercel.app/premium-result",
          failure: "https://cdsmartquiz.vercel.app/checkout",
          pending: "https://cdsmartquiz.vercel.app/checkout",
        },

        auto_return: "approved",
      },
    });

    return NextResponse.json({
      init_point: response.init_point,
    });
  } catch (error) {
    console.log("ERRO MP:", error);

    return NextResponse.json(
      {
        error: "Erro ao criar pagamento",
      },
      { status: 500 }
    );
  }
}
