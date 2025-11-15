"use server";

import { sql } from "./server.js";
import { randomUUID } from "crypto";

export async function createUsers(userData) {
  for (const u of userData) {
    const id = randomUUID();
    console.log("Generated ID:", id);
    await sql`INSERT INTO "User" (id, email, "googleId") VALUES (${id}, ${
      u.email
    }, ${u.googleId || null})`;
  }
}

export async function fetchUsers() {
  const users = await sql`SELECT * FROM "User"`;
  console.log(users);
  return users;
}

export async function deleteUser(userId) {
  console.log("Deleting user with ID:", userId);
  await sql`DELETE FROM "User" WHERE id = ${userId}`;
}

async function main() {
  const userData = [
    {
      email: "pakninlpn@gmail.com",
      googleId: "pakninlpn@gmail.com",
    },
  ];

  await createUsers(userData);
}

main();
