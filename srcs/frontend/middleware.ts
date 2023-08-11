import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { FRONT_URL, API_PATH } from "@/config";

async function verifyJWT(token: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_PATH}/auth/validate`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const data = await response.json();
    return data.valid;
  } catch (err) {
    return false;
  }
}

export async function middleware(
  request: NextRequest,
): Promise<NextResponse | null> {
  const token = request.cookies.get("jwt");

  if (!token || !(await verifyJWT(token.value))) {
    return NextResponse.redirect(FRONT_URL);
  }

  // JWT is valid
  return null;
}

export const config = {
  matcher: ["/((?!api|auth|_next/static|_next/image|favicon.ico).+)"], // ?! means "NOT"
};
