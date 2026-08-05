import { NextRequest, NextResponse } from "next/server";
import { generateProductResearchAI, getResearchHistory, saveResearchResult } from "@/lib/ai-service";
import { ProductResearchInput } from "@/types/ai-employees";

export async function GET() {
  const history = getResearchHistory();
  return NextResponse.json({
    status: "success",
    data: history
  });
}

export async function POST(req: NextRequest) {
  try {
    const body: ProductResearchInput = await req.json();

    if (!body.keyword) {
      return NextResponse.json(
        { status: "error", message: "Keyword produk wajib diisi" },
        { status: 400 }
      );
    }

    const result = generateProductResearchAI(body);
    saveResearchResult(result);

    return NextResponse.json({
      status: "success",
      message: "Analisa Product Research berhasil dihasilkan oleh AI-01",
      data: result
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
