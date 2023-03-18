import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthUserModel from "@/models/AuthUser";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response("Missing email or password", { status: 400 });
    }

    let authUser = await AuthUserModel.findOne(email);

    if (authUser) {
      return Response.json({
        message: "User already exists",
        error: true,
      }).status(400);
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    console.log({ encryptedPassword });

    authUser = await AuthUserModel.create({
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    // TODO: Generate JWT token
    const token = jwt.sign({ userId: authUser._id }, "secret", {
      algorithm: "HS256",
      expiresIn: "1h",
    });

    return Response.json({
      id: authUser._id,
      email: authUser.email,
      token,
    });
  } catch (error) {
    console.log({ error });
    return new Response("Invalid JSON", { status: 400 });
  }
}
