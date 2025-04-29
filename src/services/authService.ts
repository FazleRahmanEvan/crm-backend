import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { JWT_SECRET } from "../config/env";

interface IUserWithPassword extends IUser {
  password: string;
}

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    passwordHash: hashedPassword,
  });

  await user.save();
  return generateToken(user);
};

export const loginUser = async (email: string, password: string) => {
  const user = (await User.findOne({ email }).select(
    "+passwordHash"
  )) as IUserWithPassword;

  if (!user || !user.password) {
    throw new Error("Invalid credentials");
  }
  const isMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return generateToken(user);
};

const generateToken = (user: IUser) => {
  return jwt.sign({ id: user._id }, JWT_SECRET as string, {
    expiresIn: "30d",
  });
};
