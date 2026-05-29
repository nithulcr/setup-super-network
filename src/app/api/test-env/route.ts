import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    EMAIL_USER: !!process.env.EMAIL_USER,
    EMAIL_PASS: !!process.env.EMAIL_PASS,
    NOTIFICATION_EMAIL: !!process.env.NOTIFICATION_EMAIL,
    NODE_ENV: process.env.NODE_ENV,
  });
}
