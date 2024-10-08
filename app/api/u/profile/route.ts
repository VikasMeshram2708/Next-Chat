import { ErrorHandler } from "@/lib/ErrorHandler";
import { GetDataFromToken } from "@/lib/GetDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const token = await GetDataFromToken(request);

    if (!token) {
      throw new Error("Authentication Failed");
    }

    return NextResponse.json(
      {
        user: token,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return ErrorHandler(request, error as Error);
  }
};
