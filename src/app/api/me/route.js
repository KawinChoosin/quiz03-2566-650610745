import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Kawin Chusin",
    studentId: "650610745",
  });
};
