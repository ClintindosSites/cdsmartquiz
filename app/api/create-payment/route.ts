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
            title: "Resultado Completo de QI",
            quantity: 1,
            currency_id: "BRL",
            unit_price: 9.9,
          },
        ],

        back_urls: {
          success: "http://localhost:3000/premium-result",
          failure: "http://localhost:3000/checkout",
          pending: "http://localhost:3000/checkout",
        },

        auto_return: "approved",
      },
    });

    console.log(response);

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
