// app/api/test/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  await prisma.$connect();

  return NextResponse.json({
    message: "Database connected successfully!",
  });
}