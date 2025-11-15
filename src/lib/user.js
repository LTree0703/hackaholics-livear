"use server";

import { sql } from "./server.js";
import { randomUUID } from "crypto";

export async function createUsers(userData) {
  for (const u of userData) {
    const id = randomUUID();
    console.log("Generated ID:", id);
    await sql`INSERT INTO "User" (id, email) VALUES (${id}, ${u.email})`;
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

// async function main() {
//   const userData = [
//     {
//       email: "alice@prisma.io",
//     },
//     {
//       email: "bob@prisma.io",
//     },
//   ];
// }

// main();
