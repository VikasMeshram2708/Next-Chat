import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function GetDataFromToken(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) return undefined;
    return token;
  } catch (error) {
    throw new Error(`Something went wrong. Token Not Found ; ${error}`);
  }
}
