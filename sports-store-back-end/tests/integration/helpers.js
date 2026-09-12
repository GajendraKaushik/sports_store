import jwt from "jsonwebtoken";

export function createTokenForTest({ id, role = "user", email = "test@test.com" }) {
  return jwt.sign({ role, email }, process.env.JWT_SECRET, {
    subject: id,
    expiresIn: "1h",
  });
}

export default { createTokenForTest };
