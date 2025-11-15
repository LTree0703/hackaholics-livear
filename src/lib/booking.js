"use server";

import { sql } from "./server.js";
import { randomUUID } from "crypto";

export async function createBooking(userId, tourId, numPeople) {
  const id = randomUUID();
  console.log("Generated Booking ID:", id);
  await sql`INSERT INTO "Booking" (id, "userId", "tourId", "numPeople") VALUES (${id}, ${userId}, ${tourId}, ${numPeople})`;
  return id;
}

export async function createBookings(bookingData) {
  for (const b of bookingData) {
    const id = createId();
    console.log("Generated ID:", id);
    await sql`INSERT INTO "Booking" (id, "userId", "tourId", "numPeople") VALUES (${id}, ${b.userId}, ${b.tourId}, ${b.numPeople})`;
  }
}

export async function fetchBookings() {
  const bookings = await sql`SELECT * FROM "Booking"`;
  console.log(bookings);
  return bookings;
}

export async function fetchBookingsByUser(userId) {
  const bookings =
    await sql`SELECT * FROM "Booking" WHERE "userId" = ${userId}`;
  return bookings;
}

export async function fetchBookingsByTour(tourId) {
  const bookings =
    await sql`SELECT * FROM "Booking" WHERE "tourId" = ${tourId}`;
  return bookings;
}

export async function deleteBooking(bookingId) {
  console.log("Deleting booking with ID:", bookingId);
  await sql`DELETE FROM "Booking" WHERE id = ${bookingId}`;
}

// async function main() {
// const bookingData = [
//   {
//     userId: "f0aolmc8k325o6xmjyqxqz91",
//     tourId: "t14r1iogav09l1kt50idhwzj",
//     numPeople: 2,
//   },
// ];
//   await createUsers(userData);
// }

// main();
