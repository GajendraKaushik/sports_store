import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AppError } from "../utils/app-error.js";
import { User } from "../models/User.js";

function toSafeUser(user) {
  return {
    id: user._id.toString(),
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
}

function signToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), role: user.role, email: user.email },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn },
  );
}

export async function signup({ firstName, lastName, email, password, role }) {
  const normalizedEmail = email.toLowerCase().trim();
  const existing = await User.findOne({ email: normalizedEmail });
  if (existing) {
    throw new AppError(409, "Email already registered", "CONFLICT");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: normalizedEmail,
    passwordHash,
    role,
  });

  return { token: signToken(user), user: toSafeUser(user) };
}

export async function login({ email, password }) {
  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail });

  if (!user || user.isActive === false) {
    throw new AppError(401, "Invalid credentials", "UNAUTHORIZED");
  }

  const matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) {
    throw new AppError(401, "Invalid credentials", "UNAUTHORIZED");
  }

  return { token: signToken(user), user: toSafeUser(user) };
}

export async function getMe(userId) {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, "User not found", "NOT_FOUND");
  }
  return toSafeUser(user);
}

export default { signup, login, getMe };
