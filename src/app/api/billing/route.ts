import { NextRequest, NextResponse } from "next/server";
import { getUserSubscription, updateUserSubscription, getCreditTransactions } from "@/lib/ai-service";

export async function GET() {
  const sub = getUserSubscription();
  const txs = getCreditTransactions();
  return NextResponse.json({
    status: "success",
    subscription: sub,
    transactions: txs
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { plan, paymentGateway } = body;

    if (!plan || !['FREE', 'PRO', 'BUSINESS'].includes(plan)) {
      return NextResponse.json(
        { status: "error", message: "Plan tidak valid" },
        { status: 400 }
      );
    }

    const updated = updateUserSubscription(plan, paymentGateway || 'Midtrans');

    return NextResponse.json({
      status: "success",
      message: `Berhasil checkout & upgrade paket ke ${plan} via ${paymentGateway || 'Midtrans'}`,
      data: updated
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message || "Checkout Failed" },
      { status: 500 }
    );
  }
}
