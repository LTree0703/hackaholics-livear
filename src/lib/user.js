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

export async function getOrCreateUser(email, googleId) {
  console.log("Fetching or creating user with Google ID:", googleId);
  let users = await sql`SELECT * FROM "User" WHERE "googleId" = ${googleId}`;
  if (users.length > 0) {
    console.log("User found:", users[0]);
    return users[0];
  }
  const id = randomUUID();
  await sql`INSERT INTO "User" (id, email, "googleId") VALUES (${id}, ${email}, ${googleId})`;
  users = await sql`SELECT * FROM "User" WHERE id = ${id}`;
  console.log("User created:", users[0]);
  return users[0];
}
