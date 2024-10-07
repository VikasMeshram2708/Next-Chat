import { ErrorHandler } from "@/lib/ErrorHandler";
import { NextRequest } from "next/server";
import { signUpSchema } from "@/app/models/User";
import DbConfig from "@/lib/DbConfig";
import { prismaInstance } from "@/lib/PrismaInstance";
import bcrypt from "bcryptjs";

export const POST = async (request: NextRequest) => {
  try {
    // Parse the request body
    const reqBody = await request.json();

    // Validate the request body against the signUpSchema
    const parsedRes = signUpSchema.safeParse(reqBody);

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

    // Check if the user already exists by email
    const userExist = await prismaInstance.user.findFirst({
      where: {
        email: parsedData.email,
      },
    });

    if (userExist) {
      throw new Error("User Already Exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(parsedData.password, 10);

    // Store the new user in the database
    await prismaInstance.user.create({
      data: {
        email: parsedData.email,
        username: parsedData.username,
        password: hashedPassword,
      },
    });

    return new Response(
      JSON.stringify({ message: "User created successfully!" }),
      {
        status: 201,
      }
    );
  } catch (error) {
    return ErrorHandler(request, error as Error);
  }
};
