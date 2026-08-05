import { NextResponse } from "next/server";
import { getSaaSAnalytics } from "@/lib/ai-service";

export async function GET() {
  const analytics = getSaaSAnalytics();
  return NextResponse.json({
    status: "success",
    data: analytics
  });
}
