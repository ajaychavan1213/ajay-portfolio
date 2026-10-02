import { NextResponse } from "next/server";
import { getPortfolioData, savePortfolioData } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET route to fetch portfolio data
export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load portfolio database." },
      { status: 500 }
    );
  }
}

// POST route to update portfolio database
export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    // Basic structure validation
    if (!payload.personalDetails || !payload.skills || !payload.projects) {
      return NextResponse.json(
        { error: "Invalid database structure." },
        { status: 400 }
      );
    }

    await savePortfolioData(payload);
    return NextResponse.json({ success: true, message: "Database saved successfully." });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to save portfolio data." },
      { status: 500 }
    );
  }
}
