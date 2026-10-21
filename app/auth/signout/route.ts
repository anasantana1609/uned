import { NextRequest, NextResponse } from "next/server";
import { serverClient } from "@/lib/supabase/server";
export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== new URL(request.url).origin)
    return new NextResponse("Origen no permitido", { status: 403 });
  const client = await serverClient();
  await client?.auth.signOut();
  return NextResponse.redirect(new URL("/login", request.url), 303);
}
