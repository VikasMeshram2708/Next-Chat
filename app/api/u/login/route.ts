import { ErrorHandler } from "@/lib/ErrorHandler";
import { NextRequest } from "next/server";
import { loginSchema } from "@/app/models/User";
import DbConfig from "@/lib/DbConfig";
import { prismaInstance } from "@/lib/PrismaInstance";
import bcrypt from "bcryptjs";

export const POST = async (request: NextRequest) => {
  try {
    // Parse the request body
    const reqBody = await request.json();

    // Validate the request body against the loginSchema
    const parsedRes = loginSchema.safeParse(reqBody);

    if (!parsedRes.success) {
      // Throw an error with custom messages if validation fails
      throw new Error(
        parsedRes.error.errors.map((e) => e.message).join(", ") ||
          "Invalid Data"
      );
    }

    const parsedData = parsedRes.data;

    // Connect to the database
    await DbConfig();

    // Check if the user exists by email
    const userExist = await prismaInstance.user.findFirst({
      where: {
        email: parsedData.email,
      },
    });

    if (!userExist) {
      throw new Error("User Doesn't Exist");
    }

    // Compare the hashed password
    const validPassword = await bcrypt.compare(
      parsedData.password,
      userExist.password // No need for optional chaining here since userExist is checked above
    );

    if (!validPassword) {
      throw new Error("Invalid Credentials");
    }

    return new Response(JSON.stringify({ message: "Login successful!" }), {
      status: 200, // Use 200 OK for successful login
    });
  } catch (error) {
    return ErrorHandler(request, error as Error);
  }
};
