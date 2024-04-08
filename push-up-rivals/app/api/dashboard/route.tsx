import { getTodaysPushups } from "@/app/actions/dashboardActions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const body = await request.json();
	const todaysPusups = await getTodaysPushups(body.userId);

	return NextResponse.json({ data: todaysPusups });
}
